import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let tasks = []
const addBtn = document.getElementById('addTaskBtn')
const taskInput = document.getElementById('taskInput')

addBtn.addEventListener('click', function(){
    if(taskInput.value && !tasks.some(task => task.text === taskInput.value)){
        tasks.push({
            text: taskInput.value,
            isCompleted: false,
            uuid: uuidv4()
        })
        taskInput.value = ''
    }
    console.log(tasks)
    saveTasks()
    render()
})
document.addEventListener('click',function(e){
    if(e.target.dataset.del){
        handleDelBtn(e.target.dataset.del)
    }else if(e.target.dataset.done){
        handleCheckbox(e.target.dataset.done)
    }
})
function handleDelBtn(list){
    const index = tasks.findIndex(function(task){
        return task.uuid === list
    })
    if(index !== -1){
        tasks.splice(index,1)
        saveTasks()
        render()
    }
}
function handleCheckbox(uuid){
    const task = tasks.find(function(task){
        return task.uuid === uuid;
    });
    if(task){
        task.isCompleted = !task.isCompleted;
        saveTasks();
        render();
    }
}


function taskFeed(){
    let feedsHTML = ``
    tasks.forEach(function(task){
        if (task.text){
            feedsHTML += `
<div class="flex justify-between items-center bg-white shadow-md rounded-2xl p-4 mb-3 hover:bg-blue-50 transition-all">
    <div class="flex items-center gap-3">
        <input type="checkbox" data-done ="${task.uuid}" ${task.isCompleted ? 'checked' : ''}  class="accent-blue-600 w-5 h-5 rounded border-gray-300" />
        <span class="text-lg font-semibold text-gray-800 ${task.isCompleted ? "line-through text-gray-400" : ""}">${capitalizeFirst(task.text)}</span>
    </div>
    <button title="Delete" class="text-red-500 hover:text-red-700 text-xl transition-colors">
        <i class="fa-solid fa-minus" data-del = "${task.uuid}"></i>
    </button>
</div>
` 
        }
    })
    return feedsHTML
}

function render(){
    document.getElementById('taskList').innerHTML = taskFeed()
}
document.addEventListener('DOMContentLoaded', function() {
    tasks = loadTasks();
    render();
});
function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks(){
    const saved = localStorage.getItem('tasks')
    return saved ?JSON.parse(saved) : [];
}
