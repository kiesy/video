import { Storage } from '@google-cloud/storage';

// Define a TypeScript interface for function responses to improve type-checking

// Create a new Storage object
const storage = new Storage({
    projectId: 'lucid-inquiry-425617-n3',
    keyFilename: 'C:\\Users\\User\\Downloads\\lucid-inquiry-425617-n3-4a1553b22887.json'
});

// The name of the bucket
const bucketName = 'videobucketleveledgroceries';



// Example usage of the above function
export async function handleFileOperations(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  const stream = file.createWriteStream({
    metadata: {
      contentType: mimeType,
    },
    resumable: false,
    gzip: true
  });

  return new Promise((resolve, reject) => {
    stream.on('error', err => reject(err))
          .on('finish', () => {
            // Removed makePublic call, assuming the bucket's settings already allow the necessary access
            resolve(`https://storage.googleapis.com/${bucketName}/${fileName}`);
          })
          .end(fileBuffer);
  });
}