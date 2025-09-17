import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns';


const Indust = ({ setCurrentindex, setError, error, setIid }) => {
    const url = import.meta.env.VITE_SERVER;
    const [data, setData] = useState([])

    const getdata = async () => {
        window.scroll(0, 0)


        try {
            const res = await axios.get(`${url}/industry`);
            console.log(res)
            setData(res.data.industry)

        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        getdata();
    }, [error]);
    const handeldelete = async (id) => {
        try {
            const res = await axios.post(`${url}/delindustry`, { id });
            getdata()

        } catch (error) {
            setError('Server error check console logs')
            getdata()


            console.error('Error fetching post:', error);
        }

    }
    const handeledit = (id) => {
        setIid(id)
        setCurrentindex('editindustry')

    }
    return (
        <div className='my-3 container w-full px-4 space-y-4 '>
            <div className="w-full h-auto   ">

                <button onClick={() => setCurrentindex('addindust')} className='w-full p-4 border !border-gray-600 rounded-lg flex justify-between items-center '>
                    <span>Add Industry</span>
                    <span>+</span>

                </button>
            </div>
            <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-md  shadow-lg-gray-700">
                <div className="p-4 shadow-lg-b shadow-lg-gray-700 flex justify-between items-center">
                    <h3 className="font-medium">All Industry</h3>
                    <button onClick={() => { setCurrentindex('addindust') }} className="nav-link text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
                        <i data-lucide="plus-circle" className="w-[16px] h-[16px] mr-1"></i>
                        Add New
                    </button>
                </div>
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-gray-400 text-sm">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium">Title</th>
                                    <th className="px-4 py-2 text-left font-medium">Description</th>
                                    <th className="px-4 py-2 text-left font-medium">Date</th>
                                    {/* <th className="px-4 py-2 text-left font-medium">Role</th> */}
                                    <th className="px-4 py-2 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm ">
                                {
                                    data.length > 0 && data.map((data) => (
                                        <>
                                            <tr className="shadow-lg-b  shadow-lg-gray-700">
                                                <td className="px-4 py-3">{data.title}</td>
                                                <td className="px-4 py-3">{data.des}</td>
                                                {/* <td className="px-2 py-1 text-xs text-gray-300 p- rounded-md m-2">{data.description}</td> */}
                                                <td className="px-4 py-3">{format(new Date(data.date), 'MMM dd yyyy')}</td>

                                                <td className="px-4 py-3 flex space-x-2">
                                                    <button onClick={() => handeledit(data._id)} className='px-4 py-2 cursor-pointer rounded-md bg-green-900 text-green-400 hover:text-white' >
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handeldelete(data._id)} className='px-4 py-2 cursor-pointer rounded-md bg-red-900 text-red-400 hover:text-white' >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Indust
