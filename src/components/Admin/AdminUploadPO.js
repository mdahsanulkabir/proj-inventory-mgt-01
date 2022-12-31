import { Widgets } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from 'react';
import * as xlsx from 'xlsx';

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

const AdminUploadPO = () => {
    const [ poList, setPOList ] = useState([])
    const [selectedSupplier, setSelectedSupplier] = useState({})

    // get the auth token from local storage
    const token = localStorage.getItem("token");


    // manage the modal dialogue
    const [open, setOpen] = useState(false);
    const handleOpen = (supplier) => {
        setSelectedSupplier(supplier)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    let allPOData = poList.map(po => {
        return {
            po_id : po._id,
            poNumber : po.poNumber,
            poDate : po.poDate,
            supplierId : po.supplierId._id,
            supplierName : po.supplierId.supplierName,
            partsOfPO : po.partsOfPO.map(part => {
                return {
                    part_model_type : part.model_type,
                    part_id : part.object_id._id,
                    part_name : part.object_id.material_name,
                    part_poQty : part.quantity,
                    part_pendingPOqty : part.pendingQty,
                    part_object_id : part.object_id.object_id,
                    part_sis_code : part.object_id.sis_code,
                    part_sap_code : part.object_id.sap_code,
                    part_unit : part.object_id.unit,
                    part_unit_price : part.unitPrice
                }
            })
        }
    })

    allPOData && console.log(allPOData);

    const uploadFile = async (e) => {
        
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workBook = xlsx.read(data)
        const worksheet = workBook.Sheets[workBook.SheetNames[0]]
        const jsonData = xlsx.utils.sheet_to_json(worksheet)
        //setPOList(jsonData)  //setSupplierList(jsonData)
        console.log("uploaded raw data",jsonData);

        let uploadedPO = [];
        let dataKey = 0;
        jsonData.forEach(data => {
            const x = uploadedPO.find(po => po.poNumber === data.poNumber)
            if(x){
                x.partsOfPO.push({
                    model_type : data.model_type,
                    object_id : {
                        _id : data.part_id,
                        material_name : data.part_name,
                        object_id : data.part_object_id,
                        sis_code : data.part_sis_code,
                        sap_code : data.part_sap_code,
                        unit : data.part_unit,
                    },
                    quantity : data.part_poQty,
                    pendingQty : data.part_pendingPOqty,
                    unitPrice : data.part_unit_price
                })
            } else {
                // const po_date = new Date (data.poDate)
                const newPoEntry = {
                    _id : dataKey,
                    poNumber : data.poNumber,
                    poDate : data.poDate,
                    supplierId : {
                        _id : data.supplierId,
                        supplierName : data.supplierName,
                    },
                    partsOfPO : [{
                        model_type : data.model_type,
                        object_id : {
                            _id : data.part_id,
                            material_name : data.part_name,
                            object_id : data.part_object_id,
                            sap_code : data.part_sap_code,
                            sis_code : data.part_sis_code,
                            unit : data.part_unit,
                        },
                        quantity : data.part_poQty,
                        pendingQty : data.part_pendingPOqty,
                        unitPrice : data.part_unit_price
                    }]
                }
                uploadedPO.push(newPoEntry);
                dataKey += 1;
            }
        })

        console.log("uploaded arranged data", uploadedPO);
        setPOList(uploadedPO)
    }

    const loadFromDB = () => {
        fetch('http://localhost:5000/api/getPOs')
        .then(res => res.json())
        .then(data => {console.log(data); setPOList(data)})
    }


    const downloadFile = () => {
        var wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(poList)
        xlsx.utils.book_append_sheet(wb, ws, "suppliers");
        xlsx.writeFile(wb, "PO List.xlsx")
    }


    const saveData = async () => {
        const savePOs = poList.map( po => {
            return {
                poNumber : po.poNumber,
                poDate : po.poDate,
                supplierId : po.supplierId._id,
                partsOfPO : po.partsOfPO.map( part => {
                    return {
                        object_id : part.object_id._id,
                        model_type : part.model_type,
                        quantity : part.quantity, 
                        unitPrice : part.unitPrice,
                        pendingQty : part.pendingQty
                    }
                })
            }
        })
        console.log(savePOs);
        const response = await fetch(`http://localhost:5000/api/insertManyPO`, {
            method: "POST",
            body: JSON.stringify(savePOs),
            headers: {
                "Content-Type": "application/json",
                // Authorization: 'Bearer ' + token,
            },
        });
        const json = await response.json();
        

        if (!response.ok) {
            console.log(json.error);
        }

        if(response.ok){
            // dispatch({ type : 'reset'})
            console.info("PO added ");
            console.log(json);
        }
    }

    const handleSelectedSupplierID = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierID : e.target.value})
    }

    const handleSelectedSupplierName = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierName : e.target.value})
    }

    const handleSelectedSupplierEmail = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierEmail : e.target.value})
    }
    const handleSelectedSupplierAddress = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierAddress : e.target.value})
    }
    const handleSelectedSupplierPerson = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierContactPerson : e.target.value})
    }
    const handleSelectedSupplierPersonPhone = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierContactPersonPhoneNumber : e.target.value})
    }
    const handleSupplierCategory = (e) => {
        setSelectedSupplier({...selectedSupplier, supplierCategory : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedSupplier);
        const response = await fetch(`http://localhost:5000/api/updateSupplier/${selectedSupplier.db_id}`, {
            method: "PATCH",
            body: JSON.stringify(selectedSupplier),
            headers: {
                "Content-Type": "application/json",
                // Authorization: 'Bearer ' + token,
            },
        });
        const json = await response.json();
        

        if (!response.ok) {
            console.log(json.error);
        }

        if(response.ok){
            console.log(json);
            //? change the supplier data in ui
            const updatedSupplierIndex = poList.findIndex(supplier => supplier._id === json._id)
            const allSupplier = [...poList]
            allSupplier[updatedSupplierIndex].supplierID = json.supplierID;
            allSupplier[updatedSupplierIndex].supplierName = json.supplierName;
            allSupplier[updatedSupplierIndex].supplierEmail = json.supplierEmail;
            allSupplier[updatedSupplierIndex].supplierAddress = json.supplierAddress;
            allSupplier[updatedSupplierIndex].supplierContactPerson = json.supplierContactPerson;
            allSupplier[updatedSupplierIndex].supplierContactPersonPhoneNumber = json.supplierContactPersonPhoneNumber;
            allSupplier[updatedSupplierIndex].supplierCategory = json.supplierCategory;
            setPOList(allSupplier)
            
            console.info("Supplier updated ");
        }
    }

    return (
        <Box style={{backgroundColor : 'green'}}>
            <Box sx={{display : 'flex-start'}}>
                <Box style={{width: '100%', height: '25px', border:"red solid 2px", color:"white"}}>
                    Local PO List
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
            <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 0, m:1 }}>
                <Typography variant='h5' component='h5' sx={{m:1, p:1}}>ALL PO LIST</Typography>
            </Box>
            {
                allPOData.map(( poData, index) => (
                    <Box component={Paper} key={poData.po_id}sx={{ flexGrow: 1, bgcolor: "background.default", p: 1, m:1 }}>
                        <Typography variant='h6' component='h6'>PO: {index+1}</Typography>
                        <Typography variant='h6' component='h6'>PO Number: {poData.poNumber}</Typography>
                        <Typography variant='h6' component='h6'>PO Date: {poData.poDate.split('T')[0]}</Typography>
                        <Typography variant='h6' component='h6'>Supplier Name: {poData.supplierName}</Typography>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SL</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Object ID</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part SIS Code</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part SAP Code</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Name</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Unit</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Unit Price (BDT)</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part PO Qty</TableCell>
                                        <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Part Pending PO Qty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        poData.partsOfPO.map((partInfo,index) => (
                                            <TableRow key={partInfo.part_id}>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{index + 1}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_object_id}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_sis_code}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_sap_code}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_name}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_unit}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_unit_price}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_poQty}</TableCell>
                                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>{partInfo.part_pendingPOqty}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                ))
            }
            {/* <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>SL</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>PO Number</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>PO Date</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Address</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Contact Person</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Contact Person Phone Number</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Category</TableCell>
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
            </Box> */}
            {/* <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Box
                        sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: 'center'
                        }}
                    > 
                        <Widgets color="primary" />
                        <Typography
                            variant="h6"
                            component="h6"
                            color="primary.main"
                            align="center"
                        >
                            Update Supplier
                        </Typography>
                    </Box>
                    <FormControl component='form' onSubmit={handleSubmit}>
                        <Box noValidate sx={{ mt: 1, marginInline: '20px'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierId"
                                label="Supplier ID"
                                autoFocus
                                onChange={(e) => handleSelectedSupplierID(e)}
                                value={selectedSupplier.supplierID}
                                helperText="Must be Unique"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierName"
                                label="Supplier Name"
                                onChange={(e) => handleSelectedSupplierName(e)}
                                value={selectedSupplier.supplierName}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierEmail"
                                label="Supplier Email"
                                onChange={(e) => handleSelectedSupplierEmail(e)}
                                value={selectedSupplier.supplierEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierAddress"
                                label="Supplier Address"
                                onChange={(e) => handleSelectedSupplierAddress(e)}
                                value={selectedSupplier.supplierAddress}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierContactPerson"
                                label="Supplier Contact Person"
                                onChange={(e) => handleSelectedSupplierPerson(e)}
                                value={selectedSupplier.supplierContactPerson}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="supplierContactPersonPhone"
                                label="Supplier Contact Person Phone"
                                onChange={(e) => handleSelectedSupplierPersonPhone(e)}
                                value={selectedSupplier.supplierContactPersonPhoneNumber}
                            />
                            <RadioGroup row name="row-radio-buttons-group" 
                                value={selectedSupplier.supplierCategory}
                                onChange={(e) => handleSupplierCategory(e)}
                            >
                                <FormControlLabel value="local" control={<Radio />} label="Local Supplier" />
                                <FormControlLabel value="3rd Party" control={<Radio />} label="3rd Party Supplier" />
                                <FormControlLabel value="import" control={<Radio />} label="Import Supplier" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            display : 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, }}
                            >
                                Update Supplier
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal> */}
        </Box>
    );
}

export default AdminUploadPO;