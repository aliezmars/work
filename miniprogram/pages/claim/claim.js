// pages/claim/claim.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var that=null;
Page({
  showInput: function () {
    this.setData({
    inputShowed: true
    });
    },
    hideInput: function () {
    this.setData({
    inputVal: "",
    inputShowed: false
    });
    // getList(this);
    },
    clearInput: function () {
    this.setData({
    inputVal: ""
    });
    // getList(this);
    },
    inputTyping: function (e) {
    //搜索数据
    // getList(this, e.detail.value);
    this.setData({
    inputVal: e.detail.value
    });
    },
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    zombievehicle:null
  },
find:async function(){
that=this;
const result=await db.collection('zombievehicle').where({vehicleid:that.data.inputVal}).limit(1).get();
if(result.data[0]==undefined){
  wx.showModal({
    title:'提示',
    content:'不是僵尸车',
    showCancel:false
  })
}
else{
that.setData({
  zombievehicle:new app.stuVehicle("nobody","车牌号"+result.data[0].vehicleid,"nobody",result.data[0].photo)
})
}
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