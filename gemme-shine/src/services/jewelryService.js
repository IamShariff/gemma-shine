import Jewelry from '../models/jewelry.js';
import JewelryImage from '../models/jewelryImage.js';

// Get all jewelry items with images (convert buffer to base64)
export async function getAllJewelry() {
  const jewelry = await Jewelry.findAll({ include: JewelryImage });

  // Convert buffer to base64 for each image
  const jewelryWithImages = jewelry.map(item => {
    const images = item.JewelryImages.map(img => ({
      ...img.toJSON(),
      imageData: `data:image/png;base64,${img.imageData.toString('base64')}`
    }));
    return {
      ...item.toJSON(),
      JewelryImages: images
    };
  });

  return jewelryWithImages;
}

// Get jewelry by model number (convert buffer to base64)
export async function getJewelryByModel(modelNumber) {
  const jewelry = await Jewelry.findOne({
    where: { modelNumber },
    include: JewelryImage
  });

  if (!jewelry) {
    throw new Error('Jewelry not found');
  }

  const images = jewelry.JewelryImages.map(img => ({
    ...img.toJSON(),
    imageData: `data:image/png;base64,${img.imageData.toString('base64')}`
  }));

  return {
    ...jewelry.toJSON(),
    JewelryImages: images
  };
}

// Add new jewelry item
export async function addJewelry(jewelryData) {
  return Jewelry.create(jewelryData);
}

// Update jewelry item
export async function updateJewelry(modelNumber, updatedData) {
  const jewelry = await Jewelry.findOne({ where: { modelNumber } });
  if (!jewelry) {
    throw new Error('Jewelry not found');
  }
  return jewelry.update(updatedData);
}

// Delete jewelry item
export async function deleteJewelry(modelNumber) {
  const result = await Jewelry.destroy({ where: { modelNumber } });
  if (!result) {
    throw new Error('Jewelry not found');
  }
  return result;
}