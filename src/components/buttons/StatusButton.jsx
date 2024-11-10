import React from 'react'

const StatusButton = ({status}) => {
    const statusStyle = (status) =>{
        switch (status) {
          case "declined":
            return "bg-red-100 text-red-800"
            
          case "confirmed":
            return "bg-green-100 text-green-800"
            
          case "pending":
            return "bg-orange-100 text-orange-800"       
              
          default:
            return "bg-orange-100 text-orange-800"           }
      }
    
  return (
<span className={`w-full block max-w-[100px] m-auto px-4 py-1 rounded text-center text-xs ${statusStyle(status)}`}>{status} </span>
  )
}

export default StatusButton