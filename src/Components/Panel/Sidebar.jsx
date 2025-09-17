import React from 'react'
import { useNavigate} from 'react-router'

const Sidebar = () => {
    const navi = useNavigate()
    const admin = JSON.parse(localStorage.getItem('admin'));
    console.log(admin)
    const handlelogout = () =>{
        localStorage.removeItem('token')
        navi('/Login')
        
    }
  return (
    <div class="w-64 bg-gray-800 h-full  flex flex-col border-r border-gray-700 main-sidebar">
      <div class="p-4 border-b border-gray-700">
        <h1 class="text-xl font-bold text-cyan-400">Codagentic</h1>
        <p class="text-xs text-gray-400">Admin Panel</p>
      </div>
      
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <a href="#dashboard" class="nav-link flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
              <i data-lucide="home" class="w-[18px] h-[18px] mr-3"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#blog" class="nav-link flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
              <i data-lucide="file-text" class="w-[18px] h-[18px] mr-3"></i>
              <span>Blog Posts</span>
            </a>
          </li>
          <li>
            <a href="#pages" class="nav-link flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
              <i data-lucide="layers" class="w-[18px] h-[18px] mr-3"></i>
              <span>Pages</span>
            </a>
          </li>
          <li>
            <a href="#media" class="nav-link flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
              <i data-lucide="image" class="w-[18px] h-[18px] mr-3"></i>
              <span>Media</span>
            </a>
          </li>
          <li>
            <a href="#settings" class="nav-link flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
              <i data-lucide="settings" class="w-[18px] h-[18px] mr-3"></i>
              <span>Settings</span>
            </a>
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
    
  )
}

export default Sidebar
