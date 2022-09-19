import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ManualValidation = sequelize.define(
  "manualValidation",
  {
    id: { 
      type: DataTypes.BIGINT,  primaryKey: true 
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    destination: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    entrance: {
      type: DataTypes.INTEGER,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);
