import React, { useState } from 'react'
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { X, Upload, FileText } from "lucide-react"
import { aichatbot, applyToProject } from '../../api/user'
import { Types } from 'mongoose';
import { useToast } from '../../hooks/use-toast'
import { ProjectType } from '../../types/user.type'

interface DialogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
//   projectId?: string | Types.ObjectId | undefined 
  project: ProjectType | undefined
}

const Dialog_modal = ({ open, onOpenChange, project }: DialogModalProps) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const [ai_rating, setAi_rating] = useState<string | null | undefined>(null)
    const {toast} = useToast()

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
        } else {
            alert('Please upload a PDF file only');
            event.target.value = '';
        }
    };

    const removeResume = () => {
        setResume(null);
        const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        
        if (!coverLetter.trim()) {
            alert('Please provide a Cover letter.');
            return;
        }
        
        if (!resume) {
            alert('Please upload your Resume');
            return;
        }
        
        if (!project || !project._id) {
            console.error("Project Id is undefined");
            return;
        }
        const prompt = `You are a job application assistant. Here is a candidate's cover letter and the project description. Please rate this candidate's suitability for the project out of 10, considering both the cover letter and the project description. Only return a single number between 1 and 10.
        Cover Letter:
        ${coverLetter}

        Project Description:
        ${project?.description}`;
        
        const response1 = await aichatbot(prompt)
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',response1.data as string)
        if(response1.success) {
            setAi_rating(response1.data as string);
        }
        
        const response = await applyToProject(project._id.toString(), coverLetter, resume, ai_rating ? ai_rating : '');
        
        try {
            if(response.success) {
                toast({
                variant: 'success',
                description: 'successfully apply to project.',
                duration: 2500
                })
            }else {
                toast({
                variant: 'warning',
                description: response.error,
                duration: 2500
                })
            }
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
            onOpenChange(false);
            setCoverLetter('');
            setResume(null);
        }
        console.log('description:', coverLetter);
        console.log('Resume:', resume);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white text-black border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="text-black">
                        <DialogTitle className="text-black">Apply for Position</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Tell us about yourself and upload your resume to apply for this position.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="description" className="font-medium text-black">
                                cover letter <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="bg-white text-black border-gray-300 min-h-[120px] resize-none"
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="resume-upload" className="font-medium text-black">
                                Resume <span className="text-red-500">*</span>
                            </Label>
                            
                            {!resume ? (
                                <div className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    <Label htmlFor="resume-upload" className="cursor-pointer">
                                        <span className="text-sm text-gray-600">
                                            Click to upload your resume
                                        </span>
                                        <br />
                                        <span className="text-xs text-gray-400">
                                            PDF files only (Max 1MB)
                                        </span>
                                        <br />
                                        <span className="inline-flex items-center justify-center w-20 h-6 px-3 text-xs text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700">
                                            upload
                                        </span>
                                    </Label>
                                    <Input
                                        id="resume-upload"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm font-medium text-black">{resume.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(resume.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={removeResume}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            {loading? (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
                            ): ('Apply')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Dialog_modal