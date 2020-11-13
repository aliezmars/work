// pages/mangerzombie/mangerzombie.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var that=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zombievehicle:null,
    zombievehicleid:'',
    photo: [],
  },
  onLoad(options) {
    that = this;
    that.setData({
      currentUser:new app.User(options.name,options.numid,options.usertype),
      openid:options.openid
    })
    console.log(that.data.currentUser);
  },
  getvehicleid:function(e){
      //获取输入的车牌号信息
      that=this;
      that.setData({
        zombievehicleid:e.detail.value
      })
  },
  chooseimage:function() {
    //选择图片，一共8张
    wx.chooseImage({
      count: 8 - that.data.photo.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        //选择完成后，把图片列表追加到已有的列表中
        that.setData({
          photo: that.data.photo.concat(res.tempFilePaths)
        })
      }
    })
  },
  previewimg:function(e) {
    //浏览图片
    wx.previewImage({
      urls: that.data.photo,
      current: e.currentTarget.dataset.url
    })
  },
  removeimg:function(e) {
    //删除图片
    wx.showModal({
      title: '提示',
      content: '是否要删除该图片',
      success(res) {
        if (res.confirm) {
          let url = e.currentTarget.dataset.url;
          let urls = that.data.photo;
          urls.splice(urls.indexOf(url), 1);
          that.setData({
            photo: urls
          })
        }
      }
    })
  },
  report:async function(){
    that=this;
    const db = wx.cloud.database();
    const result=await db.collection('zombievehicle').where({zombievehicleid:that.data.zombievehicleid}).limit(1).get();
    if(that.data.zombievehicleid.length!=7){  
      wx.showModal({
        title:'提示',
        content:'请输入正确7位格式的车牌',
        showCancel:false
      });
    }
  else{
    that.setData({
      zombievehicle:new app.stuVehicle("nobody",that.data.zombievehicleid,"nobody",that.data.photo)
    });
    wx.showToast({
      title: '上传中',
              icon:'loading',
              duration:1000
    })
    db.collection('zombievehicle').add({
      data: {
        vehicleid:that.data.zombievehicle.stuvechileid,
        photo:that.data.zombievehicle.photo,
      },
      success: res1 => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [留言] 成功，记录 _id: ', res1._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    });
   wx.switchTab({
     url: './../index/index',
   })
   wx.showToast({
    title: '登记成功',
  })
  }
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