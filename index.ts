import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
sequelize;
import { routesClient } from "./routes/client/index.route";

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set('view engine', 'pug'); // template engine sử dụng: pug

app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục chứa file tĩnh

routesClient(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});