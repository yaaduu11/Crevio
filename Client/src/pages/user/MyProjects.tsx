import Sidebar from "../../components/user/sidebar";
import MyProjectsSection from '../../components/user/myProjects';

const MyProjects = () => {
  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-100">
      <Sidebar currentPage={'My Projects'} />

      <div className="w-full h-full pt-12 overflow-y-auto transition-all duration-300 peer-checked:ml-16" >
        <div className="p-0">
          <MyProjectsSection />
        </div>
      </div>
    </div>
  )
}

export default MyProjects