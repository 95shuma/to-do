'use strict'

class Task {
    constructor(id,name,status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}

function createAndAddTask(task) {
    let elem = document.createElement(`li`);
    elem.innerHTML = `${task.name}`;
    let att = document.createAttribute("id");
    att.value = `${task.id}`;
    elem.setAttributeNode(att);
    let att1 = document.createAttribute("ondblclick");
    att1.value = `changeStatus(this.id)`;
    elem.setAttributeNode(att1);
    if (`${task.status}`=="true"){
        console.log("status true")
    }else{
        let attr = document.createAttribute("class");
        attr.value = `status`;
        elem.setAttributeNode(attr);
    }
    document.getElementById("taskList").appendChild(elem);
}

async function getPost() {
    const taskForm = document.getElementById("form");
    const response = await fetch('http://localhost:8080/task/all');
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let taskJson = await response.json();
        for (let i=0; i<taskJson.length; i++){
            createAndAddTask(new Task(taskJson[i].id,taskJson[i].name,taskJson[i].status))
        }
        taskForm.reset();
        document.getElementById("myInput").focus();
    } else {
        taskForm.reset();
        alert("Country not found, try again");
        document.getElementById("myInput").focus();
    }
}

function a_fun(){
    const taskForm = document.getElementById("form");
    let data = new FormData(taskForm);

    fetch("http://localhost:8080/task", {
        method: 'POST',
        body: data
    }).
    then(r => {window.location.href = "http://localhost:8000/"});
};

function changeStatus(id){
    let task = document.getElementById(id);
    if (task.classList.contains("status")){
        task.classList.remove("status")
    } else {
        task.classList.add("status")
    }

    let form = document.getElementById("form")
    let data = new FormData(form);
    data.delete("task")
    data.append("id",id)
    fetch("http://localhost:8080/task/status", {
        method: 'POST',
        body: data
    });
}

window.addEventListener("load",async function () {
    await getPost();
    document.getElementById("form").addEventListener("submit",a_fun);
})