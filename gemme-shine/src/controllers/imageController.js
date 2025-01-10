import multer from 'multer';
import JewelryImage from '../models/jewelryImage.js';
import Jewelry from '../models/jewelry.js';

// Multer setup to store file in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image and save to DB as BLOB
export async function uploadJewelryImage(req, res) {
  try {
    const { jewelryId } = req.body;
    const jewelry = await Jewelry.findByPk(jewelryId);

    if (!jewelry) {
      return res.status(404).json({ message: 'Jewelry not found' });
    }

    const imageData = req.file.buffer;  // Buffer of the uploaded image
    const newImage = await JewelryImage.create({
      imageData,
      jewelryId,
      uploadedBy: req.user.id
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      newImage
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
}

// Route to retrieve images
export async function getJewelryImages(req, res) {
  try {
    const { jewelryId } = req.params;
    const images = await JewelryImage.findAll({ where: { jewelryId } });

    if (!images.length) {
      return res.status(404).json({ message: 'No images found' });
    }

    const imageBuffers = images.map(img => ({
      id: img.id,
      jewelryId: img.jewelryId,
      imageData: `data:image/png;base64,${img.imageData.toString('base64')}`  // Convert to base64 string
    }));

    res.status(200).json(imageBuffers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
}

export async function getJewelryImageById(req, res) {
  try {
    const { id } = req.params;
    const image = await JewelryImage.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: 'No images found' });
    }

    const imageData = {
      id: image.id,
      jewelryId: image.jewelryId,
      imageData: `data:image/png;base64,${image.imageData.toString('base64')}`
    };

    res.status(200).json(imageData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image', error: error.message });
  }
}
