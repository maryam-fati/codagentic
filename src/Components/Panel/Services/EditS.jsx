import React, { useState, useEffect } from 'react'
import TagInput from './Taginput'
import axios from 'axios'


const EditS = ({ setCurrentindex, sname }) => {
    const url = import.meta.env.VITE_SERVER;
    const [oldsubservice, setOldtags] = useState([])
    const [subServices, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [data, setData] = useState({})
    const [name, setName] = useState('')
    const [description, setDiscription] = useState('')
    const [color, setColor] = useState('')

    // const [disabled,]
    const [disabled, setDisabled] = useState(false)


    const handlesubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError(null);

        try {
            const response = await axios.post(`${url}/upservice`, {
                id: data._id, // from getService response
                name,
                description,
                subServices,
                color
            });

            if (response.status === 200) {
                setError('Service updated successfully!');
                setCurrentindex('services'); // optional: close edit view
            } else {
                setError('Failed to update the service');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setDisabled(false);
        }
    };

    const getService = async (name) => {
        console.log(name)
        try {
            const res = await axios.post(`${url}/getservice`, {
                name
            });
            console.log(res)

            setData(res.data); // Success: update state
            setName(res.data.name)
            setDiscription(res.data.description)
            setColor(res.data.color)
            setTags(res.data.subServices)
        } catch (error) {
            console.error('Failed to fetch service:', error.response?.data?.message || error.message);
            setServiceData(null); // Clear state on error
        }
    };
    useEffect(() => {

        getService(sname)
    }, [sname])

    return (
        <div className='w-full h-auto pb-10   '>
            <h1 className='text-4xl mx-auto w-full md:w-1/2 text-center py-10'>Edit Service Details</h1>
            <form onSubmit={handlesubmit} className="w-full md:w-1/2 p h-auto flex flex-col  p-5  gap-4  mx-auto border !border-gray-500">
                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <label htmlFor="">Service Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className='border !border-gray-500 focus:outline-none rounded-md  p-1  px-4' name="" id="" />


                <label htmlFor="">Service description</label>
                <textarea name="" value={description} required onChange={(e) => setDiscription(e.target.value)} className='border !border-gray-500 focus:outline-none rounded-md  p-1  px-4 h-32 ' id=""></textarea>

                <label htmlFor="">Sub Service color <span className='text-gray-500 text-xs '>In Hex code</span></label>
                <input type="text" required value={color} onChange={(e) => setColor(e.target.value)} className='border !border-gray-500 focus:outline-none rounded-md  p-1  px-4' name="" id="" />

                <label htmlFor="">Sub Service Name</label>


                <TagInput
                    initialTags={subServices}
                    onTagsChange={(updatedTags) => setTags(updatedTags)}
                    placehold='Hit Enter '

                />

                <input type="submit" disabled={disabled} value={'Submit'} className=' shadow-sm bg-blue-500 border !border-blue-500  text-white   hover:bg-transparent  rounded-md transition-all ease-in-out duration-700 cursor-pointer  py-3  ' />

            </form>
        </div>
    )
}

export default EditS
