import Sequelize from "sequelize"


export const sequelize = new Sequelize("projectsdb","postgres","password",{
    host: "localhost",
    dialect: "postgres"
})