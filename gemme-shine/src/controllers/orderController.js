import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrdersAdmin,
  } from '../services/orderService.js';
  import ApiResponse from '../utils/apiResponse.js';
  
  // Place Order
  export async function placeOrder(req, res) {
    try {
      const { jewelryId, addressId, quantity } = req.body;
      const userId = req.user.id;  // Retrieved from JWT token
  
      const newOrder = await createOrder(jewelryId, addressId, userId, quantity);
      res.status(201).json(new ApiResponse('Order placed successfully', newOrder));
    } catch (error) {
      res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
  }
  
  // Get All Orders for User
  export async function getOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await getAllOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
  }
  
  // Get Order by ID
  export async function getOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const order = await getOrderById(orderId, userId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
  }
  
  // Update Order Status
  export async function changeOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      await updateOrderStatus(orderId, status);
  
      res.status(200).json(new ApiResponse('Order status updated successfully'));
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
  }

  /**
 * Get All Orders (Admin and Super Admin only)
 */
export async function getOrdersAdmin(req, res) {
  try {
    const orders = await getAllOrdersAdmin();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
}