import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../apiConfig";

function BookRoom() {
  const bookInfo = useSelector((state) => state);
  const [hotel, setHotel] = useState({});
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/hotel/${bookInfo.hotelID}`)
      .then((res) => {
        setHotel(res.data.hotel);
      })
      .catch((err) => {
        console.log(err.response.data.errorMsg);
      });
  }, []);

  const handleAmenity = (e) => {
    const amenity = hotel.amenities.find(
      (amenity) => amenity._id === e.target.id
    );

    if (e.target.checked) {
      setAmenities([...amenities, amenity]);
    } else {
      const arr = amenities.filter((amenity) => amenity._id !== e.target.id);
      setAmenities(arr);
    }
  };

  const getTotal = () => {
    console.log("fjdksf");
    let total = 0;

    total += bookInfo.room.price;
    total += bookInfo.numGuests * 5;

    for (const amenity of amenities) {
      total += amenity.price;
    }

    return total.toFixed(2);
  };

  /**
   * Given two dates objects, return true if the dates have a weekend in between
   */
  const hasWeekend = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    while (start <= end) {
      if (start.getDay() === 0 || start.getDay() === 6) {
        return true;
      }
      start.setDate(start.getDate() + 1);
    }
    return false;
  };

  /**
   *  given one date object in the parameter, return the number of years it’s been from today to that date, for a maximum of 5 years
   * if the date is more than 5 years in the past, return 5
   */
  const getYears = (date) => {
    const today = new Date();
    const past = new Date(date);

    let years = 0;

    while (today > past) {
      past.setFullYear(past.getFullYear() + 1);
      years++;
    }

    if (years > 5) {
      return 5;
    } else {
      return years;
    }
  };

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col lg={9}>
          <Card>
            <Card.Header>
              {bookInfo.room.name} at {hotel.name}
            </Card.Header>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <Image
                    src={`${API_URL}/${hotel.mainImg}`}
                    className="book-image"
                  />
                </Col>
                <Col lg={6}>
                  <Card.Text>Location: {hotel.location}</Card.Text>
                  <Card.Text>
                    Date of stay:{" "}
                    {bookInfo.startDate.toLocaleDateString("en-US")} to{" "}
                    {bookInfo.endDate.toLocaleDateString("en-US")}
                  </Card.Text>
                  <Card.Text>Number of guests: {bookInfo.numGuests}</Card.Text>
                  <Form.Check
                    label="Apply rewards balance: 500 points"
                    type="checkbox"
                  />
                </Col>
                <Col lg={2}>
                  <h3 style={{ marginTop: "100%" }}>
                    ${bookInfo.room.price.toFixed(2)}
                  </h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Optional amenities</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {hotel.amenities &&
                    hotel.amenities.map((amenity) => (
                      <Form.Check
                        label={amenity.name}
                        type="checkbox"
                        id={amenity._id}
                        onChange={handleAmenity}
                      />
                    ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col lg={3}>
          <h3>Charges and fees</h3>
          <hr />
          <h6>Room and guests</h6>
          <p>
            {bookInfo.room.name}{" "}
            <span style={{ float: "right" }}>
              ${bookInfo.room.price.toFixed(2)}
            </span>
          </p>
          <p>
            {bookInfo.numGuests} guests{" "}
            <span style={{ float: "right" }}>
              ${(bookInfo.numGuests * 5).toFixed(2)}
            </span>
          </p>
          <h6>Optional amenities</h6>
          {amenities.map((amenity) => (
            <p>
              {amenity.name}{" "}
              <span style={{ float: "right" }}>
                ${amenity.price.toFixed(2)}
              </span>
            </p>
          ))}
          <h6>Booking date</h6>
          <p>
            Weekend <span style={{ float: "right" }}>$9.99</span>
          </p>
          <p>
            Holiday <span style={{ float: "right" }}>$19.99</span>
          </p>
          <h6>Discounts</h6>
          <p>
            Customer loyalty <span style={{ float: "right" }}>-$9.99</span>
          </p>
          <p>
            Rewards <span style={{ float: "right" }}>-$4.99</span>
          </p>
          <h3>
            Total <span style={{ float: "right" }}>${getTotal()}</span>
          </h3>
          <Button variant="dark" className="book-room-button">
            Book room
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BookRoom;
