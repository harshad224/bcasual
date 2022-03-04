import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Productdetail from './components/Productdetail';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { useSelector } from 'react-redux';




function App() {
  const userr = useSelector(state => state.user.logins.currentUser)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="https://bcasual.herokuapp.com/products/jackets" element={<ProductList />} />
        <Route exact path="https://bcasual.herokuapp.com/products/t-shirts" element={<ProductList />} />
        <Route exact path="https://bcasual.herokuapp.com/products/pullovers" element={<ProductList />} />
        <Route exact path="https://bcasual.herokuapp.com/product/:id" element={<Productdetail />} />
        <Route exact path="https://bcasual.herokuapp.com/cart" element={<Cart />} />
        <Route exact path="https://bcasual.herokuapp.com/signin" element={userr ? <Navigate to="/" /> : <Login />} />
        <Route exact path="https://bcasual.herokuapp.com/signup" element={userr ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
