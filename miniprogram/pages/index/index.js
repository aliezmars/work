const db=wx.cloud.database();
const app=getApp();
Page({ 
  data: { 

  currentUser:null,
  openid:''
  },
  onLoad: async function (option) {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000
    })
    let that=this;
    let test=await wx.cloud.callFunction({
      name:"login"
    })
    that.setData({
      openid:test.result.openid
    })
    console.log(that.data.openid);
     const db=wx.cloud.database();
      const result=await db.collection('users').where({_openid:that.data.openid}).limit(1).get();
      var name=result.data[0].name;
        var numid=result.data[0].numberId;
        var  usertype=result.data[0].usertype;
        that.setData({
          currentUser:new app.User(name,numid,usertype)
        })
  },
 }) 