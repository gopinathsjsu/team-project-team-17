import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../apiConfig";

function Search() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [numberOfHotels, setNumberOfHotels] = useState(0);
  const { search_field } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/hotel`)
      .then((res) => {
        let filtered = [];

        if (search_field) {
          filtered = res.data.hotels.filter((hotel) => {
            return (
              hotel.location
                .toLowerCase()
                .includes(search_field.toLowerCase()) ||
              hotel.name.toLowerCase().includes(search_field.toLowerCase())
            );
          });

          // count the number of hotels
          setNumberOfHotels(filtered.length);
        } else {
          filtered = res.data.hotels;
          setNumberOfHotels(filtered.length)
        }

        setHotels(filtered);
      })
      .catch((err) => {
        console.log(err);
        setNumberOfHotels(0);
      });
  }, [search_field]);

  return (
    <Container className="mt-5">
      <h3 className='mb-3'>{numberOfHotels} Hotels found</h3>
      {hotels.map((hotel) => (
        <Card className="mb-3">
          <Row>
            <Col md={4}>
              <Image
                src={`${API_URL}/${hotel.mainImg}`}
                className="search-pic"
              />
            </Col>
            <Col md={8} className="mt-3 col-border">
              <h4>{hotel.name}</h4>
              <p>{hotel.location}</p>
              <p className="mt-4" style={{ fontSize: "14px" }}>
                {hotel.description}
              </p>
            </Col>
          </Row>
          <hr className="mt-0" />
          <Row>
            <Col md={{ span: 3, offset: 6 }}>
              <p>
                From{" "}
                <strong style={{ fontSize: "30px" }}>
                  {hotel.rooms[0].price}{" "}
                </strong>
                <strong>USD</strong>
              </p>
            </Col>
            <Col md={3}>
              <Button
                variant="dark"
                onClick={() => navigate(`/hotel/${hotel._id}`)}
              >
                SELECT HOTEL
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
}

export default Search;
