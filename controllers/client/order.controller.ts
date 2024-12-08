import { Request, Response } from "express";

import Order from "../../models/order.model";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";
import { generateOrderCode } from "../../helpers/generate.helper";

export const index = async (req: Request, res: Response) => {
    const info = req.body.info;
    const cart = req.body.cart;

    // Lưu data vào bảng orders
    const dataOrder = {
        code: "",
        fullName: info.fullName,
        phone: info.phone,
        note: info.note,
        status: "initial",
    };

    const order = await Order.create(dataOrder);
    const orderId = order.dataValues.id;
    const code = generateOrderCode(orderId);

    await Order.update({
        code: code
    }, {
        where: {
            id: orderId
        }
    });

    // Lưu data vào bảng orders_items
    for (const item of cart) {
        const dataItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity,
        };

        const tourInfo = await Tour.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: "active"
            },
            raw: true
        });

        dataItem["price"] = tourInfo["price"];
        dataItem["discount"] = tourInfo["discount"];
        dataItem["timeStart"] = tourInfo["timeStart"];
        await OrderItem.create(dataItem);
    }


    res.json({
        code: "success",
        message: "Đặt hàng thành công!",
        orderCode: code
    });
};