import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import { useState } from 'react'
import {db, auth}  from '../firebase.js';
import {nanoid} from 'nanoid'

const useFirestore = () => {

const[data,setData]      =useState([])   ;
const[error,setError]    =useState()     ;
const[loading,setLoading]=useState({});  




const getData = async () =>{

  try {
    
    setLoading((prev) =>({...prev,getData:true}))
  
    const dataRef= collection(db,'urls');
    const q      = query(dataRef,where('uid','==',auth.currentUser.uid)) ;

    const querySnapshot = await getDocs(q);
    const dataDB        = querySnapshot.docs.map(documento => (documento.data()));
    
    setData(dataDB);
  } catch (error) {
    console.log(error);
    setError(error.message)

  } finally{
  setLoading((prev) =>({...prev,getData:false}))
  }
}

const addData = async (url)=> {
  try {
    setLoading((prev) =>({...prev,addData:true}) )
    
    const newDoc ={
      enabled:true,
      nanoID :nanoid(6),
      origin :url,
      uid    :auth.currentUser.uid
    }
  
    const docRef = doc(db,'urls',newDoc.nanoID);
    await setDoc(docRef, newDoc)
    
    setData([...data, newDoc]) 
 
  } catch (error) {    
    console.log(error)
    setError(error.message)
  
  } finally{
    setLoading((prev) =>({...prev,addData:false}))
  }
}

const deleteData = async (nanoID) =>{
  try {
    setLoading((prev) =>({...prev,[nanoID]:true}) )
   const docRef = doc(db,'urls', nanoID);
   await deleteDoc(docRef) 

    setData(data.filter(item => item.nanoID !== nanoID))
  
  } catch (error) {    
    console.log(error)
    setError(error.message)
  
  } finally{
    setLoading((prev) =>({...prev,[nanoID]:false}))
  }
}

const updateData = async(nanoID,newOrigin)=>{
  try {
    setLoading((prev) =>({...prev,updateData:true}) )
    const docRef = doc(db,'urls', nanoID);
   await updateDoc (docRef,{origin:newOrigin})
   setData(data.map(item => item.nanoID === nanoID ? ({...item, origin:newOrigin}):item))
  
  } catch (error) {    
    console.log(error)
    setError(error.message)
  
  } finally{
    setLoading((prev) =>({...prev,updateData:false}))
  }
}

const searchData = async (nanoID)=>{
  try {
   
    const docRef  = doc(db,'urls', nanoID);
    const docSnap = await getDoc(docRef);

    return docSnap;
  } catch (error) {    
    console.log(error)
    setError(error.message)
  
  } 
}

return {data, error, loading, getData, addData, deleteData, updateData, searchData}
}

export default useFirestore;