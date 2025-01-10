import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Jewelry from './jewelry.js';

const JewelryImage = sequelize.define('JewelryImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  imageData: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  jewelryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Jewelry,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  timestamps: true
});

Jewelry.hasMany(JewelryImage, { foreignKey: 'jewelryId' });
JewelryImage.belongsTo(Jewelry, { foreignKey: 'jewelryId' });

export default JewelryImage;