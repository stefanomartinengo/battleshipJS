// grid = 15 X 15
	// 1.3 (1=row, 3=col)
// Ships:
	/*
  	1: 3 spaces
    2: 5 spaces
    3: 8 spaces
  */
// Both sides get own grid and own spaces
// maintain state of hit/misses
// use classes and new constructor

// functions:
	/*
  	1: Shoot
    2: check hit/miss
    3: Check turn (hits go again)
    4: Check if win every turn
  */

window.onload = () => {
  var top = document.getElementById('top-grid');
  var bottom = document.getElementById('bottom-grid');

  const createGrid = (grid) => {
    for(var i = 1; i <= 15; i++) { // ROW
      let row = document.createElement('div');
      row.onclick = (e) => launchTorpedo(e);
      row.className = 'row';
      row.id = `row-${i}`;
      grid.appendChild(row);

      for(var j = 1; j <= 15; j++) { // COL
        let row = document.getElementById(`row-${i}`)
        let col = document.createElement('div');
        col.className = 'col';
        col.id = `col-${j}`;
        row.appendChild(col);
      }
    }
  }

  const launchTorpedo = (e) => {
    let attackPointRow = [...e.path][1].id.split('-')[1]
    let attackPointCol = e.target.id.split('-')[1];
    let attackTarget = `${attackPointRow}.${attackPointCol}`
    console.log(attackTarget)
  }

  const ships = () => {
    let ships = {
      small: ['4.7', '4.8', '4.9'], // 3 points
      medium: ['9.4', '10.4', '11.4', '12.4', '13.4'], // 5 points
      large: ['1.5','1.6','1.7','1.8','1.9','1.10','1.11','1.12'], // 8 points
    }
  }
   createGrid(top);
}