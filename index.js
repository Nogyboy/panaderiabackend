
import express from "express";
import cors from "cors";
import sql from "./src/config/db.js";

import breadboxRoutes from "./src/routes/breadboxRoutes.js";


const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.use('/api/breadbox', breadboxRoutes);


app.get('/', (request, response) => {
  response.send('Building an amazing website...')
})

app.listen(port, () => {
  console.log(`The server is running on ${port} port...`)
})
