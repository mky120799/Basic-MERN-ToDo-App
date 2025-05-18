const todoModel = require("../models/todo.model");
const Todo = require("../models/todo.model");

const getToDos = async (req, res) => {
  try {
    const toDos = await Todo.find();
    console.log(toDos);
    res.status(200).send({
      data: toDos,
      msg: "Fetched todos successfully"
    });
  } catch (err) {
    console.error(`Error fetching todos: ${err}`);
    res.status(500).send({
      msg: "Failed to fetch todos",
      error: err.message
    });
  }
};

const saveToDos = async (req, res) => {
  console.log(`req.body in saveToDo ${req.body}`)
  const toDo = req.body;
  console.log(toDo);
  const saveToDo = new Todo( toDo );
  try {
    await saveToDo.save();
    console.log(`User saved successfully: ${saveToDo}`);
    return res.status(201).json({
      data: saveToDo,
      msg: "Todo saved successfully"
    });
  } catch (err) {
    console.error(`Error saving user: ${err}`);
    return res.status(500).send({
      msg: "Failed to save todo",
      error: err.message
    });
  }
};

const updateToDos = async (req, res) => {
  const { todo } = req.body;
  const { id } = req.params.id;
  console.log(`id: ${id} and new todo to update: ${todo}`);
  try {
    const updatedTodos = await todoModel.findByIdAndUpdate(id, { todo }, { new: true });
    console.log(`query updated successfully ${updatedTodos}`);
    return res.status(200).json({
      data: updatedTodos,
      msg: "Updated the todo successfully"
    });
  } catch (err) {
    console.error(`Error updating todo: ${err}`);
    res.status(500).send({
      err: err.message,
      msg: "Failed to update todo"
    });
  }
}

const deleteTodos = async (req, res) =>{
    const {id} = req.params;
    console.log(`id being deleted: ${id}`);
    try{
       todoModel.findByIdAndDelete(id)
  .then(deletedTodo => {
    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    console.log("Deleted:", deletedTodo.toObject());
    res.status(200).json({
      data: deletedTodo,
      msg: "Deleted successfully"
    });
  })
    }
    catch(err){
        res.status(500).send({
            err:err.message,
            msg:"failed to delete"
        })
    }
}
module.exports={getToDos,saveToDos,updateToDos,deleteTodos}