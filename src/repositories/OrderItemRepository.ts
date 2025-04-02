import { AppDataSource } from "../data-source";
import { OrderItem } from "../models/OrderItem";
import { Order } from "../models/Order";
import { Dish } from "../models/Dish";

export class OrderItemRepository {
  private orderItemRepository = AppDataSource.getRepository(OrderItem);

  // Criar item de pedido
  async createOrderItem(orderId: number, dishId: number, quantity: number) {
    const orderItem = new OrderItem(quantity);
    orderItem.order = { id: orderId } as Order;
    orderItem.dish = { id: dishId } as Dish;
    return await this.orderItemRepository.save(orderItem);
  }

  // Buscar itens por ID do pedido
  async findItemsByOrderId(orderId: number) {
    return await this.orderItemRepository.find({
      where: {
        order: { id: orderId }
      },
      relations: ["order", "dish"] // Garantir que as relações com as entidades Order e Dish sejam carregadas
    });
  }

  // Atualizar a quantidade de um item
  async updateItemQuantity(orderId: number, dishId: number, quantity: number) {
    const orderItem = await this.orderItemRepository.findOne({
      where: {
        order: { id: orderId },
        dish: { id: dishId }
      },
      relations: ["order", "dish"]
    });

    if (!orderItem) {
      return null; // Item não encontrado
    }

    orderItem.quantity = quantity;
    return await this.orderItemRepository.save(orderItem);
  }

  // Remover item de pedido
  async deleteItemFromOrder(orderId: number, dishId: number) {
    const orderItem = await this.orderItemRepository.findOne({
      where: {
        order: { id: orderId },
        dish: { id: dishId }
      }
    });

    if (!orderItem) {
      return null; // Item não encontrado
    }

    return await this.orderItemRepository.remove(orderItem);
  }
}
