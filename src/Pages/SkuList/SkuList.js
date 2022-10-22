import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import useLoadSKU from '../../Hooks/useLoadSKU';
import './SkuList.css'

const SkuList = () => {
    const { skus } = useLoadSKU();
    console.log(skus);
    const COLUMNS = [
        {
            Header: 'ID',
            accessor: '_id'
        },
        {
            Header: 'MODEL',
            accessor: 'model'
        },
        {
            Header: 'COLOR',
            accessor: 'color'
        },
        {
            Header: 'SKU',
            accessor: 'sku'
        }
    ]

    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=>skus, [skus])

    const tableInstance = useTable({
        columns, data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    
    return (
        <div>
            <h2>All sku</h2>
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

export default SkuList;