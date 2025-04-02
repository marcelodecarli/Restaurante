import { Router } from "express";
import { OrderController } from "../controller/OrderControler";

// Instanciando o roteador
const router = Router();

router.post("/orders", OrderController.createOrder.bind);
router.get("/orders", OrderController.getAllOrders.bind);
router.get("/orders/:id", OrderController.getOrderById.bind);
router.put("/orders/:id", OrderController.updateOrderStatus.bind);
router.delete("/orders/:id", OrderController.deleteOrder.bind);

export default router;