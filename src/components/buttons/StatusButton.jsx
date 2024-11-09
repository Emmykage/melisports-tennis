import React from 'react'

const StatusButton = ({status}) => {
    const statusStyle = (status) =>{
        switch (status) {
          case "declined":
            return "bg-red-200 text-red-800"
            
          case "confirmed":
            return "bg-green-200 text-green-800"
            
          case "pending":
            return "bg-orange-200 text-orange-800"       
              
          default:
            return "bg-orange-200 text-orange-800"           }
      }
    
  return (
<span className={` px-4 py-0.5 rounded text-xs ${statusStyle(status)}`}>{status} </span>
  )
}

export default StatusButton