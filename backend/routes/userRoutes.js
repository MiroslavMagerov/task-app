import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Imprimir errores en consola
    res.status(400).json({ message: error.message });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    // Lógica de autenticación aquí (comprobar contraseñas, generar token JWT, etc.)
    res.status(200).json({ token: 'token_jwt_aquí' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Conseguir todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.json(users); // Responder con los usuarios en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id); // Eliminar el usuario
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send(); // Respuesta sin contenido al eliminar
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al borrar el usuario' });
  }
});

export default router;
