import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Obtener todas las tareas
router.get('/', async (_, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to get all the tasks' });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  const { title, completed, createdBy } = req.body;

  const task = new Task({
    title,
    completed: completed || false,
    createdBy,
  });

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to create the task' });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed, createdBy } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed, createdBy },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to update the task' });
  }
});

// Borrar una tarea
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to delete the task' });
  }
});

// Borrar todas las tareas
router.delete('/', async (_, res) => {
  try {
    const result = await Task.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(204).send();
    }

    res.status(200).json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to delete all tasks' });
  }
});

export default router;
