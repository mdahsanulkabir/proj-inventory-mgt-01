import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import useLoadParts from '../../Hooks/useLoadParts';

const OwnPartList = () => {
    const { parts } = useLoadParts();


    console.log(parts);
    const COLUMNS = [
        {
            Header: 'ID',
            accessor: '_id'
        },
        {
            Header: 'OBJECT ID',
            accessor: 'object_id'
        },
        {
            Header: 'SOURCE CATEGORY',
            accessor: 'source_category'
        },
        {
            Header: 'RM CATEGORY',
            accessor: 'rm_category'
        },
        {
            Header: 'SIS CODE',
            accessor: 'sis_code'
        },
        {
            Header: 'MATERIAL NAME',
            accessor: 'material_name'
        },
        {
            Header: 'UNIT',
            accessor: 'unit'
        }
    ]

    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=>parts, [parts])

    const tableInstance = useTable({
        columns, data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    return (
        <div>
            <h2>Own Part List</h2>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row=> {
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OwnPartList;