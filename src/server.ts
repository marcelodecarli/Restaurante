import express , { Application } from "express"
import { AppDataSource } from "./data-source"
import { log } from "console";
import orderRotes from "./routes/OrderRoute";
import orderItemRoutes from "./routes/OrderItemRoute"
import router from "./routes/UserRoutes";

const app: Application = express();
app.use(express.json())

app.use("/api", orderRotes);
app.use("/api", orderItemRoutes);
app.use("/api", )

AppDataSource.initialize().then(() => {
    console.log("Conexão com o banco de dados bem sucedida!")
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000.");
        
    })
}).catch((error) => {
    console.log("Erro ao conectar com o banco de dados!! ", error);
})