import { Router } from 'express';
import {
  createAddress,
  getAddresses,
  updateAddressById,
  deleteAddressById
} from '../controllers/addressController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: API endpoints for managing user addresses
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               streetName:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               pincode:
 *                 type: string
 *                 example: "90001"
 *               landmark:
 *                 type: string
 *                 example: "Near Central Park"
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       500:
 *         description: Failed to save address
 */
router.post('/', authenticateJWT, createAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Retrieve all addresses for the authenticated user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "2a3c-5678-df09"
 *                   streetName:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Los Angeles"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *                   pincode:
 *                     type: string
 *                     example: "90001"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *                   landmark:
 *                     type: string
 *                     example: "Near Central Park"
 *                   phoneNumber:
 *                     type: string
 *                     example: "1234567890"
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       404:
 *         description: No addresses found
 *       500:
 *         description: Failed to retrieve addresses
 */
router.get('/', authenticateJWT, getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Update an existing address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "2a3c-5678-df09"
 *         description: The address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               streetName:
 *                 type: string
 *                 example: "456 Elm St"
 *               city:
 *                 type: string
 *                 example: "San Francisco"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               pincode:
 *                 type: string
 *                 example: "94103"
 *               landmark:
 *                 type: string
 *                 example: "Near the Golden Gate Bridge"
 *               phoneNumber:
 *                 type: string
 *                 example: "0987654321"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       403:
 *         description: Unauthorized to update this address
 *       404:
 *         description: Address not found
 */
router.put('/:id', authenticateJWT, updateAddressById);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "2a3c-5678-df09"
 *         description: The address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       403:
 *         description: Unauthorized to delete this address
 *       404:
 *         description: Address not found
 */
router.delete('/:id', authenticateJWT, deleteAddressById);

export default router;