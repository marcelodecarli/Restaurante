import { AppDataSource } from "../data-source";
import { Order } from "../models/Order";
import { User } from "../models/User"

export class OrderRepository {
  private orderRepository = AppDataSource.getRepository(Order);

  async createOrder(userId: number, status: string) {
    const order = new Order();
    order.user = { id: userId } as User; // Associar o usuário
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async findAllOrders() {
    return await this.orderRepository.find({ relations: ["user", "items"] });
  }

  async findOrderById(id: number) {
    return await this.orderRepository.findOne({ where: { id }, relations: ["user", "items"] });
  }

  async updateOrderStatus(id: number, status: string) {
    const order = await this.findOrderById(id);
    if (!order) return null;
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async deleteOrder(id: number) {
    const order = await this.findOrderById(id);
    if (!order) return null;
    return await this.orderRepository.remove(order);
  }
}
