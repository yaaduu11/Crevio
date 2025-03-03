import Sidebar from "../../components/user/sidebar";

import React from 'react'

const Dashboard = () => {
  return (
    <>
      <div className='flex bg-gray-100'>
        <Sidebar currentPage={'Dashboard'}/>
      </div>
    </>
  )
}

export default Dashboard
