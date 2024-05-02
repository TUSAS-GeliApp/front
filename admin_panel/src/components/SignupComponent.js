import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(119,136,153)",
          },
        },
      },
    },
  },
});
export const SignupComponent = () => {
  const formInitialDetails = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [status, setStatus] = useState({});

  const onFormUpdate = (value) => {
    setFormDetails(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onFormUpdate({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    });

    let response = await fetch("http://localhost:/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });

    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: "Signup successfully" });
      // TODO: login success
    } else {
      setStatus({
        succes: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <section className="banner" id="">
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main"
          sx={{ height: "100vh",
          width: "60%", 
          height: "50%",
          marginLeft: "20%",
          marginTop: "-100px"  }}>

          <Grid
            item
            xs={8}
            sm={8}
            md={15}
            component={Paper}
            elevation={6}
            square
            sx={{backgroundColor: "rgb(220,220,220,0.7)"}}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#101" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Typography
                    variant="h10"
                    style={{ color: "red" }}
                    sx={{ mx: 2, mt: 1, mb: 2 }}
                  >
                    {status.message}
                  </Typography>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "rgb(119,136,153)" }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2" sx={{ color: "black", textDecoration: 'none', fontSize:'15px' }}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </section>
  );
};
