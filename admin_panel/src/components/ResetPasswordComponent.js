import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";

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

export const ResetPasswordComponent = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    otpCode: "",
    newPassword: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/request-password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formDetails.email }),
    });

    if (response.ok) {
      setShowForm(true);
    } else {
      alert("Failed to reset password");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
    });

    if (response.ok) {
      alert("Password reset successful");
    } else {
      alert("Failed to reset password");
    }
  };

  return (
    <section className="banner" id="">
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            width: "60%",
            height: "50%",
            marginLeft: "20%",
            marginTop: "-100px",
          }}
        >
          <Grid
            item
            xs={8}
            sm={8}
            md={15}
            component={Paper}
            elevation={6}
            square
            sx={{ backgroundColor: "rgb(220,220,220,0.7)" }}
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
                Reset Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, email: e.target.value })
                  }
                />
                {!showForm ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "rgb(119,136,153)",
                    }}
                  >
                    Reset Password
                  </Button>
                ) : (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="otpCode"
                      label="OTP Code"
                      type="text"
                      id="otpCode"
                      autoComplete="off"
                      onChange={(e) =>
                        setFormDetails({ ...formDetails, otpCode: e.target.value })
                      }
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type="password"
                      id="newPassword"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setFormDetails({ ...formDetails, newPassword: e.target.value })
                      }
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: "rgb(119,136,153)",
                      }}
                      onClick={handlePasswordReset}
                    >
                      Reset Password
                    </Button>
                  </>
                )}
                <Grid container>
                  <Grid item>
                    <Link
                      href="/"
                      variant="body2"
                      sx={{ color: "black", textDecoration: "none", fontSize: "15px" }}
                    >
                      {"Did you remember your password?"}
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
