// pages/vregister/vregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  listenFormSubmit: function(e){
    let name=e.detail.value.name;
    let numid=e.detail.value.numberid;
    let stuvechileid=e.detail.value.stuvechileid;
   if(name==""||numid==""||stuvechileid==""){
     wx.showModal({
       title:'提示',
       content:'值不能为空',
       showCancel:false
     })
   }
   else{
        wx.cloud.init({
          env: wx.cloud.DYNAMIC_CURRENT_ENV
        })
        const db = wx.cloud.database()
        db.collection('stuvehicles').add({
          data: {
            stuvechileid:stuvechileid,
            mastername:name,
            masternumid:numid,
          },
          success: res1 => {
            // 在返回结果中会包含新创建的记录的 _id
            console.log('[数据库] [留言] 成功，记录 _id: ', res1._id)
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      };
      wx.showToast({
        title: '跳转中',
        icon:'loading',
        duration:2000
      })
      wx.switchTab({
        url: './../index/index',
      })
      wx.showModal({
        title:'提示',
       content:'登记成功',
       showCancel:false
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