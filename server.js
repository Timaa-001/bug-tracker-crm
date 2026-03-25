const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

let bugs = []

if (fs.existsSync("bugs.json")) {
bugs = JSON.parse(fs.readFileSync("bugs.json"))
}

function saveBugs() {
fs.writeFileSync("bugs.json", JSON.stringify(bugs, null, 2))
}

app.get("/bugs", (req, res) => {
res.json(bugs)
})

app.post("/bugs", (req, res) => {

const bug = {
id: Date.now(),
title: req.body.title,
description: req.body.description,
status: "Open"
}

bugs.push(bug)
saveBugs()

res.json(bug)

})

app.put("/bugs/:id", (req, res) => {

const id = parseInt(req.params.id)

bugs = bugs.map(b => {

if (b.id === id) {
b.status = req.body.status
}

return b

})

saveBugs()

res.json({message: "updated"})

})

app.listen(PORT, () => {
console.log("Server running on port " + PORT)
})
