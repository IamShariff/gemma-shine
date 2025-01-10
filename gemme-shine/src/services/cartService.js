import Cart from '../models/Cart.js';
import Jewelry from '../models/jewelry.js';
import { sequelize } from '../config/db.js';
import * as orderService from './orderService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

// Get cart by user ID
export async function getCartByUserId(userId) {
  const carts = await Cart.findAll({ where: { userId }, include: 'jewelry' });
  if (carts.length === 0) {
    throw new NotFoundError('Cart', `No cart found for userId: ${userId}`);
  }
  return carts;
}

// Add item to cart
export async function addToCart(userId, jewelryId) {
  const jewelry = await Jewelry.findByPk(jewelryId);
  if (!jewelry) {
    throw new BadRequestError('jewelryId', `Jewelry not found with ID: ${jewelryId}`);
  }

  let cart = await Cart.findOne({ where: { userId, jewelryId } });

  if (cart) {
    validateStock(jewelry, cart.jewelryQty + 1);
    cart.jewelryQty += 1;
  } else {
    validateStock(jewelry, 1);
    cart = await Cart.create({
      userId,
      jewelryId,
      jewelryQty: 1
    });
  }

  return cart.save();
}

// Update cart quantity
export async function updateCartQty(cartId, quantity) {
  const cart = await Cart.findByPk(cartId, { include: 'jewelry' });
  if (!cart) {
    throw new NotFoundError('Cart', `Cart not found with ID: ${cartId}`);
  }

  validateStock(cart.jewelry, quantity);
  cart.jewelryQty = quantity;
  return cart.save();
}

// Delete cart item by ID
export async function deleteCartById(cartId) {
  const cart = await Cart.findByPk(cartId);
  if (!cart) {
    throw new NotFoundError('Cart', `Cart not found with ID: ${cartId}`);
  }
  return cart.destroy();
}

// Checkout cart (transactional)
export async function checkoutCart(userId, addressId) {
  const transaction = await sequelize.transaction();

  try {
    const cartItems = await getCartByUserId(userId);

    if (cartItems.length === 0) {
      throw new BadRequestError('Cart', 'Cart is empty');
    }

    const orders = [];

    for (const item of cartItems) {
      const order = await orderService.createOrder(
        item.jewelryId,
        addressId,
        userId,
        item.jewelryQty,
        { transaction }
      );
      orders.push(order);
    }

    // Commit transaction if orders placed successfully
    await transaction.commit();

    // Delete cart items only if transaction was successful
    await Promise.all(cartItems.map(item => deleteCartById(item.id)));

    return orders;
  } catch (error) {
    // Rollback the transaction in case of error
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw error;  // Re-throw to controller
  }
}

// Validate stock quantity
function validateStock(jewelry, quantity) {
  if (jewelry.stockQuantity < quantity) {
    throw new BadRequestError(
      'Quantity',
      `Requested quantity (${quantity}) exceeds available stock (${jewelry.stockQuantity}).`
    );
  }
}