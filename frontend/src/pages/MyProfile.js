import React, { useEffect, useState, useRef } from 'react'
import Container from 'react-bootstrap/container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import API_URL from '../apiConfig'
import MyToast from '../components/MyToast'

const MyProfile = () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id
    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)
    const [toastText, setToastText] = useState('')
    const emailInput = useRef(null)
    const nameInput = useRef(null)

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        axios.get(`${API_URL}/api/${userID}`)
            .then(res => {
                setUser(res.data.user)
                setName(res.data.user.name)
                setEmail(res.data.user.email)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = () => {
        axios.put(`${API_URL}/api/updateInfo/${userID}`, {
            name: nameInput.current.value,
            email: emailInput.current.value
        })
            .then(res => {
                getUserInfo()
                setShow(true)
                setToastText('User info saved')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Container className='profile-container mt-3 mb-3'>
                <h2 className='text-center'>My profile</h2>
                {user && <Form className='add-hotel-form'>
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
                            <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} ref={nameInput} />
                        </Col>
                    </Row>
                    <hr />
                    <Row xs='auto'>
                        <Col style={{ marginLeft: '40px' }}>
                            <p >Email</p>
                        </Col>
                        <Col className='w-75'>
                            <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailInput} />
                        </Col>
                    </Row>
                    <hr />
                    <Button variant='dark' className='w-100' onClick={handleSubmit}>Apply changes</Button>
                </Form>}
            </Container>
            <MyToast show={show} handleClose={() => setShow(false)} text={toastText}/>
        </div>
    )
}

export default MyProfile