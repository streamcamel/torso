#!/usr/bin/python3

import argparse
import errno
import xml.etree.ElementTree as ET
from xml.dom import minidom
import gzip
import requests
import sys
import os

import sys
sys.path.insert(1, os.path.abspath('../submodules/streamcamel-py/streamcamel'))
from streamcamel import StreamCamel

class SitemapBuilder:
    def __init__(self):
        self.__stream_camel = StreamCamel()
        self.__root_url = 'https://www.streamcamel.com'

    def top_games(self):
        urls = []

        games = self.__stream_camel.top_games()

        for game in games:
            if 'slug' in game and not game['slug'] is None:
                slug = str(game['slug'])
                urls.append(self.__root_url + '/game/' + slug)

        return urls

    def top_companies(self):
        urls = []

        companies = self.__stream_camel.top_companies()

        for company in companies:
            if 'slug' in company and not company['slug'] is None:
                slug = str(company['slug'])
                urls.append(self.__root_url + '/company/' + slug)

        return urls

    def top_streamers(self):
        urls = []

        streamers = self.__stream_camel.top_streamers()

        for streamer in streamers:
            if 'login' in streamer and not streamer['login'] is None:
                login = str(streamer['login'])
                urls.append(self.__root_url + '/streamer/' + login)

        return urls

def get_all_urls():
    urls = ["https://www.streamcamel.com", "https://www.streamcamel.com/?privacy=1",
            "https://www.streamcamel.com/press/index.php"]

    urls.append("https://www.streamcamel.com/topgames")
    urls.append("https://www.streamcamel.com/topstreamers")
    urls.append("https://www.streamcamel.com/clips")
    
    builder = SitemapBuilder()
    urls += builder.top_games()
    urls += builder.top_companies()
    urls += builder.top_streamers() 

    return urls

# Given a list of URLS, build a XML sitemap from it
def get_xml_tree(urls):
    root = ET.Element("urlset")
    root.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    for url in urls:
        url_elem = ET.SubElement(root, "url")
        loc_elem = ET.SubElement(url_elem, "loc")
        loc_elem.text = url

    return root

def xml_pretty_print(root, output_path, compress=False):
    xmlstr = minidom.parseString(ET.tostring(root)).toprettyxml(indent="   ")
    with open(output_path, "w") as f:
        f.write(xmlstr)
    print("Wrote {}".format(output_path))

    # XML are default UTF-8 encoded, but the Google example shows
    # the encoding explicitely specified
    # So reopen the file and modify the header
    with open(output_path, "r") as f:
        lines = f.readlines()

    if len(lines) > 0:
        lines[0] = '<?xml version="1.0" encoding="UTF-8"?>\n'

    with open(output_path, "w") as f:
        f.writelines(lines)

    if compress:
        with open(output_path, "rb") as r:
            with gzip.open(output_path + '.gz', 'wb') as zipped_file:
                zipped_file.writelines(r)

        os.remove(output_path)

        print("Compressed to {}".format(output_path + '.gz'))

def main(args):

    parser = argparse.ArgumentParser(description='Build the website sitemap')    
    parser.add_argument('--output_path', type=str, default='../public', help="Root path to save sitemap XML files, default to current directory")
    args = parser.parse_args()
    output_path = args.output_path
    
    root_url = 'https://www.streamcamel.com'

    print("Getting URLs from api.streamcamel.com")
    urls = get_all_urls()

    try:
        os.makedirs(output_path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise

    # Delete all previous sitemap files on success
    for filename in os.listdir(output_path):
        if filename.startswith('sitemap') and filename.endswith('.xml.gz'):
            print("Removing {}".format(os.path.join(output_path, filename)))
            os.remove(os.path.join(output_path, filename))

    # build a tree structure
    sitemapindex = ET.Element("sitemapindex")
    sitemapindex.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    # Google and Bing limit sitemap to 50,000 entries or 50 MB, so keep creating new files as needed
    # Sitemap can be saved in .gz, to err on safe-side, we will assume the 50 MB limit applies
    # to the uncompressed size.
    site_map_index = 1
    entry_size_bytes = 0
    sub_urls = []
    for url in urls:

        # Depending on how many attributes are in the sitemap, let's just say that each entry adds 100
        # bytes overhead
        entry_size_bytes += 500 + len(url)

        if len(sub_urls) == 50000 or entry_size_bytes >= 50 * 1024 * 1024:
            sub_root = get_xml_tree(sub_urls)
            filename = "sitemap" + str(site_map_index) + ".xml"
            xml_pretty_print(sub_root, os.path.join(output_path, filename), compress=True)

            ET.SubElement(ET.SubElement(sitemapindex, "sitemap"), ("loc")).text = root_url + '/' + filename + ".gz"

            entry_size_bytes = 0
            sub_urls.clear()
            site_map_index += 1
        else:
            sub_urls.append(url)

    if len(sub_urls) > 0:
            sub_root = get_xml_tree(sub_urls)
            filename = "sitemap" + str(site_map_index) + ".xml"
            xml_pretty_print(sub_root, os.path.join(output_path, filename), compress=True)

            ET.SubElement(ET.SubElement(sitemapindex, "sitemap"), ("loc")).text = root_url + '/' + filename + ".gz"

    xml_pretty_print(sitemapindex, os.path.join(output_path, "sitemap.xml"))
    
if __name__ == '__main__':
    main(sys.argv)
