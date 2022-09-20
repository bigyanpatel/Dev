let noOfFloors = 0;
let noOfLifts = 0;

document.getElementById('generate').addEventListener('click',(e)=>{
    e.preventDefault()
    console.log("Hello from Submit");
    noOfFloors = document.getElementById('noOfFloors').value;
    console.log(noOfFloors);
    startSimulation(noOfFloors);
})

function startSimulation(noOfFloors){
    document.getElementById('simulationArea').innerHTML = ''
    for (let i=0;i<noOfFloors;i++) {
        let currLevel = `L${noOfFloors-i-1}`
        let floorNo = `Level-${noOfFloors - i - 1}`
        let currFloor = document.createElement('div')
        currFloor.setAttribute('id',floorNo);

        console.log(document.getElementById(floorNo))
        currFloor.classList.add('floor')
        currFloor.innerHTML = `
        <p>${floorNo}</p>
        <div>
        <button id=up${currLevel} class="button-floor upBttn">🔺</button><br>
        <button id=down${currLevel} class="button-floor downBttn">🔻</button>
        </div>
        `;
        document.getElementById('simulationArea').appendChild(currFloor);
    }
}