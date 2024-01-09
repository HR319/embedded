const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//json web token - JWT 
const JWT_SECRET = 'Harmiis$rgirl'

//Create a user using:POST "/api/auth/createuser" - doesn't require authantication // no login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be at least five chatctres').isLength({min:5}),
], async (req, res)=> {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    //if there are errors, returnn bad req and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }

    try{
    //check whether the user with this email already exist - to prevent going same user's details in database
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "sorry a user with this email already exist"})
    }
    //creating hash of password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create new user in database
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email,
    })

    
    // .then(user=>res.json(user))
    // .catch(err=> {console.log(err) 
    //     res.json({error : 'please enter a unique value for email'})})
    // res.send(user); 
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data, JWT_SECRET);

    res.json({authtoken});
    }
    //if any error ocurres due to any issue of dealing with database
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Authentic a user using:POST "/api/auth/login"  // no login required
router.post('/login',[
    // body('name','Enter a valid name').isLength({ min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password can not be blank').exists(),
], async (req, res)=> {
    
    //if there are errors, returnn bad req and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error : "please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
    
        res.json({authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}
)

//Get logged in user details using:POST "/api/auth/getuser" //login required
router.post('/getuser', fetchuser, async (req, res)=> {
    //need middleware-fetch user for all such requests which needs to be authennticated - to reduce repeated code
    //required token to fetch user's id from it - for all such requests which needs to be authenticated
    try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password") 
    res.send(user);
}
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})
module.exports = router;