import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Create a Sequelize instance with connection parameters
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'db_username',
  password: process.env.DB_PASSWORD || 'db_password',
  database: process.env.DB_NAME || 'gemme_shine',
  logging: false,
  dialectOptions: {
    ssl: false,
  }
});

// Function to test the connection
const authenticateDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDb = async () => {
  try {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully');
  } catch (err) {
      console.error('Error syncing the database:', err);
  }
};

// Export the Sequelize instance and helper functions
export { sequelize, authenticateDb, syncDb };
