import React, {useEffect, useState} from 'react';
import { User, Mail, MapPin, Briefcase, Calendar, Link as LinkIcon } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { changeProfile, editUserName, freelancerAddMoreInfo, getProfileImage } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { IFreelancerDetail, UserType } from '../../types/user.type';
import { getMoreInfo_F } from '../../api/user';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
}


const ProfileComponent: React.FC<ProfileProps> = ({user}) => {
  const [fetchedUser, setFetchedUser] = useState<UserType>({} as UserType)
  const [freelancerDetails, setFreelancerDetails] = useState<IFreelancerDetail>({} as IFreelancerDetail)
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState('')
  const [addMoreInfoModal, setAddMoreInfoModal] = useState(false)
  
  const [languages, setLanguages] = useState<string[]>(freelancerDetails?.proficient_languages || []);
  const [skills, setSkills] = useState<string[]>(freelancerDetails?.skills || []);  
  const [languageInput, setLanguageInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const allowedFormats = ["jpg", "jpeg", "png", "webp"];
  const {toast} = useToast()
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState<IFreelancerDetail>({
    user_id: freelancerDetails?.user_id || '',
    profession: freelancerDetails?.profession || '',
    company: freelancerDetails?.company || '',
    qualification: freelancerDetails?.qualification || '',
    bio: freelancerDetails?.bio || '',
    work_experience: freelancerDetails?.work_experience || '',
    proficient_languages: freelancerDetails?.proficient_languages || [],
    skills: freelancerDetails?.skills || [],
    working_days: freelancerDetails?.working_days || '',
    active_hours: freelancerDetails?.active_hours || '',
    basic_price: freelancerDetails?.basic_price || 0,
    standard_price: freelancerDetails?.standard_price || 0,
    premium_price: freelancerDetails?.premium_price || 0,
    portfolio: freelancerDetails?.portfolio || '',
    linkedin: freelancerDetails?.linkedin || '',
    twitter: freelancerDetails?.twitter || '',
  });
  
  
  useEffect(() => {
    const getProfile = async() =>{
       try {
         const response = await getProfileImage()
         if(response.success){
           setProfileImage(response.data.user.profilePicture)
           setFetchedUser(response.data.user)
         }
       } catch (error) {
         console.log(error);  
       }
    }
    getProfile()
    
    const getMoreDetails = async() => {
      try {
        const response = await getMoreInfo_F()
        if(response.success) {
           setFreelancerDetails(response.data.userDetails)
           setLanguages(freelancerDetails.proficient_languages || []);
           setSkills(freelancerDetails.skills || []);
        }else{
          setFreelancerDetails({} as IFreelancerDetail)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMoreDetails()
  }, [profileImage])  
    
  const HandleAddMoreInfoModal = () => {
    setAddMoreInfoModal((prev) => !prev)
  }
  
  const handleAddLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput)) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput("");
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  
  const handleEditClick = () => {
    if (freelancerDetails) {
      setFormData(freelancerDetails);
      setAddMoreInfoModal(true); 
    }
  };
  
  
  const handleEditName = async() => {
    if (isEditing && editedName) {
      if (!editedName.trim()) {
        setError("Name cannot be empty.");
        return;
      }
      
      const response = await editUserName(editedName)
      if(response.success){
        toast({
          variant: "success",
          description: "Username successfully updated",
          duration: 2500,
        });
        
        dispatch(setUser({ name: editedName }))
        setIsEditing(false);
      }else{
        setError(response.error);
        toast({
          variant: 'destructive',
          description: response.error,
          duration: 25000
        })
      }
    }else {
      setIsEditing(true)
    }
  };
  

  const handleProfileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      toast({
        variant: 'destructive',
        description: 'Please select only one image.',
        duration: 3000
      })
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowedFormats.includes(fileExtension)) {
      setError("Invalid file type! Please upload JPG, JPEG, PNG, or WEBP.");
      toast({
        variant: 'destructive',
        description: 'Invalid file type! Please upload JPG, JPEG, PNG, or WEBP.',
        duration: 3000
      })
      
      return;
    }

    const imageURL = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {     
      const response = await changeProfile(formData)              
      if (response.success) {
        setProfileImage(response.data.user.profilePicture)
        toast({
          variant: "success",
          description: "Profile successfully updated",
          duration: 2500,
        });
      }       
    } catch (error) {
        setError("Failed to upload. Please try again.");
    }finally{
        URL.revokeObjectURL(imageURL);
    }
  };
  
  const handleAddMoreInfoSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);

    const freelancerDetails = {
      profession: formData.get("profession") as string,
      company: formData.get("company") as string,
      qualification: formData.get("qualification") as string,
      bio: formData.get("bio") as string,
      work_experience: formData.get("work_experience") as string,
      proficient_languages: languages,
      skills: skills,
      working_days: formData.get("working_days") as string,
      active_hours: formData.get("active_hours") as string,
      basic_price: Number(formData.get("basic_price")),
      standard_price: Number(formData.get("standard_price")),
      premium_price: Number(formData.get("premium_price")),
      portfolio: formData.get("portfolio") as string,
      linkedin: formData.get("linkedin") as string,
      twitter: formData.get("twitter") as string,
    };
    
    console.log("Submitting data:", freelancerDetails);
    
    try {
      const response = await freelancerAddMoreInfo(freelancerDetails)
      if(response.success){
        setFreelancerDetails(response.data.userDetails)
      }else{
        alert('failed')
      }
    } catch (error) {
      console.error(error)
    }
  }
    
  return (
    <div className="min-h-screen py-24 pr-4 ml-16">
      <div className="relative mb-16">
        <div className="w-full h-48 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="absolute -bottom-12 left-8">
          <div className="w-40 h-40 overflow-hidden bg-white border-4 border-white rounded-full shadow-md">
            {profileImage ? (
              <img src={profileImage} alt={fetchedUser.name} className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
                <User size={32} />
              </div>
            )}
            <input 
                type="file" 
                accept=".jpg, .jpeg, .png, .webp" 
                style={{ display: "none" }} 
                id="fileInput" 
                onChange={handleProfileChange}
            />
          </div>
            <h4 className="absolute text-sm text-blue-900 cursor-pointer hover:underline whitespace-nowrap -bottom-[-22px] left-40" onClick={() => document.getElementById("fileInput")?.click()} 
            >
              Update Image
            </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        
        <div className="lg:col-span-3">
          <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-4/5 text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800">{fetchedUser.name}</h1>
              )}
              <button 
                className="flex items-center justify-center w-8 h-8 text-sm text-white transition-all duration-300 bg-black border rounded-2xl hover:scale-125"
                onClick={handleEditName}
              >
                {isEditing ? (
                  <img 
                    src="https://img.icons8.com/?size=150&id=cvB6JC7HJn9v&format=png&color=ffffff" 
                    alt="Edit Icon" 
                    className="w-4 h-4"
                  />
                ) : (
                  '🖉'
                )}
              </button>

            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{fetchedUser.email}</span>
              </div>
              
              {/* <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{user.name}</span>
              </div>
             
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span>{user.role}</span>
              </div> */}
               
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>Joined  <span className='ml-1 font-semibold'>{fetchedUser.createdAt? new Date(fetchedUser.createdAt).toLocaleDateString(): 'N/A'} </span></span>
              </div>
              
              {/* {user.website && (
                <div className="flex items-center text-sm text-gray-600">
                  <LinkIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <a href={user.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {user.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </div>
              )} */}
            </div>
            
            {/* <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium text-gray-800">Bio</h3>
              <p className="text-sm text-gray-600">{user.bio}</p>
            </div> */}
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Freelancer Details</h2>
              <span className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded">
                Available
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
                  <p><span className="font-semibold">Profession:</span> {freelancerDetails.profession}</p>
                  <p><span className="font-semibold">Company:</span>  {freelancerDetails.company}</p>
                  <p><span className="font-semibold">Qualification:</span>  {freelancerDetails.qualification}</p>
                  <p><span className="font-semibold">Work Experience:</span>  {freelancerDetails.work_experience}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">About</h3>
                <p className="mt-2 text-gray-600"> {freelancerDetails.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Work Schedule</h3>
                <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
                  <p><span className="font-semibold">Working Days:</span>  {freelancerDetails.working_days}</p>
                  <p><span className="font-semibold">Active Hours:</span>  {freelancerDetails.active_hours}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {freelancerDetails.skills?.map((lan, index) => (
                    <span key={index} className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-md">
                      {lan}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Proficient Languages</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {freelancerDetails.proficient_languages?.map((skill, index) => (
                    <span key={index} className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Pricing</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <p><span className="font-semibold">Basic:</span> {freelancerDetails.basic_price}</p>
                  <p><span className="font-semibold">Standard:</span> {freelancerDetails.standard_price}</p>
                  <p><span className="font-semibold">Premium:</span> {freelancerDetails.premium_price}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 underline">Social Profiles</h3>
                <div className="flex gap-4 mt-2">
                  <a href={freelancerDetails.portfolio} target="_blank" className="text-blue-500 hover:underline">
                    Portfolio
                  </a>
                  <a href={freelancerDetails.linkedin} target="_blank" className="text-blue-500 hover:underline">
                    LinkedIn
                  </a>
                  <a href={freelancerDetails.twitter} target="_blank" className="text-blue-500 hover:underline">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
        {/* <div className="space-y-6 lg:col-span-1">
          <div className="w-3/4 p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2].map((_, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-blue-600 bg-blue-100 rounded-full">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Activity item {index + 1}</p>
                    <p className="text-sm text-gray-500">This is a placeholder for recent activity</p>
                    <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Stats</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: 'Projects', value: '12' },
                { label: 'Teams', value: '4' },
                { label: 'Followers', value: '243' },
                { label: 'Following', value: '56' }
              ].map((stat, index) => (
                <div key={index} className="p-3 text-center rounded-lg bg-gray-50">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      
      {<div className='flex justify-end mt-5'>
        <button
          className="h-8 px-4 text-white bg-black border border-black rounded-md w-fit hover:bg-gray-900"
          onClick={freelancerDetails ? handleEditClick : HandleAddMoreInfoModal}
        >
          {freelancerDetails ? "Edit" : "Add More Info"}
        </button>
      </div>}
      
      
      {addMoreInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
          <div className="relative flex flex-col w-full max-w-5xl gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">
            <h1 className="mt-2 text-[1.75rem] font-bold text-center" >
              Add More Info
            </h1>
    
            <div className="flex flex-col gap-4 mt-4 mb-12 sm:flex-row">
              <div className="lg:col-span-3">
                <form className="space-y-6" onSubmit={handleAddMoreInfoSubmit}>
                  <div>
                    <textarea
                      name="bio"
                      placeholder="Bio"
                      className="w-full h-20 p-2 border rounded-md"
                      value={formData.bio} 
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <input name="profession" type="text" placeholder="Profession" className="p-2 border rounded-md" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })}  required />
                    <input name="company" type="text" placeholder="Company" className="p-2 border rounded-md" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}  required />
                    <input name="qualification" type="text" placeholder="Qualification" className="p-2 border rounded-md" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}  required />
                    <input name="work_experience" type="text" placeholder="Work Experience" className="p-2 border rounded-md" value={formData.work_experience} onChange={(e) => setFormData({ ...formData, work_experience: e.target.value })}  required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="working-days">Working Days</label>
                      <input 
                        name="working_days"
                        type="text" 
                        id="working-days"
                        placeholder="Eg: Monday to Friday" 
                        className="p-2 border rounded-md" 
                        value={formData.working_days} 
                        onChange={(e) => setFormData({ ...formData, working_days: e.target.value })} 
                        required 
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="active-hours">Active Hours</label>
                      <input 
                        name="active_hours"
                        type="text" 
                        id="active-hours"
                        placeholder="Eg: 9 AM to 5 PM" 
                        className="p-2 border rounded-md" 
                        value={formData.active_hours} 
                        onChange={(e) => setFormData({ ...formData, active_hours: e.target.value })} 
                        required 
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-3 gap-4">
                    <input name="portfolio" type="text" placeholder="Portfolio" className="p-2 border rounded-md" value={formData.portfolio} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}  required />
                    <input name="linkedin" type="text" placeholder="LinkedIn" className="p-2 border rounded-md" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}  required />
                    <input name="twitter" type="text" placeholder="Twitter" className="p-2 border rounded-md" value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Languages */}
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a spoken language"
                          className="w-full p-2 border rounded-md"
                          value={languageInput}
                          onChange={(e) => setLanguageInput(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleAddLanguage}
                          className="px-3 py-2 text-white bg-blue-500 rounded-md"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(freelancerDetails ? freelancerDetails.proficient_languages : languages).map((lang) => (
                          <span key={lang} className="px-2 py-1 text-sm bg-blue-200 rounded-md">
                            {lang}
                            <button onClick={() => handleRemoveLanguage(lang)} className="ml-1 text-red-500">
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add Skill"
                          className="w-full p-2 border rounded-md"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-3 py-2 text-white bg-blue-500 rounded-md"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(freelancerDetails ? freelancerDetails.skills : skills).map((skill) => (
                          <span key={skill} className="px-2 py-1 text-sm bg-green-200 rounded-md">
                            {skill}
                            <button onClick={() => handleRemoveSkill(skill)} className="ml-1 text-red-500">
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>


                  <div className="grid grid-cols-3 gap-4">
                    <input name="basic_price" type="number" placeholder="Basic Price" className="p-2 border rounded-md" required />
                    <input name="standard_price" type="number" placeholder="Standard Price" className="p-2 border rounded-md" required />
                    <input name="premium_price" type="number" placeholder="Premium Price" className="p-2 border rounded-md" required/>
                  </div>
                  
                  <div className="flex justify-between" >
                    <button className='px-6 py-2 text-white bg-black rounded hover:bg-slate-900' onClick={HandleAddMoreInfoModal}>Close</button>
                    <button className='px-6 py-2 text-white bg-black rounded hover:bg-slate-900'>Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;