import React from 'react'
import Navbar from '../../components/user/navbar'
import ProjectsPage from '../../components/user/projects'

const Projects = () => {
  return (
    <>
      <Navbar currentPage='projects'/>
      <div className='pt-40'>
        <ProjectsPage/>
      </div>
    </>
  )
}

export default Projects
