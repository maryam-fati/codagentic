import React ,{useEffect} from 'react'
import {  Routes, Route } from 'react-router'
import Main from './Components/Main'
import Panel from './Components/Panel/Panel'
import Login from './Components/Login'
import Blog from './Components/Blog/blog'
import { Adminchk } from './Components/Protectedroutes'
import { useLocation } from 'react-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    // Simulate route load or wait for real loading to finish
    setTimeout(() => {
      NProgress.done();
    }, 300); // adjust time based on your actual load
  }, [location.pathname]);
  return (
    <>
        <Routes>
          <Route path="/" element={
            <Main />
          } />
          <Route path="/Login" element={
            <Login />
          } />
          <Route path="/Panel" element={
            <Adminchk />
          } />
          <Route path="/blog/:title" element={<Blog />} />
        </Routes>




    </>
  )
}

export default App
