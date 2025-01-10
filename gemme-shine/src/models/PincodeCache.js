import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const PincodeCache = sequelize.define('PincodeCache', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

export default PincodeCache;