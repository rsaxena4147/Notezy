import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import User from "./models/user.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Note from "./models/note.js";
dotenv.config();


dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
const allowedOrigins = 'http://localhost:5173';
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "no user" });
  }

  try {

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId
        = tokenDecode.id;

      const user = await User.findById(tokenDecode.id)

    

      req.user = {
        email: user.email,
        username: user.username,
        _id: user._id,
       
       
      };


    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error Occured" });
  }
}

// ----------- SIGNUP --------------
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }


  try {

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });



    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.json({
      success: true,
      user: { email: user.email, name: user.username },
      message: "Account Created", user
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error Occurred at register" });
  }
});
// ---------------login----------------

app.post("/api/login", async (req, res) => {


  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if(!user){
      res.json({ success: false, message: "No Account detected" });

    }
    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      res.json({ success: false, message: "Invalid credentials" })

    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.json({ success: true, message: "Successfully LoggedIn", user });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured at login" })
  }

})



// ----------- LOGOUT --------------
app.get("/api/logout", (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  return res.json({ success: true, message: "Logged out successfully" });
});



//-------------fetching user through token---------------

app.get("/api/user", auth, async (req, res) => {
  const id = req.userId;




  res.json({ success: true, user: req.user })
  });

//---------------NOTES-----------


//fetching notes iif user

app.get("/api/notes", auth , async(req , res)=>{
  const user = req.user;
  const fullUser = await User.findById(user._id);

  const userId = fullUser.notes;

 
  try {
   const notes =await Note.find({ _id: { $in: userId }});

    res.json({success : true , notes});
  } catch (error) {
    console.log("Error at fetching");

    res.json({success : false });
    
  }


})

//create

app.post("/api/createnote", auth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    // Step 1: Create the note
    const newNote = await Note.create({ title, content });

    // Step 2: Push the note's _id to the user's notes array
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { notes: newNote._id } },
      { new: true }
    ).populate("notes");

    return res.status(201).json({
      success: true,
      message: "Note created",
      note: newNote,
    });

  } catch (error) {
    console.error(error);
      
    return res.json({success: false, error: "Failed to create note" });
  }
});


//showing note in detail 
app.get("/api/notes/:id", auth ,async (req , res)=>{
 const id = req.params.id;
 try {
 const note = await Note.findById(id);

 res.json({success: true , note});
  
 } catch (error) {
  console.log("Error in show")
  res.json({success: false});
 }
 
})
// PUT route to update/edit a note by ID
app.put('/api/notes/:id',auth ,  async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    // Find and update the note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { 
        title, 
        content,
        updatedAt: new Date()
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run mongoose validators
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      note: updatedNote
    });

  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating note'
    });
  }
});
// DELETE route to delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the note
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      note: deletedNote
    });

  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting note'
    });
  }
});


app.listen(port, () => {
  console.log("Server is running on port", port);
});
