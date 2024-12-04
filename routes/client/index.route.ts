import { Express } from "express";
import { toursRoute } from "./tour.route";


export const routesClient = (app: Express) => {
    app.use("/tours", toursRoute);
}