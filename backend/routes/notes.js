const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { validationResult, body } = require("express-validator");

// router 1 get notes
router.get("/fetchallnotes", fetchuser, async (req, res) => { 
  try {
    const notes = await Notes.find({user:req.user.id}) 
    res.json(notes); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error.");
  }
});

// router 2 add notes
router.post("/addnote", fetchuser,[
  body("title", "title is not valid.").isLength({ min: 3 }), 
  body("description", "description is must be atleast 5 char. ").isLength({ min: 5 }),
], async (req, res) => {
  try {
    const {title, description, tag} = req.body;
  
    // error hendaling
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    } 

    const note = new Notes({
      title, description, tag, user:req.user.id
    }) 
    const savenote = await note.save() 
    res.json(savenote); 
    
  } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.");
  }
 
});

// router 3 update notes
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {title, description, tag} = req.body; 
  try {
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}
    
    let note = await Notes.findById(req.params.id)   
    if(!note){return res.status(404).send("Not found ..") }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not Allowed.")
    }
    
   note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
   res.json({note}); 
      
  } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.");
  }
 
});

// router 4 delete notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {    
    let note = await Notes.findById(req.params.id)   
    if(!note){return res.status(404).send("Not found ..") }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not Allowed.")
    }
   note = await Notes.findByIdAndDelete(req.params.id)
   res.json({"Success": "Note has been deleted", note : note}); 
      
  } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.");
  }
 
});
module.exports = router;