import app from "./app.js";
import { sequelize } from "./database/database.js";

const main = async () => {
  try {
    await sequelize.sync()    
    
    app.listen(3001);
    console.log("Server is listening on port 3001");

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
