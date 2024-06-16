import React, {useState } from 'react'
import AdminLogin from './AdminLogin'

export default function AdminDash() {
    const [next, setNext] = useState(false);
    
    const handleLogout = () =>{
        localStorage.removeItem('admin');
        setNext(false)
    }

  return (
    <>

 
    {next ? 
    <>
    <h1>Welcome to dashboard</h1>
    <button className='primButton' onClick={handleLogout}>logout</button>
    </>
    : <AdminLogin iteam={{next,setNext}}/>
    }

      
    </>
  )
}
