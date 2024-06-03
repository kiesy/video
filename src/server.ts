import express from 'express';
import { renderMedia,  selectComposition } from '@remotion/renderer';
import { bundle } from "@remotion/bundler";

import path from "path";

const app = express();
app.use(express.json());
let serveUrl = '';

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
    const { serveUrl, composition, dealsData } = req.body;
    const props = {
      dealsData,
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

  async function renderVideoAsync({ serveUrl, composition, props }:any) {
    try {
        console.log('Received props:', props);  // Debug log to verify props
        const composition_object = await selectComposition({ serveUrl, id: composition });
        console.log('Composition object:', composition_object);  // Ensure this is correct

        await renderMedia({
            composition: composition_object,
            serveUrl,
            codec: "h264",
            outputLocation: 'output (1).mp4',
            inputProps: props,
        });
    } catch (error) {
        console.error('Error during video rendering:', error);
        throw error;  // Re-throw the error to be caught by the caller
    }
}
app.get('/hello', (req, res) => {
    console.log('Hello World route accessed');
    res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});