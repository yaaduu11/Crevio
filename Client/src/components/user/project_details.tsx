import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Modal_right_side from '../../assets/user/modal_right.avif';

const project_details = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen p-6 bg-white">
        <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
          ← Back
        </Button>
  
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <img
              src={Modal_right_side}
              alt="Project Thumbnail"
              className="object-cover w-full h-80 rounded-2xl"
            />
          </div>
  
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Project Title</h1>
              <p className="mb-4 text-gray-600">
             description for the project.
              </p>
  
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-yellow-600">4.5 Rating</span>
              </div>
  
              <div className="mb-6 text-lg font-semibold text-indigo-600">Budget: ₹999</div>
  
              <Button className="w-full sm:w-auto">Apply</Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default project_details