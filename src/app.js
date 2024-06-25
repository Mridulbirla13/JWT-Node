const express = require('express');
const signupRoute = require("./routes/signup");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());  // Use this instead of bodyParser.json()

app.use((req, res, next) => {
    console.log('Incoming request:', {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });
    next();
  });
  
  app.use("/user", signupRoute);

app.use("/user", signupRoute);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});