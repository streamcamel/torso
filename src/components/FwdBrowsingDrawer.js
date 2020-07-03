import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import * as utils from '../utils'

function fixIconURL(iconurl, hasAlpha=false, oldsize=null, newsize=null) {

    if (oldsize && newsize) {
        iconurl = iconurl.replace(oldsize, newsize);
    }

    if(hasAlpha) {
        iconurl = iconurl.replace('.jpg', '.png')
    }

    if(iconurl.search('//') == 0) {
        iconurl = iconurl.replace(/^\/\// , 'https://')
    }

    return iconurl;
}


const FwdBrowsingDrawer = (props) => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        // if(('companyID' in props) && props.companyID){
        //     let url = appConfig.backendURL('/companies/'+slug);
        //     fetch(url)
        //         .then(res => res.json())
        //         .then(res => setData(res))
        // }
    });

    let dynamicDrawer = null;

    // if(data.length > 0) {
        // let company = data[0];
        // let iconurl = fixIconURL(company.url, company.alpha_channel==1, 't_thumb', 't_logo_med');
        let name = 'Riot Games'; 
        let iconurl = fixIconURL("//images.igdb.com/igdb/image/upload/t_thumb/cl2fe.jpg", 
                        true, 
                        't_thumb', 
                        't_logo_med');

        dynamicDrawer = <div className="FBDrawer">
                            <img src={iconurl} alt={name} className="FBDrawerIcon" />
                        </div>
    // }

    return (
        <div className="FwdBrowsingDrawers">
            {dynamicDrawer}
            <a href="/" className="FBDrawer">Top Companies</a>
            <a href="/topgames" className="FBDrawer">Top Games</a>
            <a href="/topstreamers" className="FBDrawer">Top Streams</a>
        </div>
    );
};

export default FwdBrowsingDrawer;