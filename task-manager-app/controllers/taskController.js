const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user; // Assuming user is authenticated and userId is available
  try {
    const task = new Task({
      title,
      description,
      status,
      user: userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user; // Assuming user is authenticated and userId is available

  try {
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};