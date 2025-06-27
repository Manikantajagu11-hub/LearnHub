import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   Container, Box, Typography, TextField,
   Button, Grid, Avatar, Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosInstance from './AxiosInstance';
import { Navbar, Nav } from 'react-bootstrap';

const Login = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({ email: "", password: "" });

   const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.email || !data.password) return alert("Please fill all fields");

      axiosInstance.post('/api/user/login', data)
         .then(res => {
            if (res.data.success) {
               alert(res.data.message);
               localStorage.setItem("token", res.data.token);
               localStorage.setItem("user", JSON.stringify(res.data.userData));
               navigate('/dashboard');
               setTimeout(() => window.location.reload(), 1000);
            } else {
               alert(res.data.message);
            }
         })
         .catch(err => {
            if (err.response?.status === 401) alert("User doesn't exist");
            navigate("/login");
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

         {/* LOGIN FORM */}
         <Container component="main" maxWidth="sm">
            <Paper elevation={10} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
               <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                     Login to your account
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
                     <TextField label="Email Address" name="email" fullWidth margin="normal" required value={data.email} onChange={handleChange} />
                     <TextField label="Password" name="password" type="password" fullWidth margin="normal" required value={data.password} onChange={handleChange} />
                     <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5 }}>
                        Sign In
                     </Button>
                     <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid item>
                           Don’t have an account?{' '}
                           <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign up</Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Paper>
         </Container>
      </>
   );
};

export default Login;
