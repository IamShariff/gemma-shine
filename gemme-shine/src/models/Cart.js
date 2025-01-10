import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Jewelry from './jewelry.js';

const Cart = sequelize.define('Cart', {
 id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  jewelryQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

// Define relationships
Cart.belongsTo(Jewelry, {
  foreignKey: 'jewelryId',
  as: 'jewelry'
});

export default Cart;