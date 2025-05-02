import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import Modal_right_side from '../../assets/user/modal_right.avif'
import { useState } from "react";
import { addProject } from "../../api/user";
import { ProjectType } from "../../types/user.type";
import { useToast } from "../../hooks/use-toast";

const dummyProjects = Array.from({ length: 6 }, (_, i) => ({
id: i + 1,
title: `project ${i + 1}`,
description: "Looking for skilled freelancers to design a modern Figma UI.",
price: 999,
rating: 4.5,
image: Modal_right_side,
}));

const categoryData = [
    { title: "Graphic & Design" },
    { title: "Programming & Tech" },
    { title: "Finance & Accounting" },
    { title: "Photography & Editing" },
    { title: "Video & Animation" },
    { title: "Writing & Translation" },
    { title: "Marketing & Sales" },
    { title: "Business & Consulting" },
    { title: "Education & Training" },
    { title: "Music & Audio" },
    { title: "Game Development" },
    { title: "AI & Machine Learning" },
    { title: "Data Science & Analytics" },
    { title: "Virtual Assistance" },
    { title: "Customer Support" },
    { title: "Personal & Lifestyle" },
  ];  

const MyProjectsSection = () => {
    const {toast} = useToast()
    const [addProjectModal, setAddProjectModal] = useState(false)
    const [formData, setFormData] = useState<ProjectType>({
        title: "",
        thumbnail: null,
        description: "",
        category: "",
        skills: [],
        deadline: "",
        additional_info: "",
      });      
    
      const [skillInput, setSkillInput] = useState("");
      const [skills, setSkills] = useState<string[]>([]);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, thumbnail: file }));
      };
    
      const handleAddSkill = () => {
        if (skillInput && !formData.skills.includes(skillInput)) {
          setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, skillInput],
          }));
          setSkillInput("");
        }
      };
      
      const handleRemoveSkill = (skillToRemove: string) => {
        setFormData((prev) => ({
          ...prev,
          skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
      };
    
    //   const handleAddProject = async (e: React.FormEvent) => {
    //     e.preventDefault();
        
    //     console.log(formData)
      
    //     const payload = new FormData();
    //     payload.append("title", formData.title);
    //     if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);
    //     payload.append("description", formData.description);
    //     payload.append("category", formData.category);
    //     payload.append("deadline", formData.deadline);
    //     payload.append("additional_info", formData.additional_info);
    //     payload.append("skills", JSON.stringify(formData.skills));
        
    //     // console.log(payload);
        
    //     const response = await addProject(payload);
      
    //     if (response.success) {
    //       toast({
    //         variant: "success",
    //         description: "Project successfully added.",
    //         duration: 2500,
    //       });
    //       setAddProjectModal(false);
    //       setFormData({
    //         title: "",
    //         thumbnail: null,
    //         description: "",
    //         category: "",
    //         skills: [],
    //         deadline: "",
    //         additional_info: "",
    //       });
    //     } else {
    //       toast({
    //         variant: "destructive",
    //         description: `Failed to add project: ${response.error}`,
    //         duration: 3000,
    //       });
    //     }
    //   };
      
    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        
        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("category", formData.category);
        form.append("deadline", formData.deadline);
        form.append("additional_info", formData.additional_info);
        form.append("skills", JSON.stringify(formData.skills));
      
        if (formData.thumbnail) {
          form.append("projectsImage", formData.thumbnail);
        }
        
        try {
          const response = await addProject(form);
          if (response.success) {
            toast({
              variant: "success",
              description: "Project successfully added.",
              duration: 2500,
            });
            
            setAddProjectModal(false);
            setFormData({
              title: "",
              thumbnail: null,
              description: "",
              category: "",
              skills: [],
              deadline: "",
              additional_info: "",
            });
          } else {
            toast({
              variant: "destructive",
              description: `Failed to add project: ${response.error}`,
              duration: 3000,
            });
          }
        } catch (err) {
          toast({
            variant: "destructive",
            description: "Something went wrong. Please try again.",
            duration: 3000,
          });
          console.error("Add project error:", err);
        }
      };
      
      
      
      
    const handleModalOpen = () => {
        setAddProjectModal((prev) => !prev)
    }

    return (
        <> 
        <main className="w-full px-4 sm:px-8">
            <div className="flex justify-between">
                <h1 className="mb-6 text-3xl font-bold">My Projects</h1>
                <button className="w-32 font-bold text-white bg-black border border-black h-9 rounded-xl" onClick={handleModalOpen}>+ Add Project</button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dummyProjects.map((project) => (
                    <Card key={project.id} className="transition shadow-md rounded-2xl hover:shadow-lg">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-40 rounded-t-2xl"
                    />
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                        <p className="mb-2 text-sm text-gray-500 truncate">
                        {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600">₹{project.price}</span>
                        <span className="flex items-center text-sm text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            {project.rating}
                        </span>
                        </div>
                    </CardContent>
                    </Card>
                ))}
            </div>
        </main>
        
        {addProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative flex flex-col w-full max-w-5xl h-[90vh] overflow-y-auto gap-4 p-8 mx-4 transition-all duration-500 ease-out transform bg-white rounded-lg animate-slideIn">
            <h1 className="mt-2 text-[1.75rem] font-bold text-center" >
                Add Project
            </h1>

            <div className="lg:col-span-3">
                <div className="w-full max-w-3xl mx-auto">
                {/* <form className="space-y-6">
                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    className="w-full p-2 border rounded-md"
                    required
                />

                <div>
                    <label className="block mb-1 font-medium">Thumbnail Image</label>
                    <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="w-full p-2 border rounded-md"
                    required
                    />
                </div>

                <textarea
                    name="description"
                    placeholder="Describe your project in detail..."
                    className="w-full p-2 border rounded-md h-28"
                    required
                />

                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        name="category"
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Category</option>
                        {categoryData.map((category, index) => (
                        <option key={index} value={category.title}>
                            {category.title}
                        </option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Skills Required</label>
                    <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a skill"
                        className="w-full p-2 border rounded-md"
                        // value={skillInput}
                        // onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <button
                        type="button"
                        // onClick={handleAddSkill}
                        className="px-3 py-2 text-white bg-blue-500 rounded-md"
                    >
                        Add
                    </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 text-sm bg-green-200 rounded-md">
                            {skill}
                            <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 text-red-500"
                                type="button"
                            >
                                ✕
                            </button>
                            </span>
                        ))}
                        </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Deadline</label>
                    <input
                    type="date"
                    name="deadline"
                    className="w-full p-2 border rounded-md"
                    required
                    />
                </div>

                <textarea
                    name="additional_info"
                    placeholder="Any other information you'd like to add..."
                    className="w-full h-20 p-2 border rounded-md"
                />

                <div className="flex justify-between">
                    <button
                    type="button"
                    className="px-6 py-2 text-white bg-black rounded hover:bg-slate-900"
                    onClick={handleModalOpen}
                    >
                    Close
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 text-white bg-black rounded hover:bg-slate-900"
                    >
                    Save
                    </button>
                </div>
                </form> */}
                <form className="space-y-6" onSubmit={handleAddProject}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        className="w-full p-2 border rounded-md"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block mb-1 font-medium">Thumbnail Image</label>
                        <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        className="w-full p-2 border rounded-md"
                        onChange={handleFileChange}
                        required
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Describe your project in detail..."
                        className="w-full p-2 border rounded-md h-28"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                        name="category"
                        className="w-full p-2 border rounded-md"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        >
                        <option value="">Select Category</option>
                        {categoryData.map((category, index) => (
                            <option key={index} value={category.title}>
                            {category.title}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Skills Required</label>
                        <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a skill"
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
                        {formData.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 text-sm bg-green-200 rounded-md">
                            {skill}
                            <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 text-red-500"
                                type="button"
                            >
                                ✕
                            </button>
                            </span>
                        ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Deadline</label>
                        <input
                        type="date"
                        name="deadline"
                        className="w-full p-2 border rounded-md"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <textarea
                        name="additional_info"
                        placeholder="Any other information you'd like to add..."
                        className="w-full h-20 p-2 border rounded-md"
                        value={formData.additional_info}
                        onChange={handleChange}
                    />

                    <div className="flex justify-between">
                        <button
                        type="button"
                        className="px-6 py-2 text-white bg-black rounded hover:bg-slate-900"
                        onClick={handleModalOpen}
                        >
                        Close
                        </button>
                        <button
                        type="submit"
                        className="px-6 py-2 text-white bg-black rounded hover:bg-slate-900"
                        >
                        Save
                        </button>
                    </div>
                </form>

            </div>
            </div>
        </div>
        </div>
        
        )} 
        </> 
    );
};
  

export default MyProjectsSection