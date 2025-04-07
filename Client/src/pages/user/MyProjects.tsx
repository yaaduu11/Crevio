import Sidebar from "../../components/user/sidebar";
import MyProjectsSection from '../../components/user/myProjects';

const MyProjects = () => {
  return (
    <>
      <div className='flex bg-gray-100'>
        <Sidebar currentPage={'My Projects'} />
        <div className="w-full pt-24 ">
          <MyProjectsSection />
        </div>
      </div>
    </>
  )
}

export default MyProjects