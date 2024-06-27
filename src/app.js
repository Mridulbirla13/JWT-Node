const express = require('express');
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const cors = require('cors');
const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;



app.use(cors({
  origin: '*'
}));

app.use(express.json());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth",loginRoute);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});