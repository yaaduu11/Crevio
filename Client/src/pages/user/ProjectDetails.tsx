import React from 'react'
import Navbar from '../../components/user/navbar'
import Project_details from '../../components/user/project_details'

const ProjectDetails = () => {
  return (
    <>
      <Navbar currentPage='projects'/>
      <div className='pt-40'>
        <Project_details/>
      </div>
    </>
  )
}

export default ProjectDetails