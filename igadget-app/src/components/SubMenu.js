import React from 'react'
import { Link } from 'react-router-dom'
import { CgCloseR } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

export default function SubMenu() {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

  return (
    <>
    <div className='SubMenu'>

    <div className='CloseButton'>
        <CgCloseR style={{height: "100%", width: "100%"}} onClick={goBack} />
    </div>

    {/* contais links  */}
    <div className='FlexCenter LinkContainer'>
        <div className='FlexCol'>
        <Link to="/" as={Link}>Home</Link>
        <Link to="/fav" as={Link}>Favourite</Link>
        <Link to="/cart" as={Link}>Checkout</Link>
        <Link to="/useracnt" as={Link}>Profile</Link>
        </div>

    </div>
    </div>
      
    </>
  )
}
