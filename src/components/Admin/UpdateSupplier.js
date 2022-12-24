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
import React, { useContext, useState } from 'react';
import * as xlsx from 'xlsx';
import { TokenContext } from "../../App";

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

const UpdateSupplier = () => {
    const [ supplierList, setSupplierList ] = useState([])
    const token = useContext(TokenContext);
    const [selectedSupplier, setSelectedSupplier] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = (supplier) => {
        setSelectedSupplier(supplier)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    // useEffect(()=>{
    //     fetch('http://localhost:5000/api/getAllSuppliers')
    //     .then(res => res.json())
    //     .then(data => setSupplierList(data))
    // },[])

    console.log(supplierList);

    const supplierData = supplierList.map(supplier => {
        return {
            db_id : supplier._id,
            supplierID : supplier.supplierID,
            supplierName : supplier.supplierName,
            supplierEmail : supplier.supplierEmail,
            supplierAddress : supplier.supplierAddress,
            supplierContactPerson : supplier.supplierContactPerson,
            supplierContactPersonPhoneNumber : supplier.supplierContactPersonPhoneNumber,
            supplierCategory : supplier.supplierCategory
        }
    })

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workBook = xlsx.read(data)
        const worksheet = workBook.Sheets[workBook.SheetNames[0]]
        const jsonData = xlsx.utils.sheet_to_json(worksheet)
        setSupplierList(jsonData)
        console.log(jsonData);
    }

    const downloadFile = () => {
        var wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(supplierList)

        xlsx.utils.book_append_sheet(wb, ws, "suppliers");

        xlsx.writeFile(wb, "Supplier List.xlsx")
    }

    const loadFromDB = () => {
        fetch('http://localhost:5000/api/getAllSuppliers')
        .then(res => res.json())
        .then(data => setSupplierList(data))
    }

    const saveData = async () => {
        const response = await fetch(`http://localhost:5000/api/supplierInsertMany`, {
            method: "POST",
            body: JSON.stringify(supplierList),
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
            console.info("Suppliers added ");
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
            const updatedSupplierIndex = supplierList.findIndex(supplier => supplier._id === json._id)
            const allSupplier = [...supplierList]
            allSupplier[updatedSupplierIndex].supplierID = json.supplierID;
            allSupplier[updatedSupplierIndex].supplierName = json.supplierName;
            allSupplier[updatedSupplierIndex].supplierEmail = json.supplierEmail;
            allSupplier[updatedSupplierIndex].supplierAddress = json.supplierAddress;
            allSupplier[updatedSupplierIndex].supplierContactPerson = json.supplierContactPerson;
            allSupplier[updatedSupplierIndex].supplierContactPersonPhoneNumber = json.supplierContactPersonPhoneNumber;
            allSupplier[updatedSupplierIndex].supplierCategory = json.supplierCategory;
            setSupplierList(allSupplier)
            
            console.info("Supplier updated ");
        }
    }

    return (
        <Box style={{backgroundColor : 'green'}}>
            <Box sx={{display : 'flex-start'}}>
                <Box style={{width: '100%', height: '25px', border:"red solid 2px", color:"white"}}>
                    Supplier List
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
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier ID</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Name</TableCell>
                                <TableCell sx={{p : 1, border: '1px solid gray'}} align='center'>Supplier Email</TableCell>
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
            </Box>
            <Modal open={open} onClose={handleClose}>
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
            </Modal>
        </Box>
    );
};

export default UpdateSupplier;