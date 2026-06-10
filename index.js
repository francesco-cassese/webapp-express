import express from "express";
import reviewRouter from "./routers/reviewRouter.js";
import productRouter from "./routers/productRouter.js";

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

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Il server ha riscontrato un errore', error);
    }
    console.log('server in ascolto sulla porta', PORT);
});