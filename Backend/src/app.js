import express from "express";
import projectRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import manualValidationRoutes from "./routes/manualvalidation.routes.js"

//GraphQL
import {graphqlHTTP } from "express-graphql"
import schema from "./schema/schema.js";

const app = express();

//middlewares
//GraphQL
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true //only for development
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
});
app.use(express.json());

app.use(projectRoutes);
app.use(taskRoutes);
app.use(manualValidationRoutes);
export default app;
