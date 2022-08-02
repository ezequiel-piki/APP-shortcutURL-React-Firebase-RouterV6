import {Routes,Route}  from 'react-router-dom';
import { useContext }  from 'react'           ;

import { UserContext } from './context/UserProvider';

import Home     from './routes/Home'    ;
import Login    from './routes/Login'   ;
import Register from './routes/Register';
import Perfil   from './routes/Perfil'  ;
import NotFound from './routes/NotFound';

import LayoutRequireAuth from './components/layouts/LayoutRequireAuth';
import LayoutContainer   from './components/layouts/LayoutContainer'  ;
import LayoutRedirect    from './components/layouts/LayoutRedirect'   ;
import Navbar            from './components/Navbar'                   ;


function App() {
  const {user}=useContext(UserContext)

  if(user===false){
    return <p>Loading...</p>
  }


  return (
    <>
    <div className="container mx-auto">

    <Navbar/>
    
    <Routes>
     
       <Route path='/' element={<LayoutRequireAuth/>}>
             <Route index element={<Home/>}/>
             <Route path='perfil' element={<Perfil/>}/>          
      </Route>                              
      
      <Route path='/'           element={<LayoutContainer/>}> 
        <Route path='/login'    element={<Login/>}         />
        <Route path='/register' element={<Register/>}      />
      </Route>

      <Route   path='/:nanoID'  element={<LayoutRedirect/>} > 
        <Route index path='*'         element={<NotFound/>}      />
      </Route>
      
    
    </Routes>
    </div>
    
    </>
  )
}

export default App
