import Address from '../models/Address.js';

// Save address (for logged-in user)
export async function saveAddress(addressData, userId) {
  return Address.create({ ...addressData, userId });
}

// Get addresses by userId (for logged-in user only)
export async function getAddressesByUserId(userId) {
  return Address.findAll({ where: { userId } });
}

// Update address (restrict to user's own addresses)
export async function updateAddress(id, updatedData, userId) {
  const address = await Address.findOne({ where: { id, userId } });
  if (!address) {
    throw new Error('Address not found or unauthorized');
  }
  return address.update(updatedData);
}

// Delete address (restrict to user's own addresses)
export async function deleteAddress(id, userId) {
  const address = await Address.findOne({ where: { id, userId } });
  if (!address) {
    throw new Error('Address not found or unauthorized');
  }
  return address.destroy();
}