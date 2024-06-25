const express = require('express');
const signupRoute = require("./routes/signup");
const cors = require('cors');
const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

createAdminAccount();

app.use("/user", signupRoute);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});