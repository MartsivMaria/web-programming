const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Chainsaw = require('./models/chainsaw.js');

const app = express();
app.use(cors());

app.use(express.json());

const ChainsawCreateSchema = new mongoose.Schema({
    name: String,
    description: String,
    power: Number,
    engineType: String
});
const ChainsawCreate = mongoose.model('ChainsawCreate', ChainsawCreateSchema, 'createchainsaw');

const URL = 'mongodb+srv://maria:pass123@cluster0.k0zpj.mongodb.net/Chainsaw?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.get('/chainsaws', async (req, res) => {
    try {
        const chainsawData = await Chainsaw.find();
        res.json(chainsawData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chainsaws', error});
    }
});

app.get('/chainsaws/clearTotal', (req, res) => {
    res.json({ totalPrice: 0 });
});

app.get('/chainsaws/search', async (req, res) => {
    const { q } = req.query;

    try {
        const matchedChainsaws = await Chainsaw.find({
            name: { $regex: q, $options: 'i' }
        });

        res.json(matchedChainsaws);
    } catch (error) {
        console.error('Error fetching chainsaws:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/createchainsaw', async (req, res) => {
    const { name, description, power, engineType } = req.body;    
    try {
        const newChainsaw = new ChainsawCreate({
            name,
            description,
            power,
            engineType
        });

        await newChainsaw.save();
        res.status(201).json(newChainsaw);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при створенні бензопили' });
    }
});

app.get('/api/createchainsaws', async (req, res) => {
    try {
        const chainsaws = await ChainsawCreate.find();
        res.status(200).json(chainsaws);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні бензопил' });
    }
});

app.get('/api/createchainsaw/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const chainsaw = await ChainsawCreate.findById(id);

        if (!chainsaw) {
            return res.status(404).json({ error: 'Бензопилу не знайдено' });
        }

        res.status(200).json(chainsaw);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні бензопили' });
    }
});

app.put('/api/createchainsaw/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, power, engineType } = req.body;

    try {
        const updatedChainsaw = await ChainsawCreate.findByIdAndUpdate(
            id,
            { name, description, power, engineType },
            { new: true }
        );

        if (!updatedChainsaw) {
            return res.status(404).json({ error: 'Бензопилу не знайдено' });
        }

        res.status(200).json(updatedChainsaw);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при оновленні бензопили' });
    }
});


app.delete('/api/createchainsaw/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedChainsaw = await ChainsawCreate.findByIdAndDelete(id);

        if (!deletedChainsaw) {
            return res.status(404).json({ error: 'Бензопилу не знайдено' });
        }

        res.status(200).json({ message: 'Бензопилу успішно видалено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при видаленні бензопили' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
});