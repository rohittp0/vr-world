import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../../index.css";

function createData(
  name: string,
  cv :string,
  twiter: string,
  linkidin:string,
  role:string,
  year:string
) 
{
  return { name, cv, twiter, linkidin, role, year };
}

const rows = [
  createData("Robert Hari", "159", "6.0", "24", "Trebuchet", "Mentor 2022"),
  createData("Robert Hari", "159", "6.0", "24", "Trebuchet", "Mentor 2022"),
  createData("Robert Hari", "159", "6.0", "24", "Trebuchet", "Mentor 2022"),
  createData("Robert Hari", "159", "6.0", "24", "Trebuchet", "Mentor 2022"),
];

export default function AcccessibleTable() 
{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
              <a href={row.linkidin} target="_blank" rel="noreferrer">
                <span className="cv">CV</span>
              </a>
              </TableCell>
              <TableCell align="right">
              <a href={row.twiter}  target="_blank" rel="noreferrer" ><TwitterIcon/></a>
              </TableCell>
              <TableCell align="right">
                <a href={row.linkidin}  target="_blank" rel="noreferrer" ><LinkedInIcon/></a>
              </TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
