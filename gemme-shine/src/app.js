import express, { json, urlencoded } from 'express';
import { syncDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import jewelryRoutes from './routes/JewelryRoutes.js';
import imageRoutes from './routes/ImageRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler } from './utils/errors.js';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.js';
import cors from 'cors';

const app = express();

// CORS Configuration - Allow Frontend (MOVE TO TOP)
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());  // Handle preflight requests for all routes


app.use(json());
app.use(urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/addresses', addressRoutes);
app.use("/jewelry", jewelryRoutes);
app.use("/images", imageRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

syncDb();

export default app;