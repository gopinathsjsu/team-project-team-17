import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
function Home() {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid mb-3">
                <div className="container text-center">
                    <h1 className="display-7 text-light hero-text" >Book the perfect place today</h1>
                    <Button variant='dark' className='text-center mt-3'>Book now</Button>
                </div>
            </div>
            <Container>
                <Row className='mb-3'>
                    <Col className='mb-3'>
                        <h1>What do you feel like exploring?</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ipsum nunc aliquet bibendum enim facilisis
                            gravida neque convallis.
                        </p>
                        <p>
                            Quisque non tellus orci ac auctor.
                            Faucibus vitae aliquet nec ullamcorper.
                            Suspendisse in est ante in nibh.
                            Sapien et ligula ullamcorper malesuada proin libero.
                            Ut diam quam nulla porttitor massa.
                        </p>
                        <Button variant='dark'>Explore</Button>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ipsum nunc aliquet bibendum enim facilisis
                            gravida neque convallis.
                        </p>
                        <p>
                            Quisque non tellus orci ac auctor.
                            Faucibus vitae aliquet nec ullamcorper.
                            Suspendisse in est ante in nibh.
                            Sapien et ligula ullamcorper malesuada proin libero.
                            Ut diam quam nulla porttitor massa.
                        </p>
                        <Button variant='dark'>Sign up</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home