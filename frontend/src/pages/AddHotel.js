import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import API_URL from "../apiConfig";
import { useNavigate } from 'react-router-dom'

const AddHotel = () => {
    const [mainImgPrev, setMainImgPrev] = useState(null)
    const [singleImgPrev, setSingleImgPrev] = useState(null)
    const [doubleImgPrev, setDoubleImgPrev] = useState(null)
    const [suiteImgPrev, setSuiteImgPrev] = useState(null)
    const [mainImgUpload, setMainImgUpload] = useState(null)
    const [singleImgUpload, setSingleImgUpload] = useState(null)
    const [doubleImgUpload, setDoubleImgUpload] = useState(null)
    const [suiteImgUpload, setSuiteImgUpload] = useState(null)
    const [roomType, setRoomType] = useState('')
    const hiddenFileInput = useRef(null)

    const nameInput = useRef(null)
    const locationInput = useRef(null)
    const descInput = useRef(null)
    const singlePrice = useRef(null)
    const singleQuantity = useRef(null)
    const doublePrice = useRef(null)
    const doubleQuantity = useRef(null)
    const suitePrice = useRef(null)
    const suiteQuantity = useRef(null)

    const breakfast = useRef(null)
    const fitness = useRef(null)
    const pool = useRef(null)
    const parking = useRef(null)
    const allMeals = useRef(null)

    const navigate = useNavigate()

    const handlePicUpload = (e) => {
        const image = e.target.files[0]
        const imgURL = URL.createObjectURL(image)

        if (roomType === 'Main') {
            setMainImgPrev(imgURL)
            setMainImgUpload(image)
        }
        else if (roomType === 'Single') {
            setSingleImgPrev(imgURL)
            setSingleImgUpload(image)
        }
        else if (roomType === 'Double') {
            setDoubleImgPrev(imgURL)
            setDoubleImgUpload(image)
        }
        else if (roomType === 'Suite') {
            setSuiteImgPrev(imgURL)
            setSuiteImgUpload(image)
        }
    }

    const handleOpenFile = (room) => {
        setRoomType(room)
        hiddenFileInput.current.click()
    }

    const handleSubmit = () => {
        const formData = new FormData()

        formData.append('mainImg', mainImgUpload)
        formData.append('singleImg', singleImgUpload)
        formData.append('doubleImg', doubleImgUpload)
        formData.append('suiteImg', suiteImgUpload)
        formData.append('name', nameInput.current.value)
        formData.append('location', locationInput.current.value)
        formData.append('description', descInput.current.value)
        formData.append('singlePrice', singlePrice.current.value)
        formData.append('singleQuantity', singleQuantity.current.value)
        formData.append('doublePrice', doublePrice.current.value)
        formData.append('doubleQuantity', doubleQuantity.current.value)
        formData.append('suitePrice', suitePrice.current.value)
        formData.append('suiteQuantity', suiteQuantity.current.value)
        formData.append('breakfast', breakfast.current.value)
        formData.append('fitness', fitness.current.value)
        formData.append('pool', pool.current.value)
        formData.append('parking', parking.current.value)
        formData.append('allMeals', allMeals.current.value)

        axios.post(`${API_URL}/hotel/add`, formData)
        .then(res => {
            navigate(`/hotel/${res.data.hotel._id}`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container className='add-hotel-container mt-3 mb-3'>
            <h2 className='text-center'>Add Hotel</h2>
            <Form className='add-hotel-form'>
                <Row>
                    <Col md={3}>
                        <Image src={mainImgPrev} className='add-hotel-img' onClick={() => handleOpenFile('Main')}/>
                    </Col>
                    <Col md={9}>
                        <Form.Control type='text' placeholder='Name' className='mb-3' ref={nameInput}/>
                        <Form.Control type='text' placeholder='Location' className='mb-3' ref={locationInput}/>
                        <Form.Control type='text' placeholder='Description' className='mb-3' ref={descInput}/>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <Image src={singleImgPrev} className='add-hotel-img' onClick={() => handleOpenFile('Single')}/>
                    </Col>
                    <Col md={9}>
                        <h5 className='mb-3'>Single room</h5>
                        <Form.Control type='text' placeholder='Price' className='mb-3' ref={singlePrice}/>
                        <Form.Control type='text' placeholder='Quantity' className='mb-3' ref={singleQuantity}/>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <Image src={doubleImgPrev} className='add-hotel-img' onClick={() => handleOpenFile('Double')}/>
                    </Col>
                    <Col md={9}>
                        <h5 className='mb-3'>Double room</h5>
                        <Form.Control type='text' placeholder='Price' className='mb-3' ref={doublePrice}/>
                        <Form.Control type='text' placeholder='Quantity' className='mb-3' ref={doubleQuantity}/>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={3}>
                        <Image src={suiteImgPrev} className='add-hotel-img' onClick={() => handleOpenFile('Suite')}/>
                    </Col>
                    <Col md={9}>
                        <h5 className='mb-3'>Suite</h5>
                        <Form.Control type='text' placeholder='Price' className='mb-3' ref={suitePrice}/>
                        <Form.Control type='text' placeholder='Quantity' className='mb-3' ref={suiteQuantity}/>
                    </Col>
                </Row>
                <hr />
                <h5>Optional amenities prices</h5>
                <Form.Control type='text' placeholder='Daily continental breakfast' className='mb-3' ref={breakfast}/>
                <Form.Control type='text' placeholder='Access to fitness room' className='mb-3' ref={fitness}/>
                <Form.Control type='text' placeholder='Access to swimming pool' className='mb-3' ref={pool}/>
                <Form.Control type='text' placeholder='Daily parking' className='mb-3' ref={parking}/>
                <Form.Control type='text' placeholder='All meals included' className='mb-3' ref={allMeals}/>
            </Form>
            <Button className='mt-3 mb-3 float-end w-100' variant='dark' onClick={handleSubmit}>Submit</Button>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handlePicUpload}
                style={{ display: 'none' }}
            />
        </Container>
    )
}

export default AddHotel