const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var that=null;
Page({
  data: {
    vehicle:null,
    vehicleid:'',
    openid:'',
    text: '',
    photo: [],
    currentUser:null
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
        vehicleid:e.detail.value
      })
  },
  gettext:function(e){
    //获取输入的补充违章信息
    that=this;
      that.setData({
        text:e.detail.value
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
    const result=await db.collection('vehilgals').where({vehicleid:that.data.vehicleid}).limit(1).get();
    if(that.data.vehicleid.length!=7){  
      wx.showModal({
        title:'提示',
        content:'请输入正确7位格式的车牌',
        showCancel:false
      });
    }else if(result.data[0]!=undefined){
    that.setData({
      vehicle:new app.Vehicle(that.data.vehicleid,that.data.photo,that.data.text)
    });
    const result1=await db.collection('vehilgals').where({vehicleid:that.data.vehicleid,status:'latest'}).limit(1).get();
    var id=result1.data[0]._id;
    db.collection('vehilgals').doc(id).update({
      data:{
        status: 'notlatest'
      }
    })
    that.data.vehicle.setillegallevel(result1.data[0].illegallevel);
    that.data.vehicle.addillegallevel();
    wx.showToast({
      title: '上传中',
              icon:'loading',
              duration:1000
    })
    db.collection('vehilgals').add({
      data: {
        vehicleid:that.data.vehicle.vehicleid,
        photo:that.data.vehicle.photo,
        text:that.data.vehicle.text,
        illegallevel:that.data.vehicle.getilegalLevel(),
        status:'latest'
      },
      success: res1 => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [留言] 成功，记录 _id: ', res1._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    });
    wx.navigateTo({
      url: './../showreport/showreport?vehicleid='+that.data.vehicleid,
    })
  }
  else{
    console.log(that.data.vehicleid);
    that.setData({
      vehicle:new app.Vehicle(that.data.vehicleid,that.data.photo,that.data.text)
    });
    that.data.vehicle.addillegallevel();
    wx.showToast({
      title: '上传中',
              icon:'loading',
              duration:1000
    })
    db.collection('vehilgals').add({
      data: {
        vehicleid:that.data.vehicle.vehicleid,
        photo:that.data.vehicle.photo,
        text:that.data.vehicle.text,
        illegallevel:that.data.vehicle.getilegalLevel(),
        status:'latest'
      },
      success: res1 => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [留言] 成功，记录 _id: ', res1._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    });
   wx.navigateTo({
      url: './../showreport/showreport?vehicleid='+that.data.vehicleid,
    })
  }
  }

})