import {
    saveAddress,
    getAddressesByUserId,
    updateAddress,
    deleteAddress
  } from '../services/addressService.js';
  import { validatePincode } from '../services/pincodeService.js';
  import ApiResponse from '../utils/apiResponse.js';
  
  // Save Address
  export async function createAddress(req, res) {
    try {
      const { streetName, city, country, state, pincode, landmark, phoneNumber } = req.body;
      const userId = req.user.id;  // Get userId from JWT (logged-in user)

      // Validate pincode before saving
      await validatePincode(pincode);
      
      const newAddress = await saveAddress({ streetName, city, country, state, pincode, landmark, phoneNumber }, userId);
  
      res.status(201).json(new ApiResponse('Address added successfully!', newAddress));
    } catch (error) {
      res.status(500).json({ message: 'Failed to save address', error: error.message });
    }
  }
  
  // Get Addresses (Logged-in user's addresses only)
  export async function getAddresses(req, res) {
    try {
      const userIdFromToken = req.user.id;  // Ensure user can only fetch their own addresses
      const addresses = await getAddressesByUserId(userIdFromToken);
      
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve addresses', error: error.message });
    }
  }
  
  // Update Address (Restrict to logged-in user's addresses)
  export async function updateAddressById(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const userIdFromToken = req.user.id;
  
      await updateAddress(id, updatedData, userIdFromToken);
      res.status(200).json(new ApiResponse('Address updated successfully'));
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
  
  // Delete Address (Restrict to logged-in user's addresses)
  export async function deleteAddressById(req, res) {
    try {
      const { id } = req.params;
      const userIdFromToken = req.user.id;
  
      await deleteAddress(id, userIdFromToken);
      res.status(200).json(new ApiResponse('Address deleted successfully'));
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }