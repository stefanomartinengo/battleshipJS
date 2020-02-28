  /**
   * @TODO restrict double hit on points
   * @TODO Randomly generate locations for ships on initiation
   * @TODO Figure out closure or class use for gameplay
   */

window.onload = () => {
  var top = document.getElementById('top-grid');
  var bottom = document.getElementById('bottom-grid');

  var topPlayer = { ships: { small: [], medium: [], large: []} }
  var bottomPlayer = { ships: { small: [], medium: [], large: []} }

  var playerTurn = 'top'; // 'top' && 'bottom'

  const createGrid = (topPlayer, bottomPlayer, grid) => {

    /* Create board grid points */
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
    let r = [...e.path][1].id.split('-')[1]; // row
    let c = e.target.id.split('-')[1]; // col
    let attackPoint = `${r}.${c}`;
    let point = ( document.getElementById( ('row-'+r )).children[c - 1] );

    let hit = didTorpedoHit(attackPoint);
    if(hit) {
      point.classList.add('hit');
      if(playerTurn === 'top') {
        topPlayer.ships[hit.ship].push(attackPoint);
        topPlayer.ships[hit.ship].sort(); // doesnt sort double digits
      } else {
        bottomPlayer.ships[hit.ship].push(attackPoint);
        bottomPlayer.ships[hit.ship].sort(); // doesnt sort double digits
      }
      let sunk = didTorpedoSink(hit.ship);
      if(sunk) {
        alert('You sunk players '+ hit.ship + ' ship.')
        let win = didTorpedoWin();
        if(win) {
          alert('winner!'+topTurn);
        }
      }
    } else {
      point.classList.add('miss');
      playerTurn = (playerTurn === 'top') ? 'bottom' : 'top';
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
    if(playerTurn === 'top') {
      return (topPlayer.ships[ship].length ===  allShips[ship].length);
    } else {
      return (bottomPlayer.ships[ship].length ===  allShips[ship].length);
    }
  }

  const didTorpedoWin = () => {
    // check if all ships have been sunk
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

   createGrid(topPlayer, bottomPlayer, top);
}