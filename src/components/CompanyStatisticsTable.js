import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import { URLSearchAddQuery, numberWithCommas } from '../utils';
import { useTable } from 'react-table'

const CompanyStatisticsTable = (props) => {
    const [apiData, setApiData] = useState([]); // Data state for the Company

    useEffect(() => {
        let dateFrom = new Date('2020-01-01');
        let dateTo = new Date();

        let request = URLSearchAddQuery('', 'after', encodeURIComponent(dateFrom.toISOString()));
        request = URLSearchAddQuery(request, 'before', encodeURIComponent(dateTo.toISOString()));
        request = URLSearchAddQuery(request, 'company', encodeURIComponent(props.slug));

        fetch(appConfig.backendURL('/viewers' + request))
            .then(res => res.json())
            .then(res => setApiData(res))
    }, []);

    const getFormattedDate = (today) => { 
        var month = (today.getMonth() + 1);
        var day = today.getDate();
        var year = today.getFullYear();
        return month + "/" + day + "/" + year;
    };

    const data = React.useMemo(
        () => apiData.slice(0, 14).map((key, index) => {
                return {  mon: getFormattedDate(new Date(Date.parse(apiData[index]['time']))),
                average: numberWithCommas(apiData[index]['viewers_count']),
                gain: 'TBD',
                percent_gain: 'TBD',
                peak: numberWithCommas(apiData[index]['viewers_count_peak']), }
            }) 
        ,
        [apiData]
    );

    const columns = React.useMemo(
        () => [
          {
            Header: 'Date',
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
        apiData === null ? null : 
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
