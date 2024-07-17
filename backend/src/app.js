import express from "express";
import userRoutes from "./routes/userRoutes.js";
// import authMiddleware from "./middlewares/authMiddleware.js";
// import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, resp) => {
    resp.json({ message: "Rodando com sucesso!" });
})

// app.use('/auth', authRoutes)

app.use("/users", userRoutes);
console.log()

app.listen(8080, () => {
  console.log("estou rodando na porta 8080!");
});








