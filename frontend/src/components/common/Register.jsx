import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   Container, Box, Typography, TextField,
   Button, Grid, Avatar, Paper, MenuItem
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axiosInstance from './AxiosInstance';
import { Navbar, Nav } from 'react-bootstrap';

const Register = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      name: "", email: "", password: "", type: ""
   });

   const handleChange = (e) =>
      setData({ ...data, [e.target.name]: e.target.value });

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.name || !data.email || !data.password || !data.type)
         return alert("Please fill all fields");

      axiosInstance.post('/api/user/register', data)
         .then((res) => {
            if (res.data.success) {
               alert(res.data.message);
               navigate('/login');
            } else {
               alert(res.data.message);
            }
         })
         .catch((err) => {
            console.error("Registration Error:", err);
            alert("Something went wrong. Try again.");
         });
   };

   return (
      <>
         {/* NAVBAR */}
         <Navbar expand="lg" className="bg-body-tertiary px-4 py-2">
            <Navbar.Brand><h3>Study App</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Navbar>

         {/* REGISTER FORM */}
         <Container component="main" maxWidth="sm">
            <Paper elevation={10} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
               <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                     <HowToRegIcon />
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                     Create your account
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
                     <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                     />
                     <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                     />
                     <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                     />
                     <TextField
                        select
                        fullWidth
                        label="Select User Type"
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        margin="normal"
                        required
                     >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Teacher">Teacher</MenuItem>
                     </TextField>
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, py: 1.5 }}
                     >
                        Sign Up
                     </Button>
                     <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid item>
                           Already have an account?{' '}
                           <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                              Sign in
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Paper>
         </Container>
      </>
   );
};

export default Register;
