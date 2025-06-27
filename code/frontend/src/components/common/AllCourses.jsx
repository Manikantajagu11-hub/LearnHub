import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from './AxiosInstance';
import { Button, Modal, Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const AllCourses = () => {
   const navigate = useNavigate();
   const user = useContext(UserContext);
   const [allCourses, setAllCourses] = useState([]);
   const [filterTitle, setFilterTitle] = useState('');
   const [filterType, setFilterType] = useState('');
   const [showModal, setShowModal] = useState(Array(allCourses.length).fill(false));
   const [cardDetails, setCardDetails] = useState({
      cardholdername: '',
      cardnumber: '',
      cvvcode: '',
      expmonthyear: '',
   });

   const handleChange = (e) => {
      setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
   };

   const handleShow = (courseIndex, coursePrice, courseId, courseTitle) => {
      if (coursePrice === 'free') {
         handleSubmit(courseId);
         return navigate(`/courseSection/${courseId}/${courseTitle}`);
      } else {
         const updatedShowModal = [...showModal];
         updatedShowModal[courseIndex] = true;
         setShowModal(updatedShowModal);
      }
   };

   const handleClose = (courseIndex) => {
      const updatedShowModal = [...showModal];
      updatedShowModal[courseIndex] = false;
      setShowModal(updatedShowModal);
   };

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcourses`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            setAllCourses(res.data.data);
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   useEffect(() => {
      getAllCoursesUser();
   }, []);

   const isPaidCourse = (course) => {
      return /\d/.test(course.C_price);
   };

   const handleSubmit = async (courseId) => {
      try {
         const res = await axiosInstance.post(`api/user/enrolledcourse/${courseId}`, cardDetails, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         } else {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   return (
      <>
         <div className="mt-4 filter-container text-center">
            <p className="mt-3">Search By:</p>
            <input
               type="text"
               placeholder="Title"
               value={filterTitle}
               onChange={(e) => setFilterTitle(e.target.value)}
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
               <option value="">All Courses</option>
               <option value="Paid">Paid</option>
               <option value="Free">Free</option>
            </select>
         </div>

         <div className="course-container">
            {allCourses?.length > 0 ? (
               allCourses
                  .filter(
                     (course) =>
                        filterTitle === '' ||
                        course.C_title?.toLowerCase().includes(filterTitle.toLowerCase())
                  )
                  .filter((course) => {
                     if (filterType === 'Free') return !isPaidCourse(course);
                     if (filterType === 'Paid') return isPaidCourse(course);
                     return true;
                  })
                  .map((course, index) => (
                     <div key={course._id} className="dashboard-card">
                        <div className="card-accent-bar"></div>
                        <div className="card-body">
                           <h5>{course.C_title}</h5>
                           <p><strong>Educator:</strong> {course.C_educator}</p>
                           <p><strong>Category:</strong> {course.C_categories}</p>
                           <p><strong>Price:</strong> {course.C_price}</p>
                           <p><strong>Sections:</strong> {course.sections.length}</p>
                           <p><strong>Enrolled:</strong> {course.enrolled}</p>

                           <div className="module-preview">
                              <p><strong>Preview Modules:</strong></p>
                              {course.sections.length > 0 ? (
                                 <ul>
                                    {course.sections.slice(0, 2).map((section, i) => (
                                       <li key={i}><strong>{section.S_title}:</strong> {section.S_description}</li>
                                    ))}
                                 </ul>
                              ) : <p>No Modules</p>}
                           </div>

                           <div className="card-actions">
                              {user.userLoggedIn ? (
                                 <>
                                    <Button className="start-course-btn" onClick={() => handleShow(index, course.C_price, course._id, course.C_title)}>
                                       Start Course
                                    </Button>
                                    <Modal show={showModal[index]} onHide={() => handleClose(index)}>
                                       <Modal.Header closeButton>
                                          <Modal.Title>Payment for {course.C_title}</Modal.Title>
                                       </Modal.Header>
                                       <Modal.Body>
                                          <Form onSubmit={(e) => {
                                             e.preventDefault();
                                             handleSubmit(course._id);
                                          }}>
                                             <MDBInput className="mb-2" label="Card Holder Name" name="cardholdername" value={cardDetails.cardholdername} onChange={handleChange} required />
                                             <MDBInput className="mb-2" label="Card Number" name="cardnumber" type="number" value={cardDetails.cardnumber} onChange={handleChange} required />
                                             <MDBRow>
                                                <MDBCol md="6">
                                                   <MDBInput className="mb-2" label="Expiration" name="expmonthyear" value={cardDetails.expmonthyear} onChange={handleChange} required />
                                                </MDBCol>
                                                <MDBCol md="6">
                                                   <MDBInput className="mb-2" label="CVV" name="cvvcode" type="number" value={cardDetails.cvvcode} onChange={handleChange} required />
                                                </MDBCol>
                                             </MDBRow>
                                             <div className="d-flex justify-content-end mt-3">
                                                <Button variant="secondary" onClick={() => handleClose(index)}>Close</Button>
                                                <Button className="mx-2" type="submit">Pay Now</Button>
                                             </div>
                                          </Form>
                                       </Modal.Body>
                                    </Modal>
                                 </>
                              ) : (
                                 <Link to="/login"><Button className="start-course-btn">Start Course</Button></Link>
                              )}
                           </div>
                        </div>
                     </div>
                  ))
            ) : (
               <p>No courses at the moment</p>
            )}
         </div>
      </>
   );
};

export default AllCourses;
