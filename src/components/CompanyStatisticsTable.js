import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import * as utils from '../utils'
import { useTable } from 'react-table'

const CompanyStatisticsTable = (props) => {
    const [apiData, setApiData] = useState([]); // Data state for the Company

    useEffect(() => {
        let dateFrom = new Date('2020-01-01');
        let dateTo = new Date();

        let request = utils.URLSearchAddQuery('', 'after', encodeURIComponent(dateFrom.toISOString()));
        request = utils.URLSearchAddQuery(request, 'before', encodeURIComponent(dateTo.toISOString()));
        request = utils.URLSearchAddQuery(request, 'company', encodeURIComponent(props.slug));

        fetch(appConfig.backendURL('/viewers' + request))
            .then(res => res.json())
            .then(res => setApiData(res))
    }, []);


    // const getKeys = () => {
    //     return Object.keys(data[0]);
    // }
    
    // const getHeader = () => {
    //     var keys = getKeys();
    //     return keys.map((key, index)=>{
    //         return <th key={key}>{key.toUpperCase()}</th>
    //     })
    // }

    // const RenderRow = (props) =>{
    //     return props.keys.map((key, index)=>{
    //     return <td key={props.data[key]}>{props.data[key]}</td>
    //     })
    //    }
    
    // const getRowsData = () => {
    //     var items = data.splice(Math.max(data.length - 12, 1));
    //     var keys = getKeys();
    //     return items.map((row, index)=>{
    //         return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
    //     })
    // }

    const data = React.useMemo(
        () => [
          {
            mon: 'Hello',
            average: 'World',
            gain: 'das',
            percent_gain: 'dasdsa',
            peak: 'dasdsads',
          },
          {
            mon: 'react-table',
            average: 'rocks',
            gain: 'das',
            percent_gain: 'dasdsa',
            peak: 'dasdsads',
          },
          {
            mon: 'whatever',
            average: 'you want',
            gain: 'das',
            percent_gain: 'dasdsa',
            peak: 'dasdsads',
          },
        ],
        []
      );

    const columns = React.useMemo(
        () => [
          {
            Header: 'Month',
            accessor: 'mon',
          },
          {
            Header: 'Average',
            accessor: 'average',
          },
          {
            Header: 'Gain',
            accessor: 'gain',
          },
          {
            Header: '% Gain',
            accessor: 'percent_gain',
          },
          {
            Header: 'Peak',
            accessor: 'peak',
          },
        ],
        []
      );

    const tableInstance = useTable( { columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        // apply the table props
        <table {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
            rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                    // Apply the cell props
                    return (
                    <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                    </td>
                    )
                })}
                </tr>
            )
            })}
        </tbody>
        </table>
        // data === null || data.length === 0 ? null :
        // <div>
        //     <table>
        //         <thead>
        //             <tr>{getHeader()}</tr>
        //         </thead>
        //         <tbody>
        //             {getRowsData()}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default CompanyStatisticsTable;
