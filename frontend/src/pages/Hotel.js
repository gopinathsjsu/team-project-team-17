import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { differenceInDays } from 'date-fns'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

function Hotel() {
    const navigate = useNavigate()
    const { hotel_id } = useParams()

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showDates, setShowDates] = useState(false)
    const [hotel, setHotel] = useState([])
    const [guests, setGuests] = useState(1)
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        const today = new Date()
        const tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)

        setStartDate(today)
        setEndDate(tomorrow)

        axios.get(`http://localhost:8000/hotel/${hotel_id}`)
            .then(res => {
                console.log(res.data.hotel.rooms)
                setHotel(res.data.hotel)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleCalendar = (value, event) => {
        setStartDate(value[0])
        setEndDate(value[1])
    }

    const handleSubmit = () => {
        if (differenceInDays(endDate, startDate) > 7) {
            setShowToast(true)
        }
        else {
            navigate('/selectroom')
        }
    }


    return (
        <Container className='mt-5' style={{ width: '60rem', minHeight: '100vh' }}>
            <Row>
                <Col className='me-5'>
                    {hotel.rooms && (<Carousel >
                        <Carousel.Item>
                            <Image src={`http://localhost:8000/${hotel.mainImg}`} className="d-block w-100"></Image>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={`http://localhost:8000/${hotel.rooms[0].roomImg}`} className="d-block w-100"></Image>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={`http://localhost:8000/${hotel.rooms[1].roomImg}`} className="d-block w-100"></Image>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={`http://localhost:8000/${hotel.rooms[2].roomImg}`} className="d-block w-100"></Image>
                        </Carousel.Item>
                    </Carousel>)}
                </Col>
                <Col >
                    <h1 style={{ fontFamily: 'Times New Roman' }}>{hotel.name}</h1>
                    <p className='mb-1'>{hotel.location}</p>
                    {hotel.rooms && <p>From <strong style={{ fontSize: "50px" }}>{hotel.rooms[0].price} </strong><strong>USD</strong></p>}
                    <Button variant='dark' className='mb-3' onClick={() => setShowDates(!showDates)}>Date of stay: {
                        startDate.toLocaleDateString('en-US')
                    } to {endDate.toLocaleDateString('en-US')}</Button>
                    <div style={{ display: showDates ? 'block' : 'none' }}>
                        <Calendar selectRange={true} 
                        defaultValue={[startDate, endDate]} onChange={handleCalendar}
                        minDate={new Date()}/>
                    </div>
                    <Dropdown onSelect={(e) => setGuests(e)}>
                        <Dropdown.Toggle variant="none" className='guest-select mt-3'>
                            Number of guests: {guests}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '100%' }}>
                            <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                            <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                            <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                            <Dropdown.Item eventKey={4}>4</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant='dark' size='lg'
                        className='mt-3 add-button'
                        onClick={handleSubmit} >Select room</Button>
                </Col>
            </Row>
            <ToastContainer position='bottom-center' className='position-fixed text-center'>
            <Toast show={showToast} onClose={() => setShowToast(false)} 
            autohide delay={3000} className='date-toast'>
                <Toast.Body>
                    You can only book rooms for up to 1 week
                </Toast.Body>
            </Toast>
        </ToastContainer>
        </Container>
    )
}

export default Hotel