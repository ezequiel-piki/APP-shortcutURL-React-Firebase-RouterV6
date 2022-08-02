import React,
{ useContext, useState } from 'react'                   ;
import { useForm }       from 'react-hook-form'         ;
import { useNavigate }   from 'react-router-dom'        ;
import { UserContext }   from '../context/UserProvider' ;
import erroresFirebase   from '../utils/erroresFirebase';
import formValidate      from '../utils/formValidate'   ;
import FormError         from '../components/FormError' ;
import FormInput         from '../components/FormInput' ;
import Title             from '../components/Title'     ;
import Button            from '../components/Button'    ;


const Login = () => {
  
  const { loginUser } = useContext(UserContext);
  const [loading,setLoading]= useState(false);

  const navigate = useNavigate();

  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const { register,
    handleSubmit,
    formState: { errors },
    setError }
    = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      await loginUser(email, password);
      
      navigate('/');

    } 
    catch (error) {
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
      <Title text='Login'/>
      <FormError error={errors.firebase} />

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
          label='Ingrese su correo'
          type='email'
          placeholder='Ingrese email'
          {...register('email',
            {
              required,
              pattern: patternEmail
            })}
          error={errors.email}  
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          label='Ingrese su password'
          type='password'
          placeholder='Ingrese password'
          {...register('password',
            {
              minLength,
              validate: validateTrim
            })}
          error={errors.password}  
        >
         
          <FormError error={errors.password} />
        </FormInput>
         
         {<Button text='Login' type='submit' loading={loading}/>}
          
      </form>

    </>
  );
};

export default Login;