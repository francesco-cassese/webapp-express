import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "message": "Benvenuti"
    })
})

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Il server ha riscontrato un errore', error);
    }
    console.log('server in ascolto sulla porta', PORT);
});