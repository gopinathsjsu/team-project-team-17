import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { AiOutlineSearch } from 'react-icons/ai'
import { LinkContainer } from 'react-router-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import SignInModal from './SignInModal'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function MyNavbar() {
    const [show, setShow] = useState(false)
    let navigate = useNavigate()
    const search = useRef(null)

    const handleSearch = () => {
        navigate(`/search/${search.current.value}`)
    }

    return (
        <div>
            <Navbar className='px-4' bg='dark' variant='dark'>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        Hotels
                    </Navbar.Brand>
                </LinkContainer>

                <div style={{ width: '75%', position: 'relative' }}>
                    <FormControl type='search' className='nav-search'
                        placeholder='Search for hotels and locations' title='search' ref={search}/>
                    <Button className='rounded-circle search-button ms-2'
                        size='sm'
                        onClick={handleSearch} >
                        <AiOutlineSearch size={25} />
                    </Button>
                </div>
                <Nav className='ms-auto' >
                    <Nav.Link onClick={() => setShow(true)}>Sign in</Nav.Link>
                    <Nav.Link onClick={() => navigate('/addhotel')}>Add Hotel</Nav.Link>
                </Nav>
            </Navbar>
            <SignInModal show={show} handleClose={() => setShow(false)} />
        </div>
    )
}

export default MyNavbar