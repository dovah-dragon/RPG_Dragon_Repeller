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
const button4 = document.querySelector('#button4');

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
    },
    {
        name : "fight",
        buttonText : ["Attack", "Dodge", "Run"],
        buttonFunctions : [attack, dodge, goTown],
        text : "You are fighting a monster."
    },
    {
        name : "Kill Monster",
        buttonText : ["Go to town square", "Go to town square", "Go to town square"],
        buttonFunctions : [goTown, goTown, easterEgg],
        text : 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name : "lose",
        buttonText : ["REPLAY?", "REPLAY?", "REPLAY?"],
        buttonFunctions : [restart, restart, restart],
        text : 'You DIE!!!'
    },
    {
        name : "win",
        buttonText : ["REPLAY?", "REPLAY?", "REPLAY?"],
        buttonFunctions : [restart, restart, restart],
        text : 'you defeat the dragon! YOU WIN THE GAME! 👑'
    },
    {
        name : "easter egg",
        buttonText : ["2", "8", "go to town square"],
        buttonFunctions : [pickTwo, pickEight, goTown],
        text : 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!'
    },
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
];

const monsters = [
    {
        name : "slime",
        level : 2,
        health : 15
    },
    {
        name : "fanged beast",
        level : 8,
        health : 60
    },
    {
        name : "dragon",
        level : 20,
        health : 300
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
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

function buyHealth() {
    
    if (gold >= 10) {
        gold = gold - 10;
        health = health + 10;
        goldText.innerText = gold;
        healthText.innerHTML = health;
    }
    else{
        text.innerText = "You do not have enough gold to buy health";
    }
}
function buyWeapon() {

    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold = gold - 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = 'You have a new weapon.' + newWeapon + ".";
            inventory.push(newWeapon);
        }
        else{
            text.innerText = "You do not have enough gold to buy weapon";
        }
    } else {
        text.innerText = "You already have the most powerful weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.addEventListener("click", sellWeapon);
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold = gold + 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ". | your inventory = [" + inventory + "]" ;
    } else {
        text.innerText = "Don't sell your only weapon";
    }
}

function fightSlime(){
    fighting = 0;
    goFight();
}
function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit() ) {
        health = health - getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += "you MISS!!!";
    }
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
    healthText.innerText = health;
    monsterHealth.innerText = monsterHealth;

    if (health <= 0) {
        loose();
    }
    else if (monsterHealth <= 0) {
        fighting ===2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += "Your " + inventory.pop() + " breaks";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){
        let hit = (level*5) - Math.floor(Math.random() * xp);
        console.log(hit);
        return hit;
}

function isMonsterHit() {
    return Math.random() > .2;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function loose() {
    update(locations[5]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 150;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

function winGame() {
    update(locations[6]);
}

//Inventory show

function showInventory() {

    for (let index = 0; index < inventory.length; index++) { 
        text.innerHTML = inventory;
    }
}

button4.onclick = showInventory;

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}
function pickEight() {
    pick(8);
}
function pick(guess){
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "you picked" + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";                
    }

    if (numbers.indexOf(guess) != -1) {
        text.innerText += "Right! You win 20 gold";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText = "Wrong! You lose 10 health";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            loose();
        }
    }
}
