const mongoose = require('mongoose');
const schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);

const Details = new schema({
    fname:{
        type:String,
        unique:false,
        require:'first name field cant be empty'
    },
    lname:{
        type:String,
        unique:false,
        require:'last name field cant be empty'
    },
    email:{
        type:String,
        unique:true,
        require:'email cant be empty'
    },
    Tp:{
        type:String,
        require:[true,'email field is required']
    },
    Id:{
        type:String,
        unique:false,
        require:[true,'Id field is require']
    },
    is_admin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        unique:false,
        require:'password cant be empty',
        minlength:[6,'password must be atleast 6 characters']   
    },
 
});
Details.path('email').validate((val) =>{
    emailRegx=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegx.test(val);
},'Ivalid e-mail');

const Detailsitem = mongoose.model('users',Details);//'details' is mongodb name Details is the schema name;
module.exports=Detailsitem;