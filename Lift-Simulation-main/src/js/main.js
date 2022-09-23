let noOfFloors;
let noOfLifts;

document.getElementById('generate').addEventListener('click',(e)=>{
    e.preventDefault();
    noOfFloors = document.getElementById('noOfFloors').value;
    noOfLifts = document.getElementById('noOfLifts').value;
    if(noOfLifts > 5){
        alert("Lifts no. should not exceed 5");
        return;
    }
    if(noOfLifts <= 0 || noOfFloors <= 0){
        alert("Please Enter some valid numbers mann!!");
        return;
    }
    generateSimArea(noOfFloors, noOfLifts);
    document.getElementById('generate').disabled = true;
})

function generateSimArea(noOfFloors, noOfLifts){

    //generating controllers to move the lift
    let controllers = document.createElement('div');
    controllers.setAttribute('class','controllers');
    controllers.setAttribute('id','controllers');
    document.getElementById('simulationArea').appendChild(controllers);
    for (let i=0;i<noOfFloors;i++) {
        let floorNo = `Level-${noOfFloors - i - 1}`
        document.getElementById('controllers').innerHTML += `
        <div class="floor-level">
            <p>${floorNo}</p>
            <div class="buttons">
                <button class="move" id="U-${i}">🔺</button>
                <button class="move" id="D-${i}">🔻</button>
            </div>
        </div>    
        `;
    }

    //deleting extra buttons
    const up0 = document.getElementById("U-0");
    up0.remove();
    const downLast = document.getElementById(`D-${noOfFloors - 1}`);
    downLast.remove();

    //generating elevators
    for(let i = 0; i < noOfLifts; i++){
        let div = document.createElement('div');
        div.setAttribute('class','floors');
        div.innerHTML =`
        <div class="box" id="box-${i+1}">
            <div class="doors">
                <div class="door-1" id="box${i+1}-door1"></div>
                <div class="door-2" id="box${i+1}-door2"></div>
            </div>
        </div>
        `
        document.getElementById('simulationArea').appendChild(div);
    }

    //generate floor border lines
    for(let i = 1; i < noOfFloors; i++){
        document.getElementById('simulationArea').innerHTML +=`
            <div class="lines" style="position:absolute; height:5px; width: 100%; top: ${i * 100}px; background-color: black"><div>
        `
    }

    //sending all the elevators to the groud-floor
    for(let i = 1; i <= noOfLifts; i++){
        var div = document.getElementById(`box-${i}`);
        div.style.top = (noOfFloors - 1) * 100 + 'px';
    }

    let currFloor = 0;

    //function to create 2d Matrix
    function createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createArray.apply(this, args);
        }
        return arr;
    }
    let data = createArray(noOfFloors, parseInt(noOfLifts));
    let functionData = new Array(noOfLifts).fill(false);

    //generating data for elevators to map their position
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(i === data.length - 1){
                data[i][j] = j + 1;
            } else{
                data[i][j] = 0;
            }
        }
    }

    //selecting all buttons to trigger action
    const allButtons = document.querySelectorAll('.move');
    allButtons.forEach(btn => {
            btn.addEventListener('click', ()=>{
                let btnSelector = btn.id;
                currFloor = parseInt(btnSelector.slice(2));
                if(btnSelector.includes("U-")){
                    check("up", currFloor);
                } else{
                    check("down", currFloor);
                }
            })
        }
    )
    
    
    //to check whether we need to lookup for the elevators above or below according to button trigger
    function check(check, currFloor){
        let targetLift;
        if(check === 'up'){
            for(let i = currFloor; i >= 0; i--){
                for(let j = 0; j < data[0].length; j++){
                    if(i == currFloor && data[i][j] !== 0){
                        targetLift = data[i][j];
                        liftOnSameFloor(targetLift);
                        return;
                    }
                    if(data[i][j] !== 0){
                        targetLift = data[i][j];
                        let alreadyMoving = liftTransition(targetLift, i , j);
                        if(alreadyMoving) continue;
                        return;
                    } 
                }
            }
        } else{
            for(let i = currFloor; i < noOfFloors; i++){
                for(let j = 0; j < data[0].length; j++){
                    if(i == currFloor && data[i][j] !== 0){
                        targetLift = data[i][j];
                        liftOnSameFloor(targetLift);
                        return;
                    }
                    if(data[i][j] !== 0){
                        targetLift = data[i][j];
                        let alreadyMoving = liftTransition(targetLift, i , j);
                        if(alreadyMoving) continue;
                        return;
                    } 
                }
            }
        }
    }

    //if the targetLift is already on the same floor
    function liftOnSameFloor(targetLift){
        if(functionData[targetLift - 1] == true){
            return;
        }
        let door1 = document.getElementById(`box${targetLift}-door${1}`)
        let door2 = document.getElementById(`box${targetLift}-door${2}`)
        functionData[targetLift - 1] = true;
        door1.style.width = 0 + "px";
        door2.style.width = 0 + "px";
        setTimeout(function(){
            door1.style.width = 50 + '%';
            door2.style.width = 50 + '%';
        }, 2500);
        setTimeout(function() {
            functionData[targetLift - 1] = false;
        },5000)
    }

    //to make the transition of the elevator
    function liftTransition(targetLift, i , j){
        if(functionData[targetLift - 1] == true){
            return true;
        }
        functionData[targetLift - 1] = true;
        data[i][j] = 0;
        data[currFloor][j] = targetLift;
        const targetFlr = currFloor * 100;
        var div = document.getElementById(`box-${targetLift}`);
        let transitionTime = Math.abs(currFloor - i) * 2;
        div.style.transitionDuration = transitionTime+ "s";
        div.style.top = targetFlr + "px";
        let door1 = document.getElementById(`box${targetLift}-door${1}`)
        let door2 = document.getElementById(`box${targetLift}-door${2}`)
        setTimeout(function(){
            door1.style.width = 0 + "px";
            door2.style.width = 0 + "px";
            setTimeout(function(){
                door1.style.width = 50 + '%';
                door2.style.width = 50 + '%';
            }, 2500);
            setTimeout(function() {
                functionData[targetLift - 1] = false;
            },5 * 1000)
        }, transitionTime * 1000);
    }
}