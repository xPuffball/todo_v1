const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const app = express();


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');

const todoTasks = { 
  user: {
    todo: {}
  }
}

const completedTasks = {}


app.get("/", (req, res) => {
  const templateVars = { todo: todoTasks["user"]["todo"], complete: completedTasks }
  res.render("index", templateVars);
})

app.post("/", (req, res) => {
  let curTasksLength = Object.keys(todoTasks["user"]["todo"]).length;
  todoTasks["user"]["todo"][`task${curTasksLength+1}`] = {
    taskName: req.body.taskName,
    taskDesc: req.body.taskDesc,
    poms: req.body.poms
  }
  res.redirect("/")
})

app.post("/:taskVar/delete", (req, res) => {
  delete todoTasks["user"]["todo"][req.params.taskVar];
  res.redirect("/")
})

app.post("/:completedVar/complete", (req, res) => {
  let completedTasksLength = Object.keys(completedTasks).length;
  completedTasks[`task${completedTasksLength}`] = {
    taskName: todoTasks["user"]["todo"][req.params.completedVar]["taskName"],
    taskDesc: todoTasks["user"]["todo"][req.params.completedVar]["taskDesc"],
    poms: todoTasks["user"]["todo"][req.params.completedVar]["poms"]
  }
  delete todoTasks["user"]["todo"][req.params.completedVar];
  res.redirect("/")
})

app.post("/:taskVar/deleteComplete", (req, res) => {
  delete completedTasks[req.params.taskVar];
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server Listening on Port: ${PORT}`)
})