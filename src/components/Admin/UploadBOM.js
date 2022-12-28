import React, { useContext, useState } from 'react';
import { TokenContext } from '../../App';
import * as xlsx from 'xlsx';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useLoadSFGSourceCategory from '../../Hooks/useLoadSFGSourceCategory';
import useLoadSFGCategory from '../../Hooks/useLoadSFGCategory';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UploadBOM = () => {
    // const token = useContext(TokenContext); //todo for now i am using local storage 
    const token = localStorage.getItem("token"); 

    const [ uploadedBOMs, setUploadedBOMs ] = useState([])
    const [ uploadedPartModelType, setUploadedPartModelType ] = useState([])
    const [selectedBOM, setSelectedBOM] = useState({})
    const { sfgSourceCategories } = useLoadSFGSourceCategory();
    const { sfgCategories } = useLoadSFGCategory();

    const [ bomFromDB, setBomFromDB ] = useState([])

    const [open, setOpen] = useState(false);
    const handleOpen = (bom) => {
        setSelectedBOM(bom)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    let supplierData = [] //Todo delete it

    //? Upload file
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workBook = xlsx.read(data)
        const worksheet1 = workBook.Sheets[workBook.SheetNames[2]]
        const worksheet2 = workBook.Sheets[workBook.SheetNames[3]]
        const theBOMs = xlsx.utils.sheet_to_json(worksheet1)
        const partRef = xlsx.utils.sheet_to_json(worksheet2)
        setUploadedBOMs(theBOMs)
        setUploadedPartModelType(partRef)
        console.log(theBOMs);
        console.log(partRef);
    }

    //! Conversion of the data
    // console.log(uploadedPartModelType);
    // const theModel = uploadedPartModelType.find(part => part.Codes === '6398657223328b7eeff92436')?.model
    // console.log("the model is = ", theModel)
    const uploadedSfgs_arranged = uploadedBOMs.map(uploadedBOM => {
        const {  object_id,
                    material_name,
                    sap_code,
                    sis_code,
                    sfg_category,
                    source_category , ...allChildren } = uploadedBOM
        let children = []
        for (let child in allChildren) {
            allChildren[child] && children.push({
                object_id : child,
                model_type : uploadedPartModelType.find(part => part.Codes === child)?.model,
                quantity : allChildren[child]
            })
        }
        return {
            object_id : uploadedBOM.object_id,
            material_name : uploadedBOM.material_name,
            sap_code : uploadedBOM.sap_code,
            sis_code : uploadedBOM.sis_code,
            sfg_category : sfgCategories.find(sfgCategory => sfgCategory.sfg_category === uploadedBOM.sfg_category)?._id,
            source_category : sfgSourceCategories.find(source => source.source_category === uploadedBOM.source_category)?._id ,
            children
        }
    })
    console.log(sfgSourceCategories);
    console.log(sfgCategories);


    //! data for table
    console.log(bomFromDB);

    let allChildren = []

    bomFromDB.forEach(bom => {
        bom.children.forEach(child => {
            allChildren.push({
                _id : child.object_id._id,
                object_id : child.object_id.object_id,
                material_name : child.object_id.material_name,
                obsolete : child.object_id.obsolete,
                sap_code : child.object_id.sap_code,
                sis_code : child.object_id.sis_code,
                unit : child.object_id.unit,
                model_type : child.model_type
            })
        })
    })

    // console.log("children are =", childrenofAllSFG, "unique ", [...new Set(childrenofAllSFG.map(child => child._id))]);
    //console.log(" unique children are =", allChildren);
    const uniqueChildrenID = [...new Set(allChildren.map(child => child._id))]
    const uniqueChildren = uniqueChildrenID.map(uniqueChild => allChildren.find(child => child._id === uniqueChild))
    //console.log(uniqueChildren);


    const sfgs = bomFromDB.map(singleSFG => {
        const parts = uniqueChildren.map(uniqueChild => {
            const quantity = 
            singleSFG?.children.find(child => child.object_id._id === uniqueChild._id) ? 
            singleSFG?.children.find(child => child.object_id._id === uniqueChild._id).quantity : 0
            return {...uniqueChild, quantity}
        })
        //console.log(parts);
        return {
            _id : singleSFG._id,
            sfg_objID : singleSFG.object_id,
            sfg_sapID : singleSFG.sap_code,
            sfg_sisCode: singleSFG.sis_code,
            sfg_name : singleSFG.material_name,
            parts
        }
    })

    console.log(uploadedSfgs_arranged);

    const downloadFile = () => {
        var wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(bomFromDB)
        xlsx.utils.book_append_sheet(wb, ws, "boms");
        xlsx.writeFile(wb, "SFG BOMs.xlsx")
    }

    const loadFromDB = () => {
        fetch(`http://localhost:5000/api/sfgBOM`)
        .then(res => res.json())
        .then(data => setBomFromDB(data))
    }

    const saveData = async (e) => {
        e.preventDefault();
        //? below codes are for the API
        // const response = await fetch(`http://localhost:5000/api/createMultipleBOM`, {
        //     method: "POST",
        //     body: JSON.stringify(uploadedSfgs_arranged),
        //     headers: {
        //         "Content-Type": "application/json",
        //         // Authorization: 'Bearer ' + token,
        //     },
        // });
        // const json = await response.json();
        

        // if (!response.ok) {
        //     console.log(json.error);
        // }

        // if(response.ok){
        //     // dispatch({ type : 'reset'})
        //     console.info("BOMS ADDED ");
        //     console.log(json);
        // }
    }
    return (
        <Box style={{backgroundColor : 'green', width: '100%'}}>
            <Box sx={{display : 'flex-start'}}>
                <Box style={{width: '100%', height: '25px', border:"red solid 2px", color:"white"}}>
                    BOM List
                </Box>
                <Button variant='contained' onClick={downloadFile}>
                    Download Data
                </Button>
                <Button variant='contained' component="label">
                    Upload Data <input type="file" hidden onChange={ e => uploadFile(e)}/>
                </Button>
                <Button variant='contained' onClick={loadFromDB}>
                    Load Data from DB
                </Button>
                <Button variant='contained' onClick={saveData}>
                    Save to DB
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}>
                <TableContainer component={Paper} sx={{ maxWidth: "100%", height: 700 }}>
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='right' colSpan={6}>SFG Object ID</TableCell>
                                {
                                    sfgs.map(sfg => {
                                        return (
                                            <TableCell key={sfg._id} sx={{p : 1, border: '1px solid gray'}} align='center'>{sfg.sfg_objID}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='right' colSpan={6}>SFG SAP ID</TableCell>
                                {
                                    sfgs.map(sfg => {
                                        return (
                                            <TableCell key={sfg._id} sx={{p : 1, border: '1px solid gray'}} align='center'>{sfg.sfg_sapID}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='right' colSpan={6}>SFG SIS CODE</TableCell>
                                {
                                    sfgs.map(sfg => {
                                        return (
                                            <TableCell key={sfg._id} sx={{p : 1, border: '1px solid gray'}} align='center'>{sfg.sfg_sisCode}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='right' colSpan={6}>SFG NAME</TableCell>
                                {
                                    sfgs.map(sfg => {
                                        return (
                                            <TableCell key={sfg._id} sx={{p : 1, border: '1px solid gray'}} align='center'>{sfg.sfg_name}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SL</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Obj-ID</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part SAP-ID</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Name</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Sis-Code</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Unit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                uniqueChildren.map((child, index) => {
                                    return (
                                        <TableRow key={child._id ? child._id : index} > 
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{index + 1}</TableCell>
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{child.object_id}</TableCell>
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{child.sap_code}</TableCell>
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{child.material_name}</TableCell>
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{child.sis_code}</TableCell>
                                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{child.unit}</TableCell>
                                            {
                                                sfgs.map(sfg => (
                                                    <TableCell key={sfg._id}sx={{p : 1, border: '1px solid gray'}} align='center'>
                                                        {
                                                            sfg.parts.find(part => part._id === child._id).quantity
                                                        }
                                                    </TableCell>
                                                ))
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

export default UploadBOM;