import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import { useLocation, useHistory } from "react-router-dom";

// Check for using styled component: https://github.com/rebassjs/rebass/issues/579
// 

const tableTr = {
    fontFamily: 'OpenSans-Regular',
    fontSize: '15px',
    color: '#808080',
    lineHeight: '1.2',
    fontWeight: 'unset',
};

const tableTrOdd = {
    fontFamily: 'OpenSans-Regular',
    fontSize: '15px',
    color: '#808080',
    lineHeight: '1.2',
    fontWeight: 'unset',
    background: '#f5f5f5',
};

const tableTd = {
    padding: '10px, 0',
    textAlign: 'left',
}

const startTimeTd = {
    paddingLeft: '40px',
}

const convertDateToDDMMMMMYYYY = (toconvert) => {
    let adate = new Date(Date.parse(toconvert));
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(adate);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(adate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(adate);
    return `${da} ${mo} ${ye}`;
}

const durationDisplay = (data) => {
    let end_date = new Date(Date.parse(data.end_time));
    let start_date = new Date(Date.parse(data.start_time));

    // Resolution is in milliseconds
    let diff = end_date.getTime() - start_date.getTime();
    
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.ceil((diff - (hours * 60 * 60 * 1000)) / 1000 / 60);
    minutes = String(minutes).padStart(2, '0');

    return `${hours}:${minutes}`;
}

const iconurl = (data) => {
    return data.box_art_url.replace('-{width}x{height}', '-90x120');
}

const StreamSummary = (props) => {
    let history = useHistory();
    let location = useLocation();

    const onClick = (e) => {
        e.preventDefault();
    
        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        if (props.data.game_slug) {
            history.push({pathname:('/game/'+props.data.game_slug), search:location.search});
        }
    }

    return ( props.data ?
            <tr style={ props.isOdd ? tableTrOdd : tableTr }>
                <td style={{...tableTd, ...startTimeTd}}>{convertDateToDDMMMMMYYYY(props.data.start_time)}</td>
                <td style={tableTd}>{props.data.peak_view_count}</td>
                <td style={tableTd}>{props.data.average_view_count}</td> 
                <td style={tableTd}>{durationDisplay(props.data)}</td>
                <td style={tableTd} onClick={onClick}>
                    {props.data.game_name}<br></br><img src={iconurl(props.data)} height={60}/>
                </td>
            </tr>
        : null
    );
};

export default StreamSummary;
