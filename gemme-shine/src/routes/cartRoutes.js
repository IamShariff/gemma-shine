import express from 'express';
import {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
  checkoutCart
} from '../controllers/cartController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *       404:
 *         description: Cart not found
 */
router.get('/', authenticateJWT, getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jewelryId:
 *                 type: string
 *                 example: "d1f2c3b4-a567-4e02-a345-0d91e2c3b479"
 *     responses:
 *       201:
 *         description: Item added to the cart
 *       400:
 *         description: Invalid request data
 */
router.post('/add', authenticateJWT, addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Update cart quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 example: "7f3d8348-8c2f-11ec-b909-0242ac120002"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 */
router.put('/update', authenticateJWT, updateCart);

/**
 * @swagger
 * /cart/{cartId}:
 *   delete:
 *     summary: Delete cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *           example: "8b4a567f-8c2f-11ec-b909-0242ac120002"
 *     responses:
 *       204:
 *         description: Cart item deleted
 *       404:
 *         description: Cart not found
 */
router.delete('/:cartId', authenticateJWT, deleteCart);

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout and place orders for all cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *                 example: "9e8b1a2d-c3ef-4789-b981-12a4c3b6f789"
 *     responses:
 *       201:
 *         description: Orders placed successfully
 *       400:
 *         description: Cart is empty or invalid address
 *       500:
 *         description: Failed to place orders
 */
router.post('/checkout', authenticateJWT, checkoutCart);  // New checkout route

export default router;