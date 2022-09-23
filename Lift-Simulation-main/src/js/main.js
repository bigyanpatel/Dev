let noOfFloors = 0;
let noOfLifts = 0;

document.getElementById('generate').addEventListener('click',(e)=>{
    e.preventDefault();
    noOfFloors = document.getElementById('noOfFloors').value;
    noOfLifts = document.getElementById('noOfLifts').value;
    generateSimArea(noOfFloors, noOfLifts);
    document.getElementById('generate').disabled = true;
})

function generateSimArea(noOfFloors, noOfLifts){
    let controllers = document.createElement('div');
    controllers.setAttribute('class','controllers');
    controllers.setAttribute('id','controllers');
    document.getElementById('simulationArea').appendChild(controllers);
    for (let i=0;i<noOfFloors;i++) {
        let floorNo = `Level-${noOfFloors - i - 1}`
        document.getElementById('controllers').innerHTML += `
        <div class="floor-level">
            <p>${floorNo}</p>
            <button class="move" id="U-${i}">🔺</button>
            <button class="move" id="D-${i}">🔻</button>
        </div>    
        `;
    }
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

    for(let i = 1; i <= noOfLifts; i++){
        var div = document.getElementById(`box-${i}`);
        div.style.top = (noOfFloors - 1) * 100 + 'px';
    }


    let currFloor = 0;
    
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

    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[0].length; j++){
            if(i === data.length - 1){
                data[i][j] = j + 1;
            } else{
                data[i][j] = 0;
            }
        }
    }
   
    const allButtons = document.querySelectorAll('.move');
    console.log(allButtons)
    allButtons.forEach(btn => {
            btn.addEventListener('click', ()=>{
                let btnSelector = btn.id;
                if(btnSelector.includes("D-")){
                    let targetLift;
                    let targetLiftFound = false;
                    currFloor = parseInt(btnSelector.slice(2));
                    for(let i = currFloor; i >= 0; i--){
                        if(targetLiftFound){
                            targetLiftFound = false;
                            break;
                        }
                        for(let j = 0; j < data[0].length; j++){
                            if(i == currFloor && data[i][j] !== 0){
                                targetLift = data[i][j];
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
                                targetLiftFound = true;
                                break;
                            }
                            if(data[i][j] !== 0){
                                targetLift = data[i][j];
                                if(functionData[targetLift - 1] == true){
                                    continue;
                                }
                                functionData[targetLift - 1] = true;
                                data[i][j] = 0;
                                data[currFloor][j] = targetLift;
                                targetLiftFound = true;
                                const targetFlr = currFloor * 100;
                                var div = document.getElementById(`box-${targetLift}`);
                                let transitionTime = Math.abs(currFloor - i) * 2;
                                div.style.transition = transitionTime+ "s";
                                div.style.top = targetFlr + "px";
                                let door1 = document.getElementById(`box${targetLift}-door${1}`)
                                let door2 = document.getElementById(`box${targetLift}-door${2}`)
                                let totalTime = transitionTime + 5;
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
                                break;
                            }
                        }
                    }
                } else{
                    let targetLift;
                    let targetLiftFound = false;
                    currFloor = parseInt(btnSelector.slice(2));
                    for(let i = currFloor; i < data.length; i++){
                        if(targetLiftFound){
                            targetLiftFound = false;
                            break;
                        }
                        for(let j = 0; j < data[0].length; j++){
                            if(i == currFloor && data[i][j] !== 0){
                                targetLift = data[i][j];
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
                                targetLiftFound = true;
                                break;
                            }
                            if(data[i][j] !== 0){
                                targetLift = data[i][j];
                                if(functionData[targetLift - 1] == true){
                                    continue;
                                }
                                functionData[targetLift - 1] = true;
                                data[i][j] = 0;
                                data[currFloor][j] = targetLift;
                                targetLiftFound = true;
                                const targetFlr = currFloor * 100;
                                var div = document.getElementById(`box-${targetLift}`);
                                let transitionTime = Math.abs(currFloor - i) * 2;
                                div.style.transition = (transitionTime) + "s";
                                div.style.top = targetFlr + "px";
                                let door1 = document.getElementById(`box${targetLift}-door${1}`)
                                let door2 = document.getElementById(`box${targetLift}-door${2}`)
                                let totalTime = transitionTime + 5;
                                console.log(totalTime)
                                console.log(transitionTime)
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
                                break;
                            }
                        }
                    }
                }
            })
        }
    )
}


