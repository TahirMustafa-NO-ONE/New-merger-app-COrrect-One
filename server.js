
import express from 'express';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';
import multer from 'multer';
import { mergerpdf } from './merger.js';
const upload = multer({ dest: 'uploads/' })
const port = process.env.port || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    let d = await mergerpdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    res.redirect(`http://localhost:4000/static/${d}.pdf`);
    // res.sendFile(path.join(__dirname, `public/${d}.pdf`));
  })

const server = app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
});

// server.close(()=>{
//     console.log("Server is closed")
// })