let noOfFloors;
let noOfLifts;
let data; //to store the coordinates of the lifts floors
let functionData; //to store the lift functioning : whether it is in freeze state or working
let currFloor; //this holds the target floor to move the lift;
let taskOrder = [];

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
    generateData(noOfFloors, noOfLifts)
    generateSimArea(noOfFloors, noOfLifts);
})

function generateData(noOfFloors,noOfLifts){
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


    data = createArray(parseInt(noOfFloors), parseInt(noOfLifts));
    functionData = new Array(parseInt(noOfLifts)).fill(false);

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
}

function generateSimArea(noOfFloors, noOfLifts){
    // to reset out data and ui for generating everything once again
    if (document.getElementById("controllers")) {
        document.getElementById('simulationArea').innerHTML = "";
    }

    //generating controllers to move the lift
    let controllers = document.createElement('div');
    controllers.setAttribute('class','controllers');
    controllers.setAttribute('id','controllers');
    document.getElementById('simulationArea').appendChild(controllers);

    for (let i=0;i<noOfFloors;i++) {
        let floorNo = `Level-${noOfFloors - i - 1}`
        let currLevel = document.createElement('div');
        currLevel.setAttribute('class', 'floor-level');

        let pTag = document.createElement('p');
        let PText = document.createTextNode(floorNo);
        pTag.appendChild(PText);

        let buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('class','buttons');

        let btnUp = document.createElement('button');
        let btnDown = document.createElement('button');
        btnUp.setAttribute('class','move');
        btnDown.setAttribute('class','move');
        btnUp.setAttribute('id',`U-${i}`);
        btnDown.setAttribute('id',`D-${i}`);

        let btnArrowUp = document.createTextNode('🔺');
        let btnArrowDowm = document.createTextNode('🔻');
        btnUp.appendChild(btnArrowUp);
        btnDown.appendChild(btnArrowDowm);
        buttonsDiv.appendChild(btnUp); 
        buttonsDiv.appendChild(btnDown);
        currLevel.appendChild(pTag);  
        currLevel.appendChild(buttonsDiv);  
        document.getElementById('controllers').appendChild(currLevel);   
    }

    //deleting extra buttons from the top and lowest levels
    const up0 = document.getElementById("U-0");
    up0.remove();
    const downLast = document.getElementById(`D-${noOfFloors - 1}`);
    downLast.remove();

    //generating elevators
    for(let i = 0; i < noOfLifts; i++){
        let div = document.createElement('div');
        div.setAttribute('class','floors');
        let elevator = document.createElement('div');
        let elevatorDoors = document.createElement('div');
        let textEle = document.createElement('p');
        let door1 = document.createElement('div');
        let door2 = document.createElement('div');

        elevator.setAttribute('class','box');
        elevator.setAttribute('id',`box-${i+1}`);
        elevatorDoors.setAttribute('class','doors');

        textEle.setAttribute('id',`box-${i+1}text`);
        textEle.style.position = 'absolute';
        textEle.style.margin = 10 + 'px';

        door1.setAttribute('class','door-1');
        door2.setAttribute('class','door-2');
        door1.setAttribute('id',`box${i+1}-door1`);
        door2.setAttribute('id',`box${i+1}-door2`);

        elevatorDoors.appendChild(door1); 
        elevatorDoors.appendChild(door2); 
        elevator.appendChild(elevatorDoors);
        elevator.appendChild(textEle);
        div.appendChild(elevator);
        document.getElementById('simulationArea').appendChild(div);
    }

    //generate floor border lines
    for(let i = 1; i < noOfFloors; i++){
        let borderLines = document.createElement('div');
        borderLines.setAttribute('class', 'lines');
        borderLines.style.top = i * 100 + "px";
        document.getElementById('simulationArea').appendChild(borderLines);
    }
    document.getElementById('simulationArea').classList.add('simulationAreaBorder');

    //sending all the elevators to the groud-floor
    for(let i = 1; i <= noOfLifts; i++){
        var div = document.getElementById(`box-${i}`);
        div.style.top = (noOfFloors - 1) * 100 + 'px';
        // div.style.top = 100 + '%';
    }

    //selecting the trigered button
    const allButtons = document.querySelectorAll('.move');
    allButtons.forEach(btn => {
            btn.addEventListener('click', ()=>{
                let btnSelector = btn.id;
                taskOrder.push(btnSelector.slice(2));
                const checkAvailable = setInterval(() => {
                    if (checkFreeLift()) { 
                        currFloor = parseInt(taskOrder.shift());
                        if(btnSelector.includes("U-")){
                            check("up", currFloor);
                        } else if(btnSelector.includes("D-")){
                            check("down", currFloor);
                        }
                        clearInterval(checkAvailable);
                    }
                }, 100);
            })
        }
    )
}

function checkFreeLift(){
    if(functionData.includes(false)){
        return true;
    }
}

//to check whether we need to look for the elevators above or below according to button trigger

/*
    lift Choosing criteria:-
        - look at the location of the lifts according to the button triggered
        - if up bottun is selected then look for freeLifts above if not available then look below it
          and similarly for the down down button
        - if no lift is available then wait for the lifts and as soon a lift got free
          it should start moving to the target floor following 2nd criteria.
*/

function check(check, currFloor){
    let targetLift;
    if(check === 'down'){
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
        checkAgain('up', currFloor);
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
        checkAgain('down', currFloor);
    }
}

function checkAgain(checkParam, currFloor){
    check(checkParam,currFloor);
}

//if the targetLift is already on the same floor
function liftOnSameFloor(targetLift){
    if(functionData[targetLift - 1] == true){
        return;
    }
    functionData[targetLift - 1] = true;
    let textEle = document.getElementById(`box-${targetLift}text`);
    textEle.innerHTML = '';
    textEle.style.textAlign = 'center';
    textEle.style.fontSize = 10 + 'px';
    let textP = document.createTextNode(`At
    Level-${noOfFloors - currFloor - 1}`);
    textEle.appendChild(textP);
    let transitionTime = 0;
    doorAnimation(targetLift,transitionTime);
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
    let textEle = document.getElementById(`box-${targetLift}text`);
    textEle.innerHTML = '';
    textEle.style.textAlign = 'center';
    textEle.style.fontSize = 10 + 'px';
    let textP = document.createTextNode(`Reached
    Level-${noOfFloors - currFloor - 1}`);
    textEle.appendChild(textP);
    doorAnimation(targetLift,transitionTime);
}

//door animation of the elevator
function doorAnimation(targetLift,transitionTime){
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