
const prompt = require('prompt-sync')({sigint: true});

// Declaring variables

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Declaring Field class 

class Field {
  constructor(field) {
    this._field = field;
  }
  get field() {
    return this._field;
  }

  print() {
    this._field.forEach(element => {
      console.log(element.join(''));
    });
  }
  play() {
    let x = 0;
    let y = 0;
    let checkWin = false;
    let checkLoss = false;
    this.print();

//  Determine direction from input 

    do {
      let direction = prompt(
        'Where do you want to move? Please press W to go up, S to go down, A to go left and D to go right.'
      );
      switch (direction.toUpperCase()) {
        case 'W':
          x -= 1;
          break;
        case 'S':
          x += 1;
          console.log(x);
          break;
        case 'D':
          y += 1;
          break;
        case 'A':
          y -= 1;
          break;
        default:
          prompt('Invalid entry. Please type W, S, A or D.');
      }

// Determin Win or Loss

      if (this._field[x][y] === 'O') {
        checkLoss = true;
        console.log('Oh no! You have fallen into an hole!');
      } else if (this._field[x][y] === '^') {
        checkWin = true;
        console.log('Well Done! You found the hat!');
      } else if (
        x < 0 ||
        x >= this._field.length ||
        y < 0 ||
        y >= this._field.length 
      ) {
      
        x = undefined;
        y = undefined;
        console.log('Oh no! You have fallen off the edge!');
      }
      this._field[x][y] = pathCharacter;
    } while (
      checkWin === false &&
      checkLoss === false &&
      x !== undefined &&
      y !== undefined
    );
    this.print();
  }

// Generate Field

  static generateField(height, width, holes) {
    let newField = [];
    let holesCount = 0;
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        newField[i].push('░');
      }
    }
    do {
      let x = Math.floor(Math.random() * height);
      let y =  Math.floor(Math.random() * width);
      newField[x][y] = 'O'
      holesCount += 1;
    } while (holesCount < holes);
    for (let j = 0; j < 1; j++) {
      let x =  Math.floor(Math.random() * height);
      let y = Math.floor(Math.random() * width);  
      newField[x][y] = '^';
    }
    newField[0][0] = '*';
    this._field = newField;
    return this._field
  }
  playGame() {
    this.play();
    
  }
}

const myField = new Field(Field.generateField(5,5,6));

myField.playGame();