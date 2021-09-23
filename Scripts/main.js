import { blockGroup } from './BlockGroup.js';
import { sideBar } from './Sidebar.js';

const interval = setInterval(function(){ 
  main();
}, 1000)
sideBar.interval = interval;

// Checks to see whether the game is over, and executes if it is, otherwise moves the BlockGroup down.
export function main () {
  if (sideBar.isGameOver == false)
    blockGroup.move('down');  
  else 
    sideBar.gameOver();
} 
document.querySelector('body').addEventListener('keyup', (e) => {
  if (e.key == 'ArrowRight') blockGroup.move('right');
  else if (e.key == 'ArrowLeft') blockGroup.move('left');
  else if (e.key == 'ArrowDown') blockGroup.move('down')
  else if (e.key == 'ArrowUp') blockGroup.rotate();  
  else if (e.key === ' ') blockGroup.drop();  
  blockGroup.renderClone();   
})

