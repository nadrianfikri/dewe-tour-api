require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./src/routes');

const app = express();

const port = 5000;
app.use(express.json());
app.use(cors());

// grouping router endpoint
app.use('/api/v1/', router);

// static file directory  by file upload
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
