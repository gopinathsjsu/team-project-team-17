import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import { selectHotel } from "../actions";
import API_URL from "../apiConfig";
import MyToast from '../components/MyToast'
import ManageRoomsModal from "../components/MangeRoomsModal";

function Hotel() {
  const navigate = useNavigate();
  const { hotel_id } = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDates, setShowDates] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [guests, setGuests] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch();

  const [show, setShow] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setStartDate(today);
    setEndDate(tomorrow);

    axios
      .get(`${API_URL}/hotel/${hotel_id}`)
      .then((res) => {
        setHotel(res.data.hotel);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCalendar = (value, event) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const handleSubmit = () => {
    if (!isSevenDays(startDate, endDate)) {
      setShowToast(true);
      setToastText('Your booking must be 7 days or less')
    } else {
      const bookHotel = {
        hotelID: hotel_id,
        startDate: startDate,
        endDate: endDate,
        numGuests: guests,
      };

      dispatch(selectHotel(bookHotel));

      navigate("/selectroom");
    }
  };

  //returns true if it’s 7 days or less, false if more than 7 days
  const isSevenDays = (startDate, endDate) => {
    return differenceInDays(endDate, startDate) <= 7;
  };

  return (
    <div>
      <Container className="mt-5" style={{ width: "60rem", minHeight: "100vh" }}>
        <Row>
          <Col className="me-5">
            {hotel.rooms && (
              <Carousel>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/${hotel.mainImg}`}
                    className="d-block w-100"
                  ></Image>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/${hotel.rooms[0].roomImg}`}
                    className="d-block w-100"
                  ></Image>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/${hotel.rooms[1].roomImg}`}
                    className="d-block w-100"
                  ></Image>
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    src={`${API_URL}/${hotel.rooms[2].roomImg}`}
                    className="d-block w-100"
                  ></Image>
                </Carousel.Item>
              </Carousel>
            )}
          </Col>
          <Col>
            <h1 style={{ fontFamily: "Times New Roman" }}>{hotel.name}</h1>
            <p className="mb-1">{hotel.location}</p>
            {hotel.rooms && (
              <p>
                From{" "}
                <strong style={{ fontSize: "50px" }}>
                  {hotel.rooms[0].price}{" "}
                </strong>
                <strong>USD</strong>
              </p>
            )}
            <Button
              variant="dark"
              className="mb-3"
              onClick={() => setShowDates(!showDates)}
            >
              Date of stay: {startDate.toLocaleDateString("en-US")} to{" "}
              {endDate.toLocaleDateString("en-US")}
            </Button>
            <div style={{ display: showDates ? "block" : "none" }}>
              <Calendar
                selectRange={true}
                defaultValue={[startDate, endDate]}
                onChange={handleCalendar}
                minDate={new Date()}
              />
            </div>
            <Dropdown onSelect={(e) => setGuests(e)}>
              <Dropdown.Toggle variant="none" className="guest-select mt-3">
                Number of guests: {guests}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                <Dropdown.Item eventKey={4}>4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="dark"
              size="lg"
              className="mt-3 add-button"
              onClick={handleSubmit}
              disabled={localStorage.getItem('user') === null}
            >
              Select room
            </Button>
            {(user && user.email === 'admin@gmail.com') &&
            <Button variant='dark' size='lg' className="mt-3 add-button" onClick={() => setShow(true)}>Manage rooms</Button>}
          </Col>
        </Row>
        <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
      </Container>
      <ManageRoomsModal show={show} handleClose={() => setShow(false)} rooms={hotel.rooms} id={hotel._id}/>
    </div>
  );
}

export default Hotel;
