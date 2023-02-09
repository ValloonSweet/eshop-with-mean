import { Request, Response } from "express";
import Order from "../models/orders.model";
import OrderItem, { OrderItemType } from "../models/order-items.model";
import { ProductDto } from "../models/products.model";

export async function newOrderHandler (req: Request, res: Response) {
    let orderItems = [];
    orderItems = await Promise.all(req.body.orderItems.map(async (orderItem: OrderItemType) => {
        const item = new OrderItem({...orderItem});
        const savedItem = await item.save();
        return savedItem._id;
    }));

    const totalPrices = await Promise.all(orderItems.map(async (orderItemId) => {
        const orderItem = await OrderItem
            .findById(orderItemId)
            .populate<{product: ProductDto}>({path: 'product', select: 'price'});
        const totalPrice = (orderItem?.product.price || 0) * (orderItem?.quantity || 0);
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((prev, current) => prev + current, 0);

    let order = new Order({
        ...req.body,
        totalPrices: totalPrice,
        orderItems: orderItems,
        user: req.body.user.id,
    })

    console.log(order);

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


export async function getOrdersHandler(req: Request, res: Response) {
    const orders = await Order.find()
        .populate({path: 'user', select: 'name'});
    if(orders.length === 0) {
        return res.status(404).send({
            status: false,
            msg: 'Not found orders'
        })
    }

    return res.status(200).send({
        status: true,
        orders
    })
}

export async function getOrderHandler(req: Request, res: Response) {
    const order = await Order.findById(req.params.id)
        .populate({path: "user", select: 'name'})
        .populate({path: 'orderItems', populate: {path: 'product', populate: 'category'}});
    if(!order) {
        return res.status(404).send({
            status: false,
            msg: 'Not found orders'
        })
    }

    return res.status(200).send({
        status: true,
        order
    })
}

export async function updateOrderHandler(req: Request, res: Response) {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        }, {new: true}
    );

    if(!order) {
        return res.status(404).send({
            status: false,
            msg: 'Not found order'
        })
    }

    return res.status(200).send({
        status: true,
        order
    })
}

export async function deleteOrderHandler(req: Request, res: Response) {
    const order = await Order.findByIdAndDelete(req.params.id);
    if(order) {
        await order.orderItems.map(async orderItem => {
            await OrderItem.findByIdAndDelete(orderItem.id);
        })

        return res.status(200).send({
            status: true,
        })
    } else {
        return res.status(404).send({
            status: false,
            msg: 'Not found order'
        })
    }
}

export async function getOrdersByUser(req: Request, res: Response) {
    const userOrderList = await Order.find({user: req.params.userid})
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        }).sort({'dateOrdered': -1});
    if(userOrderList) {
        return res.status(404).send({
            status: false,
            msg: 'Not found order'
        })
    }
    return res.status(200).send({
        status: true,
        orders: userOrderList
    })
}
