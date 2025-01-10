import express from 'express';
import {
  uploadJewelryImage,
  getJewelryImages,
  getJewelryImageById
} from '../controllers/imageController.js';
import authenticateJWT from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API endpoints for uploading and retrieving jewelry images
 */

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload a jewelry image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               jewelryId:
 *                 type: string
 *                 example: "e13a8f6a-93f4-41f1-91d6-32fabe6b7e78"
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT missing or invalid
 *       403:
 *         description: Forbidden - Insufficient role permissions
 */
router.post(
  '/upload',
  authenticateJWT,
  authorizeRoles('ADMIN', 'SUPER_ADMIN'),
  upload.single('image'),
  uploadJewelryImage
);

/**
 * @swagger
 * /images/{jewelryId}/images:
 *   get:
 *     summary: Retrieve all images for a specific jewelry item
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: jewelryId
 *         required: true
 *         schema:
 *           type: string
 *           example: "e13a8f6a-93f4-41f1-91d6-32fabe6b7e78"
 *     responses:
 *       200:
 *         description: List of jewelry images retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "f92a1b23-7c5b-4f9b-89fd-7e29d74c012d"
 *                   jewelryId:
 *                     type: string
 *                     example: "e13a8f6a-93f4-41f1-91d6-32fabe6b7e78"
 *                   imageData:
 *                     type: string
 *                     format: base64
 *       404:
 *         description: No images found for the jewelry item
 */
router.get('/:jewelryId/images', getJewelryImages);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Retrieve a specific image by its ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "f92a1b23-7c5b-4f9b-89fd-7e29d74c012d"
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "f92a1b23-7c5b-4f9b-89fd-7e29d74c012d"
 *                 jewelryId:
 *                   type: string
 *                   example: "e13a8f6a-93f4-41f1-91d6-32fabe6b7e78"
 *                 imageData:
 *                   type: string
 *                   format: base64
 *       404:
 *         description: Image not found
 */
router.get('/:id', getJewelryImageById);

export default router;