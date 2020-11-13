// pages/user/user.js
var _app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Studentvehiclenumber:null,
    Usertype:'',
    openid:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
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
        if(usertype=='employees'){
          usertype="职工";
        }
        else if(usertype=='students'){
          usertype="学生";
        }
        that.setData({
          menuitems: [
            { text: '姓名:', icon: '../../images/user/person.png',values:name},
            { text: '学/工号:',  icon: '../../images/user/switch.png',values:numid},
            { text: '权限:',  icon: '../../images/user/help.png',values:usertype},
          ],
          Usertype:usertype
        })
        console.log(that.data.menuitems);
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})