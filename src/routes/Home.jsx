import  Button  from '../components/Button'
import React, { useEffect, useState } from 'react'

import Title from '../components/Title'
import useFirestore from '../hooks/useFirestore'
import FormInput from '../components/FormInput'
import FormError from '../components/FormError'
import { useForm } from 'react-hook-form'
import formValidate from '../utils/formValidate'
import erroresFirebase from '../utils/erroresFirebase'




const Home = () => {
  const [copy, setCopy]=useState({});
  const {required, patternURL} = formValidate();
  
  const { register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue }
    = useForm();

  const{data,error,loading, getData, addData, deleteData, updateData}= useFirestore();
  
  const [text,setText] = useState('');
  const [newOriginID, setNewOriginID]= useState();

  useEffect(()=>{
    console.log('getData')
    getData()
  },[])

  const onSubmit = async ({url}) =>{
    try {
      
      if(newOriginID){
        await updateData(newOriginID,url)
        setNewOriginID('')
        setText('')
        }
        else{
          await addData(url)
        }
        resetField('url')
    
    } 
    catch (error) {
      const {code, message} = erroresFirebase(error.code);
      setError(code,{message})  
    }
  } 

  const handleClickDelete = async (nanoID)=>{
  await deleteData(nanoID)
  }
  
  const handleClickEdit = (item)=>{
  /*   setText(item.origin); */
    setValue('url',item.origin)
  setNewOriginID(item.nanoID)  
  }
 
  const pathURL = window.location.href;
  
  const handleClickCopy= async(nanoID)=>{

    await navigator.clipboard.writeText(window.location.href+nanoID);
    console.log('copiado')
    setCopy({[nanoID]:true})
  }

  if(loading.getData){
    return <p>Loading getData...</p>
   };
 
   if(error){
   return <p>{error}</p>
   };
  

  return (
  
  
  <>
    <Title text='Home'/>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormInput
          label      ='Ingresa tu URL'
          type       ='text'
          placeholder='http://piki.org'
          {...register('url',
            {
              required,
              pattern: patternURL
            })}
          error={errors.url}  
        >
          <FormError error={errors.url} />
        </FormInput>

    
    {
      newOriginID ? (
        <Button
        type   ='submit' 
        text   ='EDIT URL' 
        color  ='red' 
        loading={loading.updateData}/>     
      ):(
         <Button
               type   ='submit' 
               text   ='ADD URL' 
               color  ='red' 
               loading={loading.addData}/> 
         )
    }
    
    </form>
    
    
    
    {data.map((item)=>(
      <div 
      key      ={item.nanoID} 
      className='p-6  bg-white rounded-lg border border-gray-200  dark:bg-gray-800 dark:border-gray-700 my-2'
      >
       
       <h5 
       className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
       >
        {pathURL} {item.nanoID}
        </h5>
       
       <p 
       className='mb-3 font-normal text-gray-700 dark:text-gray-400'
       >
        {item.origin}
       </p>
       
       <Button
    type   ='button' 
    text   ='Delete' 
    color  ='red' 
    loading={loading[item.nanoID]}
    onClick={()=>handleClickDelete(item.nanoID)}
    />
    <Button
    type   ='button' 
    text   ='Edit' 
    color  ='red' 
    onClick={()=>handleClickEdit(item)}
    />
     <Button
    type   ='button' 
    text   ={
      copy[item.nanoID]? 'copied':'copy'
    } 
    color  ='red' 
    onClick={()=>handleClickCopy(item.nanoID)}
    />
     
      </div>
      ))}
      
    </>
  )
}

export default Home;