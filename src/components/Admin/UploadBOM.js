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
    const token = useContext(TokenContext);
    const [ uploadedBOMs, setUploadedBOMs ] = useState([])
    const [ uploadedPartModelType, setUploadedPartModelType ] = useState([])
    const [selectedBOM, setSelectedBOM] = useState({})
    const { sfgSourceCategories } = useLoadSFGSourceCategory();
    const { sfgCategories } = useLoadSFGCategory();

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
        const uploadedSfgs = uploadedBOMs.map(uploadedBOM => {
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


    console.log(uploadedSfgs);

    const downloadFile = () => {
        var wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(uploadedBOMs)
        xlsx.utils.book_append_sheet(wb, ws, "boms");
        xlsx.writeFile(wb, "SFG BOMs.xlsx")
    }

    const loadFromDB = () => {
        fetch(`http://localhost:5000/api/getDescriptionofSFG`)
        .then(res => res.json())
        .then(data => setUploadedBOMs(data))
    }

    const saveData = () => {

    }
    return (
        <Box style={{backgroundColor : 'green'}}>
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
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SL</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Object ID</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SAP ID</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SFG NAME</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SIS CODE</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Obj-ID</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part SAP-ID</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Name</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Sis-Code</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Unit</TableCell>
                            <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            supplierData.map((supplier, index) => {
                                return (
                                    <TableRow key={supplier.db_id ? supplier.db_id : index} onClick={() => handleOpen(supplier)}> 
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{index + 1}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierID}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierName}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierEmail}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierAddress}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierContactPerson}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierContactPersonPhoneNumber}</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{supplier.supplierCategory}</TableCell>
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