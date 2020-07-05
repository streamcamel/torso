import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import * as utils from '../utils'

const FwdBrowsingDrawer = ({sourceGameSlug}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        if(sourceGameSlug){
            let url = appConfig.backendURL('/games/'+sourceGameSlug+'/companies');
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))
        }
    }, [sourceGameSlug]);

    let dynamicDrawer = null;
    let sizing = 'FBDrawer FBDrawerThree';

    if(data.length > 0) {
        let company = data[0];
        let iconurl = utils.fixIconURL(company.url, company.alpha_channel===1, 't_thumb', 't_logo_med');
        
        sizing = 'FBDrawer FBDrawerFour';

        dynamicDrawer = <a href={'/company/'+company.slug} className="FBDrawer FBDrawerFour">
                            <img src={iconurl} alt={company.name} className="FBDrawerIcon" />
                        </a>
                        
    }

    return (
        <div className="FwdBrowsingDrawers">
            {dynamicDrawer}
            <a href="/" className={sizing}>Top Companies</a>
            <a href="/topgames" className={sizing}>Top Games</a>
            <a href="/topstreamers" className={sizing}>Top Streamers</a>
        </div>
    );
};

export default FwdBrowsingDrawer;