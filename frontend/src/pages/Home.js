import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom'
import SignInModal from '../components/SignInModal'
function Home() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    return (
        <div>
            <div className="jumbotron jumbotron-fluid mb-3">
                <div className="container text-center">
                    <h1 className="display-7 text-light hero-text" >Book the perfect place today</h1>
                    <Button onClick={() => navigate('/search')} variant='dark' className='text-center mt-3'>Book now</Button>
                </div>
            </div>
            <Container>
                <Row className='mb-3'>
                    <Col className='mb-3'>
                        <h1>What do you feel like exploring?</h1>
                        <p>
                            Wherever you want to stay, Enigma Hotels
                            has got a place for you. From everyday essential travel to luxury escapes and budget-wise staycations,
                            find an ever-growing collection of welcoming experiences.
                        </p>
                        <p>
                            Whenever and wherever you travel, we're here for you.
                            Use our explore tool to browse and discover our many hotels and resorts around the world
                            or search by key destination.
                        </p>
                        <Button onClick={() => navigate('/search/')} variant='dark'>Explore</Button>
                    </Col>
                    <Col>
                        <Image src='/imgs/home1.jpg' className='home1-image' />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <Image src='/imgs/home2.jpg' className='home2-image' />
                    </Col>
                    <Col>
                        <h1>Reap the benefits by being a rewards member</h1>
                        <p>
                            As a rewards member, you get access to our
                            rewards and customer loyalty program where you
                            can apply discounts to reservations you make.
                        </p>
                        <p>
                            Wherever you go, however you stay, make it rewarding with Enigma Hotel Rewards.
                            Get started by creating an account today!
                        </p>
                        <Button variant='dark' onClick={() => setShow(true)}>Sign up</Button>
                    </Col>
                </Row>
            </Container>
            <SignInModal show={show} handleClose={() => setShow(false)} />
        </div>
    )
}

export default Home