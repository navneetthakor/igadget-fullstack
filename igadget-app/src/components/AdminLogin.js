import React, { useEffect, useState } from 'react'

export default function AdminLogin(props) {
    const { setNext } = props.iteam;
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwdChange = (event) => {
        setPasswd(event.target.value);
    }


    const findAdmin = async (formData) => {
        // api call
        const url =
            `${process.env.REACT_APP_MY_IP}/admin/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":email, "password":passwd})
        });
        const data = await response.json();
        console.log(data);
        
        localStorage.setItem('admin', data.authtoken);

        if(data.signal === "green")
        setNext(true);
        else
        alert("Invalid Credentials");

    }


    const autoLogin = async () => {
        const url =
        `${process.env.REACT_APP_MY_IP}/admin/getadmin`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('admin')
            }
        });
        const data = await response.json();
        if(data.signal === "green")
        setNext(true);

    }

    useEffect(()=>{
        if(localStorage.getItem('admin')) autoLogin();
    })


    return (
        <div className='flexCenter' style={{background: "whitesmoke"}}>
            <div className='admlgnContainer flexCol'>
                <p className='primHead'>Welcome Admin</p>
                <input type='txt' name='email' onChange={emailChange} placeholder='email' />
                <input type='password' name='password' onChange={passwdChange} placeholder='password' />
                <button type='submit' onClick={findAdmin} className='primButton' style={{marginTop:"3vh"}}> Submit </button>
            </div>

        </div>
    )
}
