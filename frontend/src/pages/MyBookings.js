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
import Dropdown from 'react-bootstrap/Dropdown'

const MyBookings = () => {
    const { user_id } = useParams()
    const [bookings, setBookings] = useState([])
    const [showCancel, setShowCancel] = useState(false)
    const [cancel, setCancel] = useState({})
    const [rooms, setRooms] = useState([{}])
    const [showEdit, setShowEdit] = useState(false)
    const [editBooking, setEditBooking] = useState({})
    const [newRoom, setNewRoom] = useState('')
    const [newPrice, setNewPrice] = useState(0)
    const [guests, setGuests] = useState(1)

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
        setShowCancel(true)
    }

    const handleCancelConfirm = () => {
        console.log(cancel)

        axios.delete(`${API_URL}/booking/${cancel._id}`)
            .then(res => {
                setShowCancel(false)
                setCancel({})
                getBookings()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleEdit = (booking) => {
        axios.get(`${API_URL}/hotel/${booking.hotel._id}`)
            .then(res => {
                setEditBooking(booking)
                setGuests(booking.numGuests)
                setNewRoom(booking.room)
                setRooms(res.data.hotel.rooms)
                setNewPrice(booking.total)
            })
            .catch(err => {
                console.log(err)
            })

        setShowEdit(true)
    }

    const handleGuests = (e) => {
        setGuests(e)

        setNewPrice(getNewPrice(e, newRoom))
    }

    const handleNewRoom = (room) => {
        setNewRoom(room.name)
        
        setNewPrice(getNewPrice(guests, room.name))
    }

    const getNewPrice = (guestsArg, roomArg) => {
        let price = editBooking.total

        price = price - (editBooking.numGuests * 10) + (10 * guestsArg)

        const oldRoom = rooms.find(r => r.name === editBooking.room)
        const foundRoom = rooms.find(r => r.name === roomArg)

        price = price - (oldRoom.price) + foundRoom.price

        return price
    }

    const handleEditSubmit = () => {
        axios.put(`${API_URL}/booking/${editBooking._id}`, {
            room: newRoom,
            numGuests: guests,
            total: newPrice
        })
        .then(res => {
            setShowEdit(false)
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
                                    <div style={{ marginTop: '60%', textAlign: 'right' }}>
                                        <Button variant='dark' className='mb-2' onClick={() => handleEdit(booking)}>Edit booking</Button>
                                        <Button variant='dark'
                                            onClick={() => handleCancel(booking)}>Cancel booking</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            <Modal show={showCancel} onHide={() => setShowCancel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel the booking of
                    <strong>{' ' + cancel.room} at {cancel.hotel && cancel.hotel.name}?</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={handleCancelConfirm}>Cancel booking</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEdit} onHide={() => setShowEdit(false)} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Row className='ms-5'>
                        {rooms.map(room => (
                            <Col>
                                <Card style={{ width: '18rem' }} className='mt-3'>
                                    <Card.Img variant='top' src={`${API_URL}/${room.roomImg}`} />
                                    <Card.Body>
                                        <Card.Title>{room.name}</Card.Title>
                                        <Card.Text>
                                            {room.name === 'Single room' ? '1-2 guests' : '1-4 guests'}
                                        </Card.Text>
                                        <Card.Text>
                                            {room.quantity} rooms left
                                        </Card.Text>
                                        <Card.Text>
                                            <p>From <strong style={{ fontSize: "30px" }}>{room.price} </strong><strong>USD</strong></p>
                                        </Card.Text>
                                        <Button variant='dark' className='book-room-button' onClick={() => handleNewRoom(room)}>Select room</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Dropdown onSelect={(e) => handleGuests(e)}>
                        <Dropdown.Toggle variant="none" className="guest-select mt-3 w-50">
                            Number of guests: {guests}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: "50%" }}>
                            <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                            <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                            <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                            <Dropdown.Item eventKey={4}>4</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <h6>{newRoom} for {guests} guests, ${editBooking.total && editBooking.total.toFixed(2)} -> ${newPrice.toFixed(2)}</h6>
                    <Button variant='dark' onClick={handleEditSubmit}>Edit booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyBookings