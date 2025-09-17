import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import axios from 'axios'

import { useNavigate } from 'react-router'

import Dash from './Dash'
import Blog from './Blogs/Blog'
import EditB from './Blogs/EditB'
import AddB from './Blogs/AddB'
import AddS from './Services/AddS'
import Services from './Services/Services'
import Review from './Review/Review'
import Indust from './Indust/Indust'
import Addin from './Indust/Addin'
import AddR from './Review/AddR'
import AddF from './Founders/AddF'
import Founder from './Founders/Founder'
import EditS from './Services/EditS'
import EditF from './Founders/EditF'
import Editin from './Indust/Editin'
import EditR from './Review/EditR'
// import Sidebar from './Sidebar'
import Setting from './Setting'
const Panel = () => {
  const url = import.meta.env.VITE_SERVER;
  const [title, setTitle] = useState('')
  const [sname,setSname] = useState('') 
  const [fid, setFid] = useState('')
  const [iid, setIid] = useState('')
  const [rid, setRid] = useState('')
  const [error, setError] = useState('')

  const [currentindex, setCurrentindex] = useState('dash')
  const navi = useNavigate()

  const admin = JSON.parse(localStorage.getItem('admin'));
  const handlelogout = () => {
    localStorage.removeItem('token')
    navi('/Login')

  }
  const [data, setData] = useState([])
  const getdata = async () => {
    window.scroll(0, 0)
    document.body.style.overflow = 'hidden';


    try {
      const res = await axios.get(`${url}/blog`);
      setData(res.data.post)

    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      document.body.style.overflow = 'auto';

    }
  };

  useEffect(() => {
    getdata();
  }, [currentindex,error]);




  return (
    <div className='text-white w-full h-screen flex '>
      <div class="w-64 bg-gray-800 h-full   flex flex-col border-r border-gray-700 main-sidebar">
        <div class="p-4 border-b border-gray-700">
          <h1 class="text-xl font-bold text-cyan-400">Codagentic</h1>
          <p class="text-xs text-gray-400">Admin Panel</p>
        </div>

        <nav class="flex-1 p-4">
          <ul class="space-y-2">
            <li>
              <button onClick={() => setCurrentindex('dash')} class="nav-link flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="home" class="w-[18px] h-[18px] mr-3"></i>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentindex('blog')} class="nav-link flex items-center p-2 w-full rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
                <span>Blog Posts</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentindex('services')} class="nav-link flex items-center p-2 w-full rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
                <span>Services</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentindex('indust')} class="nav-link flex items-center p-2 w-full rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
                <span>Industry</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentindex('reviews')} class="nav-link flex items-center p-2 w-full rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
                <span>Reviews</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentindex('founder')} class="nav-link flex items-center p-2 w-full rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
                <span>Founders</span>
              </button>
            </li>


            <li>
              <button onClick={() => setCurrentindex('setting')} class="nav-link w-full flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                <i data-lucide="settings" class="w-[18px] h-[18px] mr-3"></i>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div class="p-4 border-t space-y-3 border-gray-700">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">M</div>
            <div class="ml-3">
              <p class="text-sm font-medium">{admin.email}</p>
              <p class="text-xs text-gray-400">Admin</p>
            </div>
          </div>
          <button onClick={handlelogout} className='bg-blue-600 w-full p-2 hover:opacity-80 cursor-pointer'>Logout</button>
        </div>
      </div>
      {/* {Sidebar end} */}

      <div className='h-screen overflow-y-scroll w-full'>
        {currentindex === 'dash' ? <Dash getdata={getdata} data={data} setCurrentindex={setCurrentindex} setTitle={setTitle} /> : <></>}
        {currentindex === 'blog' ? <Blog setCurrentindex={setCurrentindex} data={data} setError={setError} error={error} setTitle={setTitle} /> : <></>}
        {currentindex === 'setting' ? <Setting setCurrentindex={setCurrentindex} admin={admin} setError={setError} error={error} /> : <></>}
        {currentindex === 'addblog' ? <AddB setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'addservice' ? <AddS setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'addreview' ? <AddR setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'addfounder' ? <AddF setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'addindust' ? <Addin setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'services' ? <Services setCurrentindex={setCurrentindex} setSname={setSname} setError={setError} error={error} /> : <></>}
        {currentindex === 'reviews' ? <Review setRid={setRid} setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'founder' ? <Founder setCurrentindex={setCurrentindex} setFid={setFid} setError={setError} error={error} /> : <></>}
        {currentindex === 'indust' ? <Indust setIid={setIid} setCurrentindex={setCurrentindex} setError={setError} error={error} /> : <></>}
        {currentindex === 'editfounder' ? <EditF setCurrentindex={setCurrentindex} fid={fid} setError={setError} error={error} /> : <></>}
        {currentindex === 'editreviews' ? <EditR rid={rid} setCurrentindex={setCurrentindex} fid={fid} setError={setError} error={error} /> : <></>}
        {currentindex === 'editindustry' ? <Editin iid={iid} setCurrentindex={setCurrentindex} fid={fid} setError={setError} error={error} /> : <></>}
        {currentindex === 'editblog' ? <EditB setCurrentindex={setCurrentindex} title={title} setError={setError} error={error} /> : <></>}
        {currentindex === 'editservice' ? <EditS setCurrentindex={setCurrentindex} sname={sname} setError={setError} error={error} /> : <></>}
      </div>

    </div>
  )
}

export default Panel
