require('dotenv').config();

const express = require('express');
const router = require('./src/routes');

const app = express();

app.use(express.json());

// grouping router endpoint
app.use('/api/v1/', router);

// static file directory  by file upload
app.use('/uploads', express.static('uploads'));

const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
