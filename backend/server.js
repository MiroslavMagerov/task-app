import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Task from './models/Task.js';
import User from './models/User.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB Atlas establecida con éxito');
});

mongoose.connection.on('error', (err) => {
  console.log('Error de conexión a MongoDB Atlas:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB Atlas');
});

// Rutas para la API

// Crear una nueva tarea
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una tarea
app.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send('Tarea no encontrada');
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar una tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('Tarea no encontrada');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
