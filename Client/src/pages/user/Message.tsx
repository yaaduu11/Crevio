import React from 'react'
import Sidebar from '../../components/user/sidebar'
import Messages from '../../components/user/messages'

const Message = () => {
  return (
    <>
      <div className='flex bg-gray-100'>
        <Sidebar currentPage={'Messages'} />
        <div className="w-full">
          <Messages />
        </div>
      </div>
    </>
  )
}

export default Message