import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {Delete} from "@mui/icons-material";
import {SaveAs} from '@mui/icons-material';
import { Alert, IconButton, Modal } from "@mui/material";
import Swal from "sweetalert2";
import { Route, useLocation, Link } from "react-router-dom";

export default function User() {
  const [data, setData] = React.useState([]);
  const [fetchdata, setFetchData] = React.useState(false);

  React.useEffect(() => {
    axios
      .post(`http://localhost:3000/api/users/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [fetchdata]);

  const rows = data.map((data: any) => {
    data.id = data._id;
    return data;
  });

  const deleteData = async (id: string) => {
    Swal.fire({
      title: "Do you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/users/${id}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          })
          .then((res) => {
            // response = res.data.data;
            console.log(res.data.data);
            Swal.fire(
              `Delete Username:${res.data.data.username} Success!`,
              "",
              "success"
            );
            setFetchData(!fetchdata);
          })
          .catch((err) => {
            throw err;
          });
      }
    });
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #00A7D3",
    boxShadow: 0,
    p: 4,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                User
              </Typography>
            </Box>
            <Box>
              <Link to={{pathname: `/users/create`}}>
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">CreateAt</TableCell>
                  <TableCell align="center">UpdateAt</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.create_at}</TableCell>
                    <TableCell align="center">{row.update_at}</TableCell>
                    <TableCell align="center">
                      <Link to={{pathname: `/users/update/${row._id}`}}>
                        <IconButton aria-label="update"><SaveAs /></IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                          deleteData(row._id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
