import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import MyNavbar from './components/MyNavbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
