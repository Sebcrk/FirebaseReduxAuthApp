import { Task } from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
    res.send("Getting tasks...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: {
        id,
      },
      // To get a specific attribute
      attributes: ["name"],
    });
    if (!task) return res.status(404).json({ message: "Task does not exist." });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, done, projectId } = req.body;
    const newTask = await Task.create({
      name,
      done,
      projectId,
    });
    res.json(newTask);
    res.send("Creating task...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done, projectId } = req.body;

    // Gets single record that matches id = req.params.id
    const task = await Task.findByPk(id);

    // Change everyone that has id = req.params.id
    await task.update({ name, done, projectId });

    // Change all records that match id = req.params.id
    // await task.update({name, priority, description}, {
    //     where: {
    //         id
    //     }
    // });
    console.log(task);

    res.send("Updating task...");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Task.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
