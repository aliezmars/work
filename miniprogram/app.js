App({
  onLaunch: function () {
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV
    });
  },

   User:function(name,numid,usertype){
    var stuvehicle;
    this.name=name;
    this.numid=numid;
    this.usertype=usertype;
    this.getstuvehicle=function(){
return this.stuvehicle;
    }
    this.setstuvehicle=function(stuvehicle){
        this.stuvehicle=stuvehicle;
    }
    this.getName=function(){
      return this.name;
    }
    this.setName=function(name){
      this.name=name;
    }
    this.getNumid=function(){
      return this.numid;
    }
    this.setNumid=function(numid){
      this.numid=numid;
    }
    this.getusertype=function(){
      return this.usertype;
    }
    this.setUsertype=function(usertype){
      this.usertype=usertype;
    }
   },
   Vehicle:function(vehicleid,photo,text){
   this.vehicleid=vehicleid;
   this.photo=photo;
   this.text=text;
   this.illegallevel=0;
   this.getilegalLevel=function(){
     return this.illegallevel;
   }
   this.addillegallevel=function(){
     this.illegallevel++;
   }
   this.setillegallevel=function(illegallevel){
     this.illegallevel=illegallevel;
   }
   },
   stuVehicle:function(mastername,stuvechileid,masternumid,photo){
    this.mastername=mastername;
    this.stuvechileid=stuvechileid;
    this.masternumid=masternumid; 
    this.photo=photo
   }
})