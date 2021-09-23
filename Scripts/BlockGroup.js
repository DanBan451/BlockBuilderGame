import {Block} from './Block.js';
import {sideBar} from './Sidebar.js';

export let listAll = [];
export class BlockGroup  {
  constructor () {    
    this.cells = document.querySelector('.board').children;     
      this.list = [];
    this.color = this.randomColor();
    if (sideBar.next != null) {
      this.color = sideBar.next;
      sideBar.setNext(this.randomColor());
    }    
    switch (this.color) {
      case 'blue':
        this.centerIndex = 1; 
        this.list = [new Block('blue', 13), new Block('blue', 14), new Block('blue', 15), new Block('blue', 16)];                              
        break;
      case 'yellow':
        this.centerIndex = 1;
        this.list = [new Block('yellow', 4), new Block('yellow', 5), new Block('yellow', 14), new Block('yellow', 15)];
        break;
      case 'orange':
        this.centerIndex = 1;
        this.list = [new Block('orange', 4), new Block('orange', 14), new Block('orange', 24), new Block('orange', 25)];
        break;
      case 'green':
        this.centerIndex = 2;
        this.list = [new Block('green', 4), new Block('green', 14), new Block('green', 15), new Block('green', 25)];
        break;
      case 'purple':
        this.centerIndex = 1;
        this.list = [new Block('purple', 3), new Block('purple', 4), new Block('purple', 14), new Block('purple', 5)];
        break;
    }     
    this.dropPosition = this.getDropPosition();
    this.renderClone();
    sideBar.setNext(this.randomColor());
  }
  // Moves the BlockGroup while also checking for barriers
  move(direction) {
    switch(direction) {
      case 'right': 
        if (this.isEdge('right')) {return;}              
        for (let i = 0; i < this.list.length; i++) {        
          this.list[i].move('right');       
        }        
        this.fixBlockGroupColor();
        break;
      case 'left':
        if (this.isEdge('left')) {return;}  
        for (let i = 0; i < this.list.length; i++) {                    
          this.list[i].move('left');         
        }        
        this.fixBlockGroupColor();   
        break;
      case 'down':        
        if (this.isEdge('down')) {
          newBlockGroup();              
          return;
        } 
        for (let i = 0; i < this.list.length; i++) {         
          this.list[i].move('down');              
        }        
        this.fixBlockGroupColor();
        break;
    }    
  }  
  // Rotates the BlockGroup
  rotate () {     
    if (this.color == 'yellow') {return;}
    var num, x, y, centerNum, centerX, centerY, rotateAmountX, rotateAmountY = 0;
    var newNums = [];
    
    for (let i = 0; i < this.list.length; i++) {
      num = this.list[i].getPosition();
      x = num % 10;
      y = Math.floor(num / 10 + 1);
      
      centerNum = this.list[this.centerIndex].getPosition();
      centerX = this.list[this.centerIndex].getPosition() % 10;
      centerY = Math.floor(this.list[this.centerIndex].getPosition() / 10 + 1);
      
      rotateAmountX = (y - centerY) * -1;
      rotateAmountY = (x - centerX);
  
      num = centerNum + rotateAmountX + rotateAmountY*10;

      if ((this.list[i].getPosition() % 10 > 5 && num % 10 == 0) || (this.list[i].getPosition() % 10 < 5 && num % 10 == 9) || num < 0 || num > 239) {        
        return;
      }      
      for (let q = 0; q < listAll.length; q++) {         
        if (num == listAll[q].getPosition()) {            
          return;            
        }                                      
      }
      newNums.push(num);                
    }    
    // Resets the color all for the shape: if not added, colors will be scattered. 
    for (let i = 0; i < this.list.length; i++) {      
      this.list[i].setColor('#1d1d1d');           
      this.list[i].changePosition(newNums[i]);
      this.list[i].setColor(this.color);           
    }

  }
  // Grabs position for an availabe landing, and drops the BlockGroup
  drop () { 
    for (let i = 0; i < this.dropPosition.length; i++) {
      this.list[i].setColor('#1d1d1d');
      this.list[i].changePosition(this.dropPosition[i]);
      this.list[i].setColor(this.list[i].getOriginalColor());
      this.fixBlockGroupColor(); 
    }
    // main ();
    this.move('down')
  }
  // Returns a random color between 5
  randomColor() {
    let list = ['blue', 'yellow', 'orange', 'green', 'purple'];
    return list[this.getRandomInt(0, 5)];        
  }
  // Returns a random int between 2 numbers 
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
  // Creates a border around an availabe drop position
  renderClone () {
    if (this.dropPosition.length != 0) {
      for (let i = 0; i < this.dropPosition.length; i++) {        
        this.cells[this.dropPosition[i]].style.boxShadow = 'none';          
      }                      
    }

    var direction = this.getDropPosition();
    for (let i = 0; i < direction.length; i++) {       
      this.cells[direction[i]].style.boxShadow = 'inset 3px 3px #666666, inset -3px -3px #666666';
    }
    this.dropPosition = direction;    
  }
  // Finds the drop position and returns it
  getDropPosition() {    
    var directions = [];
    this.list.forEach(Block => {
      directions.push(Block.getPosition());
    });
  
    var bottomTaken = false;
  
    while (!bottomTaken) {
      open = true;
      directions.forEach(direction => {        
        if (listAll.length > 0) {                                 
          for (let j = 0; j < listAll.length; j++) {                   
            if (direction + 10 == listAll[j].getPosition() || direction + 10 > 239) {
              open = false;
            }                                 
          }
        } else if (direction + 10 > 239) {
          open = false;
        }  
      });
          
      if (open) {        
        for (let i = 0; i < directions.length; i++) {
          directions[i] += 10;          
        }
      } else {
        bottomTaken = true;
      }    
    }    
    return directions;    
  }
  // Returns true if one block towards the direction hits the board
  isEdge(d) { 
    for (let i = 0; i < this.list.length; i++) {
      var num = this.list[i].getPosition();         
      if (d == 'right') {        
        if ((num + 1) % 10 == 0 || this.isEdgeBlock(i, 'right')) {
          return true;
        } 
      }
      else if (d == 'left') {        
        if (num % 10 == 0 || this.isEdgeBlock(i, 'left')) {
          return true;
        }         
      }
      else {
        if (num + 10 > 239 || this.isEdgeBlock(i, 'down')) {
          return true;
        }        
      }
    }
    return false;   
  }  
  // Returns true if one block towards the direction hits another block
  isEdgeBlock(i, d){
    if (d == 'right') {
      for (let q = 0; q < listAll.length; q++) {            
        if (this.list[i].getPosition() + 1 == listAll[q].getPosition()) {
          return true;
        }                                              
      }
    }
    else if (d == 'left') {
      for (let q = 0; q < listAll.length; q++) {         
        if (this.list[i].getPosition() - 1 == listAll[q].getPosition()) {
          return true;
        }                                                                
      }
    }
    else {
      for (let q = 0; q < listAll.length; q++) {         
        if (this.list[i].getPosition() + 10 == listAll[q].getPosition()) {
          return true;
        }                                            
      }
    }
    return false;
  }
  // Resets the BlockGroup Color, since when it changes, the colors get mixed up
  fixBlockGroupColor() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].setColor(this.color)           
    }    
  } 
  // Removes all "blocks" that make up a whole row
  collapse() {
  
    var rowBlocksList = [];      
    var checkedNumber = null;  
    let rowCount = 0;
    for (let i = 0; i < this.cells.length; i++) {     
  
      if (i % 10 == 0) {     
        rowBlocksList = [];
      }
      for (let j = 0; j < listAll.length; j++) {
        if (listAll[j].getPosition() == i) {        
          rowBlocksList.push(listAll[j]);             
          checkedNumber = listAll[j].getPosition();
        } else if (checkedNumber == null) {         
          rowBlocksList = [];      
        }                            
      }  
  
      if (rowBlocksList.length == 10) {                         
        this.removeRow(rowBlocksList);
        this.shiftRestDown(rowBlocksList); 
        rowCount++;         
      }                      
    }
    if (rowCount == 4) {
      sideBar.addScore(1200);
    } else {
      sideBar.addScore(rowCount * 40);
    }    
  }
  // Removes the row.
  removeRow(rowBlocksList) {
    for (let j = 0; j < rowBlocksList.length; j++) {
      var index = listAll.indexOf(rowBlocksList[j]);
      listAll[index].setColor('#1d1d1d');    
      listAll.splice(index, 1); 
    }
  }
  // Grabs the blocks that remain after the row(s) has been removed, and shifts it down
  shiftRestDown(rowBlocksList) {
    var lastBlockInArray2 = rowBlocksList[rowBlocksList.length - 1].getPosition() - 10;
    for (let j = 0; j < listAll.length; j++) {
      if (listAll[j].getPosition() <= lastBlockInArray2) {                              
        listAll[j].setColor('#1d1d1d');
        listAll[j].setPosition(10);
        listAll[j].setColor(listAll[j].getOriginalColor());                    
      }        
    }
    for (let i = 0; i < listAll.length; i++) {
      listAll[i].setColor(listAll[i].getOriginalColor());    
    }
  }  
  // Clears the board, and creates a new instance of BlockGroup
  reset() {
    listAll.map((block) => {
      block.setColor('#1d1d1d');
      this.cells[block.getPosition()].style.boxShadow = 'none';
    });        
    listAll = [];
    
    blockGroup = new BlockGroup();
  }
}
export let blockGroup = new BlockGroup();

// Adds the previus BlockGroup to listAll and creates a new instance of BlockGroup
function newBlockGroup() {  
  listAll = listAll.concat(blockGroup.list)     
  for (let i = 0; i < blockGroup.list.length; i++) {
    blockGroup.cells[blockGroup.list[i].getPosition()].style.boxShadow = 'none';
  }  
  
  if (sideBar.gameOverCheck()){
    sideBar.gameOver(); 
    return;
  }
  
  blockGroup = new BlockGroup();
  blockGroup.collapse();     
}

