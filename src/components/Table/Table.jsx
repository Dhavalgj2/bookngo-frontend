import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
export default function UserTable({ userData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className="table-header-row">
            <TableCell>FirstName</TableCell>
            <TableCell align="right">Mobile Number</TableCell>
            <TableCell align="right">Adults</TableCell>
            <TableCell align="right">Child(5to12)</TableCell>
            <TableCell align="right">Child(below 5)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(userData)}
          {userData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.adults}</TableCell>
              <TableCell align="right">{row.child5to12}</TableCell>
              <TableCell align="right">{row.childbelow5}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
