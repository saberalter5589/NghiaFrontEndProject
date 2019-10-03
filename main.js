document.getElementById("TaskInputForm").addEventListener("submit", saveTask);

function saveTask(e){

  var submitDetail    = document.getElementById("taskDetail").value;
  var submitUrgency   = document.getElementById("taskUrgency").value;
  var submitFinDate   = document.getElementById("dateFinish").value;
  var submitPerDone   = 0;
  var submitStatus    = 'ONGOING';
  var submitID        = chance.guid();

  var currentTask = {
    id      : submitID,
    detail  : submitDetail,
    urgency : submitUrgency,
    date    : submitFinDate,
    perDone : submitPerDone,
    status  : submitStatus
  }

  if(localStorage.getItem("tasks") == null){
    tasks = [];
    tasks.push(currentTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(currentTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  document.getElementById("TaskInputForm").reset();

  fetchTasks();

}

function deleteTask(id){
  var result = confirm("Want to delete this task?");
  if (result) {
    var allTask = JSON.parse(localStorage.getItem("tasks"));
    for(var i = 0; i < allTask.length; i++){
      if(allTask[i].id == id){
        allTask.splice(i , 1);
      }
    }
    localStorage.setItem("tasks",JSON.stringify(allTask));
    fetchTasks();
  }
}

function setPrecentage(num , id){
  console.log(num);
  var allTask = JSON.parse(localStorage.getItem("tasks"));
  for(var i = 0; i < allTask.length; i++){
    if(allTask[i].id == id){
      allTask[i].perDone = num;
    }
  }
  localStorage.setItem("tasks",JSON.stringify(allTask));
  fetchTasks();
}

function fetchTasks(){

  var tasks = JSON.parse(localStorage.getItem("tasks"));
  var taskList = document.getElementById("tasksList");

  taskList.innerHTML = "";

  for(var i = 0; i < tasks.length; i++){
    var taskId      = tasks[i].id;
    var taskDetail  = tasks[i].detail;
    var taskUrgency = tasks[i].urgency;
    var taskFinDate = tasks[i].date;
    var taskPerDone = tasks[i].perDone;
    var taskStatus  = tasks[i].status;

    if(taskPerDone == 100){
      taskStatus = 'FINISH';
    }

    var StatusColor = '';
    switch(taskStatus){
      case 'ONGOING':
        StatusColor = 'info';
        break;
      case 'FINISH':
        StatusColor = 'success';
        break;
    }

    var UrgencyColor = '';
      switch(taskUrgency){
        case 'Low':
          UrgencyColor = 'primary';
          break;
        case 'Medium':
          UrgencyColor = 'warning';
          break;
        case 'High':
          UrgencyColor = 'danger';
          break;
    }

    var PercentageColor = '';
      switch(taskPerDone){
        case 0:
          PercentageColor = 'default';
          break;
        case 25:
          PercentageColor = 'danger';
          break;
        case 50:
          PercentageColor = 'warning';
          break;
        case 75:
          PercentageColor = 'primary';
          break;
        case 100:
          PercentageColor = 'success';
          break;
    }

    //Compare date
    var today = new Date().toISOString().slice(0, 10);
    var DeadlineColor = '';
    if(taskFinDate < today){
      DeadlineColor = 'red';
    }


    taskList.innerHTML   +=   '<div class="well">' +
                              '<h5><b>Task ID: ' + taskId + "</b></h5>" +
                              '<h1>Task Detail: ' +  taskDetail  +  '</h1>'  +
                              '<table style="width:90%; margin: auto">' +
                              '<td><h3><b>STATUS </b><span class="label label-'+ StatusColor +'">' + taskStatus + '</span></h3></td>'  +
                              '<td><h3><b>PERCENTAGE DONE </b><span style="height:500px" class="label label-'+ PercentageColor +'">' +  taskPerDone  + " %"   + '</span></h3></td>' +
                              '<td><h3><b>URGENCY </b><span class="label label-'+ UrgencyColor +'">' + taskUrgency + '</span></h3></td> '  +
                              '</table>' +
                              '<br>' +
                              '<table style="width:37.5%; margin-left:27.5%">'  +
                              '<td><a href="#" class="btn btn-danger" onclick="setPrecentage(25,\''+ taskId +'\')"> Finish 25% </a></td>' +
                              '<td><a href="#" class="btn btn-warning" onclick="setPrecentage(50,\''+ taskId +'\')"> Finish 50% </a></td>' +
                              '<td><a href="#" class="btn btn-primary" onclick="setPrecentage(75,\''+ taskId +'\')"> Finish 75% </a></td>' +
                              '<td><a href="#" class="btn btn-success" onclick="setPrecentage(100,\''+ taskId +'\')"> Finish 100% </a></td> ' +
                              '</table>' +
                              '<br><br>' +
                              '<h3 id= "dealine"><b>Expected finished date </b> (Year/Month/Date) : <span style="color:' + DeadlineColor + '">' +  taskFinDate   + '</span></h3>' +
                              '<a href="#" class="btn btn-danger" onclick="deleteTask(\''+ taskId +'\')"><b>DELETE TASK</b></a>' +
                              '</div>';


  }


}
