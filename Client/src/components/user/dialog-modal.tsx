import React, { useState } from 'react'
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { X, Upload, FileText } from "lucide-react"

interface DialogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog_modal = ({ open, onOpenChange }: DialogModalProps) => {
    const [description, setDescription] = useState('');
    const [resume, setResume] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
        } else {
            alert('Please upload a PDF file only');
            // Reset the file input
            event.target.value = '';
        }
    };

    const removeResume = () => {
        setResume(null);
        // Reset the file input
        const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!description.trim()) {
            alert('Please provide a description');
            return;
        }
        
        if (!resume) {
            alert('Please upload your resume');
            return;
        }

        // Handle form submission here
        console.log('Description:', description);
        console.log('Resume:', resume);
        
        // Close modal after successful submission
        onOpenChange(false);
        
        // Reset form
        setDescription('');
        setResume(null);
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
                        {/* Description Input */}
                        <div className="grid gap-3">
                            <Label htmlFor="description" className="font-medium text-black">
                                Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-white text-black border-gray-300 min-h-[120px] resize-none"
                                required
                            />
                        </div>

                        {/* Resume Upload */}
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
                            Apply
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Dialog_modal