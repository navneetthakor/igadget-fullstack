// this is to load products searched in searchbar(present in Navbar)
import React, { useContext} from 'react'
import Iteam from './Iteam'

// importing context 
import CommonContext from '../contexts/CommonContext'
import Navbar from './Navbar';

export default function Prods() {

    let {common} = useContext(CommonContext);
    console.log(common);
  return (
    <>
       <Navbar/>

       <div id='prodsContainer'>
        {common?.map((prod)=>{
          return <Iteam key={prod._id} iteam={prod}/>
        })}
       </div>
      
    </>
  )
}
