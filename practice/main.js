var currFloor;
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}
let data = createArray(5,5);
let functionData = new Array(5).fill(false);

for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[0].length; j++){
        if(i === 0){
            data[i][j] = j + 1;
        } else{
            data[i][j] = 0;
        }
    }
}
const allButtons = document.querySelectorAll('.move');
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
                                console.log(functionData);
                                console.log("finished");
                            },5000)
                            targetLiftFound = true;
                            break;
                        }
                        if(data[i][j] !== 0){
                            targetLift = data[i][j];
                            if(functionData[targetLift - 1] == true){
                                continue;
                            }
                            console.log("started");
                            functionData[targetLift - 1] = true;
                            console.log(functionData);
                            data[i][j] = 0;
                            data[currFloor][j] = targetLift;
                            targetLiftFound = true;
                            const targetFlr = currFloor * 100;
                            var div = document.getElementById(`box-${targetLift}`);
                            div.style.transition = currFloor !== 0 ? currFloor * 2 + "s" : 2 + "s" ;
                            div.style.top =  targetFlr + "px";
                            let door1 = document.getElementById(`box${targetLift}-door${1}`)
                            let door2 = document.getElementById(`box${targetLift}-door${2}`)
                            let time = currFloor !== 0 ? currFloor * 2 : 2 ;
                            let totalTime = time + 5 * 1000;
                            setTimeout(function(){
                                door1.style.width = 0 + "px";
                                door2.style.width = 0 + "px";
                                setTimeout(function(){
                                    door1.style.width = 50 + '%';
                                    door2.style.width = 50 + '%';
                                }, 2500);
                                setTimeout(function() {
                                    functionData[targetLift - 1] = false;
                                    console.log(functionData);
                                    console.log("finished");
                                },totalTime)
                            }, time * 1000);
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
                                console.log(functionData);
                                console.log("finished");
                            },5000)
                            targetLiftFound = true;
                            break;
                        }
                        if(data[i][j] !== 0){
                            targetLift = data[i][j];
                            if(functionData[targetLift - 1] == true){
                                continue;
                            }
                            console.log("started");
                            functionData[targetLift - 1] = true;
                            console.log(functionData);
                            data[i][j] = 0;
                            data[currFloor][j] = targetLift;
                            targetLiftFound = true;
                            const targetFlr = currFloor * 100;
                            var div = document.getElementById(`box-${targetLift}`);
                            div.style.transition = currFloor !== 0 ? currFloor * 2 + "s" : 2 + "s" ;
                            div.style.top =  targetFlr + "px";
                            let door1 = document.getElementById(`box${targetLift}-door${1}`)
                            let door2 = document.getElementById(`box${targetLift}-door${2}`)
                            let time = currFloor !== 0 ? currFloor * 2 : 2 ;
                            let totalTime = time + 5 * 1000;
                            setTimeout(function(){
                                door1.style.width = 0 + "px";
                                door2.style.width = 0 + "px";
                                setTimeout(function(){
                                    door1.style.width = 50 + '%';
                                    door2.style.width = 50 + '%';
                                }, 2500);
                                setTimeout(function() {
                                    functionData[targetLift - 1] = false;
                                    console.log(functionData);
                                    console.log("finished");
                                },totalTime)
                            }, time * 1000);
                            break;
                        }
                    }
                }
            }
        })
    }
)