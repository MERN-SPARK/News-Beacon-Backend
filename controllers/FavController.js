const FavModels=require("../models/FavModel")
let check
const addfav = async (req, res, next) => {
    try {
      const newUser = await FavModels.create(req.body);
      check=newUser
      console.log(newUser);
      res.status(200).json({
        status: "sucsess",
        
          user: newUser,
        
      });
    } catch (err) {
      if (err) {
        return res.status(400).json({
          message:
            err.name === "MongoServerError" && err.code === 11000
              ? "Email or UserName already exists !"
              : err.message,
        });
      }
    }
  };
  const resdata = async(req, res, next) => {
    // get yser based
    try{
   
    const user = await FavModels.findById(req.params.id);
    check = user
let favdata = user.favdata
user.favdata.push({
      title:req.body.title,
      description:req.body.description,
      image:req.body.image,
      url:req.body.url
  })
    //check user and token
    user.save()
  res.status(200).json({status:'sucess',
  data:{
      user
  }})
  }catch (err) {
      res.status(400).json({ status: err.message });
    }}

    const checkfav=(req,res)=>{
        let che = check
        if(check){
            res.status(200).json({
                state:true,
                id:check.id
            })
        }else{
            res.status(200).json({
                state:false,
                id:check.id
        })
    }
    // login
  };  

  const endfav=(req,res)=>{
    check=false
      res.json({
        state:false
        
      })
    }
    const getfav = async (req, res, next) => {
        try {
            const user = await FavModels.findById(req.params.id)      
                res.status(200).json({
            status: "sucess",
            data: {
                user,
            },
          });
        } catch (err) {
          res.status(400).json({ status: err.message });
        }
      };
  module.exports={addfav,resdata,checkfav,endfav,getfav}