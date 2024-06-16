
import './App.css';

// to set routing 
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// importing components
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Favourite from './components/Favourite'
import AdminDash from './components/AdminDash';
import Prods from './components/Prods';
import Checkout from './components/Checkout';
import UserAcount from './components/UserAcount';
import SubMenu from './components/SubMenu';
import CustomerLogin from './components/CustomerLogin';
import Success from './components/Success';
import Cancel from './components/Cancel';
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route exact path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route exact path='/prodpage' element={<ProductPage/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/fav' element={<Favourite/>}/>
        <Route exact path='/useracnt' element={<UserAcount/>}/>
        <Route exact path='/myAdmin' element={<AdminDash/>}/>
        <Route exact path='/prods' element={<Prods/>}/>
        <Route exact path='/checkout' element={<Checkout/>}/>
        <Route exact path='/menu' element={<SubMenu/>}/>
        <Route exact path='/custmrlogin' element={<CustomerLogin/>}/>
        <Route exact path='/success' element={<Success/>}/>
        <Route exact path='/cancel' element={<Cancel/>}/>
    </Route>
    
  ))
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;

// version-2 completed on 22/03/2024 at 23:28 PM 
// ------functionality left 
// 1. cancel and success page design 
// 2. rating component dynamic behaviour 
// 3. user-page 3 buttons functionality

// verstion-2 functionality added  on 25/03/2024
// 1 and 2 completed 
// --------Functionality left 
// 3. user-page 3 buttons functionality 
