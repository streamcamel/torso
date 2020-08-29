import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import { URLSearchAddQuery, numberWithCommas, numberInKs } from '../utils';
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
        () => apiData.slice(0, Math.min(apiData.length, 14)).map((key, index) => {
                return {  date: getFormattedDate(new Date(Date.parse(apiData[index]['time']))),
                average: apiData[index]['viewers_count'],
                gain: '',
                percent_gain: '',
                peak: apiData[index]['viewers_count_peak'], }
            }) 
        ,
        [apiData]
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
        apiData === null ? null : 
        // apply the table props
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
    );
};

export default CompanyStatisticsTable;
