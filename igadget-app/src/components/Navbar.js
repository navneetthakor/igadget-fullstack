import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

// for icons (------used in mobile-------)
import { CgMenu} from 'react-icons/cg'


// photos importing 
import logo from '../photos/igadgetnobg.png';
import searchicon from '../photos/searchIcon.svg';
import favorite from '../photos/favorite.png';
import shoppingcart from '../photos/shoppingcart.png';
import acountIcon from '../photos/acountIcon.png';

// context import to use for search 
import CommonContext from '../contexts/CommonContext';

export default function Navbar() {

  // to navigate "/prods" page
  const navigate = useNavigate();

  // extracting setCommon from CommonContext 
  let {setCommon} = useContext(CommonContext);

  // for searching 
  const [search, setSearch] = useState("");

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }
  const searchData = async()=>{
    // api call
    const url = `${process.env.REACT_APP_MY_IP}/product/fetchcategoryprods?category=${search}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    setCommon(data);
    navigate('/prods');
  }


  // -----mobile devices---------
  const handleCgMenu = () =>{
    navigate('/menu');
  }
  return (
    <>
    {/* this is navbar which always remian present on all the pages  */}
    {/* <nav> */}
      <header className="flexRow FlexRow">
        {/* logo division */}
        <div className="logodiv" onClick={() => navigate('/')}>
          <img src={logo} alt=""/>
        </div>

        {/* search-bar division  */}
        <div className='searchdiv DisableCss'>
          <input className='DisableCss' type='text' id='searchbar' name='searchbar' placeholder='search gadgets' onChange={updateSearch} />
          <button className='DisableCss' type='btn' onClick={searchData}><img src={searchicon} alt=''/></button>
        </div>


        {/* icon devision  */}
        <div className='headicon DisableCss'>
          <Link to="/fav" as={Link} className='headbtn DisableCss fvrtIcon' ><img src={favorite} alt=""/></Link>
          <Link to="/cart" as={Link} className='headbtn DisableCss shpIcon' ><img src={shoppingcart} alt=""/></Link>
          <Link to="/useracnt" as={Link} className='headbtn DisableCss acntIcon' ><img src={acountIcon} alt="" /></Link>
        </div>

        {/* -----for mobile---------- */}
        <div id='NavabarBtn' className=' FlexCenter disableCss'>
          <CgMenu style={{height: "100%", width: "100%"}}  onClick={handleCgMenu}/>
        </div>
      </header>
        {/* -------for mobile--------- */}
      <div className='NavSearch disableCss'>
          <input className='disableCss' type='text' id='searchbar' name='searchbar' placeholder='search gadgets' onChange={updateSearch} />
          <button className='disableCss' type='btn' onClick={searchData}><img src={searchicon} alt=''/></button>
        </div>
      
      <subheader className="DisableCss">
        <Link to="/" as={Link}>Home</Link>
        <Link to="/fav" as={Link}>today's deal</Link>
        <Link to="/cart"  as={Link} >sell</Link>
        <Link to="/useracnt" as={Link}>customer support</Link>
      </subheader>
      {/* </nav> */}
    </>
  )
}
