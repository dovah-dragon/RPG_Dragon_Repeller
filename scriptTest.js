
let numbers = [];
let i=1;

function pick(guess){

    while (i <= 10) {
        // numbers.push(Math.random() * 11);
        
        let randu = (Math.random() * 11); 
        let rand = Math.floor(randu);
        numbers.push(rand);
        i++;
    }
}

pick();
console.log(numbers);
console.log(numbers.indexOf(8));




