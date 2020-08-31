import React from 'react';
import { numberInKMs } from '../utils';
import { useTable } from 'react-table'

const CompanyStatisticsTable = (props) => {
    const getFormattedDate = (today) => { 
        var month = (today.getMonth() + 1);
        var day = today.getDate();
        var year = today.getFullYear();
        return month + "/" + day + "/" + year;
    };

    const data = React.useMemo(
        () => props.data.slice(0, Math.min(props.data.length, 14)).map((key, index) => {
                if (props.displayPeak) {
                    return {    date: getFormattedDate(new Date(Date.parse(props.data[index]['time']))),
                    value: props.data[index]['value'],
                    gain: '',
                    percent_gain: '',
                    peak: props.data[index]['peak'] }
                } else {
                    return {    date: getFormattedDate(new Date(Date.parse(props.data[index]['time']))),
                    value: props.data[index]['value'],
                    gain: '',
                    percent_gain: '' }
                }
            }) 
        ,
        [props.data, props.displayPeak]
    );

    var i;
    for (i = 0; i < data.length; i++) {
        if (i + 1 < data.length) { 
            data[i]['gain'] = numberInKMs(data[i]['value'] - data[i+1]['value']);
            data[i]['percent_gain'] = (parseFloat((data[i]['value'] - data[i+1]['value']) / data[i+1]['value']) * 100).toFixed(1) + '%';
        } else {
            data[i]['gain'] = '';
            data[i]['percent_gain'] = '';
        }

        data[i]['value'] = numberInKMs(data[i]['value']);
        if (data[i]['peak'] !== undefined) {
            data[i]['peak'] = numberInKMs(data[i]['peak']);
        }
    }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: props.valueTitle,
            accessor: 'value',
          },
          {
            Header: 'Gain',
            accessor: 'gain',
          },
          {
            Header: '% Gain',
            accessor: 'percent_gain',
          },
        ],
        [props.valueTitle]
      );

    if (props.displayPeak) {
        columns.push(
        {
            Header: 'Peak',
            accessor: 'peak',
        });
    }

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
        </div>
    );
};

CompanyStatisticsTable.defaultProps = {
    displayPeak: true,
    valueTitle: 'Average',
};

export default CompanyStatisticsTable;
