const User = require("../models/User");
const {comparePassword} = require("../passwordHelper");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    //console.log("Log => ", req.body);
    try{
        
        const {email, password} = req.body;
        
        console.log("password => ", password);

        //check if our db has user with that email
        const user = await User.findOne({email});
        if(!user) return res.status(400).send("No user found");
        console.log("user => ", user);
  
        //check password
        const match = comparePassword(password, user.password);
        console.log(match);
        if(!match) return res.status(400).send("Wrong password");
       
        //create signed token
        const JWT_SECRET = 'ASDAGSADKJGHDKJSGH';
        const token = jwt.sign({ _id: user._id}, JWT_SECRET, {
            //expiresIn:"7d",
        });

        user.password = undefined;
        user.secret= undefined;
        res.json({
            token,
            user,
        });

    } catch( err){
        
        console.log(err)
        return res.status(400).send('Error. Try again!!!');
    }
    
};