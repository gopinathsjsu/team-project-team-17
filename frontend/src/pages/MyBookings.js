import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API_URL from '../apiConfig'
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const MyBookings = () => {
    const { user_id } = useParams()
    const [bookings, setBookings] = useState([])
    const [show, setShow] = useState(false)
    const [cancel, setCancel] = useState({})

    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = () => {
        axios.get(`${API_URL}/booking/${user_id}`)
            .then(res => {
                console.log(res.data.bookings)
                setBookings(res.data.bookings)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCancel = (booking) => {
        setCancel(booking)
        setShow(true)
    }

    const handleCancelConfirm = () => {
        console.log(cancel)

        axios.delete(`${API_URL}/booking/${cancel._id}`)
        .then(res => {
            setShow(false)
            setCancel({})
            getBookings()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Container className='mt-5'>
                {bookings.map(booking => (
                    <Card className='mb-3'>
                        <Card.Header>
                            <Row >
                                <Col>
                                    <p className='mb-0'>{booking.room} at {booking.hotel.name}</p>
                                </Col>
                                <Col>
                                    <div style={{ textAlign: 'right' }}>
                                        <p className='mb-0'>
                                            {new Date(booking.startDate).toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" }) + ' '}
                                            to {' ' + new Date(booking.endDate).toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" })}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <Image
                                        src={`${API_URL}/${booking.hotel.mainImg}`}
                                        className="search-pic"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <Card.Text>Location: {booking.hotel.location}</Card.Text>
                                    <Card.Text>Number of guests: {booking.numGuests}</Card.Text>
                                    <Card.Text>Rewards used: {booking.rewards && booking.rewards.amount} points</Card.Text>
                                    <Card.Text className='mb-0'>Amenities: </Card.Text>
                                    {booking.amenities.map(amenity => (
                                        <Card.Text className='ms-3 mb-0'>{amenity}</Card.Text>
                                    ))}
                                </Col>
                                <Col lg={2}>
                                    <h3 >
                                        ${booking.total.toFixed(2)}
                                    </h3>
                                    <Button variant='dark' style={{ marginTop: '100%' }}
                                    onClick={() => handleCancel(booking)}>Cancel booking</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel the booking of 
                    <strong>{' ' + cancel.room} at {cancel.hotel && cancel.hotel.name}?</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={handleCancelConfirm}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyBookings