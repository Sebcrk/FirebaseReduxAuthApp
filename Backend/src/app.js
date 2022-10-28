import express from "express";
import projectRoutes from "./routes/projects.routes.js";
import manualValidationRoutes from "./routes/manualvalidation.routes.js"


const app = express();

//middlewares


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
});
app.use(express.json());

app.use(projectRoutes);
app.use(manualValidationRoutes);
export default app;
