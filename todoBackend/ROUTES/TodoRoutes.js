const express = require('express')
const router = express.Router()

const Todo = require('../MODELS/Todo')

router.get('/test',(req,res) =>{
    res.json({
        message: 'The todo routes API is working!'
    })
})

router.post('/createtodo',async(req,res) => {
    try{
        const { title, description} = req.body
        const newTodo = new Todo({
            title,
            description
        })
        await newTodo.save()
        res.status(201).json({
            message: 'Todo created sucessfully'
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
    
})

router.get('/getalltodos',async(req,res) =>{

    try{

        const todos = await Todo.find()
        res.status(200).json({
            todos,
            message: 'Got all todos succesfully'

        })
    }catch(err){
    res.json({
        message: err.message
    })
}
})

router.get('/gettodo/:id',async(req,res) =>{

    try{

        const todo = await Todo.findById(req.params.id)
        if(!todo){
            res.status(404).json({
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            todo,
            message: 'Got  todo succesfully'

        })
    }catch(err){
    res.json({
        message: err.message
    })
}
})

router.put('/edittodo/:id',async(req,res) =>{

    try{
        const { title,description, completed} = req.body
        const todo = await Todo.findByIdAndUpdate(req.params.id,{
            title,
            description,
             completed
        },{
            new : true
        })
        if(!todo){
            res.status(404).json({
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            todo,
            message: ' todo  updated succesfully'

        })
    }catch(err){
    res.json({
        message: err.message
    })
}
})

router.delete('/deletetodo/:id',async(req,res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo){
            res.status(500).json({
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            message: 'Todo deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
module.exports =router