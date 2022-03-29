import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
function Search() {
    const hotels = [
        {
            name: "International New York Times Square",
            location: "123 Wall Street",
            picture: "../../imgs/home2.jpg",
            description: "Short description",
            price: 150
        },
        {
            name: "International New York Times Square",
            location: "123 Wall Street",
            picture: "../../imgs/hero.jpg",
            description: "Short description",
            price: 150
        },
        {
            name: "International New York Times Square",
            location: "123 Wall Street",
            picture: "../../imgs/home1.jpg",
            description: "Short description",
            price: 150
        }
    ]

    return (
        <Container className='mt-5'>
            {hotels.map(hotel => (
                <Card className='mb-3'>
                <Row>
                    <Col md={4}>
                        <Image src={hotel.picture} className='search-pic'/>
                    </Col>
                    <Col md={8} className='mt-3 col-border' >
                        <h4>{hotel.name}</h4>
                        <p>{hotel.location}</p>
                        <p className='mt-4' style={{fontSize: "14px"}}>{hotel.description}</p>
                    </Col>
                </Row>
                <hr className='mt-0'/>
                <Row >
                    <Col md={{span: 3, offset: 6}}>
                        <p>From <strong style={{fontSize: "30px"}}>{hotel.price} </strong><strong>USD</strong></p>
                    </Col>
                    <Col md={3}>
                        <Button variant='dark'>SELECT HOTEL</Button>
                    </Col>
                </Row>
            </Card>
            ))}
        </Container>
    )
}

export default Search