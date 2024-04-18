/* Sykkelutleie
Kunden ønsker en applikasjon som skal kunne liste opp syklene den har så andre kan leie dem. Det skal også være mulig å legge til nye sykler etterhvert.
-Lag en modell som kan fungere til teksten ovenfor
-Lag viewfunksjon for å vise frem alle syklene våre
-Lag en controllerfunksjon og et view til for å kunne legge til nye sykler
 */

updateView();
function updateView() {
  const app = document.querySelector("#root");
  app.innerHTML = /*HTML*/ `
    <h3>Available Cycle: click on cycle to rent-in</h3>
    <ul class="available">
    ${generateAvailableCycleList()}
    </ul><br>
    <div>
    <h3>Busy cycle: click on cycle to release</h3>
       <ul class="busy">
       ${busyCycle()}
       </ul>
    </div>

    <div>
        ${addNewCycle()}
    </div>


  `;
}

function generateAvailableCycleList() {
  let cycleList = "";
  for (let item of model.data.availableCycle) {
    if (item.available === true) {
      cycleList += `
        
        <li onclick="select(${item.id})">${item.id} ${item.farge} ${item.type}</li>
        `;
    }
  }
  return cycleList;
}

function select(selectedID) {
  console.log(selectedID);
  for (let item of model.data.availableCycle) {
    if (item.id === selectedID) {
      item.available = false;
    }
    updateView();
  }
}

function busyCycle() {
  let busyCycleList = "";
  for (let item of model.data.availableCycle) {
    if (item.available === false) {
      busyCycleList += `
          
          <li onclick="release(${item.id})">${item.id} ${item.farge} ${item.type}</li>
          `;
    }
  }
  return busyCycleList;
}

function addNewCycle() {
  let cycleForm = /*HTML*/ `
  <h4>Add new cycle</h4>
    <input onchange= "model.input.cycleColor=this.value" type="text" placeholder="cycle color"/>
    <input onchange= "model.input.cycleType=this.value"  style="width:200px" type="text" placeholder="cycle type: manual or e-cycle" />
    <button onClick="add()">Add</button>
    `;
  return cycleForm;
}

function add() {
  let id = model.data.availableCycle.length + 1;

  model.data.availableCycle.push({
    farge: model.input.cycleColor,
    type: model.input.cycleType,
    available: true,
    id: id,
  });
  updateView();
}

function release(selectedID) {
  console.log(selectedID);
  for (let item of model.data.availableCycle) {
    if (item.id === selectedID) {
      item.available = true;
    }
    updateView();
  }
}
