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

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useLoadSKU from "../../Hooks/useLoadSKU";


const ProductionHistoryDaily = () => {
  const [ startDate, setStartDate ] = useState(dayjs("2022-09-30"));
  const [ endDate, setEndDate ] = useState(dayjs("2022-11-01"));
  const [ dailyFGProdData ,setDailyFGProdData ] = useState([]);
  const { skus } = useLoadSKU();
  const [duration, status, categoryChecked] = useOutletContext();
  

  useEffect(()=>{
    fetch(`https://srp-planning.onrender.com/api/getDailyFGProduction/?startDate=${startDate}&endDate=${endDate}`)
    .then(res => res.json())
    .then(data => setDailyFGProdData(data));
},[ startDate, endDate ]);
 
  // console.log(dailyFGProdData);

  //get the dates of the selected duration range
  let uniqueDates = [...new Set(dailyFGProdData.map((item) => item.date))];
  uniqueDates = uniqueDates.sort();
  
  const handleStartDate = ( newStartDate) => {
    console.log(newStartDate.$d);
    setStartDate(newStartDate.$d);
  }
  
  const handleEndDate = ( newEndDate) => {
    console.log(newEndDate.$d);
    setEndDate(newEndDate.$d);
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ p: 3, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onChange={(newStartDate)=>handleStartDate(newStartDate)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={(newEndDate)=>handleEndDate(newEndDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="h5"
              component="h5"
              color="secondary"
              sx={{ textAlign: "center", fontWeight: 700 }}
            >
              Production History Daily
            </Typography>
          </Grid>
          <Grid item md={4}></Grid>
      </Grid>

      <Box
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}
      >
        <TableContainer component={Paper} sx={{ maxWidth: "100%", height: 650 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{maxWidth: "30px"}} >SL</TableCell>
                <TableCell align="center">MODEL</TableCell>
                <TableCell align="center">COLOR</TableCell>
                <TableCell align="center" width={100} sx={{
                        position: 'sticky',
                        left: 0,
                        top: 0,
                        background: 'white',
                        zIndex: 1201,
                    }} >SKU</TableCell>
                {uniqueDates.map((date) => {
                  return (
                    <TableCell align="center" key={date} >
                      {date.split('T')[0]}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                skus?.map((sku, index) => {
                  return (
                    <TableRow
                      key={sku.sku}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                      <TableCell align="center">{sku.model}</TableCell>
                      <TableCell align="center">{sku.color}</TableCell>
                      <TableCell align="left" width="fitContent" 
                        sx={{
                          position: 'sticky',
                          left: 0,
                          background: 'white',
                          zIndex: 1200,
                      }}>{sku.sku}</TableCell>
                      {
                        uniqueDates.map((date, index) => {
                          return (
                            <TableCell align="center" key={index}>
                              {
                                dailyFGProdData.find(
                                  (data) => data.date === date && data.sku === sku._id
                                )
                                ? dailyFGProdData.find(
                                    (data) => data.date === date && data.sku === sku._id
                                  ).quantity
                                : ""}
                            </TableCell>
                          );
                        })
                      }
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    </LocalizationProvider>
    
  );
};

export default ProductionHistoryDaily;
