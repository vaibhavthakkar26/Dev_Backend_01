const express = require("express");
const { loginValidation } = require("../validator/auth.validator");
const  {login} = require("../Service/auth.service");
const router = express.Router();

router.post("/login",loginValidation,async(req,res)=>{
    try{
        const {data,message,success } = await login(req.body);
        if (success) {
            return res.status(200).json({ success, message, data });
          } else {
            return res.status(400).json({ success, message, data });
          }
    }catch(err){
       return res.status(400).json({ message: err });
    }
})

module.exports = router;