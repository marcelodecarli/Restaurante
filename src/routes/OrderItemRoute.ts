import { Router } from "express";
import { OrderItemController } from "../controller/OrderItemControler";

const router = Router();

router.post("/order-items", OrderItemController.addItem.bind);
router.get("/order-items/:orderId", OrderItemController.getItemsByOrderId.bind);
router.put("/order-items/:orderId/:dishId", OrderItemController.updateItemQuantity.bind);
router.delete("/order-items/:orderId/:dishId", OrderItemController.removeItem.bind);

export default router;
