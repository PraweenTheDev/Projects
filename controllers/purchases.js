const express = require('express');
var passport = require('passport');
const stores = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
const Stock = require('../models/stock');
const Purchase = require('../models/purch');
const Items = require('../models/itemtypes');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

module.exports.viewpurch = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.aggregate([{ "$match": { "$expr": { "$ne": ["$purchqty", "$updateqty"] }}}]).then(details=>{
                if (details.length === 0) {
                    return res.json({ success: false, msg: 'No purchases' })
                } else {
                    return res.json({success:true,data:details })
                }
            })
        }
    });
}

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
    Purchase.find().then(function(details){
        res.send(details);
    });
   
 
}

module.exports.getpurch = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.findOne({
                _id:req.params.id
            }).then(details=>{
                return res.json(details)
            })
        }
    });
}
module.exports.item = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.aggregate([{$match:{item:req.params.item,purchqty:{$gt:0}}}]).then(details=>{
                if(details.length !=0){
                    return res.json({success:true , data:details[0]})
                }else{
                    return res.json({success:false , msg:'No purchases suggested to this item'})
                }
            })
        }
    });
}
module.exports.purchases = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Purchase.find().then(function (details) {
                if (details.length == 0) {
                    res.send({ success: false, msg: 'no purchases to show' });
                } else {
                    res.send({ success: true, data:details });
                }
            })
        }
    });
}
module.exports.update = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var condition = {_id:req.params.id}
            Purchase.updateOne(condition,req.body).then(doc =>{    
                if(doc){
                  return res.json({ success: true, msg:'Delivery updated!' });
                }else{
                  return res.json({ success: false, msg:'cannot finish your request!!' }); 
                }
            })
        }
    });
}
module.exports.addnewperch=(req,res,next)=>{
             var today = new Date();
             var month = today.getMonth()+1;
             var year = today.getFullYear();
             var det = new Purchase({
				purchqty:req.body.purchqty,
                name:req.body.name,
                email:req.body.email,
                item:req.body.item,
                paymentmethod:req.body.paymentmethod,
                subarea:req.body.subarea,
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

module.exports.purchaseupdate = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var condition = {_id:req.params.id}
            var con = {purchid:req.params.id}
            const body ={
                purchid:null,
                status:"unsold",
                solddate:null,
                paymentmethod:null
            }
            Stock.updateMany(con,body).then(data =>{
                if((data)||(data == null)){
                    Purchase.updateOne(condition,req.body).then(doc =>{    
                        if(doc){
                          return res.json({ success: true, msg:'Purchase updated!' });
                        }else{
                          return res.json({ success: false, msg:'cannot finish your request!!' }); 
                        }
                    })
                }else{
                    return res.json({ success: false, msg:'cannot finish your request!!' }); 
                }
            })
        }
    });
}
module.exports.deletepurch = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            var condition = {purchid:req.params.id}
            const body ={
                purchid:null,
                status:"unsold",
                solddate:null
            }
            Stock.updateMany(condition,body).then(doc=>{
                if((doc)||(doc == null)){
                    Purchase.findByIdAndRemove({
                        _id:req.params.id
                    }).then(data =>{
                        if(data){    
                        return res.json({ success:true, msg:'successfully deleted' }); 
                        }else{
                            return res.json({ success: false, msg:'cannot finish your request!!' }); 
                        }
                    })
                  }else{
                    return res.json({ success: false, msg:'cannot finish your request!!' }); 
                  }
            });
            
        }
    });
}