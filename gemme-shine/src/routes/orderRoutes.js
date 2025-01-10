import { Router } from 'express';
import {
  placeOrder,
  getOrders,
  getOrder,
  changeOrderStatus,
  getOrdersAdmin
} from '../controllers/orderController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for placing and managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
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
 *               addressId:
 *                 type: string
 *                 example: "9e8b1a2d-c3ef-4789-b981-12a4c3b6f789"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to place order
 */
router.post('/', authenticateJWT, placeOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "b23c9a9e-1d4f-4118-89c1-a567b14c056f"
 *                   jewelryId:
 *                     type: string
 *                     example: "d1f2c3b4-a567-4e02-a345-0d91e2c3b479"
 *                   addressId:
 *                     type: string
 *                     example: "9e8b1a2d-c3ef-4789-b981-12a4c3b6f789"
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   status:
 *                     type: string
 *                     example: "PENDING"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch orders
 */
router.get('/', authenticateJWT, getOrders);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order details by order ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "b23c9a9e-1d4f-4118-89c1-a567b14c056f"
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to fetch order details
 */

/**
 * @swagger
 * /orders/admin/all:
 *   get:
 *     summary: Get all orders (Admin/Super Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders retrieved successfully
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Failed to fetch all orders
 */

/**
 * @swagger
 * /orders/{orderId}/status:
 *   put:
 *     summary: Update the status of an existing order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "b23c9a9e-1d4f-4118-89c1-a567b14c056f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "SHIPPED"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order status
 */

// Admin route must be unique to avoid conflict with dynamic :orderId
router.get('/admin/all', authenticateJWT, authorizeRoles('ADMIN', 'SUPER_ADMIN'), getOrdersAdmin);
router.get('/:orderId', authenticateJWT, getOrder);
router.put('/:orderId/status', authenticateJWT, changeOrderStatus);


export default router;