import { Project } from "../models/Project.js";
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

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: {
        id,
      },
    });
    if (!project)
      return res.status(404).json({ message: "Project does not exist." });
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    // Gets single record that matches id = req.params.id
    const project = await Project.findByPk(id);

    // Change everyone that has id = req.params.id
    await project.update({ name, priority, description });

    // Change all records that match id = req.params.id
    // await Project.update({name, priority, description}, {
    //     where: {
    //         id
    //     }
    // });
    console.log(project);

    res.send("Updating project...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findAll({
      where: { projectId: id },
    });

    // if (!project) return res.status(404).json({message: "Project does not exist."})
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
