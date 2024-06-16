import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import ProdPageContext from '../contexts/ProdPageContext';

export default function Iteam(props) {
  const {iteam} = props;
  //to use nevigation facilities
  const navigate = useNavigate();
  const {setProdp} = useContext(ProdPageContext);

  const handleClic = () =>{
    setProdp(iteam);
    navigate('/prodpage');
  }
  return (
    <>
    <div id='iteamCard' className='link' onClick={handleClic}>
      <div id='iteamImage'>
        <img src={`${process.env.REACT_APP_MY_IP}/${iteam.images[0]}`.replace(/\\/g, '/')} alt=''/>
      </div>
      <div id='iteamDetails'>
        <h3>{iteam.title}</h3>
        <h4> <span>&#8377;{iteam.mrp}</span> &#8377;{iteam.sellprice}</h4>
      </div>
      </div>
    </>
  )
}
