import dayjs from "dayjs"
import sqlite from "sqlite3"



// the name of an animal is unique, as we ONLY have one of each (it is the id)
class Animal{
    constructor(name, canFly, livesInWater, numberOfLegs, isDomestic, hasTail, laysEggs, color, dietType, activeTime, hasFur){
        this.name = name;
        this.canFly = canFly;
        this.livesInWater = livesInWater;
        this.numberOfLegs = numberOfLegs;
        this.isDomestic = isDomestic;
        this.hasTail = hasTail;
        this.laysEggs = laysEggs;
        this.activeTime = activeTime;
        this.color = color;
        this.dietType = dietType;


    }
}


const db = new sqlite.Database("guess_who.db", (err) => {if (err) throw err});

const selectAll = `SELECT * FROM ANIMAL`

export function retrieveAnimals(){
    return new Promise((resolve, reject) => {
        db.all(selectAll, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                // const mappedRow = rows.map((row) => new Animal(row.name, row.canFly, row.livesInWater, row.numberOfLegs, row.isDomestic, row.hasTail, row.laysEggs));

                const mappedToName = rows.map((row) => row.name);
                // resolve(mappedToName);

                resolve(rows);
            }
        })
    })
}   


retrieveAnimals().then((rows) => console.log(rows.length));


function checkUniqueness(rows){
    const uniqueAnimals = new Set();

    for (let row of rows){
        const animalProperties = JSON.stringify([row.canFly, row.livesInWater, row.numberOfLegs, row.isDomestic, row.hasTail, row.laysEggs, row.color, row.dietType, row.activeTime]);
        uniqueAnimals.add(animalProperties);
    }

    const uniqueCombinations = Array.from(uniqueAnimals);

    console.log(uniqueCombinations.length);
    
}

retrieveAnimals().then((rows) => checkUniqueness(rows));



function findAnimalsColor(reqList){
    return new Promise((resolve, reject) => {
        // we have a list of attributes that should be in the form: [(key, value), (key, value) ...]

        let sql = ` SELECT name
                    FROM Animal
                    WHERE LOWER(color) = LOWER(?);
                  `

        db.all(sql, reqList, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                let mappedRows = rows.map((row) => {return row.name})
                resolve(mappedRows);
            }      
        })
    })
}

// this function can be overloaded as much as we want to take different aspects ...
// findAnimalsColor("YeLlOw").then((animals) => console.log(animals));


export function addAnimal(propertieslistOrdered){
    return new Promise((resolve, reject)    => {
        const sql = `INSERT INTO Animal (name, canFly, livesInWater, numberOfLegs, isDomestic, hasTail, laysEggs, DietType, HasFur, ActiveTime, Color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

        db.run(sql, propertieslistOrdered, (err) => {
            if (err){
                reject(err);
            }
            else{
                resolve();
            }
        })

    })
}

// addAnimal(["Lion", 1, 0, 4, 0, 0, 1, "Carnivore", 1, "Night", "Yellow"]).then(() => console.log("Animal added")).catch((err) => console.log(err));

// retrieveAnimals().then((rows) => console.log(rows.length));

export function removeAnimal(animalName){
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Animal WHERE name = ?;`

        db.run(sql, [animalName], (err) => {
            if (err){
                reject(err);
            }
            else{
                resolve();
            }
        })
    })
}

// removeAnimal("Lion").then(() => console.log("Animal Deleted")).catch((err) => console.log(err));


export function modifyAnimal(animalName, attributesList){
    return new Promise((resolve, reject) => {
        let sql = `UPDATE Animal SET `;

        let myList = [];

        Object.keys(attributesList).forEach((key) => {
            sql += `${key} = ?, `;
            myList.push(attributesList[key]);
        })

        sql = sql.substring(0, sql.length - 2);
        // or simply
        // sql = sql.slice(0, -2);

        sql += "WHERE name = ?;";

        console.log(sql);
        console.log(myList);
        console.log(animalName);

        db.run(sql, [...myList, animalName], (err) => {
            if (err){
                reject(err);
            }
            else{
                resolve();
            }
        })

    })
}

// modifyAnimal("Elephant", "numberOfLegs", 0).then(() => console.log("Animal Modified")).catch((err) => console.log(err));

// retrieveAnimals().then((rows) => console.log(rows));


export function retrieveAnimalByName(animalName){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Animal
        WHERE name = ?;`;

        db.get(sql, [animalName], (err, row) => {
            if (err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    })
}

export function retrieveAnimalByDietType(dietType){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Animal
        WHERE DietType = ?;`;

        db.all(sql, [dietType], (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        })
    })
}

export function retreiveByDifferentAttributes(attributeMap){

    // canFly, livesInWater, numberOfLegs, isDomestic, hasTail, laysEggs, DietType, HasFur, ActiveTime, Color

    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Animal`;

        if (Object.keys(attributeMap).length > 0){
            sql += " WHERE ";
            Object.keys(attributeMap).forEach((key) => {
                let value = attributeMap[key];

                // regarding the value: we might need to verify if it is a number or a boolean in the case of true or false, for now I am just assuminh that we write it as an integer, to modify it I can just do a small if statement and push it to the lsit of values

                sql += `${key} = ? AND `
            })         
                
            // we need to remove the last AND: either we check that we are on the last one so we do NOT add the AND, or we remove the last AND simply
            sql = sql.substring(0, sql.length - 4);

            console.log(sql);

            let values = Object.values(attributeMap);

            db.all(sql, values, (err, rows) => {
                if (err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }
        else{
            sql += ";";
            db.all(sql, (err, rows) => {
                if (err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }

    })
}


export function randomAnimal1(){

    const sqlQuery = "SELECT name FROM Animal";

    return new Promise((resolve, reject) => {
        db.all(sqlQuery, (err, rows) => {
            if (err){
                reject(err);
            }
            else{
                const names = rows.map((tuple) => tuple.name);

                let index = Math.floor(Math.random() * (names.length - 1));

                resolve(names[index]);
            }
        })
    })

}

// randomAnimal1().then((rows) => console.log(rows)).catch((err) => console.log(err));

const name = await randomAnimal1();

// console.log(name);


function randomAnimal(){
    const sqlQuery = "SELECT name FROM Animal";

    db.all(sqlQuery, (err, rows) => {
        if (err){
            console.log(err);
        }
        else{
            const names = rows.map((tuple) => tuple.name);

            let index = Math.floor(Math.random() * (names.length - 1));

            console.log(names[index]);

            return(names[index]);
        }
    })

}

const animalName = randomAnimal();

console.log(animalName);


