import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function SelectRoom() {
    const navigate = useNavigate()
    return (
        <Container className='text-center'>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }} className='mt-3'>
                        <Card.Img variant='top' src="/imgs/home1.jpg" />
                        <Card.Body>
                            <Card.Title>Single room</Card.Title>
                            <Card.Text>Supporting text</Card.Text>
                            <Button onClick={() => navigate('/bookroom')} variant='dark' className='book-room-button'>Book room</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }} className='mt-3'>
                        <Card.Img variant='top' src="/imgs/home1.jpg" />
                        <Card.Body>
                            <Card.Title>Double room</Card.Title>
                            <Card.Text>Supporting text</Card.Text>
                            <Button onClick={() => navigate('/bookroom')} variant='dark' className='book-room-button'>Book room</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }} className='mt-3'>
                        <Card.Img variant='top' src="/imgs/home1.jpg" />
                        <Card.Body>
                            <Card.Title>Suite</Card.Title>
                            <Card.Text>Supporting text</Card.Text>
                            <Button onClick={() => navigate('/bookroom')} variant='dark' className='book-room-button'>Book room</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SelectRoom