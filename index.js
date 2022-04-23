import express from 'express';
import bodyParser from 'body-parser';

import branchesRoutes from './routes/branch.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/branches', branchesRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage'));

app.listen(PORT, () => console.log(`Server runninh on port: http://localhost:${PORT}`));