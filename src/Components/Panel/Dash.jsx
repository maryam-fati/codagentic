import React from 'react'
import { format } from 'date-fns';
import axios from 'axios';


const Dash = ({ data, getdata, setCurrentindex, setTitle }) => {
  const url = import.meta.env.VITE_SERVER;

  const handeledit = (title) => {
    setTitle(title)
    setCurrentindex('editblog')
  }
  const handeldelete = async (id) => {
    try {
      const res = await axios.post(`${url}/delblog`, { id });
      getdata()

    } catch (error) {

      console.error('Error fetching post:', error);
    } 
    

  }

  return (
    <div id="dashboard" className="  flex-1 overflow-y-auto p-6 ">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Overview </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <!-- Stat Cards --> */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg shadow-lg-gray-700">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-blue-500 bg-opacity-20 text-cyan-400">
                <i data-lucide="file-text" className="w-[20px] h-[20px]"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Total Posts</p>
                <h4 className="text-2xl font-semibold mt-1">{data.length}</h4>
              </div>
            </div>
            {/* <div className="text-xs text-green-500 mt-2 flex items-center">
            <span>↑ 12% from last month</span>
          </div> */}
          </div>

          {/* <div className="bg-gray-800 rounded-lg p-4  shadow-lg shadow-lg-gray-700">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-purple-500 bg-opacity-20 text-purple-400">
                <i data-lucide="eye" className="w-[20px] h-[20px]"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Page Views</p>
                <h4 className="text-2xl font-semibold mt-1">0</h4>
              </div>
            </div>
            <div className="text-xs text-green-500 mt-2 flex items-center">
              <span>↑ 8% from last month</span>
            </div>
          </div> */}

          {/* <div className="bg-gray-800 rounded-lg p-4  shadow-lg shadow-lg-gray-700">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-green-500 bg-opacity-20 text-green-400">
                <i data-lucide="image" className="w-[20px] h-[20px]"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Media Items</p>
                <h4 className="text-2xl font-semibold mt-1">65</h4>
              </div>
            </div>
            <div className="text-xs text-yellow-500 mt-2 flex items-center">
              <span>~ Same as last month</span>
            </div>
          </div> */}

          <div className="bg-gray-800 rounded-lg p-4  shadow-lg shadow-lg-gray-700">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-red-500 bg-opacity-20 text-red-400">
                <i data-lucide="clock" className="w-[20px] h-[20px]"></i>
              </div>
              <div className=" ml-2">
                <p className="text-gray-400 text-sm">Last Updated</p>
                {data.length > 0 && (
                  <h4 className="text-sm  font-semibold mt-1">
                    {format(new Date(data[data.length - 1].date), 'MMM dd yyyy, hh:mm a')}
                  </h4>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2 flex items-center">
              <span>by Mustafa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-md shadow-lg-gray-700">
          <div className="p-4 shadow-lg-b shadow-lg-gray-700 flex justify-between items-center">
            <h3 className="font-medium">Recent Blog Posts</h3>
            <button onClick={() => { setCurrentindex('addblog') }} className="nav-link text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
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
                    <th className="px-4 py-2 text-left font-medium">Author</th>
                    <th className="px-4 py-2 text-left font-medium">Date</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {
                    data.map((data) => (
                      <>
                        <tr className="shadow-lg-b shadow-lg-gray-700">
                          <td className="px-4 py-3">{data.title}</td>
                          <td className="px-4 py-3">{data.author}</td>
                          <td className="px-4 py-3">{format(new Date(data.date), 'MMM dd yyyy')}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-400">Published</span>
                          </td>
                          <td className="px-4 py-3 flex space-x-2">
                            {/* <a href="#blog-edit" className="nav-link p-1 text-gray-400 hover:text-cyan-400">
                              <i data-lucide="edit" className="w-[16px] h-[16px]"></i>
                            </a> */}
                            <button className='px-4 py-2 cursor-pointer rounded-md bg-green-900 text-green-400 hover:text-white' onClick={() => handeledit(data.title)}>
                              Edit
                            </button>
                            <button className='px-4 py-2 cursor-pointer rounded-md bg-red-900 text-red-400 hover:text-white' onClick={() => handeldelete(data._id)}>
                              Delete
                            </button>
                            {/* <button className="p-1 text-gray-400 hover:text-red-400">
                              <i data-lucide="trash-2" className="w-[16px] h-[16px]"></i>
                            </button> */}
                          </td>
                        </tr>
                      </>
                    ))
                  }

                  {/* <tr className="shadow-lg-b shadow-lg-gray-700">
                  <td className="px-4 py-3">Top 10 Software Development Trends</td>
                  <td className="px-4 py-3">Mustafa</td>
                  <td className="px-4 py-3">May 2, 2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-400">Published</span>
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-cyan-400">
                      <i data-lucide="edit" className="w-[16px] h-[16px]"></i>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400">
                      <i data-lucide="trash-2" className="w-[16px] h-[16px]"></i>
                    </button>
                  </td>
                </tr>
                <tr className="shadow-lg-b shadow-lg-gray-700">
                  <td className="px-4 py-3">The Future of Agentic Software</td>
                  <td className="px-4 py-3">Mustafa</td>
                  <td className="px-4 py-3">Apr 28, 2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-400">Draft</span>
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-cyan-400">
                      <i data-lucide="edit" className="w-[16px] h-[16px]"></i>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400">
                      <i data-lucide="trash-2" className="w-[16px] h-[16px]"></i>
                    </button>
                  </td>
                </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* 
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-md shadow-lg shadow-lg-gray-700">
            <div className="p-4 shadow-lg-b shadow-lg-gray-700">
              <h3 className="font-medium">Quick Actions</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <a href="#pages" className="nav-link block w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-sm transition-colors flex items-center">
                  <i data-lucide="layout" className="w-[16px] h-[16px] mr-2"></i>
                  Edit Homepage Content
                </a>
                <a href="#blog" classNameName="nav-link block w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-sm transition-colors flex items-center">
                  <i data-lucide="file-plus" className="w-[16px] h-[16px] mr-2"></i>
                  Create New Blog Post
                </a>
                <a href="#media" className="nav-link block w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-sm transition-colors flex items-center">
                  <i data-lucide="upload" className="w-[16px] h-[16px] mr-2"></i>
                  Upload Media
                </a>
                <a href="#testimonials" className="nav-link block w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-sm transition-colors flex items-center">
                  <i data-lucide="quote" className="w-[16px] h-[16px] mr-2"></i>
                  Manage Testimonials
                </a>
                <a href="#services" className="nav-link block w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-sm transition-colors flex items-center">
                  <i data-lucide="package" className="w-[16px] h-[16px] mr-2"></i>
                  Edit Services
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-md shadow-lg shadow-lg-gray-700">
            <div className="p-4 shadow-lg-b shadow-lg-gray-700">
              <h3 className="font-medium">Traffic Overview</h3>
            </div>
            <div className="p-4">
              <div className="h-48 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <i data-lucide="bar-chart-2" className="w-[120px] h-[120px] text-gray-700"></i>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-gray-700 p-2 rounded-md">
                  <p className="text-xs text-gray-400">This Week</p>
                  <p className="text-lg font-medium">1,652</p>
                </div>
                <div className="bg-gray-700 p-2 rounded-md">
                  <p className="text-xs text-gray-400">Last Week</p>
                  <p className="text-lg font-medium">1,420</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Dash
