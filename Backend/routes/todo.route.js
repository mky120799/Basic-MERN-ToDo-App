const express = require('express')
const Router = express.Router();
const {getToDos,saveToDos, updateToDos, deleteTodos }= require('../controller/todo.controller')


Router.get('/get',getToDos);
Router.post('/save',saveToDos);
Router.patch('/update/:id',updateToDos);
Router.delete('/delete/:id',deleteTodos);

module.exports = Router;