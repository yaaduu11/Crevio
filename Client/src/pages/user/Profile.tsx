import React from 'react'
import Sidebar from '../../components/user/sidebar'
import ProfileComponent from '../../components/user/profile'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/storage'
const Profile = () => {
    const user = useSelector((state: RootState)=> state.user)
  return (
    <>
        <div className='flex bg-gray-100'>
            <Sidebar currentPage={'Profile'}/>
            <ProfileComponent user={user}/>
        </div>
    </>
  )
}

export default Profile
