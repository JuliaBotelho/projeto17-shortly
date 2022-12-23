import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import signinRoutes from "./routes/signin.routes.js"
import signupRoutes from "./routes/signup.routes.js"
import userRoutes from "./routes/users.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import rankingRoutes from "./routes/ranking.routes.js"

dotenv.config();

const app = express();
app.use(express.json());
/* app.use(cors()); */

app.use(signupRoutes);
app.use(signinRoutes);
app.use(userRoutes);
app.use(urlsRoutes);
app.use(rankingRoutes);


const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));