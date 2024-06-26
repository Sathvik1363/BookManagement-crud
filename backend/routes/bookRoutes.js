import express from 'express'
import { Book } from '../models/bookmodel.js';

const router = express.Router();

// to add new book
router.post('/', async(req,res)=>{
    try {
        if(
            ! req.body.title ||
            ! req.body.author||
            ! req.body.price
        ){
            return res.status(400).send({
                message : 'Required all feilds'
            });
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            price : req.body.price
        };
        
        const book =  await Book.create(newBook)
        res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})

// to get all books
router.get('/', async(req,res)=>{
    try {
        const Books = await Book.find({});
        res.status(200).json({
            count : Books.length,
            data : Books
        })
       
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
        
    }
})
// to get book :by id
router.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const bookbyid = await Book.findById(id);
        console.log(bookbyid);
        res.status(200).json(bookbyid)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
        
    }
})

// to update a book by :id
router.put('/:id', async(req,res)=>{
    try {
        if(
            ! req.body.title ||
            ! req.body.author||
            ! req.body.price
        ){
            return res.status(400).send({
                message : 'Required all feilds'
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id , req.body);

        if(!result){
            return res.status(404).send({message: 'Book not found'})
        }
        
        return res.status(200).send({message: 'Book updated successfully'})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// delete a book 
router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message: 'Book not found'}) 
        }
        return res.status(200).send({message : "Book deleted sucessfully"});
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

export default router;