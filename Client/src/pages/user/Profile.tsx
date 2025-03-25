import React from 'react'
import Sidebar from '../../components/user/sidebar'
import ProfileComponent from '../../components/user/profile'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/storage'
const Profile = () => {
    const user = useSelector((state: RootState)=> state.user)
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed w-64 h-screen ">
          <Sidebar currentPage={'Profile'} />
      </div>

      <div className="flex-1 h-screen p-4 ml-64 overflow-auto">
          <ProfileComponent user={user}/>
      </div>
    </div>
  )
}

export default Profile
