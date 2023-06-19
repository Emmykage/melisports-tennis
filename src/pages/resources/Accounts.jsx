import React, { useEffect, useState } from 'react'
import "../../styles/account.css"
import baseURL from '../../redux/baseURL'
const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;

const Accounts = () => {
  const [user, setUser] = useState({})
  //  const [client, setClient] = useState()
 
  useEffect(()=> {
    

     fetch(`${baseURL}users/*`, {      
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    }).then((res) => res.json()).then((json) => setUser({first_name: json.first_name,
      last_name: json.last_name,
    email: json.email,
  username: json.username                                }));
 

  }, [])
  return (
    <div className='account portrait-container'>
        <form action="">
            <div>
                <label htmlFor="first_name">
                  First Name:
                  <input type='text' name='first_name' id='first_name' value={user.first_name} disabled/>
                </label>
            </div>
            <div>
                <label htmlFor="Last_name">Last Name
                  <input type='text' name='last_name' id='last_name' value={user.last_name} disabled/>
                </label>
            </div>
            <div>
                <label htmlFor="username">
                  Username
                  <input type='text' name='username' id='username' value={user.username} disabled/>
                </label>
            </div>
            <div>
                <label htmlFor="email">
                  Email
                  <input type='email' name='emaiol' id='email' value={user.email} disabled/>
                </label>
            </div>
            <div>
                <label htmlFor="phone_no"> Phone No: 
                  <input type='text' name='phone_no' id='phone_no' value={user.phone_no} disabled/>
                </label>
            </div> 
           
        </form>
    </div>
  )
}

export default Accounts