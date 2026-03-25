const api = "/bugs"

function loadBugs(){

fetch(api)
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("bugList")

list.innerHTML=""

data.forEach(bug=>{

const li=document.createElement("li")

li.innerHTML=
bug.title+" - "+bug.status+
" <button onclick='closeBug("+bug.id+")'>Close</button>"

list.appendChild(li)

})

})

}

function addBug(){

const title=document.getElementById("title").value
const description=document.getElementById("description").value

fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,description})
})
.then(()=>loadBugs())

}

function closeBug(id){

fetch(api+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({status:"Closed"})
})
.then(()=>loadBugs())

}

loadBugs()
