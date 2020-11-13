// pages/showreport/showreport.js
const app=getApp();
const db=wx.cloud.database();
var that=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   vehicleid:'',
   illegallevel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  back:function(){
wx.switchTab({
  url: './../index/index',
})
  },
  onLoad: async function (options) {
    that=this;
    that.setData({
      vehicleid:options.vehicleid,
    })
const result1=await db.collection('vehilgals').where({vehicleid:that.data.vehicleid,status:'latest'}).limit(1).get();
that.setData({
  illegallevel:result1.data[0].illegallevel
})
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