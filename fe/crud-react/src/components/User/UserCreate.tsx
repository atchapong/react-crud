import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { Route } from "react-router-dom";

export default function UserCreate() {
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState("0");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    Swal.fire({
      title: "Do you to create?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:3000/api/users/create", {
            "username": username,
            "age": age
        })
          .then((response) => {
            console.log(response);
            Swal.fire("Success!", "Your create user success.", "success");
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire(
              "Error!",
              `Your create user error : ${error.message}`,
              "error"
            );
          });
      }
    });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Create User
        </Typography>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="age"
                label="Age"
                variant="outlined"
                type="number"
                defaultValue={0}
                fullWidth
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Create
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="error" href="/" fullWidth >
                Cancle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
