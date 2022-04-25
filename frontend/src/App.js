import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import MyNavbar from './components/MyNavbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Search from './pages/Search';
import Hotel from './pages/Hotel'
import SelectRoom from './pages/SelectRoom';
import BookRoom from './pages/BookRoom'
import { useSelector } from 'react-redux'

function App() {
  const hotelID = useSelector(state => state.hotelID)

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/search/:search_field' element={<Search />} />
      <Route path='/search' element={<Search />} />
      <Route path='/hotel/:hotel_id' element={<Hotel />} />
      <Route path='/selectroom' element={<SelectRoom />} />
      <Route path='/bookroom' element={hotelID ? <BookRoom /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
