import React, { useState } from 'react'
import {AiOutlineCloseCircle, AiOutlineWechat} from "react-icons/ai"
import baseURL from '../../redux/baseURL'


const ChatBox = () => {
    const [toggle, setToggle] = useState(false)
    const [formInput, setFormInput] = useState({subject: "", content: ""})
    const handleToggle = () => {
        setToggle((prev)=> !prev)

    }
    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await fetch(`${baseURL}messages`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formInput),
        }).then((res) => res.status == "ok" ? setToggle(true) : setToggle(false) )
    }
  return (
    <>
    <div className='chat-icon'>
        <AiOutlineWechat className='stick-out' onClick={handleToggle} />
    </div>
    <div className={toggle ? 'chat-box' : "chat-box show"}>
        <AiOutlineCloseCircle className='side-close' onClick={handleToggle}/>
    <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor='subject'>
        <input className='my-2' type='text' name={"subject"} placeholder='Subject' value={formInput.subject} onChange={handleChange} id='subject' />
      </label>

      </div>
      <div>
      <label htmlFor='message'>
        <textarea rows={10} name="content" value={formInput.content}  placeholder='Type your message here'  id='message' onChange={handleChange}></textarea>
      </label>

      </div>
     
      
      <input type='submit' value={'send message'} />
    </form>

  </div>
  </>

  )
}

export default ChatBox