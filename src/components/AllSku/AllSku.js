import React from "react";
import useLoadSKU from "../../Hooks/useLoadSKU";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Button, Toolbar } from "@mui/material";
import * as xlsx from 'xlsx';

export default function AllSku() {
    const { skus } = useLoadSKU();
    // console.log(skus);
    const rows = skus;


    const downloadFile = () => {
      var wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(skus)

      xlsx.utils.book_append_sheet(wb, ws, "sku");

      xlsx.writeFile(wb, "All SKU LIST.xlsx")
    }

    const handleClick = (row) => {
      console.log(row);
    }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, textAlign: 'center'}}
    >
      <Toolbar />
      <Button variant='contained' onClick={downloadFile}>
                    Download Data
                </Button>
      <TableContainer component={Paper} sx={{ width : '1000px', maxWidth: '70vw', height:700, marginInline:'auto' }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                SL
              </TableCell>
              <TableCell align="center">MODEL</TableCell>
              <TableCell align="center">COLOR</TableCell>
              <TableCell align="center">SKU</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleClick (row)} 
                >
                  <TableCell component="th" scope="row" align='center'>
                    {index+1}
                  </TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.color}</TableCell>
                  <TableCell align="left">{row.sku}</TableCell>
                  <TableCell align="left">{row._id}</TableCell>
                  <TableCell align="left">{row.active ? "Active" : "Inactive"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
