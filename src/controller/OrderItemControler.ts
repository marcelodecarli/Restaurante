import { Request, Response } from "express";
import { OrderItemRepository } from "../repositories/OrderItemRepository";

const orderItemRepo = new OrderItemRepository();

export class OrderItemController {
    // Adicionar item ao pedido
    static async addItem(req: Request, res: Response): Promise<Response> {
        const { orderId, dishId, quantity } = req.body;
        try {
            const orderItem = await orderItemRepo.createOrderItem(orderId, dishId, quantity);
            return res.status(201).json(orderItem);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao adicionar item ao pedido", error });
        }
    }

    // Listar itens de um pedido
    static async getItemsByOrderId(req: Request, res: Response): Promise<Response> {
        const { orderId } = req.params;
        try {
            const items = await orderItemRepo.findItemsByOrderId(Number(orderId));
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar itens", error });
        }
    }

    // Atualizar quantidade de item
    static async updateItemQuantity(req: Request, res: Response): Promise<Response> {
        const { orderId, dishId } = req.params;
        const { quantity } = req.body;
        try {
            const updatedItem = await orderItemRepo.updateItemQuantity(Number(orderId), Number(dishId), quantity);
            if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
            return res.status(200).json(updatedItem);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar item", error });
        }
    }

    // Remover item de pedido
    static async removeItem(req: Request, res: Response): Promise<Response> {
        const { orderId, dishId } = req.params;
        try {
            const deletedItem = await orderItemRepo.deleteItemFromOrder(Number(orderId), Number(dishId));
            if (!deletedItem) return res.status(404).json({ message: "Item não encontrado" });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao excluir item", error });
        }
    }
}