import React from 'react'
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const MyProfile = () => {
    return (
        <Container className='profile-container mt-3 mb-3'>
            <h2 className='text-center'>My profile</h2>
            <Form className='add-hotel-form'>
                <Row className='text-center'>
                    <strong>My name</strong>
                    <strong>Member since May 7, 2022</strong>
                    <strong>Reward points: 500 points</strong>
                </Row>
                <hr />
                <Row xs='auto' >
                    <Col>
                        <p >Your name</p>
                    </Col>
                    <Col className='w-75'>
                        <Form.Control type='text' />
                    </Col>
                </Row>
                <hr />
                <Row xs='auto'>
                    <Col style={{marginLeft: '40px'}}>
                        <p >Email</p>
                    </Col>
                    <Col className='w-75'>
                        <Form.Control type='text' />
                    </Col>
                </Row>
                <hr />
                <Button variant='dark' className='w-100'>Apply changes</Button>
            </Form>
        </Container>
    )
}

export default MyProfile