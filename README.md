# Group "30 lode"

## Members
- s339078 KALLAS AMJAD
- s339275 SHAHIMI ALI ELRIDA
- s339303 CHAMAA PATRICK

# Exercise "Guess Who?"

# Lab Journal
**Tables required for this project**:
  - Animal: the animal table consists of a list of animals having the following attributes:

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
        color TEXT NOT NULL

#### NOTE: name can be used directly as a primary key since only 1 copy of each animal type is possible.

- Each animal has a **unique** combination of all the attributes, so that the questions can lead in the end to **only** 1 animal.

- There are 3 levels of difficulty: *easy, normal, hard*.

  - easy: displays 12 animals
  - normal: displays 24 animals
  - hard: displays 36 animals
