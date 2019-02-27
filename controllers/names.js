const express= require('express');
var passport = require('passport');
const routerComplain = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Complain = require('../models/Complains');

var nodemailer = require('nodemailer');

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


module.exports.updatedetailsllocation = (req, res, next) => {
    
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
				cid:req.body.cid,
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
  
  module.exports.email=(req, res,next)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "slttechcrew@gmail.com",
          pass: '123@SLTele'
        }
      });
     var mailOptions = {
        to: req.body.email,
        from: "slttechcrew@gmail.com",
        subject: 'Your payment proceeded successfully',
        text:"Your payment added to the account successfully,The ordered item  will be delivered within 1 week"
      }; 

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //console.log(error);
          return res.json({ success: false, msg: 'message sending fail!!' })
        } else {
          //console.log('Email sent: ' + info.response);
          return res.json({ success: true, msg: 'Succeeded' })
        }
      });
  }
  module.exports.email1=(req, res,next)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "slttechcrew@gmail.com",
          pass: '123@SLTele'
        }
      });
     var mailOptions = {
        to: req.body.email,
        from: "slttechcrew@gmail.com",
        subject: 'Your payment proceeded successfully',
        text:"Your payment added to the paypal account successfully,The ordered item  will be delivered within 1 week"
      }; 

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //console.log(error);
          return res.json({ success: false, msg: 'message sending fail!!' })
        } else {
          //console.log('Email sent: ' + info.response);
          return res.json({ success: true, msg: 'Succeeded' })
        }
      });
  }
  
  module.exports.checkWarranty = (req, res, next) => {
  Stock.findOne({
      serialnumber: req.params.serialnumber
    }, function (err, details) {
      if (!details) {
        res.status(401).send({ success: false, msg: 'Not found.' });
      } else {
          res.status(200).json({ success: true,details});
        }
      }
    );
  }
  

  
  





