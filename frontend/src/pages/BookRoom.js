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
import { differenceInYears, isWithinInterval, areIntervalsOverlapping, differenceInCalendarDays } from 'date-fns'
import { getBankHolidays } from 'date-fns-holiday-us'
import { useNavigate } from 'react-router-dom'
import MyToast from "../components/MyToast";

function BookRoom() {
  const bookInfo = useSelector((state) => state);
  const [hotel, setHotel] = useState({});
  const [amenities, setAmenities] = useState([]);
  const [rewards, setRewards] = useState(0)
  const [rewardsChecked, setRewardsChecked] = useState(false)
  const [isWeekend, setIsWeekend] = useState(false)
  const [loyalty, setLoyalty] = useState(0)
  const [holiday, setHoliday] = useState(false)
  const [holidayName, setHolidayName] = useState('')
  const [summer, setSummer] = useState(false)
  const [numDays, setNumDays] = useState(0)
  const [roomImg, setRoomImg] = useState('')
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  let totalCost = 0
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  const user_id = JSON.parse(localStorage.getItem('user'))._id

  useEffect(() => {
    axios.get(`${API_URL}/api/${user_id}`)
    .then(res => {
      setUser(res.data.user)
      setLoyalty(getYears(new Date(res.data.user.date)))
    })
    .catch((err) => {
      console.log(err)
    })

    setIsWeekend(hasWeekend(bookInfo.startDate, bookInfo.endDate))
    setHoliday(hasHoliday(bookInfo.startDate, bookInfo.endDate))
    setSummer(areIntervalsOverlapping({ start: bookInfo.startDate, end: bookInfo.endDate }, 
      { start: new Date(2022, 5, 21), end: new Date(2022, 8, 23)}))
    setNumDays(differenceInCalendarDays(bookInfo.endDate, bookInfo.startDate))

    axios
      .get(`${API_URL}/hotel/${bookInfo.hotelID}`)
      .then((res) => {
        const hotel = res.data.hotel
        setHotel(hotel);

        for (let i = 0; i < hotel.rooms.length; i++) {
          if (hotel.rooms[i].name === bookInfo.room.name) {
            setRoomImg(hotel.rooms[i].roomImg)
            break
          }
        }
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
    let total = 0;

    total += bookInfo.room.price;
    total += bookInfo.numGuests * 5;
    total += numDays * 10

    total -= loyalty * 10
    
    if (rewardsChecked && rewards) {
      total -= rewards / 100
    }

    if (isWeekend) {
      total += 10
    }

    if (holiday) {
      total += 20
    }

    if (summer) {
      total += 10
    }

    for (const amenity of amenities) {
      total += amenity.price;
    }

    totalCost = total
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

    let years = differenceInYears(today, past)

    if (years > 5) {
      return 5;
    } else {
      return years;
    }
  };

  const hasHoliday = (firstInterval, secondInterval) => {
    const holidays = getBankHolidays(2022)

    for (const key in holidays) {
      if (isWithinInterval(holidays[key].date, {start: firstInterval, end: secondInterval})) {
        var name = key.replace(/([A-Z])/g, ' $1').trim()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        setHolidayName(name)
        return true
      }
    }

    return false
  }

  const handleSubmit = () => {
    if (rewards > user.rewards) {
      setShowToast(true)
      setToastText('Please enter a rewards amount that\'s not higher than what you have')
      return
    }

    let amenitiesName = []
    amenities.forEach(amenity => amenitiesName.push(amenity.name))

    const booking = {
      user: user._id,
      hotel: bookInfo.hotelID,
      startDate: bookInfo.startDate,
      endDate: bookInfo.endDate,
      room: bookInfo.room.name,
      numGuests: bookInfo.numGuests,
      rewards: {
        used: rewardsChecked,
        amount: rewards
      },
      total: totalCost,
      amenities: amenitiesName
    }

    axios.post(`${API_URL}/booking`, booking)
    .then(res => {
      console.log(res.data.booking)
      navigate(`/mybookings/${user_id}`)
    })
    .catch(err => {
      console.log(err.response.data.errorMsg)
    })
  }

  return (
    <Container className="mt-3 mb-3">
      <h4>Congrats, you'll earn 500 points by booking!</h4>
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
                    src={`${API_URL}/${roomImg}`}
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
                    inline
                    type="checkbox"
                    onChange={(e) => setRewardsChecked(e.target.checked)}
                  />
                  <Form.Label>Apply rewards:
                    <Form.Control size="sm" className="rewards-input" value={rewards}
                      onChange={(e) => setRewards(e.target.value)} /> / {user.rewards} points</Form.Label>
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
          {numDays !== 0 && <p>
            Length of stay: {numDays} days<span style={{ float: "right" }}>${(numDays * 10).toFixed(2)}</span>
          </p>}
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
          {isWeekend && <p>
            Weekend <span style={{ float: "right" }}>$10.00</span>
          </p>}
          {holiday && <p>
            {holidayName} <span style={{ float: "right" }}>$20.00</span>
          </p>}
          {summer && <p>
            Summer <span style={{ float: "right" }}>$10.00</span>
          </p>}
          <h6>Discounts</h6>
          {loyalty !== 0 && <p>
            Customer loyalty <span style={{ float: "right" }}>-${(loyalty * 10).toFixed(2)}</span>
          </p>}
          {(rewardsChecked && rewards && rewards !== 0) && <p>
            Rewards <span style={{ float: "right" }}>-${(rewards / 100).toFixed(2)}</span>
          </p>}
          <h3>
            Total <span style={{ float: "right" }}>${getTotal()}</span>
          </h3>
          <Button variant="dark" className="book-room-button" onClick={handleSubmit}>
            Book room
          </Button>
        </Col>
      </Row>
      <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
    </Container>
  );
}

export default BookRoom;
