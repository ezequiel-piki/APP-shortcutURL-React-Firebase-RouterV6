import React from 'react'

const formValidate = (getValues) => {
  return {
          required:{value  :true              ,
                    message:'campo obligatorio'
           },
          patternEmail :{ value  : /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ,
                          message: 'El formato debe ser de tipo email'
          },
          patternURL   :{ value  :/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
                          message: 'El formato debe ser de tipo URL'
          },
          minLength: { value  : 6, 
                       message: 'Minimo 6 caracteres'
          },
          validateTrim:{
                        trim: (v) => {            
                                      if (!v.trim()){
                                      return 'No estas escribiendo, por favor escriba algo'
                                      } 
                                      return true  
                        }
          },
          validateEquals(value){
            return{
                equals : (v) => v === value || 'Las contraseñas no coinciden'  
            };
          }
}
}
export default formValidate;