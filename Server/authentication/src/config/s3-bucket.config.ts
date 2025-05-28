import { S3Client, PutObjectCommand, ObjectCannedACL, GetObjectCommand } from '@aws-sdk/client-s3';
import { env } from './env.config';

export const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(fileBuffer: Buffer): Promise<string> {
  const bucketName = env.AWS_BUCKET_NAME!;
  const fileName = `profile_images/${Date.now()}.jpg`;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: 'image/jpeg',
  };

  console.log('Uploading with params:', uploadParams);

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    console.log('okayda');
    return `https://${bucketName}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error('S3 Upload Error:', err);
    throw err;
  }
}

export async function getProfileImageStreamService(filename: string) {
    const command = new GetObjectCommand({
        Bucket: env.AWS_BUCKET_NAME!,
        Key: `profile_images/${filename}`,
    });

    return await s3.send(command);
}

export async function handleProfileImageUpload_s3(fileBuffer: Buffer): Promise<string> {
    return uploadToS3(fileBuffer);
}