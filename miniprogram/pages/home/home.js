// pages/home/home.js
const db=wx.cloud.database();
const app=getApp();
var that=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     totalrecords: []
  },
   enter:function(){
    let that=this;
    wx.cloud.callFunction({
      name:"login",
       success(res){
        db.collection('users').count().then(async res2=>{
          const MAX_LIMIT = 100;
          let total = res2.total;
      // 计算需分几次取
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      // 承载所有读操作的 promise 的数组
      for (let i = 0; i < batchTimes; i++) {
        await db.collection('users').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get().then(async res3 => {
          let new_data = res3.data
          let old_data = that.data.totalrecords
          that.setData({
            totalrecords : old_data.concat(new_data)
          })
        })
      }   
           for(var i=0,flag=false;i<that.data.totalrecords.length;i++){
            if(res.result.openid==that.data.totalrecords[i]._openid){
              flag=true;
            }
          }
          console.log(flag);
         if(flag){
            wx.switchTab({
              url: './../index/index',
            })
          }
          else{
            wx.navigateTo({
              url: './../register/register',
            })
            wx.showToast({
              title: '新用户登记',
              icon:'loading',
              duration:1000
            })
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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