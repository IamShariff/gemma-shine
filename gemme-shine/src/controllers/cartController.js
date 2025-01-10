import * as cartService from '../services/cartService.js';
import ApiResponse from '../utils/apiResponse.js';

// Get cart for authenticated user
export async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const carts = await cartService.getCartByUserId(userId);
    res.status(200).json(carts);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Add to cart
export async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { jewelryId } = req.body;
    const cart = await cartService.addToCart(userId, jewelryId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Update cart
export async function updateCart(req, res) {
  try {
    const { cartId, quantity } = req.body;
    const cart = await cartService.updateCartQty(cartId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Delete cart item
export async function deleteCart(req, res) {
  try {
    const { cartId } = req.params;
    await cartService.deleteCartById(cartId);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Checkout cart
export async function checkoutCart(req, res) {
  try {
    const userId = req.user.id;
    const { addressId } = req.body;

    const result = await cartService.checkoutCart(userId, addressId);

    res.status(201).json(new ApiResponse('Checkout completed successfully', result));
  } catch (error) {
    console.error('Checkout failed:', error);
    res.status(500).json({ message: 'Failed to checkout', error: error.message });
  }
}