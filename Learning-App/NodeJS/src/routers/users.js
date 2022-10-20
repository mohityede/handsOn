const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here

// POST -> to enroll in course
usersRouter.post("/courses/enroll/:id",async(req,res)=>{
  try{
    const course = await Course.findById(req.params.id);
    if(course.isApplied){
      return res.status(403).json({error: "You have already applied for this course"});
    }
    await Course.findByIdAndUpdate(req.params.id,{isApplied:true},{
      new:false,
      runValidators:true,
      useFindAndModify:false
    });
    res.status(200).json({message: "You have successfully enrolled for the course"});
  }catch(err){
    res.send(400).send();
  }
})

// DELETE => to drop from course
usersRouter.delete("/courses/drop/:id",async(req,res)=>{
  try{
    const course = await Course.findById(req.params.id);
    if(!course.isApplied){
      return res.status(403).json({error: "You have not enrolled for this course"});
    }
    await Course.findByIdAndUpdate(req.params.id,{isApplied:false},{
      new:false,
      runValidators:true,
      useFindAndModify:false
    });
    res.status(200).json({message: "You have dropped the course"});
  }catch(err){
    res.status(400).send();
  }
})

// GET -> get all course
usersRouter.get("/courses/get",async(req,res)=>{
  try{
    const courses = await Course.find();
    res.status(200).json(courses);
  }catch(err){
    res.status(400).send();
  }
})

// PATCH -> get and update ratings
usersRouter.patch("/courses/rating/:id",async(req,res)=>{
  try{
    const course = await Course.findById(req.params.id);
    if(course.isRated){
      return res.status(403).json({error: "You have already rated this course"});
    }
    if(!course.isApplied){
      return res.status(403).json({error: "You have not enrolled for this course"});
    }
    const obj = {
      noOfRatings: course.noOfRatings+1,
      isRated: true,
      rating: parseFloat((((course.rating*course.noOfRatings)+req.body.rating)/(course.noOfRatings+1)).toFixed(1))
    }
    await Course.findByIdAndUpdate(req.params.id,obj,{
      new:false,
      runValidators:true,
      useFindAndModify:false
    });
    res.status(200).json({message: "You have rated this course"});
  }catch(err){
    res.send(400).send();
  }
})

module.exports = usersRouter;
