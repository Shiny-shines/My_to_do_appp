let orderoftask= getTask();
let saveButton = document.getElementById("savebtn");
saveButton.onclick = function () {
    localStorage.setItem("task", JSON.stringify(orderoftask));
}
function getTask() {
    let stringData = localStorage.getItem("task");
    let originalData=JSON.parse(stringData);
    if(originalData === null){
        return [];
    }
    else{
        return originalData;
    }

}
let taskcount = orderoftask.length;
console.log(taskcount);
let bigul = document.getElementById('ullist');
let addElem = document.getElementById("addbutton");
addElem.onclick = function () {
    add();
}
function todoapplication(task, newtask) {
    let inputboxId = "box" + task.uniqueNo;
    let labelId = "label" + task.uniqueNo;
    let listId = "list" + task.uniqueNo;
    //console.log(labelId);
    //console.log(inputboxId);

    let tasklist = document.createElement('li');
    tasklist.id = listId;
    bigul.appendChild(tasklist);

    tasklist.classList.add("d-flex", "flex-row");
    //console.log(bigul);

    let userInput = document.createElement("input");
    userInput.type = "checkbox";
    userInput.id = inputboxId;
    tasklist.appendChild(userInput);
    userInput.classList.add("tick-check");
    userInput.checked = task.isChecked;
    userInput.onclick = function () {
        labelstyle(inputboxId, labelId, listId);

    }


    let labeldiv = document.createElement('div');
    labeldiv.classList.add("label-box", "d-flex", "flex-row");
    tasklist.appendChild(labeldiv);

    let taskName = document.createElement('label');
    taskName.id = labelId;
    taskName.textContent = task.text;
    taskName.setAttribute("for", inputboxId);
    //console.log(inputboxId);
    //console.log(labelId);
    labeldiv.appendChild(taskName);
    if(task.isChecked === true){
        taskName.classList.add("checkboxstyle");
    }
    taskName.classList.add("label_name");

    let icondiv = document.createElement('div');
    labeldiv.appendChild(icondiv);
    icondiv.classList.add("trash-icon");

    let trashicon = document.createElement('i');
    trashicon.onclick = function () {
        deleteIcon(listId);
    }
    icondiv.appendChild(trashicon);
    trashicon.classList.add("fa-solid", "fa-trash-can", "trash-icon");



}
for (let task of orderoftask) {
    todoapplication(task);
}
function labelstyle(inputboxId, labelId, listId) {
    let checkbox = document.getElementById(inputboxId);
    let labelElem = document.getElementById(labelId);
    console.log(checkbox.checked);
    // if(checkbox.checked === true){
    //     labelElem.classList.add("checkboxstyle");
    // }
    // else{
    //     labelElem.classList.remove("checkboxstyle");
    // }
    if (checkbox) {
        labelElem.classList.toggle("checkboxstyle");
    }
    let checkboxIndex= orderoftask.findIndex(function(eachTask){
        let eachTaskid= "list"+ eachTask.uniqueNo;
        if(eachTaskid === listId){
            return true;
        }
        else{
            return false;
        }
    })
    console.log(checkboxIndex);
    let myItem= orderoftask[checkboxIndex];
    console.log(myItem);
    if(myItem.isChecked === true){
        myItem.isChecked = false;
    }
    else{
        myItem.isChecked = true;
    }


}
function deleteIcon(listId) {
    //console.log("delete function called");
    let listElem = document.getElementById(listId);
    bigul.removeChild(listElem);
    let deleteItemindex= orderoftask.findIndex(function(eachTask){
        let localtaskId= "list" + eachTask.uniqueNo;
        if(localtaskId === listId){
            return true;
        }
        else{
            return false;
        }
        
    })
    console.log(deleteItemindex);
    orderoftask.splice(deleteItemindex,1);

}
function add() {
    //console.log("add button working");
    let inputElem = document.getElementById("input");
    let inputValue = inputElem.value;
    if (inputValue === "") {
        alert("Enter a valid task");
        return;
    }
    //console.log(inputValue);
    taskcount = taskcount + 1;
    let newtask = {
        text: inputValue,
        uniqueNo: taskcount,
        isChecked: false
    }
    orderoftask.push(newtask);
    console.log(orderoftask);
    todoapplication(newtask);
    inputElem.value = "";

}

