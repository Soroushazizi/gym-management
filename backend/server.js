const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/trainer', trainerRoutes);

// Connect to MongoDB
mongoose.connect('YOUR_DATABASE_URL', { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});