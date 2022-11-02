import React, { useState } from "react";
import useLoadParts from "../../Hooks/useLoadParts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { styled, TablePagination, Toolbar } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "1px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllParts() {
  const { parts } = useLoadParts();
  // console.log(parts);
  const rows = parts;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Paper sx={{maxWidth: 1200}} elevation={5}>
      <TableContainer sx={{ height: 700 }}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width={50}>
                SL
              </StyledTableCell>
              <StyledTableCell align="center">PART ID</StyledTableCell>
              <StyledTableCell align="center">PART NAME</StyledTableCell>
              <StyledTableCell align="center">SIS CODE</StyledTableCell>
              <StyledTableCell align="center">CATEGORY</StyledTableCell>
              <StyledTableCell align="center" sx={{ maxWidth: 80 }}>
                SOURCE CATEGORY
              </StyledTableCell>
              <StyledTableCell align="center">UNIT</StyledTableCell>
              <StyledTableCell align="center">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.object_id}</TableCell>
                  <TableCell align="center">{row.material_name}</TableCell>
                  <TableCell align="left">{row.sis_code}</TableCell>
                  <TableCell align="left">{row.rm_category}</TableCell>
                  <TableCell align="left">{row.source_category}</TableCell>
                  <TableCell align="left">{row.unit}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
