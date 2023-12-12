"use strict";
class Task{
    constructor(taskName,currentTaskContainerElem,completedTasksContainer,userInput){
        this.name = taskName;
        this.currentContainer = currentTaskContainerElem;
        this.completedContainer = completedTasksContainer;
        this.userInput = userInput;
    }

    create(){
        //Create containers for each elements
        const divTask = document.createElement("div");
        const divInfo = document.createElement("div");
        const divButtons = document.createElement("div");
        // const divBorder = document.createElement("div");

        const checkBox = document.createElement("input");
        const p = document.createElement("p");

        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        //Assigning specified classes
        divTask.setAttribute("class","task");
        divInfo.setAttribute("class","task-info");
        divButtons.setAttribute("class","buttons");
        // divBorder.setAttribute("class","border");

        checkBox.type = "checkbox";
        checkBox.id = "checkbox";
        p.innerHTML = this.name;

        //set the buttons ID's
        editButton.id = "edit";
        deleteButton.id = "delete";

        //Set the button's text
        editButton.innerHTML = "Edit"
        deleteButton.innerHTML = "Delete";
        
        //Append elements to their container
        divInfo.append(checkBox, p);
        divButtons.append(editButton, deleteButton);
        divTask.append(divInfo,divButtons);

        //Append containers to the main element
        this.currentContainer.append(divTask);
    }

    handleDeleteEvent(event){
        this.deleteButtons = document.querySelectorAll("#delete");
        this.deleteButtons.forEach(button => {
            button.addEventListener(event, (e) => {
                let taskContainer = e.target.parentNode.parentNode;
                let task = e.target.parentNode;

                this.deleteTask(taskContainer,task);
            })
        })
    }

    handleEditEvent(event){
        this.editButtons = document.querySelectorAll("#edit");
        this.editButtons.forEach(button => {
            button.addEventListener(event, (e) => {

                let editButtonElem = e.target;
                let taskContainer = e.target.parentNode.parentNode;
                let taskInfo = taskContainer.querySelector(".task-info");
                let p = taskInfo.querySelector("p");
                let input = document.createElement("input");

                editButtonElem.innerHTML = "Confirm";
                input.setAttribute("class","new-input");
                input.value = p.innerHTML;
                taskInfo.replaceChild(input,p);
                input.focus();

                editButtonElem.addEventListener("click",() =>{
                    p.innerHTML = input.value;
                    taskInfo.replaceChild(p,input);
                    editButtonElem.innerHTML = "Edit";
                })
                
            })
        })
    }

    handleCheckEvent(event){
        this.checkBox = this.currentContainer.querySelectorAll("input[type = checkbox]");
        this.checkBox.forEach(checkbox => {
            checkbox.addEventListener(event , (e) => {
               if (e.target.checked === true){
                    let taskContainer = e.target.parentNode.parentNode;
                    let task = e.target.parentNode;

                    this.moveTaskToCompleted(taskContainer); 
                    return; 
               }
                let taskContainer = e.target.parentNode.parentNode;
                let task = e.target.parentNode;
                this.moveTaskToCurrent(taskContainer);

            })
        })
    }

    moveTaskToCurrent(task){
        task.querySelector("p").style.textDecoration = "none";
        this.currentContainer.append(task);
    }

    moveTaskToCompleted(task){
        task.querySelector("p").style.textDecoration = "line-through";
        this.completedContainer.append(task);
    }
        
    clearInput(){
        this.userInput.value = "";
    }

    editTask(task){

    }

    deleteTask(taskContainer , task){
        taskContainer.remove(task);
    }
}

const addTaskButton = document.querySelector("[data-addTask]");
const userInput = document.querySelector("[data-userInput]");
const currentTaskContainerElem = document.querySelector("[data-currentTask]");
const completedTasksContainer = document.querySelector("[data-complete]");

function addTask(){
    createTask();
}

function createTask(){
    let userTask = getUserInput();
    let task = new Task(userTask,currentTaskContainerElem,completedTasksContainer,userInput);

    task.create();
    task.clearInput();
    task.handleCheckEvent("click");
    task.handleDeleteEvent("click");
    task.handleEditEvent("click");
}

function getUserInput(){
    if (!userInput.value){
        console.log(2);
        return;
    }
    return userInput.value;
}

addTaskButton.addEventListener("click",addTask);