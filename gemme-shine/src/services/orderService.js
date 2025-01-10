import Order from '../models/order.js';
import User from '../models/user.js';
import Jewelry from '../models/jewelry.js';
import Address from '../models/Address.js';
import DeliveryAddress from '../models/deliveryAddress.js';
import { sendEmail } from './emailService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

/**
 * Create a new order and send confirmation email.
 */
export async function createOrder(jewelryId, addressId, userId, quantity, options = {}) {
  const transaction = options.transaction || null;

  // Find Jewelry
  const jewelry = await Jewelry.findByPk(jewelryId, { transaction });
  if (!jewelry) {
    throw new NotFoundError('Jewelry not found');
  }

  // Find Address by ID and User
  const address = await Address.findOne({ where: { id: addressId, userId }, transaction });
  if (!address) {
    throw new NotFoundError('Address not found for the user');
  }

  // Check stock
  if (jewelry.stockQuantity < quantity) {
    throw new BadRequestError('Insufficient stock');
  }

  // Reduce stock
  jewelry.stockQuantity -= quantity;
  if (jewelry.stockQuantity === 0) {
    jewelry.availableStatus = false;
  }
  await jewelry.save({ transaction });

  // Create Delivery Address from Address
  const deliveryAddress = await createDeliveryAddressFromAddress(address, transaction);

  // Create Order
  const order = await Order.create(
    {
      jewelryId,
      userId,
      addressId: deliveryAddress.id,
      quantity,
      amount: jewelry.price * quantity,
      status: 'PENDING'
    },
    { transaction }
  );

  // Send Order Confirmation Email
  const user = await User.findByPk(userId, { transaction });
  const emailBody = `
    Hello ${user.userName},

    Your order has been placed successfully!

    Order Details:
    - Order ID: ${order.id}
    - Item: ${jewelry.jewelryName}
    - Quantity: ${order.quantity}
    - Total Amount: $${order.amount}

    Thank you for shopping with us!

    Best regards,
    Gemme Shine Team
  `;

  await sendEmail(user.email, 'Order Confirmation', emailBody);

  return order;
}

/**
 * Create Delivery Address from Address Entity
 */
async function createDeliveryAddressFromAddress(address) {
  const deliveryAddress = await DeliveryAddress.create({
    city: address.city,
    country: address.country,
    streetName: address.streetName,
    state: address.state,
    pincode: address.pincode,
    phoneNumber: address.phoneNumber,
    landmark: address.landmark
  });

  return deliveryAddress;
}

/**
 * Update Jewelry Stock after order is placed
 */
function updateJewelryStock(jewelry, quantity) {
  const updatedStock = jewelry.stockQuantity - quantity;
  if (updatedStock < 0) {
    throw new BadRequestError('Quantity exceeds available stock');
  }
  jewelry.stockQuantity = updatedStock;
  if (updatedStock === 0) {
    jewelry.availableStatus = false;
  }
  jewelry.save();
}

// Get All Orders for a User
export async function getAllOrders(userId) {
  return Order.findAll({ where: { userId }, include: [Jewelry, DeliveryAddress] });
}

// Get Order by ID
export async function getOrderById(orderId, userId) {
  return Order.findOne({ where: { id: orderId, userId }, include: [Jewelry, DeliveryAddress] });
}

// Update Order Status
export async function updateOrderStatus(orderId, status) {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  return order.update({ status, statusTimestamp: new Date() });
}

// Get All Orders (Admin)
export async function getAllOrdersAdmin() {
  return Order.findAll({
    include: [
      Jewelry,
      DeliveryAddress,
      {
        model: User,
        attributes: ['id', 'email', 'userName', 'role']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
}