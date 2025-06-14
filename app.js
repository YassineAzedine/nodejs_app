const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware pour parser JSON
app.use(express.json());
const cors = require('cors');
app.use(cors());
// Connexion à MongoDB (change l'URL par la tienne)
mongoose.connect(`mongodb+srv://w72884169:${process.env.MONGO_PASSWORD}@cluster0.vcrkfzp.mongodb.net/test_db?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur MongoDB:', err));

// Définir un schéma et modèle Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
app.get("/" , (req,res)=>{
res.send("hello world")
})

// Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
  try {
    const user = new User({ name: 'john', email: 'john@example.com' });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000");
});