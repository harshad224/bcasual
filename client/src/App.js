import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Productdetail from './components/Productdetail';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { useSelector } from 'react-redux';
import Error from "./components/Error"




function App() {
  const userr = useSelector(state => state.user.logins.currentUser)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/jackets" element={<ProductList />} />
        <Route exact path="/products/t-shirts" element={<ProductList />} />
        <Route exact path="/products/pullovers" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Productdetail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/signin" element={userr ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/signup" element={userr ? <Navigate to="/" /> : <Signup />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
