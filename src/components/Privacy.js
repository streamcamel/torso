import React from 'react';
import Modal from 'react-modal';
import { useLocation, useHistory } from "react-router-dom";
import { URLSearchGetQueryInt, URLSearchRemoveQuery } from '../utils';

const Privacy = () => {
    let location = useLocation();
    let history = useHistory();

    const onHidePrivacy = () => {
        if(location.search.search('privacy=1') !== -1){
            history.push({pathname:location.pathname, search:URLSearchRemoveQuery(location.search, 'privacy')});
        }
    }

    let showPrivacy = (URLSearchGetQueryInt(location.search, 'privacy') === 1);
    
    return (

        <Modal 
        isOpen={showPrivacy}
        className="ModalPolicyDialog">

        <div className="ModalPolicy">
            <span className="ModalPolicyTitle">Privacy Policy</span><span title="X" className="ModalPolicyCloseButton" onClick={onHidePrivacy}>X</span>
            <div className="ModalPolicyText">
                <p>Stream Camel is a technology company focused on delivering knowledge through vivid, contextually-rich presentations, called Stream Camel Visualizations. These Stream Camel Visualizations put data into context for researchers, journalists and enterprise. This Privacy Policy exists to explain how this data and your information may be collected, used, and protected. This Privacy Policy may be updated by us from time to time in which case we will provide notice of material changes to this Privacy Policy by posting a notification on the Stream Camel website.</p>

                <h2>Notice and Choice</h2>
                <p>We collect Personal Information, Non-Personal Information, and Public Information.</p>

                <p>We collect Personal Information when you provide it to us, for example by creating an account. We may ask for your email address if you wish to be notified when listings have changed, for confirmation emails, authenticating your account, accounting notices and other reasons including instances in which you have requested specific information or updates.</p>

                <p>We do not share the Personal Information you provide to us with third parties. However we do provide Personal Information to our vendors or others who are acting to fulfill the services we provide. For example, servers we use to host our website and store information may be managed by other vendors in order to make our site more reliable.</p>

                <p>We collect Non-Personal Information such as web-logs to help us to diagnose problems with our system and to provide better services to our customers. These logs are deleted on a regular basis.</p>

                <p>We and our vendors use cookies, web beacons, advertising identifiers, and other tracking technologies to understand site usage and to manage our advertising and affiliate relationships. Furthermore, emails we send may contain a web beacon that allows us to understand the time and date of when a user has opened an email and when he or she has used a link within an email to visit a website. We use third-party vendors, including Google, for analytics and to serve advertisements and collect non-personally identifiable information when you visit one of our websites. These companies may use non-personally identifiable information (not including your name, address, human-readable email address, or telephone number) about your visits to this and other websites in order to provide advertisements on our sites, other websites, and other forms of media, including emails, about goods and services that may be of interest to you. If you would like more information about the practices of some of these third party advertising companies and learn which of these companies allow you to opt-out of this type of information collection, please click here.To opt out of interest based ads served by Google, you can visit the Google advertising opt-out page.See our detailed cookie policy for further details about our use of cookies for analytics and advertising and for your opt-out choices. Email users wishing to disable our email web beacons should do so by turning images "off" in their email client (e.g., Outlook, Gmail). Please see your email client for more information.</p>

                <p>We do not presently respond to Do Not Track browser settings. See All About Do Not Track for more information.</p>

                <p>If you click on an advertisement or a link to purchase or learn more about a listing you may be directed to a contact form, website or phone number of a third party. Any information you may provide to such third parties will be subject to their Privacy Policy.</p>

                <p>We do not knowingly collect any information from persons under the age of 13. If we learn that we have inadvertently received personal information from a person under the age of 13, we will make every attempt to remove that data.</p>

                <h2>Third Parties</h2>
                <p>We may disclose information about our users if required to do so by law or when such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may also disclose information about our users when we have a good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use Agreement; respond to claims that any Listing or other content violates the rights of third-parties; or protect the rights, property, or personal safety of us, our users, or the general public at large.</p>

                <h2>Security</h2>
                <p>For visitors outside the European Economic Area (EEA) and Switzerland, by visiting our web site and providing us with data, you acknowledge and consent that due to the international scope of Stream Camel we may use the data collected in the course of our relationship for the reasons outlined in this policy or in our other communications with you, including the transmission of information outside of your resident jurisdiction. Such information may be stored on servers located in the United States. By providing us with your information, you acknowledge and consent to the transfer of such data under the terms herein and to this locale.</p>

                <p>For visitors within the European Economic Area (EEA) and Switzerland, Stream Camel complies with the US-EU and US-Swiss Safe Harbor Principles as set forth by the US Department of Commerce regarding the collection, use, and retention of personal information from European Union member countries and Switzerland governed under this privacy policy. We have certified that we adhere to the Safe Harbor Privacy Principles of notice, choice, onward transfer, security, data integrity, access, and enforcement. To learn more about the Safe Harbor program, and to view the company's certification, please visit <a href="http://www.export.gov/safeharbor">http://www.export.gov/safeharbor</a>.</p>

                <p>In compliance with US-EU and US-Swiss Safe Harbor Principles, we commit to resolve complaints about your privacy and our collection or use of your personal information. European Union or Swiss citizens with inquiries or complaints regarding this privacy policy should first contact Stream Camel by clicking here.</p>

                <p>Stream Camel has further committed to refer unresolved privacy complaints under the US-EU and US- Swiss Safe Harbor Principles to an independent dispute resolution mechanism, the BBB EU SAFE HARBOR, operated by the Council of Better Business Bureaus. Thus, if you do not receive timely acknowledgment of your complaint, or if your complaint is not satisfactorily addressed, please visit the BBB EU SAFE HARBOR website for more information or to file a complaint.</p>

                <h2>Contact Us</h2>
                <p>We welcome your questions and feedback on our Privacy Policy. To contact us, <a href="mailto:contact@streamcamel.com">email us</a>.</p>
                </div>
            </div>
        </Modal>
    ); 
};

if(process.env.NODE_ENV === 'test') {
    Modal.setAppElement('body');
}

export default Privacy;