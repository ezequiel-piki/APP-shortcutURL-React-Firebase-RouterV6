import React from 'react'
import ButtonLoading from './ButtonLoading';

const Button = ({text, type, color='red',loading, onClick}) =>{ 
   
    if(loading){
        return <ButtonLoading/>
    }
    
    return (
    <button 
    onClick={onClick}
    type     ={type} 
    className={`text-white bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 shadow-lg shadow-${color}-500/50 dark:shadow-lg dark:shadow-${color}-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}>{text}</button>
)
  }


export default Button;