import React, {useEffect, useState} from 'react';
import { User, Mail } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { changeProfile, editUserName, getProfileImage } from '../../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
}



const ProfileComponent: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState('')
  const allowedFormats = ["jpg", "jpeg", "png", "webp"];
  const {toast} = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
     const getProfile = async() =>{
        try {
          const response = await getProfileImage()
          if(response.success){
            setProfileImage(response.data.user.profilePicture)
          }
        } catch (error) {
          console.log(error);  
        }
     }
     getProfile()
  }, [])
  
  
  const handleEditSave = async() => {
    if (isEditing) {
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
      console.log(imageURL);
      console.log(formData);
      
        const response = await changeProfile(formData)
        console.log(response);
                
        if (response.success) {
          window.location.reload();
        }       
    } catch (error) {
        setError("Failed to upload. Please try again.");
    }finally{
        URL.revokeObjectURL(imageURL);
    }
  };
    
  return (
    <div className="min-h-screen py-24 pr-4 ml-16">
      <div className="relative mb-16">
        <div className="w-full h-48 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="absolute -bottom-12 left-8">
          <div className="w-40 h-40 overflow-hidden bg-white border-4 border-white rounded-full shadow-md">
            {profileImage ? (
              <img src={profileImage} alt={user.name} className="object-cover w-full h-full" />
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
        <div className="lg:col-span-1">
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
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              )}
              <button 
                className="flex items-center justify-center w-8 h-8 text-sm text-white transition-all duration-300 bg-black border rounded-2xl hover:scale-125"
                onClick={handleEditSave}
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
            {/* <p className="mb-4 text-gray-500">{user.jobTitle}</p> */}
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{user.email}</span>
              </div>
              
              {/* <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{user.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span>{user.company}</span>
              </div>
               */}
              {/* <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>Joined {user.name}</span>
              </div> */}
              
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
        
        <div className="space-y-6 lg:col-span-1">
          {/* <div className="p-6 bg-white rounded-lg shadow">
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
          </div> */}
          

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
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;