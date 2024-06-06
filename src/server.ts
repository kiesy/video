import express from 'express';
import { renderMedia,  selectComposition } from '@remotion/renderer';
import { bundle } from "@remotion/bundler";
import { handleFileOperations } from './utils/googledriveutils'
import fs from 'fs';
import path from "path";
import { getFacebookPages, getInstagramBusinessAccount, createMediaObject, publishMediaObject } from './utils/facebookUtils'



interface VideoRenderOptions {
  serveUrl: string;
  composition: string;
  props: any;
}


// This function renders the video and uploads it to Google Cloud Storage
async function renderAndUploadVideo(options: VideoRenderOptions): Promise<string> {
  try {
    console.log('Received props:', options);  // Debug log to verify props
    const compositionObject = await selectComposition({
      serveUrl: options.serveUrl,
      id: options.composition,
      inputProps: options.props
    });
    console.log('Composition object:', compositionObject);  // Ensure this is correct
    const outputLocation = 'output.mp4'; // Define the output file path
    await renderMedia({
      composition: compositionObject,
      serveUrl: options.serveUrl,
      codec: "h264",
      outputLocation,
      inputProps: options.props,
    });

    // Read the file into a buffer
    const fileBuffer = fs.readFileSync(outputLocation);
    const fileName = path.basename(outputLocation);
    const mimeType = 'video/mp4';  // You would need to determine this based on the actual file type

    // Upload the file to Google Cloud Storage
    const videoURL = await handleFileOperations(fileBuffer, fileName, mimeType);
    console.log(`Uploaded File to ${videoURL}`);
    return videoURL;
  } catch (error) {
    console.error('Error during video rendering and upload:', error);
    throw error;  // Re-throw the error to be caught by the caller
  }
}

const app = express();
app.use(express.json());
let serveUrl = '';



async function processVideoAndPublishToInstagram(accessToken: string, serveUrl: string, composition: string, props: any, caption: string): Promise<void> {
  try {
    const videoUrl = await renderAndUploadVideo({ serveUrl, composition, props });
    console.log('Video rendered and uploaded');

    const pagesResponse = await getFacebookPages(accessToken);
    const facebookPages = pagesResponse.data;
    if (!facebookPages || facebookPages.length === 0) {
      throw new Error('No Facebook pages found.');
    }
    console.log('Got Facebook page');

    const businessAccountResponse = await getInstagramBusinessAccount(facebookPages[0].id, accessToken);
    const instagramAccountId = businessAccountResponse.instagram_business_account.id;
    console.log('Got Instagram business account');

    const mediaObjectResponse = await createMediaObject(instagramAccountId, videoUrl, caption, accessToken);
    const containerId = mediaObjectResponse.id;
    console.log('Created media object');

    await publishMediaObject(instagramAccountId, containerId, accessToken);
    console.log('Published video on Instagram');
  } catch (error) {
    console.error('Error during processing:', error);
  }
}


app.post('/publish-video-to-instagram', async (req: express.Request, res: express.Response) => {
  const { accessToken, serveUrl, composition, props, caption } = req.body;

  // Start the video process in the background
  processVideoAndPublishToInstagram(accessToken, serveUrl, composition, props, caption)
    .then(() => console.log('Background video processing completed.'))
    .catch(error => console.error('Background video processing failed:', error));

  // Immediately respond to the client
  res.status(202).send({ message: 'Video processing started' });
});

async function renderVideoAsync({ serveUrl, composition, props }: VideoRenderOptions): Promise<string> {
  try {
    console.log('Received props:', props);  // Debug log to verify props
    const compositionObject = await selectComposition({ serveUrl, id: composition, inputProps: props });
    console.log('Composition object:', compositionObject);  // Ensure this is correct
    const outputLocation = 'output (1).mp4'; // Define the output file path
    await renderMedia({
      composition: compositionObject,
      serveUrl,
      codec: "h264",
      outputLocation,
      inputProps: props,
    });
    
    // Read the file into a buffer and simulate creating a 'File' object
    const fileBuffer = fs.readFileSync(outputLocation);
    const fileName = path.basename(outputLocation);
    const mimeType = 'video/mp4';  // You would need to determine this based on the actual file type
    
    // After rendering, upload the file to Google Cloud Storage
    const URL =  await handleFileOperations(fileBuffer, fileName, mimeType);
    console.log(`Uploaded File to ${URL}`)
    return URL
  } catch (error) {
    console.error('Error during video rendering:', error);
    throw error;  // Re-throw the error to be caught by the caller
  }
}
app.get('/bundle', async (req: express.Request, res: express.Response) => {
  console.log('fucked up');
  
    try {
      serveUrl = await bundle({
        entryPoint: path.join(process.cwd(), "./src/index.ts"),
      });
      res.send(serveUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error bundling');
    }
  });
  app.post('/render-video', async (req, res) => {
      const { serveUrl, composition, propsData } = req.body;
      const props = {
        dealsData: propsData.dealsData,
        storeName: propsData.storeName
      };
  
      // Start rendering in the background
      renderVideoAsync({ serveUrl, composition, props })
        .then(() => {
          console.log('Video rendering completed successfully.');
        })
        .catch(error => {
          console.error('Error during video rendering:', error);
        });
  
      // Immediately respond to the request
      res.send({
        status: 'Rendering started',
        message: 'Video rendering has been initiated, and it is processing in the background.'
      });
  });

app.get('/hello', (req, res) => {
    console.log('Hello World route accessed');
    res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});