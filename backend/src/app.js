const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
