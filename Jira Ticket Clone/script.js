let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont= document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;

addBtn.addEventListener("click", (e) =>{
    //display modal
    //generate ticket

    //addFlag, true -> Modal Display
    //addFlag, false -> Modal none
    addFlag = !addFlag;
    if(addFlag){
        modalCont.style.display = "flex";
    } else{
        modalCont.style.display = "none";
    }
})

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift"){
        createTicket();
        addFlag = false;
        modalCont.style.display = "none";
        textareaCont.value = "";
    }
    
})

function createTicket(){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color"></div>
        <div class="ticket-id">#Sample id</div>
        <div class="task-area">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, excepturi voluptas. Quia quasi esse nisi!
        </div>
    `;
    mainCont.appendChild(ticketCont);
}