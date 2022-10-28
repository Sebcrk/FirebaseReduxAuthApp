
import { ManualValidation } from "../models/ManualValidation.js";

export const getFirstPersonInQueue = async (req, res) => {
  try {
    const queue = await ManualValidation.findAll();
    if (queue.length === 0) {
      return res.sendStatus(205)
    } else {
      return res.json(queue[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePersonFromQueue = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await ManualValidation.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPersonToQueue = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      role,
      destination,
      entrance,
      dateOfBirth,
    } = req.body;
    const newPerson = await ManualValidation.create({
      id,
      firstName,
      lastName,
      role,
      destination,
      entrance,
      dateOfBirth,
    });
    res.json(newPerson);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
