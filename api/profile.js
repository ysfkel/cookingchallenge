var router=require('express')();
var Profile=require('../models/profile');

router.route('/v1/profile')
.get(function(req,res){
     Profile.find(function(err,data){
        if(err){
            throw err;
        }else{
            return res.json(data.details);
        }
     });
})
.post(function(req,res){ 
   if(!req.body._id){
        var profile=new Profile(req.body);
        profile.save(function(err,data){
            if(err){
                console.log(err);
                throw err;
            }else{
                res.send(data);
            }
        })
   }else{
        Profile.findById(req.body._id,function(err,data){
            if(err){
                throw err;
            }else{
                data.details=req.body.details;
                data.save(function(err,data){
                    res.json(data);
                })
              
            } 
        })
   }
    
})

router.route('/v1/profile/:id')
.get(function(req,res){
   var id=req.user._id;//req.params.id;
   Profile.findOne(id,function(err,data){
      if(err){
          throw err;
      }else{
          res.json(data);
      } 
   })

    
})

.put(function(req,res){
   var id=req.params.id;
   Profile.findOne(id,function(err,data){
      if(err){
          throw err;
      }else{
          res.json(data);
      } 
   })

    
})


module.exports=router;