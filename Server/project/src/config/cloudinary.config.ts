import {v2 as cloudinary} from 'cloudinary';
import { env } from './env.config'

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME as string,
    api_key: env.CLOUDINARY_API_KEY as string,
    api_secret: env.CLOUDINARY_API_SECRET as string
})

function uploadImageToCloudinary(fileBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: 'profile_images', resource_type: 'image'},
            (error, result) => {
                if(error) {
                    return reject(error);
                }else if(result?.secure_url) {
                    resolve(result.secure_url)
                }else{
                    reject(new Error("Upload failed: No secure URL returned."))
                }
            }
        )
        uploadStream.end(fileBuffer)
    })
}

function uploadPDFToCloudinary(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resumes',
        resource_type: 'raw',
      },
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) return resolve(result.secure_url);
        reject(new Error('PDF upload failed: No secure URL returned.'));
      }
    );
    uploadStream.end(fileBuffer);
  });
}


export async function handleProfileImageUpload(fileBuffer: Buffer): Promise<string> {
    return uploadImageToCloudinary(fileBuffer)
}

export async function handlePDFUpload(fileBuffer: Buffer): Promise<string> {
  return uploadPDFToCloudinary(fileBuffer);
}
