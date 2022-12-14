import { Project } from "../models/Project.js";

export const getFirstProject = async (req, res) => {
  try {
    const projects = await Project.findAll();
    if (projects.length === 0) {
      return res.sendStatus(205)
    } else {
      return res.json(projects[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Project.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
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
    const newProject = await Project.create({
      id,
      firstName,
      lastName,
      role,
      destination,
      entrance,
      dateOfBirth,
    });
    res.json(newProject);
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
