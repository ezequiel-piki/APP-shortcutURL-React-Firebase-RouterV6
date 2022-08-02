import     React     , 
       { useContext, useState  } from 'react'                   ;
import { useForm     } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'        ;

import { UserContext } from '../context/UserProvider' ;
import erroresFirebase from '../utils/erroresFirebase';
import FormError       from '../components/FormError' ;
import FormInput       from '../components/FormInput' ;
import formValidate    from '../utils/formValidate'   ;
import Title           from  '../components/Title';
import Button          from  '../components/Button';



const Register = () => {
  
  
  const {register            ,
         handleSubmit        ,
         formState:{errors}  ,
         getValues           ,
         setError            }
                               =useForm();
  
  const      navigate          = useNavigate()             ;
  const    {registerUser}      = useContext(UserContext)   ; 
  
  const    {required    , 
            patternEmail, 
            minLength   , 
            validateTrim,
            validateEquals}    = formValidate()            ;

  const [loading,setLoading]= useState(false);
          

  const       onSubmit         = async ({email,password})=> {
       try {
           setLoading(true)
           await registerUser(email,password);
           navigate('/');
       } catch (error) {
                    console.log(error.code);
                    const{code,message} = erroresFirebase(error.code)
                    setError(code, {message})
      }
      finally{
        setLoading(false)
      }
  };
 
  return (
    <>
    
    <Title text='Register'/>
     
     <form onSubmit={handleSubmit(onSubmit)}>
      
      <FormInput
      type       ='email'
      placeholder='Ingrese email'
      {...register('email', 
      { required, 
        pattern:patternEmail })}
      label='Ingresa tu correo'
      error={errors.email}
      >
      <FormError error={errors.email}/>

      </FormInput>
            

      <FormInput
      type       ='password'
      placeholder='Ingrese password'
      {...register('password', 
      { minLength, 
        validate :validateTrim })}
        label='Ingrese la contraseña'
        error={errors.password}
      >
      <FormError error={errors.password}/>

      </FormInput>
     

      <FormInput 
      type       ="password" 
      placeholder='Ingrese password nuevamente' 
      label='repita la contraseña'
      {...register('repassword', 
      { validate: validateEquals(getValues('password'))})}
      error={errors.repassword}
      >
      <FormError error={errors.repassword}/>
       
      </FormInput>
      
     
      <Button
    type   ='submit' 
    text   ='ADD URL' 
    color  ='red' 
    loading={loading}/> 

     
     </form>
    
    </>
  );
}

export default Register