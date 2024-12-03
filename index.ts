import express, { Express, Request, Response } from "express"

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set('view engine', 'pug'); // template engine sử dụng: pug

app.get("/tours", (req: Request, res: Response) => {
    res.render("client/pages/tours/index");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});