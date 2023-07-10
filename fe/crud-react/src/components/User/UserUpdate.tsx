import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

export default function UserUpdate() {
  const [data, setData] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/api/users/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then(async (res) => {
        await setData(res.data.data);
        await setUsername(String(res.data.data.username));
        await setAge(String(res.data.data.age));
      })
      .catch((err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "data not found!",
          text: "system will goto first page",
        }).then(() => {
          navigate("/");
        });
        throw err;
      });
  }, [id]);
console.log(data)
  const handleSubmit = (event: any) => {
    event.preventDefault();
    Swal.fire({
      title: "Do you to save?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${import.meta.env.VITE_API}/api/users/update`, {
            id: id,
            username: username,
            age: age,
          })
          .then((response) => {
            console.log(response);
            Swal.fire("Success!", "Your create user success.", "success").then(() => {
              navigate("/");
            });
          })
          .catch((error: any) => {
            console.log(error);
            Swal.fire(
              "Error!",
              `Your create user error : ${error.message}`,
              "error"
            ).then(() => {
              navigate("/");
            });
          });
      }
    });
  };

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Update User
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
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="age"
                  label="Age"
                  variant="outlined"
                  type="number"
                  fullWidth
                  required
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Save
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="error" href="/" fullWidth>
                  Cancle
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </React.Fragment>
    );
}
