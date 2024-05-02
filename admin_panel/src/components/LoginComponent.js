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

import { useState } from "react";
import { useSignIn } from 'react-auth-kit';

import Cookies from 'js-cookie';


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
export const LoginComponent = () => {

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });


  const [status, setStatus] = useState({}); // Add this line to define the `status` state variable
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    Cookies.set('isAdmin', true);
    alert(Cookies.get('isAdmin'))
    window.location.reload();
    /* const { email, password } = formDetails;
    const response = await fetch("http://localhost:3000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails)
    }); */
  

    /* const result = await response.json();
    if (response.ok) {
      
      const {isAdmin } = result;  
      
      
      
      //setIsAdmin(isAdmin);
      //signIn(true); // Set the user as signed in
      // Redirect to the desired page or perform any necessary actions
    } else {
      // Handle login error
      alert("Login failed");
      console.log(JSON.stringify(formDetails));
      setStatus({ success: false, message: "Login failed" }); // Set the error status
    } */
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
                Log In
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, password: e.target.value })
                  }
                />
                <Typography
                  variant="h10"
                  style={{ color: "red" }}
                  sx={{ mt: 1, mb: 2 }}
                >
                  {status.message}
                </Typography>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
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
                  LogIn
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/reset" variant="body2" sx={{ color: "black", textDecoration: 'none', fontSize:'15px' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="signup" variant="body2" sx={{ color: "black" , textDecoration: 'none', fontSize:'15px'}}>
                      {"Don't have an account? Sign Up"}
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
