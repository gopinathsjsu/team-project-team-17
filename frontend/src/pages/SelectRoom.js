import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import API_URL from '../apiConfig'
import { selectRoom } from '../actions'

function SelectRoom() {
    const hotelID = useSelector(state => state.hotelID)
    const numGuests = useSelector(state => state.numGuests)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/hotel/rooms/${hotelID}`)
            .then(res => {
                setRooms(res.data.rooms)
            })
            .catch(err => {
                console.log(err.response.data.errorMsg)
            })
    }, [])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSubmit = (roomID) => {
        const room = rooms.find(room => room._id === roomID)
        dispatch(selectRoom({
            name: room.name,
            price: room.price
        }))
        navigate('/bookroom')
    }

    return (
        <Container className='text-center'>
            <Row>
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
                                <p>From <strong style={{ fontSize: "30px" }}>{room.price} </strong><strong>USD</strong></p>
                                </Card.Text>
                                <Button onClick={() => handleSubmit(room._id)} variant='dark' 
                                className='book-room-button'
                                disabled={room.name === 'Single room' && numGuests > 2}>Book room</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SelectRoom