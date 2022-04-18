import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../apiConfig'

function Search() {
    const navigate = useNavigate()
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/hotel`)
        .then(res => {
            setHotels(res.data.hotels)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Container className='mt-5'>
            {hotels.map(hotel => (
                <Card className='mb-3'>
                <Row>
                    <Col md={4}>
                        <Image src={`${API_URL}/${hotel.mainImg}`} className='search-pic'/>
                    </Col>
                    <Col md={8} className='mt-3 col-border' >
                        <h4>{hotel.name}</h4>
                        <p>{hotel.location}</p>
                        <p className='mt-4' style={{fontSize: "14px"}}>{hotel.description}</p>
                    </Col>
                </Row>
                <hr className='mt-0'/>
                <Row >
                    <Col md={{span: 3, offset: 6}}>
                        <p>From <strong style={{fontSize: "30px"}}>{hotel.rooms[0].price} </strong><strong>USD</strong></p>
                    </Col>
                    <Col md={3}>
                        <Button variant='dark' onClick={() => navigate(`/hotel/${hotel._id}`)}>SELECT HOTEL</Button>
                    </Col>
                </Row>
            </Card>
            ))}
        </Container>
    )
}

export default Search