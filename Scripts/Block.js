export class Block {
  constructor(color, position) { 
    this.cells = document.querySelector('.board').children;  
    this.originalColor = color; 
    this.color = this.originalColor;
    this.position = position;
    this.setColor(color);    
  }
  // Moves the block in a given direction
  move(direction) {
    switch(direction) {
      case 'right': 
        this.setColor('#1d1d1d');
        this.setPosition(1);
        this.setColor(this.color);    
        break;
      case 'left':
        this.setColor('#1d1d1d');
        this.setPosition(-1);
        this.setColor(this.color);
        break;
      case 'down':
        this.setColor('#1d1d1d');
        this.setPosition(10);
        this.setColor(this.color);
        break;      
    }
  }
  // Changes the position
  changePosition(position) {
    this.position = position;
  }
  // Returns the position
  getPosition() {
    return this.position;
  }
  // Sets the position
  setPosition(num) {
    this.position += num;
  }   
  // Returns the color 
  getColor() {
    return this.color;
  }
  // Returns the color first assigned in the constructor
  getOriginalColor() {
    return this.originalColor;
  }
  // Sets the color, as well as the color of the DOM element
  setColor(color) {    
    this.cells[this.position].style.backgroundColor = color;    
    this.color = color;  
  }    
}
