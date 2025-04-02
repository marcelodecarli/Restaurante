import { Request, Response } from "express";
import { OrderRepository } from "../repositories/OrderRepository";

const orderRepo = new OrderRepository();

export class OrderController {
  static async createOrder(req: Request, res: Response): Promise<Response> {
    const { userId, status } = req.body;
    try {
      const order = await orderRepo.createOrder(userId, status);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar pedido", error });
    }
  }

  static async getAllOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await orderRepo.findAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar pedidos", error });
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const order = await orderRepo.findOrderById(Number(id));
      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar pedido", error });
    }
  }

  static async updateOrderStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await orderRepo.updateOrderStatus(Number(id), status);
      if (!updatedOrder) return res.status(404).json({ message: "Pedido não encontrado" });
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar status", error });
    }
  }

  static async deleteOrder(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const deletedOrder = await orderRepo.deleteOrder(Number(id));
      if (!deletedOrder) return res.status(404).json({ message: "Pedido não encontrado" });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir pedido", error });
    }
  }
}
