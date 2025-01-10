import {
  getAllJewelry,
  addJewelry,
  getJewelryByModel,
  updateJewelry,
  deleteJewelry
} from '../services/jewelryService.js';
import ApiResponse from '../utils/apiResponse.js';

// Get all jewelry items
export async function getAll(req, res) {
  try {
    const jewelry = await getAllJewelry();
    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jewelry', error: error.message });
  }
}

// Add new jewelry item
export async function create(req, res) {
  try {
    const jewelryData = {
      ...req.body,
      uploadedBy: req.user.id  // Capture from authenticated user
    };
    const newJewelry = await addJewelry(jewelryData);
    res.status(201).json(new ApiResponse('Jewelry added successfully', newJewelry));
  } catch (error) {
    res.status(500).json({ message: 'Failed to add jewelry', error: error.message });
  }
}

// Get jewelry by model number
export async function getByModel(req, res) {
  try {
    const { modelNumber } = req.params;
    const jewelry = await getJewelryByModel(modelNumber);
    
    if (!jewelry) {
      return res.status(404).json({ message: 'Jewelry not found' });
    }

    res.status(200).json(jewelry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jewelry', error: error.message });
  }
}

// Update jewelry item
export async function update(req, res) {
  try {
    const { modelNumber } = req.params;
    const updatedJewelry = await updateJewelry(modelNumber, req.body);
    res.status(200).json(new ApiResponse('Jewelry updated successfully', updatedJewelry));
  } catch (error) {
    res.status(500).json({ message: 'Failed to update jewelry', error: error.message });
  }
}

// Delete jewelry item
export async function remove(req, res) {
  try {
    const { modelNumber } = req.params;
    await deleteJewelry(modelNumber);
    res.status(200).json(new ApiResponse('Jewelry deleted successfully'));
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete jewelry', error: error.message });
  }
}