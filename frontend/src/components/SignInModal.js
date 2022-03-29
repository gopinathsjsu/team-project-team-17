import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'

function SignInModal(props) {
    const signInEmail = useRef(null)
    const signInPassword = useRef(null)

    const registerName = useRef(null)
    const registerEmail = useRef(null)
    const registerPassword = useRef(null)

    const [register, setRegister] = useState(false)

    const handleSignIn = () => {

    }

    const handleRegister = () => {

    }

    return (
        <Modal show={props.show} onHide={props.handleClose} className='modal' title='modal'>
            <Modal.Header closeButton>
                {register ? <Modal.Title >Register</Modal.Title> :
                    <Modal.Title>Sign in</Modal.Title>}
            </Modal.Header>
            <Modal.Body title='form'>
                {register ?
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={registerName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={registerEmail} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={registerPassword} />
                        </Form.Group>
                        <Form.Text className="text-muted" onClick={() => setRegister(false)}>
                            Already have an account? Sign in here
                        </Form.Text>
                        <Button type="button" className='modal-submit mt-3' onClick={handleRegister}>
                            Register
                        </Button>
                    </Form> :
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={signInEmail} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={signInPassword} required />
                        </Form.Group>
                        <Form.Text className="text-muted" onClick={() => setRegister(true)}>
                            Don't have an account? Register here
                        </Form.Text>
                        <Row>
                            <Col>
                                <Button type="button" className='modal-submit mt-3' onClick={handleSignIn}>
                                    Sign in
                                </Button>
                            </Col>
                            <Col>
                                <Button type="button" className='modal-submit mt-3' onClick={handleSignIn}>
                                    Administrative sign in
                                </Button>
                            </Col>
                        </Row>
                    </Form>}
            </Modal.Body>
        </Modal>
    )
}

export default SignInModal