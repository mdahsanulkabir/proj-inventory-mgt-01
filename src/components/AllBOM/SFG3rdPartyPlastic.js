import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from 'react';


const SFG3rdPartyPlastic = () => {

    const [ bomData, setBomData ] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/api/getsfgtestdata')
        .then(res => res.json())
        .then(data => setBomData(data))
    },[])

    // console.log(bomData);
    let all_rm = []
    bomData.forEach(bom => {
        bom.children.forEach(childofchild => {
            all_rm.push ({
                _id : childofchild.object_id._id, 
                material_name : childofchild.object_id.material_name, 
                model_type : childofchild.model_type
            })
        })
    })
    const rm_ids = [...new Set(all_rm.map(bb => bb._id))]
    // console.log(rm_ids);
    const rms = rm_ids.map(rm_id => {
        return all_rm.find(item => item._id === rm_id)
        
    })

    // console.log(rms);

    // rms.forEach(i => console.log(i.material_name))
    return (
        <Box style={{backgroundColor : 'green'}}>
            <Box style={{width: '100%', height: '25px', border:"red solid 2px", color:"white"}}>
                3rd party plastics bom
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SL</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Object ID</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SAP ID</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Material Name</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Unit</TableCell>
                                {
                                    rms && rms.map(rm => {
                                        return (
                                            <TableCell key={rm._id} sx={{width : '30px', paddingInline: 1, border: '1px solid gray'}} align='center'>
                                                {rm.material_name}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bomData.map((bom, index) => {
                                    return (
                                        <TableRow key={bom._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{bom.object_id}</TableCell>
                                            <TableCell>{bom.sap_code}</TableCell>
                                            <TableCell>{bom.material_name}</TableCell>
                                            <TableCell>pcs</TableCell>
                                            {
                                                rms.map(rm => {
                                                    return (
                                                        <TableCell key={rm._id}>
                                                            {
                                                                bom.children.find(child => child.object_id._id === rm._id)
                                                                ?
                                                                bom.children.find(child => child.object_id._id === rm._id).quantity   
                                                                : 0
                                                            }
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default SFG3rdPartyPlastic;