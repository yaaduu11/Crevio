import { useLocation } from "react-router-dom";
import { ProjectType, UserType } from "../../types/user.type";
import { ArrowLeft, Calendar, Users, Briefcase, Code } from 'lucide-react';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/storage';
import { fetchUserById } from "../../api/user";
import { useEffect, useState } from "react";
import { SheetDemo } from "../ui/sheetDemo";
import Dialog_modal from "./dialog-modal";


const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state?.project as ProjectType;
  const user = useSelector((state: RootState)=> state.user)
  const [uploadedUser, setUploadedUser] = useState<UserType>()
  const [dialogModal, setDialogModal] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  
  
  // const handleApplySubmit = async(projectId: string) => {
  //   setLoading(true)
    
  //   const response = await applyToProject(projectId)
  //   console.log(response)
  //   try {
  //     if(response.success) {
  //        toast({
  //         variant: 'success',
  //         description: 'successfully apply to project.',
  //         duration: 2500
  //        })
  //     }else {
  //       toast({
  //         variant: 'warning',
  //         description: response.error,
  //         duration: 2500
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }finally{
  //     setLoading(false)
  //   }
  // }
  
  const handleDialogModal = () => {
    setDialogModal(true);
  }

  // const handleCloseDialog = () => {
  //     setDialogModal(false);
  // }
  
  useEffect(()=>{
    const fetchUpoloadedUser = async() => {
      try {
        const response = await fetchUserById(project.userId? project.userId.toString(): '')
        if(response.success) {
          setUploadedUser(response.data.user)
        }
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchUpoloadedUser()
  },[])
  
  const handleBack = () => {
    window.history.back();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Dialog_modal open={dialogModal} onOpenChange={setDialogModal} project={project}/>
      
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 py-6 pt-12 text-gray-600 transition-all hover:text-blue-600 group pl-[6%]"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Projects</span>
      </button>

      <main className="px-4 pb-12 mx-auto max-w-[90%] pt-1">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden transition-all bg-white border border-gray-100 shadow-lg hover:shadow-xl rounded-2xl">
              {project.thumbnail && (
                <div className="relative overflow-hidden group">
                  <img 
                    src={typeof project.thumbnail === "string" ? project.thumbnail : "default-image.jpg"}
                    alt={project.title}
                    className="object-cover w-full transition-transform duration-700 h-80 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100" />
                </div>
              )}
              <div className="p-8">
                <div className="flex justify-between">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900 transition-colors hover:text-blue-600">
                    {project.title}
                  </h1>
                    {user.role === 'freelancer' && (
                      loading ? (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                      ) : (
                        <button className="px-6 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl hover:scale-105 active:scale-100 animate-pulse focus:outline-none"
                        onClick={() => {
                            if (project._id) {
                                // handleApplySubmit(project._id.toString());
                                handleDialogModal()
                            }
                        }}
                        >
                          Apply
                        </button>
                      )
                    )}
                </div>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center p-4 transition-all bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 group">
                    <Briefcase className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 transition-all bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 group">
                    <Calendar className="w-6 h-6 mr-3 transition-transform group-hover:scale-110"/>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium">{new Date(project.deadline).toLocaleDateString('en-US', { 
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 mb-8 transition-colors border border-gray-100 rounded-xl hover:border-blue-100">
                  <h3 className="flex items-center mb-4 text-xl font-semibold">
                    <Code className="w-6 h-6 mr-3 text-blue-600" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 text-sm font-medium text-blue-600 transition-all rounded-lg bg-blue-50 hover:bg-blue-100 hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="mb-3 text-xl font-semibold">Additional Information</h3>
                  <p className="leading-relaxed text-gray-600">
                    {project.additional_info}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.role=='client' && user._id==project.userId?.toString() ? 
            (
            <div className="lg:col-span-1">
              <div className="sticky p-8 transition-all bg-white border border-gray-100 shadow-lg top-24 hover:shadow-xl rounded-2xl">
                <div className="flex items-center justify-between ">
                  <h2 className="flex items-center mb-6 text-2xl font-semibold">
                    <Users className="w-6 h-6 mr-3 text-blue-600" />
                    Applicants
                  </h2>
                  <button
                    className="px-6 py-2 mb-6 text-base font-semibold text-white transition-all duration-200 rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Shortlist
                  </button>
                </div>
                
                {project.applicants && project.applicants.length > 0 ? (
                  <div className="space-y-4">
                    {project.applicants.map((applicant, index) => (
                      <div 
                        key={index}
                        className="p-4 transition-all bg-gray-50 rounded-xl hover:bg-blue-50 hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
                            <span className="font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Applicant {index + 1}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied: {new Date(applicant.appliedAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="flex items-center justify-center w-20 h-20 p-6 mx-auto mb-4 rounded-full bg-blue-50">
                      <Users className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-lg font-medium text-gray-900">No applicants yet</p>
                  </div>
                )}
              </div>
            </div>
            ) : (
            <div className="lg:col-span-1">
              <div className="sticky p-8 transition-all bg-white border border-gray-100 shadow-lg top-24 hover:shadow-xl rounded-2xl">
                <h2 className="flex items-center mb-6 text-2xl font-semibold">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Uploaded by
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 transition-all bg-gray-50 rounded-xl hover:bg-blue-50 hover:scale-[1.02]">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={uploadedUser?.profilePicture}
                        alt="Profile"
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{uploadedUser?.name}</p>
                        <p className="text-sm text-gray-500">{uploadedUser?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenSheet(true)}
                      className="w-full px-4 py-2 font-semibold text-white transition-all duration-200 bg-black rounded-full hover:bg-gray-800"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

                {openSheet && uploadedUser && (
                  <SheetDemo
                    user={uploadedUser}
                    open={openSheet}
                    onOpenChange={setOpenSheet}
                  />
                )}

              </div>
            </div>
            )
          }
          
        </div>
      </main>
    </div>
  );
}

export default ProjectDetails