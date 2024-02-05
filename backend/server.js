const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/trainer', trainerRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newdb', { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});