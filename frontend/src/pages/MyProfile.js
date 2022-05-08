import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import API_URL from '../apiConfig'

const MyProfile = () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`${API_URL}/api/${userID}`)
        .then(res => {
            setUser(res.data.user)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Container className='profile-container mt-3 mb-3'>
            <h2 className='text-center'>My profile</h2>
            <Form className='add-hotel-form'>
                <Row className='text-center'>
                    <strong>{user.name}</strong>
                    <strong>Member since {new Date(user.date).toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" })}</strong>
                    <strong>Reward points: {user.rewards} points</strong>
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