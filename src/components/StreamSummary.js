import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'

const flexContainer = {
    display: 'flex',
    backgroundColor: 'DodgerBlue'
};

const flexElement = {
    margin: '10px',
    padding: '20px',
    fontSize: '30px',
};

const convertDateToDDMMMMM = (toconvert) => {
    let adate = new Date(Date.parse(toconvert));
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(adate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(adate);
    return `${da} ${mo}`;
}

const durationDisplay = (data) => {
    let end_date = new Date(Date.parse(data.end_time));
    let start_date = new Date(Date.parse(data.start_time));

    // Resolution is in milliseconds
    let diff = end_date.getTime() - start_date.getTime();
    
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.ceil((diff - (hours * 60 * 60 * 1000)) / 1000 / 60);

    return `${hours}:${minutes}`;
}

const StreamSummary = (props) => {
    console.log(props);
    return ( props.data ?
        <>
            <div style={flexContainer}>
                <div style={flexElement}>{convertDateToDDMMMMM(props.data.start_time)}</div>
                <div style={flexElement}>Peak: {props.data.peak_view_count}</div>
                <div style={flexElement}>Average: {props.data.average_view_count}</div> 
                <div style={flexElement}>Duration: {durationDisplay(props.data)}</div>
                <div style={flexElement}>Sailor Moon</div>
            </div>
        </>
        : null
    );
};

export default StreamSummary;
