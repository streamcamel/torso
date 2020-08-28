import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import * as utils from '../utils'

const CompanyStatisticsTable = (props) => {
    const [data, setData] = useState([]); // Data state for the Company

    useEffect(() => {
        let dateFrom = new Date('2020-01-01');
        let dateTo = new Date();

        let request = utils.URLSearchAddQuery('', 'after', encodeURIComponent(dateFrom.toISOString()));
        request = utils.URLSearchAddQuery(request, 'before', encodeURIComponent(dateTo.toISOString()));
        request = utils.URLSearchAddQuery(request, 'company', encodeURIComponent(props.slug));

        fetch(appConfig.backendURL('/viewers' + request))
            .then(res => res.json())
            .then(res => setData(res))
    }, []);


    const getKeys = () => {
        return Object.keys(data[0]);
    }
    
    const getHeader = () => {
        var keys = getKeys();
        // keys.sort(function(a, b) {
        //     if (a.toUpperCase() === 'TIME') {
        //         return -1;
        //     } else if (b.toUpperCase() === 'TIME') {
        //         return 1; 
        //     }
            
        //     if (a < b) {
        //         return -1;
        //     } else if (a > b) {
        //         return 1;
        //     } else {
        //         return 0;
        //     }
        // });

        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
        })
       }
    
    const getRowsData = () => {
        var items = data.splice(Math.max(data.length - 12, 1));
        var keys = getKeys();
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    return (
        data === null || data.length === 0 ? null :
        <div>
            <table>
                <thead>
                    <tr>{getHeader()}</tr>
                </thead>
                <tbody>
                    {getRowsData()}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyStatisticsTable;
