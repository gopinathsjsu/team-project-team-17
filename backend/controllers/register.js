const User = require("../models/User");
const {hashPassword, compareRapssword} = require("../passwordHelper");



exports.register = async (req, res) => {
   // console.log("Registered => ", req.body);

   const {name, password, email} = req.body;

   if(!name) return res.status(400).send("Name is required");
   if(!password) return res.status(400).send("Password is required");

   const exist = await User.findOne({email});
   if(exist) return res.status(400).send("Email is taken");

   //hash password

   const hashedPassword = await hashPassword(password);

   const user = new User({name, password: hashedPassword, email});
   try{
    const savedUser = await user.save();
    console.log("Registered => ", user);
    return res.json({
        ok: true,
        user: savedUser
    });

} catch(err) {
    console.log("Register failed => " ,err);
    return res.status(400).send("Error. Try again.");
}
};