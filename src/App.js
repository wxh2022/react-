import Routers from './router/router'
import './reset.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('id')?.length>0){
      navigate('/front')
    }else{
      navigate('/login')
    }
  },[])
  return (
    <>
    <Routers> </Routers>
    </>
  );
}

export default App;
