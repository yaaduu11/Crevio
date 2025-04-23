import Sidebar from "../../components/user/sidebar";
import MyProjectsSection from '../../components/user/myProjects';

const MyProjects = () => {
  return (
    <>
      <div className='flex bg-white'>
        <div className="fixed top-0 left-0 z-50 h-screen">
          <Sidebar currentPage={'My Projects'} />
        </div>

        <div className="w-full pt-8 pl-[12%]">
          <MyProjectsSection />
        </div>
      </div>
    </>

  )
}

export default MyProjects