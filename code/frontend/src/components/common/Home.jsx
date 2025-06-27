import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';

const Home = () => {
   return (
      <>
         {/* Navbar */}
         <Navbar expand="lg" style={{ backgroundColor: '#2B2D42' }} variant="dark">
            <Container fluid>
               <Navbar.Brand><h2 className="text-white fw-bold">LearnHub</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto" navbarScroll />
                  <Nav>
                     <Link to={'/'} className="nav-link text-white px-3">Home</Link>
                     <Link to={'/login'} className="nav-link text-white px-3">Login</Link>
                     <Link to={'/register'} className="nav-link text-white px-3">Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Hero Section */}
         <div className="hero-section d-flex justify-content-center align-items-center text-center">
            <div className="hero-text">
               <h1 className="hero-title">LearnHub</h1>
               <p className="hero-subtitle">
                  Small App, Big Dreams. <br />
                  <span className="highlight">Elevate your education. Empower your future.</span>
               </p>
               <Link to="/register">
                  <Button className="hero-btn" size="lg">Explore Courses</Button>
               </Link>
            </div>
         </div>

         {/* Trending Section */}
         <Container className="my-5">
            <h2 className="text-center mb-4" style={{ color: '#2B2D42', fontWeight: '700' }}>
               Trending Courses
            </h2>
            <AllCourses />
         </Container>
      </>
   );
};

export default Home;
