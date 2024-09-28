import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const router = express.Router();

// Conseguir todos los usuarios
router.get('/', async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Ruta para hacer login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: `No account with the username ${username} found.` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'The password is incorrect.' });
    }

    // Si la contraseña es correcta, genera el token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    // Envia la cookie al cliente
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    console.log(cookie);

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta para registrar un usuario nuevo
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Username already exists. Please choose another one.',
      });
    }

    res
      .status(500)
      .json({ message: 'Error when trying to sign up this user.' });
  }
});

router.post('/logout', (_, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Successfull logout' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

// Eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when searching for this user' });
  }
});

// Borrar todos los usuarios
router.delete('/', async (_, res) => {
  try {
    const result = await User.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(204).send();
    }

    res.status(200).json({ message: 'All users deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error when trying to delete all users' });
  }
});

export default router;
