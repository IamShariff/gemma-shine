import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.js';
import Jewelry from './jewelry.js';
import DeliveryAddress from './deliveryAddress.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'),
    allowNull: false,
    defaultValue: 'PENDING'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  statusTimestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

Order.belongsTo(Jewelry, { foreignKey: 'jewelryId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(DeliveryAddress, { foreignKey: 'addressId' });

export default Order;