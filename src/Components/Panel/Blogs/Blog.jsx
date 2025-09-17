import React from 'react'
// import loading from '../ui/loading.gif'
// import Image from 'next/image'


import axios from 'axios'
import { useState, useEffect } from 'react'
import Listblog from './Listblog'


const Blog = ({ setCurrentindex, setTitle, }) => {
  const url = import.meta.env.VITE_SERVER;

  const [searchQuery, setSearchQuery] = useState('')
  const [searchdata, setSearchdata] = useState([])
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const getdata = async () => {
    try {
      const res = await axios.get(`${url}/blog`);
      setData(res.data.post)

    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  useEffect(() => {
    getdata()
  }, [error])



  // const [loadings, setLoadings] = useState({ display: 'none' })

  // const getdata = async () => {
  //   window.scroll(0, 0)
  //   setLoadings({ display: 'flex' });
  //   document.body.style.overflow = 'hidden';


  //   try {
  //     const res = await axios.get(`${url}/blog`);
  //     console.log(res)
  //     setData(res.data.post)

  //   } catch (error) {
  //     console.error('Error fetching post:', error);
  //   } finally {
  //     setLoadings({ display: 'none' });
  //     document.body.style.overflow = 'auto';

  //   }
  // };

  // useEffect(() => {
  //   getdata();
  // }, []);

  useEffect(() => {

    const searchdata = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
      // ||
      // item.post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setSearchdata(searchdata)



  }, [searchQuery])



  return (
    <div className='my-3 container w-full px-4 '>

      <div className="w-full h-auto  space-y-4  ">
        <button onClick={() => setCurrentindex('addblog')} className='w-full p-4 border !border-gray-600 rounded-lg flex justify-between items-center '>
          <span>Add Blog</span>
          <span>+</span>

        </button>
        <input
          type="text"
          id="search"
          placeholder="Search Blog by Title"
          className="search w-full border !border-gray-600 box-border  p-3 pr-[50px] text-lg placeholder:text-[16px]  rounded-lg "
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* <div className="  text-red-400 py-4">{error}</div> */}
        <div className="container mx-auto text-red-400 py-4">{error}</div>




      </div>

      <Listblog
        data={searchdata.length > 0 ? searchdata : data}
        setCurrentindex={setCurrentindex}
        setTitle={setTitle}
        admin={true}
        getdata={getdata}
        setError={setError}
      />

    </div>
  )
}

export default Blog
