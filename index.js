const express = require('express');
const router = require('./src/routes');

const app = express();

app.use(express.json());

// grouping router endpoint
app.use('/api/v1/', router);

const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
