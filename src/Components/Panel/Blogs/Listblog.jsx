import { useState } from 'react'
import React from 'react'
// import loading from './ui/loading.gif'
import { format } from 'date-fns';


// import Image from 'next/image'
import axios from 'axios'
// import { useRouter } from 'next/navigation'
import { useNavigate } from 'react-router';



const Listblog = (Props) => {
  // const rout = useRouter()
  const url = import.meta.env.VITE_SERVER;
    const navigate = useNavigate();
  
  const [disabled, setDisabled] = useState(false)

  const [error, setError] = useState('')
  const [y, setY] = useState(6)
  const [end, setEnd] = useState({ display: 'none' })
  const handelload = () => {


    if (y >= Props.data.length) {
      setEnd({ display: 'flex' })
    } else {

      setY(y + 3)
    }


  }
  const handelredrict = (title) => {
    // rout.push(`/Blog/${encodeURIComponent(title)}`)


  }
  const handelredrict2 = (title) => {
    // rout.push(`/Panel/Blogedit/${encodeURIComponent(title)}`)
    Props.setTitle(title)
    Props.setCurrentindex('editblog')


  }
    const handelredrict3 = (title) => {
    
    const encodedTitle = encodeURIComponent(title); // Handles spaces/special characters
    navigate(`/blog/${encodedTitle}`);
  
  }
  const handeldelete = async (id) => {
    window.scroll(0, 0)
    setDisabled(true)
    try {


      const res = await axios.post(`${url}/delblog`, { id });
      console.log(res)
      // Props.setError('Blog Deleted!')
      Props.getdata()
      setDisabled(false)
      // Props.setCurrentindex('dash')

    } catch (error) {
      setError('Server error check console logs')
      setDisabled(false)

      console.error('Error fetching post:', error);
    } finally {
      console.log('done')
      setDisabled(false)



    }

  }
  return (
    <>
      {/* <div style={loadings} className='w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-[#0000005b] '>
        <Image
          className=" object-cover    "
          src={loading} 
          sizes={50}
          alt="Loading"
        />
      </div> */}
      <div className=' container mx-auto grid md:grid-cols-2  grid-cols-1  gap-y-8 gap-x-4 my-3 lg:grid-cols-3  w-full'>

        {
          Props.admin ? (
            Props.data.map((data, index) => (
              <div key={index} className='shadow-xl border-[1px] !border-blue-900   rounded-lg  md:mx-0 mx-5 cursor-pointer space-y-1 pb-3 flex flex-col justify-between '>

                <img src={data.image} onClick={() => handelredrict(data.title)} className='object-cover  rounded-t-lg  h-[200px]' alt={data.title} />

                <div onClick={() => handelredrict(data.title)} className='mx-4 space-y-2'>
                  <h1 className=' md:text-lg line-clamp-2 font-semibold'>{data.title} </h1>
                  <div className='flex w-full items-center justify-between  text-gray-300 font-normal ' >
                    {/* <span>{data.category}</span> */}
                    <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
                  </div>
                  <div className='line-clamp-2 text-gray-400'>{data.discription}</div>
                </div>



                <div className='flex items-center justify-between mx-4 text-sm z-50'>
                  <div className='flex gap-2'>

                  <button disabled={disabled} onClick={() => handelredrict2(data.title)} className='bg-green-900  rounded-md p-2   cursor-pointer px-4 flex items-center gap-1 '>Edit
                  </button>
                  
                  <button disabled={disabled} onClick={() => handelredrict3(data.title)} className='bg-blue-900  rounded-md p-2   cursor-pointer px-4 flex items-center gap-1 '>View
                  </button>
                  </div>
                  <button disabled={disabled} onClick={() => handeldelete(data._id)} className='bg-red-900 rounded-md  p-2 px-4    cursor-pointer flex items-center justify-around'> Delete
                  </button>
                </div>
              </div>
            ))
          )

            : (
              Props.data.slice(0, y).map((data, index) => (
                <div key={index} onClick={() => handelredrict(data.title)} className='shadow-lg  rounded-lg  md:mx-0 mx-5 cursor-pointer space-y-1 pb-3 flex flex-col '>

                  <img src={data.image} className='object-cover  rounded-t-lg  h-[200px]' alt={data.title} />

                  <div className='mx-4 space-y-2'>
                    <h1 className=' md:text-3xl text-xl  lg:text-xl line-clamp-2 font-semibold'>{data.title} </h1>
                    <div className='flex w-full items-center justify-between  text-prime3 font-normal ' >
                      {/* <span>{data.category}</span> */}
                      <span>{format(new Date(data.date), 'MMM dd yyyy')}</span>
                    </div>
                    <p className='text-gray-700 line-clamp-4 text-sm'>{data.discription}</p>
                  </div>
                </div>
              ))


            )
        }









      </div>
      {
        Props.admin ? '' : <div className='w-full flex items-center justify-center flex-col  my-2'>

          <p style={end} className='text-xl text-prime'>You reached the end!</p>
          <button onClick={handelload} className='p-4 bg-prime2 font-semibold text-white' > Load More.. </button>
        </div>
      }
    </>
  )
}

export default Listblog
