const express= require('express');
var passport = require('passport');
const routerComplain = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Complain = require('../models/Customer');


module.exports.view=(req,res,next)=>{
   /* jwt.verify(req.token, 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false});
        } else {
            //If token is successfully verified, we can send the autorized data 
           
             });
        }
    })
    */
    Complain.find().then(function(details){
        res.send(details);
    });
   
 
}

module.exports.updatedetails = (req, res, next) => {
    
	{
           var condition = {_id:req.params.id}
           let number = parseInt(req.body.serialnumber)
           Complain.updateOne(condition,req.body).then(doc =>{
            if(doc){
              return res.status(401).send({ success: true, msg:'successfully updated!' });
            }else{
              return res.status(401).send({ success: false, msg:'cannot finish your request!!' }); 
            }
        }) 
            
        }
    
}


module.exports.addcomplain=(req,res,next)=>{
             var today = new Date();
             var month = today.getMonth()+1;
             var year = today.getFullYear();
             var det = new Complain({
                name: req.body.name,
                email:req.body.email,
                description:req.body.description,
                subarea:req.body.subarea,
				color:req.body.color,
                status:req.body.status,
                address:req.body.address,
                month:month,
                year:year,
                date:Date.now()
               
            });
            det.save((err,doc)=>{
                if(!err){
                    res.send(doc);
                }
                else{
                    console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
                }
            });       
}

module.exports.getitemdetails = (req, res, next) => {
	
	
     Complain.findOne({_id:req.params.id}).then(function (details) {
                res.json(details)
    });
}






module.exports.viewcomplain=(req, res, next)=> {
    Complain.findById(req.params.id,function(err,info){
        if(!err){
           res.json(info);
        }else{
            res.json({success:false});
        }
    })
  }
  
  
 module.exports.gettt=(req, res, next)=> {
    Complain.find({
        subarea:req.params.subarea
    },function(err,info){
        if(!err){
            res.json(info)
        }else{
            res.json({success:false})
        }
    })
  }


  
  module.exports.subcomplains=(req, res, next)=> {
    Complain.find({
        subarea:req.params.subarea
    },function(err,info){
        if(!err){
            res.json(info)
        }else{
            res.json({success:false})
        }
    })
  }





