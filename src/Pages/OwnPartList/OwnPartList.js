import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

const OwnPartList = () => {
    const [ownParts, setOwnParts] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/ownParts`)
        .then(res => res.json())
        .then(data => setOwnParts(data));
    },[]);

    console.log(ownParts);
    const COLUMNS = [
        {
            Header: 'ID',
            accessor: '_id'
        },
        {
            Header: 'OBJECT ID',
            accessor: 'Object_ID'
        },
        {
            Header: 'SOURCE CATEGORY',
            accessor: 'Source_Category'
        },
        {
            Header: 'RM CATEGORY',
            accessor: 'RM_Category'
        },
        {
            Header: 'SIS CODE',
            accessor: 'SIS_CODE'
        },
        {
            Header: 'MATERIAL NAME',
            accessor: 'Material_Name'
        }
    ]

    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=>ownParts, [ownParts])

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