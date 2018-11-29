const express = require('express'); //sets up express
const app = express();
const Joi = require('joi');

const pokemon = [
    {
    id: 1,
    name: 'pikachu'
    },
    {
        id: 2,
        name: 'raichu'
        }
]

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('hello world. From API');
});

app.get('/pokemon', (req, res) => {
    return res.send(pokemon);
});

app.get('/pokemon/:id', (req, res) => {
    // return res.send(pokemon:id);
    // 200 - ok
    // 300 - redirected
    // 400 - user error 
    // 500 - server error
    const id = ParseInt(req.params.id);
    const poke = pokemon.find(p => p.id == id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!')
    }
    return res.send(poke);
});

app.post('/pokemon', (req, res) => {
    //add new pokemon to array
const id = req.body.id;
const name = req.body.name;
//get params from body
const poke = { id: id, name: name};
//add to array
pokemon.push(poke);
    //send new pokemon as response
return res.send(poke);
})

app.delete('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!');
    }
    const index = pokemon.indexOf(poke);
    pokemon.splice(index, 1);
    return res.send(poke);
  });

  app.put('/pokemon/:id', (req, res) => {
    // 1. check array for the pokemon
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        return res.status(404).send('Pokemon not found!');
    }
    // 2. validate what the user gave us
    //  use joi to check if the structure is what we are expecting
    const schema = {
        // min(3) is requirement of min 3 characters & a required field
        name: Joi.string().min(3).required()
    }
    const valid = Joi.validate(req.body, schema);
    const error = valid.error;
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const name = req.body.name;
    // 3. update the information
    poke.name = name;
    // // 4. send back updated pokemon
    return res.send(poke);
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})
