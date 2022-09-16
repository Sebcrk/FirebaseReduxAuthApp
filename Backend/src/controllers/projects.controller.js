import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
    res.send("Getting projects...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getProject = async (req, res) => {
  try {       
    const {id} = req.params
    const project = await Project.findOne({
        where: {
            id
        }
    });
    if (!project) return res.status(404).json({message: "Project does not exist."})
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, priority, description } = req.body;
    const newProject = await Project.create({
      name,
      priority,
      description,
    });
    res.json(newProject);
    res.send("Creating projects...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const {id} = req.params
    const {name, priority, description} = req.body

    // Gets single record that matches id = req.params.id
    const project = await Project.findByPk(id);

    // Change everyone that has id = req.params.id
    await project.update({name, priority, description})

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

export const deleteProject = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id);
    await Project.destroy({
        where: {id}
    });
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getProjectTasks = async (req, res) => {
  try {       
    const {id} = req.params
    const tasks = await Task.findAll({
      where: {projectId: id}
    });

    // if (!project) return res.status(404).json({message: "Project does not exist."})
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}