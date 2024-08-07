import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API",
      version: "1.0.0",
      description: "API feita para criar uma árvore de links",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:8082",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, resp) => {
  resp.json({ message: "Rodando com sucesso!" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/links", linkRoutes);

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Estou rodando na porta ${PORT}!`);
});
