import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.json({ message: "Rodando com sucesso!" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/links", linkRoutes);

app.listen(8081, () => {
  console.log("estou rodando na porta 8081!");
});
