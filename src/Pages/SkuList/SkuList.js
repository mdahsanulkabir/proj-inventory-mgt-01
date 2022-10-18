import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import useLoadSKU from '../../Hooks/useLoadSKU';
import './SkuList.css'

// const divStyle={
//     overflowY: 'scroll',
//     border:'1px solid red',
//     width:'700px',
//     float: 'left',
//     height:'500px',
//     position:'relative'
//   };

const SkuList = () => {
    const { skus } = useLoadSKU();
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/skus`)
    //     .then(res => res.json())
    //     .then(data => setSkus(data));
    // },[]);
    console.log(skus);
    const COLUMNS = [
        {
            Header: 'ID',
            accessor: '_id'
        },
        {
            Header: 'MODEL',
            accessor: 'Model'
        },
        {
            Header: 'COLOR',
            accessor: 'Color'
        },
        {
            Header: 'SKU',
            accessor: 'SKU'
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