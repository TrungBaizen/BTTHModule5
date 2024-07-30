import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import React from "react";
import {Button, Col, Row} from "react-bootstrap";


function BasicExample() {
    let navigate = useNavigate();
    const searchOrder = (value) => {
        navigate(`/orders/search?startDate=${value.startDate}&endDate=${value.endDate}`)
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className=' container-fluid d-flex justify-content-between align-content-center'>
                <Navbar.Brand href="#home">Codegym Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Formik initialValues={{
                startDate: '',
                endDate:''
            }}
                                           onSubmit={searchOrder}>
                <Form>
                    <Row className="align-items-center">
                        <Col  md={4} style={{width:"170px"}}>
                            <Field name="startDate" type="date" className="form-control" />
                        </Col>
                        <Col  md={4}  style={{width:"170px"}}>
                            <Field name="endDate" type="date" className="form-control" />
                        </Col>
                        <Col  className="d-flex justify-content-end">
                            <Button type="submit" variant="primary">Tìm kiếm</Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
            </Container>

        </Navbar>

    );
}

export default BasicExample;