const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = 3000;

app.use('/students', studentRoutes);
//custom logger middleware
app.use(logger);
app.use(errorHandler);
app.use("/students", studentRoutes);
//test route
app.get('/', (req, res) => {
  res.send('Student MVC API is Running!');
});
app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});
