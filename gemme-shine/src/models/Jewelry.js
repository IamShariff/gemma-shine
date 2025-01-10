import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Jewelry = sequelize.define('Jewelry', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  modelNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  jewelryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jewelryType: {
    type: DataTypes.ENUM('RING', 'NECKLACE', 'BRACELET', 'EARRING', 'WATCH'),
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  availableStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  dateOfArrival: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Jewelry;