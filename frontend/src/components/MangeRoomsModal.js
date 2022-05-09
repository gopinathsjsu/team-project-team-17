import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Image from 'react-bootstrap/Image'
import API_URL from '../apiConfig'
import axios from 'axios'

const ManageRoomsModal = ({ show, handleClose, rooms, id }) => {
    const [singlePrice, setSinglePrice] = useState(0)
    const [singleQuantity, setSingleQuantity] = useState(0)
    const [doublePrice, setDoublePrice] = useState(0)
    const [doubleQuantity, setDoubleQuantity] = useState(0)
    const [suitePrice, setSuitePrice] = useState(0)
    const [suiteQuantity, setSuiteQuantity] = useState(0)

    useEffect(() => {
        if (rooms) {
            setSinglePrice(rooms[0].price)
            setSingleQuantity(rooms[0].quantity)
            setDoublePrice(rooms[1].price)
            setDoubleQuantity(rooms[1].quantity)
            setSuitePrice(rooms[2].price)
            setSuiteQuantity(rooms[2].quantity)
        }
    }, [rooms])

    const handleSubmit = () => {
        axios.put(`${API_URL}/hotel/updateRooms/${id}`, {
            rooms: [
                {
                    name: 'Single room',
                    price: singlePrice,
                    quantity: singleQuantity,
                    roomImg: rooms[0].roomImg
                },
                {
                    name: 'Double room',
                    price: doublePrice,
                    quantity: doubleQuantity,
                    roomImg: rooms[1].roomImg
                },
                {
                    name: 'Suite',
                    price: suitePrice,
                    quantity: suiteQuantity,
                    roomImg: rooms[2].roomImg
                }
            ]
        })
        .then(res => {
            alert('Room info updated')
            handleClose()

        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Manage rooms</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {rooms && <Form>
                    <Row>
                        <Col md={4}>
                            <Image src={`${API_URL}/${rooms[0].roomImg}`} className='add-hotel-img' />
                        </Col>
                        <Col md={8}>
                            <h5 className='mb-3'>Single room</h5>
                            <Form.Label >Price</Form.Label>
                            <Form.Control type='text' placeholder='Price' className='mb-3' 
                            onChange={(e) => setSinglePrice(e.target.value)}
                            value={singlePrice}/>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' 
                            onChange={(e) => setSingleQuantity(e.target.value)}
                            value={singleQuantity}/>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}>
                            <Image src={`${API_URL}/${rooms[1].roomImg}`} className='add-hotel-img' />
                        </Col>
                        <Col md={8}>
                            <h5 className='mb-3'>Double room</h5>
                            <Form.Label >Price</Form.Label>
                            <Form.Control type='text' placeholder='Price' className='mb-3' 
                            onChange={(e) => setDoublePrice(e.target.value)}
                            value={doublePrice}/>
                            <Form.Label >Quantity</Form.Label>
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' 
                            onChange={(e) => setDoubleQuantity(e.target.value)}
                            value={doubleQuantity}/>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}>
                            <Image src={`${API_URL}/${rooms[2].roomImg}`} className='add-hotel-img' />
                        </Col>
                        <Col md={8}>
                            <h5 className='mb-3'>Suite</h5>
                            <Form.Label >Price</Form.Label>
                            <Form.Control type='text' placeholder='Price' className='mb-3' 
                            onChange={(e) => setSuitePrice(e.target.value)}
                            value={suitePrice}/>
                            <Form.Label >Quantity</Form.Label>
                            <Form.Control type='text' placeholder='Quantity' className='mb-3' 
                            onChange={(e) => setSuiteQuantity(e.target.value)}
                            value={suiteQuantity}/>
                        </Col>
                    </Row>
                </Form>}
                <hr />
                <Button className='mt-3 mb-3 float-end w-100' variant='dark' onClick={handleSubmit}>Submit</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ManageRoomsModal