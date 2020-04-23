import React from 'react';
import { useHistory } from "react-router-dom";

const CompanyTile = (props) => {
    let history = useHistory();

    const onClick = (e) => {
        e.preventDefault();
        history.push('/company/'+props.company.slug)
    }

    let iconurl = ""         
    if(props.company.url != null) {
        iconurl = props.company.url.replace('t_thumb', 't_logo_med')
        iconurl = iconurl.replace('.jpg', '.png')
    }

    return (
        <div className="CompanyTile" onClick={onClick}>
            <div className="CompanyTileIconWrapper">
                <img src={iconurl} alt={props.company.name} className="CompanyTileIcon" />
            </div>
            <div className="CompanyTileName">{props.company.name}</div>
            <div className="CompanyTileViewsCount">{props.company.viewer_count_average} viewers</div>
        </div>
    );
};

export default CompanyTile