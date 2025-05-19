import express from 'express'
import morgan from 'morgan';
import sqlite from 'sqlite3';
import cors from 'cors';

import { retrieveAnimals, retrieveAnimalByName, retrieveAnimalByDietType, retreiveByDifferentAttributes, retrieveByDifferentAttributesExclusion, addAnimal, modifyAnimal, removeAnimal } from './guess_who.mjs';

const app = express();

const db = new sqlite.Database("guess_who.db", (err) => {if (err) throw err});


app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));


app.get("/animal/:name", (req, res) => {
    retrieveAnimalByName(req.params.name).then((rows) => res.json(rows));
})

// get animals based on some properties
// app.get("/animal", (req, res) => {

//     const {dietType} = req.query;

//     if (!dietType){
//         retrieveAnimals().then((rows) => res.json(rows)).catch((err) => res.status(500).json({error: err.message}));
//     }

//     else{
//         retrieveAnimalByDietType(dietType).then((rows) => res.json(rows));
//     }

// })



app.get("/animal", async (req, res) => {
    try {
        // Extract exclude and allowedNames from query
        const { exclude, allowedNames, ...filtersMap } = req.query;

        // Normalize allowedNames to always be an array
        const allowedList = allowedNames
            ? Array.isArray(allowedNames)
                ? allowedNames
                : [allowedNames]
            : [];

        if (exclude === "no"){  
            const rows = await retreiveByDifferentAttributes(filtersMap, allowedList);
            res.status(200).json(rows);

        }
        else{
            const rows = await retrieveByDifferentAttributesExclusion(filtersMap, allowedList);
            res.status(200).json(rows);

        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/animal/:name", (req, res) => {
    const name = req.params.name;

    removeAnimal(name).then(() => res.json({message: "Animal deleted"})).catch((err) => res.status(500).json({error: err.message}));

})


app.post("/animal", (req, res) => {
    // req.body is used in the case of post, put
    // req.query is used in the case of get

    // I did it using the two ways, as parameters and as a json body
    // so I will make sure to use the correct one

    let attributes = {};

    if (Object.keys(req.body).length > 0){
        attributes = req.body;
    }
    else{
        attributes = req.query;
    }

    // const attributes = req.query;

    console.log(attributes);


    const attributesList = Object.values(attributes);


    if (!attributes.name){
        return res.status(400).json({error: "Name is required"});
    }

    addAnimal(attributesList).then(() => res.json({message: "Animal added"})).catch((err) => res.status(500).json({error: err.message}));

})

app.put("/animal/:name", (req, res) => {
    const name = req.params.name;
    if (!name){
        console.log(name);
        return res.status(400).json({error: "Name is required"});
    }

    const attributes = req.body;

    console.log(attributes);

    modifyAnimal(name, attributes).then(() => res.json({message: "Animal modified correctly"})).catch((err) => {res.status(500).json({error: err.message})});

})

app.listen(3000, () => console.log("Server ready"));