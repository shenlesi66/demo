const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      id:options.id,
    })

    this.getDetail();
  },
  getDetail:function(){
    wx.showLoading({
      title: '加载中。。。',
    })
    var that = this;
    var baseUrl = app.globalData.basicUrl;
    wx.request({
      url: baseUrl+'/subject/'+this.data.id,
      header:{
        'content-type': 'application/text'
      },
      success:function(res){
        var flim = res.data;
        var countries = res.data.countries.join("/");
        var genres = res.data.genres.join("/");
        var casts = [];
        res.data.casts.map((item)=>{
          casts.push(item.name);
        })
        casts = casts.join("/");
        var directors = [];
        res.data.directors.map((item) => {
          directors.push(item.name);
        })
        flim.rating.star = 'star' + Math.round(flim.rating.average);        
        directors = directors.join("/");
        that.setData({
          flim,
          countries,
          genres,
          casts,
          directors
        })
        wx.hideLoading();            
      }
    })
  }
})