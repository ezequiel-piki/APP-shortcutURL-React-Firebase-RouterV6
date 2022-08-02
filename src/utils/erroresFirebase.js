

const erroresFirebase = (code) => {
    switch(code){
                      
        case'auth/email-already-in-use':
            return {
                code:'email',
                message:'usuario ya registrado'
            } ;
        
        case 'auth/invalid-email'      :          
            return {
                code:'email',
                message:'Este texto debe ser de tipo email'
            };
                   
        
        case 'auth/user-not-found'     :
            return {
                code:'email',
                message:'Usuario no registrado'
            }; 
             
        
        case 'auth/wrong-password'     :
            return {
                code:'email',
                message:'Contraseña inexistente'
            };       
        
        default:
            return {
                code:'email',
                message:'error en elservidor'
            };;
      }
}

export default erroresFirebase;