import axios from 'axios';
import PincodeCache from '../models/PincodeCache.js';

// Validate pincode using cache or external API
export async function validatePincode(pincode) {
  try {
    // Check if pincode exists in cache (DB)
    const cachedPincode = await PincodeCache.findOne({ where: { pincode } });
    
    if (cachedPincode) {
      return cachedPincode;
    }

    // If not found in DB, hit external API
    const response = await axios.get(`http://api.zippopotam.us/in/${pincode}`);
    
    if (response.data && response.data.places && response.data.places.length > 0) {
      const place = response.data.places[0];

      // Save pincode to cache
      const newCacheEntry = await PincodeCache.create({
        pincode,
        city: place['place name'],
        state: place['state'],
        country: response.data.country
      });
      return newCacheEntry;
    }

    throw new Error('Invalid Pincode');
  } catch (error) {
    throw new Error('Invalid or Non-existent Pincode');
  }
}