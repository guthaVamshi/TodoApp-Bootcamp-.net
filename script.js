

var taskName = document.querySelector('#AddTaskInput');
var taskId = document.querySelector('#DeleteTaskId');


function AddTask() {
  var a = 1;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": taskName.value,
    "isComplete": false
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://localhost:44304/api/todo", requestOptions)
    .then(response => response.text())
    .then(result => rerun())
    .catch(error => console.log('error', error));

 
    document.querySelector('#staticBackdrop').style.display='none';

};

const api_url =
  "https://localhost:44304/api/todo";

  
async function getapi(url) {


  const response = await fetch(url);

  var data = await response.json();
  console.log(data);
  
  if (response) {
    hideloader();
  }
  show(data);
}

getapi(api_url);


function hideloader() {
  document.getElementById('loading').style.display = 'none';
}

function show(data) {
  let tab =
    `<tr class="table-primary">
          <th>Unique -id</th>
          <th>Name</th>
          <th>Task Completed</th>
         
         </tr>`;


  for (let r of data) {
    tab += `<tr> 
    <td>${r.id} </td>
    <td>${r.name}</td>
    <td>${r.isComplete}</td> 
          
</tr>`;
  }

  document.getElementById("Tasks").innerHTML = tab;
}

function DeleteTasksFunction() {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

   fetch("https://localhost:44304/api/todo/" + taskId.value, requestOptions)
    .then(response => response.text())
    .then(result => rerun())
    .catch(error => console.log('error', error));
  
   
    
};
var editId = document.querySelector("#EditTaskId");
var editName = document.querySelector("#EditTaskName");
function EditTasksFunction() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": editId.value,
    "name": editName.value,
    "isComplete": false
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://localhost:44304/api/todo/" + editId.value, requestOptions)
    .then(response => response.text())
    .then(result => rerun())
    .catch(error => console.log('error', error));

  
};

function rerun() {
  window.location.reload();
}