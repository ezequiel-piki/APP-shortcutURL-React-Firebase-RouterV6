import React, { forwardRef, useRef } from 'react'

const InputRef   = forwardRef((props,ref) => {
    
    return(
        <>
        <input type="text" ref={ref} />
        </>
    )
})

const ExampleRef = () => {
  
    const inputElement=useRef(null); 
  
    const onButtonClick = ()=>{
        console.log('me diste click')
        inputElement.current.focus();
    };

    return (
    <>
    <InputRef ref={inputElement}/>
    <button 
    onClick={onButtonClick}
    >Focus the input</button>
    </>
  )
}

export default ExampleRef