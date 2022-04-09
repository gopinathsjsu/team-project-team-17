import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
function BookRoom() {
    return (
        <Container className='mt-3 mb-3'>
            <Row>
                <Col lg={9}>
                    <Card>
                        <Card.Header>Single room at International New York Times Square</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <Image src="/imgs/home2.jpg" className='book-image'/>
                                </Col>
                                <Col lg={6}>
                                    <Card.Text>Location: New York City, New York</Card.Text>
                                    <Card.Text>Date of stay: 12/29/2022 to 12/31/2022</Card.Text>
                                    <Card.Text>Number of guests: 2</Card.Text>
                                    <Form.Check label='Apply rewards balance: $4.99' type='checkbox' />
                                </Col>
                                <Col lg={2}>
                                    <h3 style={{marginTop: '100%'}}>$134.99</h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Accordion>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Optional amenities</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Check 
                                    label='Daily continental breakfast'
                                    type='checkbox'/>
                                    <Form.Check 
                                    label='Access to fitness room'
                                    type='checkbox'/>
                                    <Form.Check 
                                    label='Access to swimming pool/jacuzzi'
                                    type='checkbox'/>
                                    <Form.Check 
                                    label='Daily parking'
                                    type='checkbox'/>
                                    <Form.Check 
                                    label='All meals included (breakfast, lunch, dinner)'
                                    type='checkbox'/>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col lg={3}>
                    <h3>Charges and fees</h3>
                    <hr />
                    <h6>Room and guests</h6>
                    <p>Single room <span style={{float: 'right'}}>$134.99</span></p>
                    <p>2 guests <span style={{float: 'right'}}>$39.99</span></p>
                    <h6>Optional amenities</h6>
                    <p>Daily continental breakfast <span style={{float: 'right'}}>$9.99</span></p>
                    <p>Fitness room <span style={{float: 'right'}}>$12.99</span></p>
                    <p>All meals <span style={{float: 'right'}}>$19.99</span></p>  
                    <h6 >Booking date</h6>
                    <p>Weekend <span style={{float: 'right'}}>$9.99</span></p>
                    <p>Holiday <span style={{float: 'right'}}>$19.99</span></p>
                    <h6>Discounts</h6>
                    <p>Customer loyalty <span style={{float: 'right'}}>-$9.99</span></p>
                    <p>Rewards <span style={{float: 'right'}}>-$4.99</span></p>
                    <h3>Total <span style={{float: 'right'}}>$199.99</span></h3>
                    <Button variant='dark' className='book-room-button'>Book room</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default BookRoom