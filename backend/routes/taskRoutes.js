import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Crear una nueva tarea
router.post('/', async (req, res) => {
  const { title, completed } = req.body;

  // Crear un nuevo documento de tarea
  const task = new Task({
    title,
    completed: completed || false, // Si no se proporciona, será false
  });

  try {
    const savedTask = await task.save(); // Guardar la tarea en la base de datos
    res.status(201).json(savedTask); // Responder con la tarea creada
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Obtener todas las tareas
    res.json(tasks); // Responder con las tareas en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

// Borrar una tarea
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Eliminar la tarea
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(204).send(); // Respuesta sin contenido al eliminar
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar la tarea' });
  }
});

export default router;
