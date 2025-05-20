import sqlite from "sqlite3"

const createTableQuery = `   CREATE TABLE Animal (
                        name TEXT NOT NULL PRIMARY KEY,
                        canFly BOOLEAN NOT NULL,
                        livesInWater BOOLEAN NOT NULL,
                        numberOfLegs INTEGER NOT NULL,
                        isDomestic BOOLEAN NOT NULL,
                        hasTail BOOLEAN NOT NULL,
                        laysEggs BOOLEAN NOT NULL,
                        dietType TEXT NOT NULL,
                        hasFur BOOLEAN NOT NULL,
                        activeTime TEXT NOT NULL,
                        color TEXT NOT NULL);`


const insertValuesQuery = `INSERT INTO Animal (name, canFly, livesInWater, numberOfLegs, isDomestic, hasTail, laysEggs, DietType, HasFur, ActiveTime, Color)        
VALUES
        ('eagle', 1, 0, 2, 0, 1, 1, 'carnivore', 0, 'diurnal', 'brown'),
        ('duck', 1, 1, 2, 0, 1, 1, 'omnivore', 0, 'diurnal', 'white'),
        ('bat', 1, 0, 2, 0, 1, 0, 'omnivore', 0, 'nocturnal', 'black'),
        ('penguin', 0, 1, 2, 0, 1, 1, 'carnivore', 0, 'diurnal', 'white'),
        ('scorpion', 0, 0, 8, 0, 1, 0, 'carnivore', 0, 'nocturnal', 'black'),
        ('parrot', 1, 0, 2, 1, 1, 1, 'herbivore', 0, 'diurnal', 'green'),
        ('frog', 0, 1, 4, 0, 1, 1, 'carnivore', 0, 'crepuscular', 'green'),
        ('dolphin', 0, 1, 0, 0, 1, 0, 'carnivore', 0, 'diurnal', 'grey'),
        ('dog', 0, 0, 4, 1, 1, 0, 'omnivore', 1, 'diurnal', 'brown'),
        ('cat', 0, 0, 4, 1, 1, 0, 'carnivore', 1, 'nocturnal', 'orange'),
        ('bear', 0, 0, 4, 0, 1, 0, 'omnivore', 1, 'crepuscular', 'brown'),
        ('lion', 0, 0, 4, 0, 1, 0, 'carnivore', 1, 'nocturnal', 'orange'),
        ('kangaroo', 0, 0, 2, 0, 1, 0, 'herbivore', 1, 'diurnal', 'brown'),
        ('monkey', 0, 0, 4, 0, 1, 0, 'omnivore', 1, 'diurnal', 'brown'),
        ('elephant', 0, 0, 4, 0, 0, 0, 'herbivore', 1, 'diurnal', 'grey'),
        ('horse', 0, 0, 4, 1, 1, 0, 'herbivore', 1, 'diurnal', 'black'),
        ('wolf', 0, 0, 4, 0, 1, 0, 'carnivore', 1, 'nocturnal', 'white'),
        ('hamster', 0, 0, 4, 1, 1, 0, 'herbivore', 1, 'crepuscular', 'brown'),
        ('squirrel', 0, 0, 4, 0, 1, 0, 'herbivore', 1, 'crepuscular', 'brown'),
        ('rat', 0, 0, 4, 1, 1, 0, 'omnivore', 1, 'nocturnal', 'grey'),
        ('fox', 0, 0, 4, 0, 1, 0, 'carnivore', 1, 'nocturnal', 'grey'),
        ('rabbit', 0, 0, 4, 1, 1, 0, 'herbivore', 1, 'diurnal', 'brown'),
        ('flamingo', 1, 1, 2, 0, 1, 1, 'omnivore', 0, 'diurnal', 'pink'),
        ('sheep', 0, 0, 4, 1, 1, 0, 'herbivore', 1, 'diurnal', 'white'),
        ('spider', 0, 0, 8, 0, 0, 1, 'carnivore', 0, 'nocturnal', 'black'),
        ('ant', 0, 0, 6, 0, 0, 1, 'omnivore', 0, 'diurnal', 'red'),
        ('crab', 0, 1, 6, 0, 1, 1, 'omnivore', 0, 'diurnal', 'red'),
        ('octopus', 0, 1, 0, 0, 0, 1, 'carnivore', 0, 'nocturnal', 'red'),
        ('turtle', 0, 1, 4, 0, 1, 1, 'herbivore', 0, 'diurnal', 'green'),
        ('crocodile', 0, 1, 4, 0, 1, 1, 'carnivore', 0, 'nocturnal', 'green'),
        ('snake', 0, 0, 0, 0, 1, 1, 'carnivore', 0, 'nocturnal', 'green'),
        ('lizard', 0, 0, 4, 0, 1, 1, 'omnivore', 0, 'diurnal', 'brown'),
        ('hen', 0, 0, 2, 1, 1, 1, 'omnivore', 0, 'diurnal', 'white'),
        ('cheetah', 0, 0, 4, 0, 1, 0, 'carnivore', 1, 'diurnal', 'yellow'),
        ('whale', 0, 1, 0, 0, 1, 0, 'carnivore', 0, 'diurnal', 'black'),
        ('peacock', 1, 0, 2, 0, 1, 1, 'omnivore', 0, 'diurnal', 'blue');

`

function runQuery(sqlQuery){
        return new Promise((resolve, reject) => {
                db.run(sqlQuery, (err) => {
                        if (err) reject(err);
                        else{
                                resolve();
                        }
                })
        })
}

const db = new sqlite.Database("guess_who.db", (err) => {
        if (err !== null) {console.log("error creating the database")
                return;
        };

        runQuery(createTableQuery).then(() => {
                console.log("Table Animal Created Successfully");

                return runQuery(insertValuesQuery);


        }).then(() => {
                console.log("Values are inserted Successfully");

        }).catch((err) => {console.log("error: ", err)});

        

});


// db.run(createTable, (err) => {if (err) console.log("ERROR creating table", err)});
// // it is OKAY to give error now because the table already exists ...

// db.run(insertToValues, (err) => {if (err != null) throw err});


