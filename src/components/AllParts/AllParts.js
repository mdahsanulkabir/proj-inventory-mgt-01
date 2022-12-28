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
import { Button, styled, TablePagination, Toolbar } from "@mui/material";
import * as xlsx from 'xlsx';

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
  console.log(parts);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadFile = () => {
    var wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(parts)

    xlsx.utils.book_append_sheet(wb, ws, "boms");

    xlsx.writeFile(wb, "SFG BOMs.xlsx")
}
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Paper sx={{height: "100%", marginInline: 'auto', display: "flex", flexDirection: "column"}} elevation={5}>
        <TableContainer sx={{ height: "80vh", flex : "auto" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" width={50}>SL</StyledTableCell>
                <StyledTableCell align="center">PART ID</StyledTableCell>
                <StyledTableCell align="center">PART NAME</StyledTableCell>
                <StyledTableCell align="center">SAP CODE</StyledTableCell>
                <StyledTableCell align="center">SIS CODE</StyledTableCell>
                <StyledTableCell align="center">RM CATEGORY</StyledTableCell>
                <StyledTableCell align="center">DB ID</StyledTableCell>

                <StyledTableCell align="center" sx={{ maxWidth: 80 }}>
                  SOURCE CATEGORY
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ maxWidth: 80 }}>
                  SECONDARY SOURCE CATEGORY
                </StyledTableCell>
                <StyledTableCell align="center">UNIT</StyledTableCell>
                <StyledTableCell align="center">OBSOLETE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parts.map((part, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{part.object_id}</TableCell>
                    <TableCell align="center">{part.material_name}</TableCell>
                    <TableCell align="center">{part.sap_code}</TableCell>
                    <TableCell align="left">{part.sis_code}</TableCell>
                    <TableCell align="left">{part.rm_category}</TableCell>
                    <TableCell align="left">{part._id}</TableCell>
                    <TableCell align="left">{part.source_category}</TableCell>
                    <TableCell align="left">{part.sec_source_category}</TableCell>
                    <TableCell align="left">{part.unit}</TableCell>
                    <TableCell align="left">{part.obsolete}</TableCell>
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

        <Button sx={{width : "10%"}} variant='contained' onClick={downloadFile}>
          Download Data
        </Button>
      </Paper>
    </Box>
  );
}
