import { Request, Response } from "express";
import Order from "../models/orders.model";
import OrderItem, { OrderItemType } from "../models/order-items.model";

export async function newOrderHandler (req: Request, res: Response) {
    let orderItems = [];
    orderItems = await Promise.all(req.body.orderItems.map(async (orderItem: OrderItemType) => {
        const item = new OrderItem({...orderItem});
        const savedItem = await item.save();
        return savedItem._id;
    }))

    let order = new Order({
        ...req.body,
        orderItems: orderItems,
        user: req.body.user.id,
    })

    order = await order.save();
    if(!order) {
        return res.status(400).send({
            status: false,
            msg: 'Order cannot be placed'
        })
    }

    return res.status(201).send({
        status: true,
        order
    })
}
