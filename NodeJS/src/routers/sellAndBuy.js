const { query } = require("express");
const express = require("express");
const SellBuy =require("../mongoose/models/sellBuy")

// setting up the router

const sellAndBuyRouter = new express.Router();

// code goes here for routes

// get products
sellAndBuyRouter.get('/sellProduct',async (req,res)=>{
  try{
    if(req.query.product){
      product = await SellBuy.find({productName:req.query.product.replace(/"/g,'')})
    }else if(req.query.sortBy){
      if(req.query.sortBy.replace(/"/g,'') === "lowerCostPrice"){
        product = await SellBuy.find().sort({costPrice:-1})
      }else if(req.query.sortBy.replace(/"/g,'') === "higherCostPrice"){
        product = await SellBuy.find().sort({costPrice:1})
      }else if(req.query.sortBy.replace(/"/g,'') === "lowerSoldPrice"){
        product = await SellBuy.find().sort({soldPrice:-1})
      }else if(req.query.sortBy.replace(/"/g,'') === "higherSoldPrice"){
        product = await SellBuy.find().sort({soldPrice:1})
      }
    }else{
      product = await SellBuy.find();
    }
    res.status(200).json(product);
  }catch(err){
    res.status(400).send(err);
  }
})

// create product
sellAndBuyRouter.post("/sellProduct",async(req,res)=>{
  try{
    await SellBuy(req.body).save();
    res.status(201).send("Product Added");
  }catch(err){
    const errMsg = err.errors.productName? err.errors.productName.message : err.errors.costPrice.message
    res.status(400).send(errMsg);
  }
})

// update product
sellAndBuyRouter.patch("/sellProduct/:id",async(req,res)=>{
  try{
    console.log(req.params.id)
    product = await SellBuy.findByIdAndUpdate(req.params.id.replace(":",""),req.body,{
      new:false,
      runValidators:true,
      useFindAndModify:false
  })
  res.status(200).send("Updated Successfully");
  console.log("success")
  }catch(err){
    const errMsg = err.errors.soldPrice.message
    res.status(400).json(errMsg);
  }
})

// delete product
sellAndBuyRouter.delete("/sellProduct:id",async(req,res)=>{
  try{
    await SellBuy.findByIdAndDelete(req.params.id.replace(":",""));
    res.status(200).send("Deleted Succesfully");
  }catch(err){
    res.status(400)
  }
})

// exporting the router

module.exports = sellAndBuyRouter;


