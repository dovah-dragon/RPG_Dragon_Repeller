let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//buttons
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

//monster stats element
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

//inventory stat
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');

//Text area at bottom
const text = document.querySelector('#text');

const locations = [
    {
        name : "town square",
        buttonText : ["Go to store", "Go to cave", "Fight Dragon"],
        buttonFunctions : [goStore, goCave, fightDragon],
        text : "You are in Town Square. You see a sign that says \"Store\""
    },
    {
        name : "store",
        buttonText : ["Buy 10 Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to town square"],
        buttonFunctions : [buyHealth, buyWeapon, goTown],
        text : "You entered the store"
    },
    {
        name : "cave",
        buttonText : ["Fight Slime", "Fight fanged beast", "Go to town square"],
        buttonFunctions : [fightSlime, fightBeast, goTown],
        text : "You enter the cave. You see some monsters."
    }
];

const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    button1.innerHTML = location.buttonText[0];
    button2.innerHTML = location.buttonText[1];
    button3.innerHTML = location.buttonText[2];
    // update onclick property of each button as we are at store
    button1.onclick = location.buttonFunctions[0];
    button2.onclick = location.buttonFunctions[1];
    button3.onclick = location.buttonFunctions[2];
    //update text
    text.innerHTML = location.text; 
}

function goStore() {
    update(locations[1]);
}

function goTown() {
    update(locations[0]);
}



function goCave() {
    update(locations[2]);
}
function fightDragon() {
    console.log('fighting dragon');
}

function buyHealth() {
    
    if (gold >= 10) {
        gold = gold - 10;
        health = health + 10;
        goldText.innerHTML = gold;
        health.innerHTML = health;
    }
    else{
        text.innerText = "You do not have enough gold to buy health";
    }
}
function buyWeapon() {
    if (gold >= 30) {
        gold = gold - 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = 'You have a new weapon.' + newWeapon + ".";
    }
}

