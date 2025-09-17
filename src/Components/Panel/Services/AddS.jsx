import React, { useState } from 'react'
import TagInput from './Taginput'
import axios from 'axios'


const AddS = ({setCurrentindex}) => {
    const url = import.meta.env.VITE_SERVER;

    const [subServices, setTags] = useState([]);
    const [error, setError] = useState(null);

    const [name, setName] = useState('')
    const [description, setDiscription] = useState('')
    const [color, setColor] = useState('')

    // const [disabled,]
    const [disabled, setDisabled] = useState(false)


    const handlesubmit = (e) => {
        e.preventDefault();
        setDisabled(true)

        axios.post(`${url}/addservice`, { name, description, color, subServices })
            .then((res) => {
                console.log(res)

                if (res) {

                    setError('Service Added Successfully!')
                    setCurrentindex('services')
                    setDisabled(false)
                    // setTimeout(() => {
                    setError('')
                    setName('')
                    setDiscription('')
                    setColor('')
                    // }, 5000);

                }
            })
            .catch((err) => { console.log(err) })





    }

    return (
        <div className='w-full h-auto pb-10   '>
            <h1 className='text-4xl mx-auto w-full md:w-1/2 text-center py-10'>Add Service Details</h1>
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
                    initialTags={[]}
                    onTagsChange={(updatedTags) => setTags(updatedTags)}
                    placehold='Hit Enter '

                />

                <input type="submit" disabled={disabled} value={'Submit'} className=' shadow-sm bg-blue-500 border !border-blue-500  text-white   hover:bg-transparent  rounded-md transition-all ease-in-out duration-700 cursor-pointer  py-3  ' />

            </form>
        </div>
    )
}

export default AddS
