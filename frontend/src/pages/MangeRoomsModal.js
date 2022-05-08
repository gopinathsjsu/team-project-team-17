import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Image from 'react-bootstrap/Image'

const ManageRoomsModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Manage rooms</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                    <Col md={3}>
                        <Image src='/imgs/home1.jpg' className='add-hotel-img' />
                    </Col>
                        <Col md={9}>
                            <h5 className='mb-3'>Single room</h5>
                            <Form.Control type='text' placeholder='Price' className='mb-3' />
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                    <Col md={3}>
                        <Image src='/imgs/home1.jpg' className='add-hotel-img' />
                    </Col>
                        <Col md={9}>
                            <h5 className='mb-3'>Double room</h5>
                            <Form.Control type='text' placeholder='Price' className='mb-3' />
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                    <Col md={3}>
                        <Image src='/imgs/home1.jpg' className='add-hotel-img' />
                    </Col>
                        <Col md={9}>
                            <h5 className='mb-3'>Suite</h5>
                            <Form.Control type='text' placeholder='Price' className='mb-3' />
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' />
                        </Col>
                    </Row>
                </Form>
                <hr />
                <Button className='mt-3 mb-3 float-end w-100' variant='dark' >Submit</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ManageRoomsModal