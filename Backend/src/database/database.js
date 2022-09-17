import Sequelize from "sequelize"


export const sequelize = new Sequelize("projects","postgres","password",{
    host: "localhost",
    dialect: "postgres"
})