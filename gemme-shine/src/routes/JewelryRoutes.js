import { Router } from 'express';
import {
  getAll,
  create,
  getByModel,
  update,
  remove
} from '../controllers/jewelryController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Jewelry
 *   description: API endpoints for managing jewelry items
 */

/**
 * @swagger
 * /jewelry:
 *   get:
 *     summary: Retrieve all jewelry items
 *     tags: [Jewelry]
 *     responses:
 *       200:
 *         description: A list of all jewelry items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "d1f2c3b4-a567-4e02-a345-0d91e2c3b479"
 *                   modelNumber:
 *                     type: string
 *                     example: "JN001"
 *                   jewelryName:
 *                     type: string
 *                     example: "Diamond Ring"
 *                   jewelryType:
 *                     type: string
 *                     example: "RING"
 *                   stockQuantity:
 *                     type: integer
 *                     example: 50
 *                   price:
 *                     type: number
 *                     example: 1200.50
 *       500:
 *         description: Failed to fetch jewelry items
 */
router.get('/', getAll);

/**
 * @swagger
 * /jewelry:
 *   post:
 *     summary: Add a new jewelry item
 *     tags: [Jewelry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelNumber:
 *                 type: string
 *                 example: "JN002"
 *               jewelryName:
 *                 type: string
 *                 example: "Emerald Necklace"
 *               jewelryType:
 *                 type: string
 *                 example: "NECKLACE"
 *               stockQuantity:
 *                 type: integer
 *                 example: 20
 *               price:
 *                 type: number
 *                 example: 1800.00
 *               description:
 *                 type: string
 *                 example: "18k Gold Emerald Necklace"
 *     responses:
 *       201:
 *         description: Jewelry item added successfully
 *       500:
 *         description: Failed to add jewelry item
 */
router.post('/', authenticateJWT, authorizeRoles('ADMIN', 'SUPER_ADMIN'), create);

/**
 * @swagger
 * /jewelry/{modelNumber}:
 *   get:
 *     summary: Retrieve jewelry by model number
 *     tags: [Jewelry]
 *     parameters:
 *       - in: path
 *         name: modelNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "JN001"
 *         description: The model number of the jewelry item
 *     responses:
 *       200:
 *         description: Jewelry item retrieved successfully
 *       404:
 *         description: Jewelry item not found
 *       500:
 *         description: Failed to fetch jewelry item
 */
router.get('/:modelNumber', getByModel);

/**
 * @swagger
 * /jewelry/{modelNumber}:
 *   put:
 *     summary: Update an existing jewelry item by model number
 *     tags: [Jewelry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: modelNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "JN001"
 *         description: The model number of the jewelry item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jewelryName:
 *                 type: string
 *                 example: "Ruby Bracelet"
 *               stockQuantity:
 *                 type: integer
 *                 example: 30
 *               price:
 *                 type: number
 *                 example: 2000.00
 *               description:
 *                 type: string
 *                 example: "Handcrafted Ruby Bracelet"
 *     responses:
 *       200:
 *         description: Jewelry item updated successfully
 *       404:
 *         description: Jewelry item not found
 *       500:
 *         description: Failed to update jewelry item
 */
router.put('/:modelNumber', authenticateJWT, authorizeRoles('ADMIN', 'SUPER_ADMIN'), update);

/**
 * @swagger
 * /jewelry/{modelNumber}:
 *   delete:
 *     summary: Delete a jewelry item by model number
 *     tags: [Jewelry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: modelNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "JN001"
 *         description: The model number of the jewelry item to delete
 *     responses:
 *       200:
 *         description: Jewelry item deleted successfully
 *       404:
 *         description: Jewelry item not found
 *       500:
 *         description: Failed to delete jewelry item
 */
router.delete('/:modelNumber', authenticateJWT, authorizeRoles('ADMIN', 'SUPER_ADMIN'), remove);

export default router;