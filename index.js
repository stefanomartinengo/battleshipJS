  /**
   * @TODO restrict double hit on points
   * @TODO Randomly generate locations for ships on initiation
   * @TODO Figure out closure or class use for gameplay
   */

window.onload = () => {

  var playerGrid = document.getElementById('player-grid');
  var computerGrid = document.getElementById('computer-grid');

  var player = { ships: { small: [], medium: [], large: []} }
  var computer = { ships: { small: [], medium: [], large: []} }

  var playerTurn = 'player'; // 'player' && 'computer'
  let turn = document.getElementById('turn-display');
  turn.innerHTML = `Turn: ${playerTurn}`;

  /**  Create board grid points **/
  const createGrid = (grid) => {
    for(var i = 1; i <= 15; i++) { // ROW
      let row = document.createElement('div');
      row.onclick = (e) => launchTorpedo(e);
      row.className = 'row';
      row.id = `row-${i}`;
      grid.appendChild(row);

      for(var j = 1; j <= 15; j++) { // COL
        let row = document.getElementById(`row-${i}`, {data: grid});
        row.setAttribute('grid', grid.id);
        let col = document.createElement('div');
        col.className = 'col';
        col.id = `col-${j}`;
        row.appendChild(col);
      }
    }
    /* Place ships on grid */
    let setShips = ships();
    for(var key in setShips) {
      setShips[key].forEach( (e) => {
        let r = e.split('.')[0]; // row
        let c = e.split('.')[1]; // col
        let point = ( document.getElementById( ('row-'+r )).children[c - 1] );
        point.classList.add('ship')
      })
    }
  }

  const launchTorpedo = (e) => {
    let grid = [...e.path][2].id;
    let r = [...e.path][1].id.split('-')[1]; // row
    let c = e.target.id.split('-')[1]; // col
    let attackPoint = `${r}.${c}`;
    var gridElement = document.getElementById(grid);
    let point = gridElement.children[r - 1].children[c-1];

    let hit = didTorpedoHit(attackPoint);
    if(hit) {
      point.classList.add('hit');
      if(playerTurn === 'player') {
        player.ships[hit.ship].push(attackPoint);
        player.ships[hit.ship].sort(); // doesnt sort double digits
      } else {
        computer.ships[hit.ship].push(attackPoint);
        computer.ships[hit.ship].sort(); // doesnt sort double digits
      }
      let sunk = didTorpedoSink(hit.ship);
      if(sunk) {
        alert(`you sunk: ${playerTurn}'s ${hit.ship}  ship.`)
        let win = didTorpedoWin();
        if(win) {
          alert('winner!' + playerTurn);
        }
      }
    } else {
      point.classList.add('miss');
      switchTurn();
    }
  }

  const didTorpedoHit = (attackPoint) => {
    let shipsToCheck = ships();
    let hit = false;

    for(var key in shipsToCheck) {
      shipsToCheck[key].forEach( (e) => {
        if(e == attackPoint) {
          hit = {
            ship: whichShip(shipsToCheck[key].length)
          }
        }
      });
      if(hit) {
        break;
      }
    }
    return hit;
  }

  const didTorpedoSink = (ship) => {
    let allShips = ships();
    if(playerTurn === 'player') {
      return (player.ships[ship].length ===  allShips[ship].length);
    } else {
      return (computer.ships[ship].length ===  allShips[ship].length);
    }
  }

  const didTorpedoWin = () => {
    let sortedMasterShips = ships();
    for(var key in sortedMasterShips) {
      sortedMasterShips[key] = sortedMasterShips[key].sort();
    }
    let playerShips = (playerTurn === 'player') ? player : computer;
    if(JSON.stringify(playerShips.ships) === JSON.stringify(sortedMasterShips)) {
      alert('winner');
    }
  }
  const ships = () => { // hard coded ship loations currently
    const ships = {
      small: ['4.7', '4.8', '4.9'], // 3 points
      medium: ['9.4', '10.4', '11.4', '12.4', '13.4'], // 5 points
      large: ['1.5','1.6','1.7','1.8','1.9','1.10','1.11','1.12'], // 8 points
    }
    return ships;
  }

  const whichShip = (shipLength) => {
    switch(shipLength) {
      case 3:
        return 'small';
      case 5:
        return 'medium';
      case 8:
        return 'large';
    }
  }

  const switchTurn = () => {
    playerTurn = ( playerTurn === 'player' ) ? 'computer' : 'player';
    var domTurn = document.getElementById('turn-display');
    domTurn.innerHTML = `Turn: ${playerTurn}`
  }

  createGrid(computerGrid);
  createGrid(playerGrid);
}