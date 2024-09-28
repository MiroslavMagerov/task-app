import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import keepAlive from './keepAlive.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

keepAlive();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://miroslavmagerov-fullstack-app.netlify.app',
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB Atlas establecida con éxito');
});

mongoose.connection.on('error', (err) => {
  console.log('Error de conexión a MongoDB Atlas:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB Atlas');
});

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
