import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import { URLSearchAddQuery, numberWithCommas, numberInKs } from '../utils';
import { useTable } from 'react-table'

const CompanyStatisticsTable = (props) => {
    const getFormattedDate = (today) => { 
        var month = (today.getMonth() + 1);
        var day = today.getDate();
        var year = today.getFullYear();
        return month + "/" + day + "/" + year;
    };

    console.log(props.data);

    const data = React.useMemo(
        () => props.data.slice(0, Math.min(props.data.length, 14)).map((key, index) => {
                return {  date: getFormattedDate(new Date(Date.parse(props.data[index]['time']))),
                average: props.data[index]['average'],
                gain: '',
                percent_gain: '',
                peak: props.data[index]['peak'], }
            }) 
        ,
        [props.data]
    );

    var i;
    for (i = 0; i < data.length; i++) {
        if (i + 1 < data.length) { 
            data[i]['gain'] = numberWithCommas(data[i]['average'] - data[i+1]['average']);
            data[i]['percent_gain'] = parseFloat((data[i]['average'] - data[i+1]['average']) / data[i+1]['average']).toFixed(2) + '%';
        } else {
            data[i]['gain'] = '';
            data[i]['percent_gain'] = '';
        }

        data[i]['average'] = numberInKs(data[i]['average']);
        data[i]['peak'] = numberInKs(data[i]['peak']);
    }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Date',
            accessor: 'date',
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
        <div>
            {props.title}
        <table className="center" {...getTableProps()}>
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
        </div>
    );
};

export default CompanyStatisticsTable;
