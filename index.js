import express from "express";
import reviewRouter from "./routers/reviewRouter.js";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoriesRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Benvenuti"
    })
})
app.use("/reviews", reviewRouter);

app.use("/products", productRouter);

app.use("/categories", categoryRouter);

app.use((request, response, next) => {

    response.status(404).json({
        error: "Resource not found",
        message: "The requested endpoint does not exist on the server"
    });
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Il server ha riscontrato un errore', error);
    }
    console.log('server in ascolto sulla porta', PORT);
});