import { main } from "./main.js";
import { blockGroup } from "./BlockGroup.js";

class Sidebar {  
  constructor () {      
    this.highScore = 0;
    this.score = 0;
    this.level = 0;
    this.currentSpeed = 1000;
    this.interval = null;    
    this.next = null; 
    this.isGameOver = false;
    this.gameOverCount = 0;    
  }
  // Renders the next BlockGroup in the display
  setNext(type) {
    let cells = document.querySelector('.display').children;   
    for (let i = 0; i < cells.length; i++) {      
      cells[i].style.width = '0px';     
      cells[i].style.height = '0px';           
    }
    for (let i = 0; i < cells.length; i++) {
      cells[i].style. backgroundColor = '#1d1d1d';      
    } 
    let color = type;
    switch (color) {
      case 'blue': 
        cells[4].style.backgroundColor = color;
        cells[5].style.backgroundColor = color;
        cells[6].style.backgroundColor = color;
        cells[7].style.backgroundColor = color;
        break;   
      case 'yellow':
        cells[1].style.backgroundColor = color;
        cells[2].style.backgroundColor = color;
        cells[5].style.backgroundColor = color;
        cells[6].style.backgroundColor = color;
        break; 
      case 'orange':
        cells[0].style.backgroundColor = color;
        cells[4].style.backgroundColor = color;
        cells[8].style.backgroundColor = color;
        cells[9].style.backgroundColor = color;
        break;                   
      case 'green':
        cells[0].style.backgroundColor = color;
        cells[4].style.backgroundColor = color;
        cells[5].style.backgroundColor = color;
        cells[9].style.backgroundColor = color;
        break; 
      case 'purple':
        cells[0].style.backgroundColor = color;
        cells[1].style.backgroundColor = color;
        cells[2].style.backgroundColor = color;
        cells[5].style.backgroundColor = color;
        break; 
    }            
    for (let i = 0; i < cells.length; i++) {      
      if (cells[i].style.backgroundColor == color) {
        cells[i].style.width = '20px';     
        cells[i].style.height = '20px';     
      } 
    }
    this.next = color;        
  }
  // Sets the high-score and the h1
  setHighScore() {  
    if (this.score > this.highScore) {
      this.highScore = this.score;
      document.querySelector('.display-high-score h1').innerHTML = this.highScore; 
    }
  }
  // Sets the score and the h1
  setScore(value) {
    this.score = value;
    document.querySelector('.display-score h1').innerHTML = this.score;  
  }
  // Increments score and updates level
  addScore(value) {     
    this.setScore(this.score += value)
    this.updateLevel();  
  }
  // Increments level accordingly, and updates the h1
  updateLevel() { 
    let result = Math.floor(this.score / 100);
    if (result > this.level) {
      this.level = result;
      document.querySelector('.display-level h1').innerHTML = this.level; 

      if (this.currentSpeed != 100) {
        this.currentSpeed -= 100;
      }
      clearInterval(this.interval);
      this.interval = window.setInterval(() => {main()}, this.currentSpeed);      
      console.log(this.currentSpeed);      
    }
  }
  // Sets level and updates h1
  setLevel(value) {
    this.level = value;
    document.querySelector('.display-level h1').innerHTML = this.level; 
  }
  // Checks to see whether the conditions for "Game Over" are met; if so, it starts a timer
  gameOverCheck() { 
    for (let i = 0; i < blockGroup.list.length; i++) {
      if (blockGroup.list[i].getPosition() < 30) {                
        this.isGameOver = true;    
        document.querySelector('.game-over').style.visibility = 'visible';  
        return true;
      }    
    }  
    return false;
  }
  // Displays the "Game Over" h1 for 3 seconds
  gameOver() {        
    this.gameOverCount++;
    if (this.gameOverCount == 3) {
      this.gameOverCount = 0;
      this.isGameOver = false;
      this.reset();
    }
  }  
  // Resets the whole game (except high-score) and starts a new one
  reset() {            
    document.querySelector('.game-over').style.visibility = 'hidden';
    blockGroup.reset();
    this.setHighScore();
    this.setScore(0);
    this.setLevel(0)        
    this.next = null;
    this.currentSpeed = 1000;   
    clearInterval(this.interval);
    this.interval = window.setInterval(() => {main()}, this.currentSpeed);   
  }
}
 
export let sideBar = new Sidebar();