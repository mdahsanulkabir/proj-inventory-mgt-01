import React, { useState } from "react";
import useLoadSKU from "../../Hooks/useLoadSKU";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Modal, Radio, RadioGroup, TextField, Toolbar, Typography } from "@mui/material";
import * as xlsx from 'xlsx';
import { Widgets } from "@mui/icons-material";
import { useEffect } from "react";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AllSku() {
    let { skus } = useLoadSKU();
    const [ categories, setCategories ] = useState([])
    

    useEffect( () => {
      fetch(`http://localhost:5000/api/getskucategories`)
      .then(res => res.json())
      .then(data => setCategories(data.map(i => ({
        _id : i._id, skuCategory : i.skuCategory
      }))))
    }, [])

    console.log(categories);
    const [ selectedSKU, setSelectedSKU ] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = (skuForUpdate) => {
      setSelectedSKU(skuForUpdate)
      setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const downloadFile = () => {
      var wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(skus)

      xlsx.utils.book_append_sheet(wb, ws, "sku");

      xlsx.writeFile(wb, "All SKU LIST.xlsx")
    }

    const handleSelectedSKUModel = (e) => {
      setSelectedSKU({...selectedSKU, model : e.target.value})
    }
    const handleSelectedSKUColor = (e) => {
      setSelectedSKU({...selectedSKU, color : e.target.value})
    }
    const handleSelectedSKUsku = (e) => {
      setSelectedSKU({...selectedSKU, sku : e.target.value})
    }
    const handleSelectedSKUActiveStatus = (e) => {
      setSelectedSKU({...selectedSKU, active : e.target.checked})
    }
    const handleSelectedSKUCategory = (e) => {
      setSelectedSKU({...selectedSKU, skuCategory : e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(selectedSKU);
      const response = await fetch(`http://localhost:5000/api/sku/${selectedSKU._id}`, {
            method: "PATCH",
            body: JSON.stringify(selectedSKU),
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
          const updatedSKUIndex = skus.findIndex(sku => sku._id === json._id)
          const allSKU = [...skus]
          allSKU[updatedSKUIndex].model = json.model;
          allSKU[updatedSKUIndex].color = json.color;
          allSKU[updatedSKUIndex].sku = json.sku;
          allSKU[updatedSKUIndex].active = json.active;
          allSKU[updatedSKUIndex].skuCategory = json.skuCategory;
          skus = allSKU;
          
          console.info("SKU updated ");
      }
      handleClose();
    }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, textAlign: 'center'}}>
      <Toolbar />
      <Grid container>
        <Grid item md={7}>
          <Button variant='contained' onClick={downloadFile}>
            Download Data
          </Button>
          <TableContainer component={Paper} elevation={5} sx={{ width : '1000px', maxWidth: '70vw', height:750, marginInline:'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={50}>SL</TableCell>
                  <TableCell align="center">MODEL</TableCell>
                  <TableCell align="center">COLOR</TableCell>
                  <TableCell align="center">SKU</TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skus.map((sku, index) => {
                  return (
                    <TableRow
                      key={sku._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => handleOpen (sku)} 
                    >
                      <TableCell component="th" scope="row" align='center'>{index+1}</TableCell>
                      <TableCell align="center">{sku.model}</TableCell>
                      <TableCell align="center">{sku.color}</TableCell>
                      <TableCell align="left">{sku.sku}</TableCell>
                      <TableCell align="left">{sku._id}</TableCell>
                      <TableCell align="left">{sku.active ? "Active" : "Inactive"}</TableCell>
                      {/* <TableCell align="left">{sku.skuCategory}</TableCell> */}
                      <TableCell align="left">{categories ? categories.find(category => category._id === sku.skuCategory)?.skuCategory : ""}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={5}>
          <Box component={Paper} elevation={5}>
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
                Add Category
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
            <Widgets color="primary" />
            <Typography
              variant="h6"
              component="h6"
              color="primary.main"
              align="center"
            >
              Update SKU
            </Typography>
          </Box>
          <FormControl component='form' onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1, marginInline: '20px'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="skuModel"
                label="SKU MODEL"
                autoFocus
                onChange={(e) => handleSelectedSKUModel(e)}
                value={selectedSKU.model}
                helperText="Must be Unique"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="skuColor"
                label="SKU COLOR"
                onChange={(e) => handleSelectedSKUColor(e)}
                value={selectedSKU.color}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="skuSku"
                label="SKU CODE"
                onChange={(e) => handleSelectedSKUsku(e)}
                value={selectedSKU.sku}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth                              active / inactive
                id="supplierAddress"                   use radio
                label="Supplier Address"
                onChange={(e) => handleSelectedSKUActiveStatus(e)}
                value={selectedSupplier.supplierAddress}
              />  */}
              <FormControlLabel label="Active Status" control={<Checkbox checked={selectedSKU.active}  
                onChange={(event)=> handleSelectedSKUActiveStatus(event)}/>}/>

              <RadioGroup row name="row-radio-buttons-group" 
                value={selectedSKU.skuCategory}
                onChange={(e) => handleSelectedSKUCategory(e)}
              >
                {
                  categories.map(category => 
                    <FormControlLabel
                      key={category._id}
                      value={category._id} 
                      control={<Radio />} 
                      label={category.skuCategory}
                    />
                  )
                }
              </RadioGroup>
            </Box>
            <Box sx={{ width: '100%', display : 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, }}>
                Update SKU
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
      
    </Box>
  );
}
