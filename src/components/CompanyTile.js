import React from 'react';
import { useHistory } from "react-router-dom";

const CompanyTile = (props) => {
    let history = useHistory();

    const onClick = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        history.push('/company/'+props.company.slug)
    }

    let icon = null         
    if(props.company.url != null) {
        if(props.company.url !== ".jpg") {
            let iconurl = props.company.url.replace('t_thumb', 't_logo_med')
            iconurl = iconurl.replace('.jpg', '.png')
            icon = <img src={iconurl} alt={props.company.name} className="CompanyTileIcon" />
        } else {
            console.log("Missing company icon : " + props.company.name);
            icon = <div className="MissingIcon">?</div>;
        }


    }

    return (
        <div className="CompanyTile" onClick={onClick}>
            <div className="CompanyTileIconWrapper">
                {icon}
            </div>
            <div className="CompanyTileName">{props.company.name}</div>
            <div className="CompanyTileViewsCount">{props.company.viewer_count_average} viewers</div>
        </div>
    );
};

export default CompanyTile