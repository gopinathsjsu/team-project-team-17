import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Carousel from 'react-bootstrap/Carousel'

function Hotel() {
   /* const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(tomorrow)*/

    const [showDates, setShowDates] = useState(false)

    const hotel = {
        id: 1,
        name: "International New York Times Square",
        location: "123 Wall Street",
        pictures: [
            "/imgs/home2.jpg",
            "/imgs/hero.jpg",
            "/imgs/home1.jpg"
        ],
        description: "Short description",
        price: 150
    }

    return (
        <Container className='mt-5' style={{ width: '60rem', minHeight: '100vh' }}>
            <Row>
                <Col className='me-5'>
                    <Carousel>
                        <Carousel.Item>
                            <Image src={hotel.pictures[0]} className="d-block w-100"></Image>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={hotel.pictures[1]} className="d-block w-100"></Image>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={hotel.pictures[2]} className="d-block w-100"></Image>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col >
                    <h1 style={{ fontFamily: 'Times New Roman' }}>{hotel.name}</h1>
                    <p className='mb-1'>{hotel.location}</p>
                    <p>From <strong style={{fontSize: "50px"}}>{hotel.price} </strong><strong>USD</strong></p>
                    <Button variant='dark' className='mb-3' onClick={() => setShowDates(!showDates)}>Date of stay: </Button>
                    <div style={{ display: showDates ? 'block' : 'none' }}>
                        <Calendar selectRange={true} />
                    </div>
                    <Dropdown >
                        <Dropdown.Toggle variant="none" className='guest-select mt-3'>
                            Number of guests: 0
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '100%' }}>
                            <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant='dark' size='lg'
                        className='mt-3 add-button' >Select room</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Hotel