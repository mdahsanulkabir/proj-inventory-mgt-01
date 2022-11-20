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
import { Toolbar } from "@mui/material";

export default function AllSku() {
    const { skus } = useLoadSKU();
    // console.log(skus);
  const rows = skus;
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <TableContainer component={Paper} sx={{ maxWidth: 700, height:700 }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align='center'>
                    {index+1}
                  </TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.color}</TableCell>
                  <TableCell align="left">{row.sku}</TableCell>
                  <TableCell align="left">{row._id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
