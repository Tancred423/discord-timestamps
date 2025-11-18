import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || '7000';
const isProduction = process.env.IS_PROD === 'true' || false;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/favicon.webp', express.static(path.join(__dirname, 'public/favicon.webp')));
app.use('/preview.gif', express.static(path.join(__dirname, 'public/preview.gif')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke :( [500 Internal Server Error]');
});

app.listen(port, () => {
  if (isProduction) {
    console.log(`Listening on port ${port}`);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
