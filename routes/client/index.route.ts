import { Express } from "express";
import { toursRoute } from "./tour.route";
import { categoriesRoute } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";


export const routesClient = (app: Express) => {
    app.use("/tours", toursRoute);

    app.use("/categories", categoriesRoute);

    app.use("/cart", cartRoute);

    app.use("/order", orderRoute);
}