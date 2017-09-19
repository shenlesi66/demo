const app = getApp();
Page({
  data:{
    start:0,
    count:12,
    more:true,
    flims:[]
  },
  onReachBottom:function(){
    if(this.data.more){
      this.getFilm();      
    }else{
      wx.showToast({
        title: '已经没有了',
        duration: 2000
      })
    }
  },
  
  onLoad:function(option){
    this.setData({
      pageType:option.type
    })
    this.getFilm();
  },
  getFilm: function () {
    wx.showLoading({
      title: '加载中。。。'
    });
    var that = this;
    var start = this.data.start;
    var count = this.data.count;
    var pageType = this.data.pageType;
    app.getFilminfo(pageType, start, count, function (res) {
      var data = res.data;
      wx: wx.setNavigationBarTitle({
        title: data.title
      })
      data.subjects.map((item) => {
        if (item.title.length > 7) {
          item.title = item.title.slice(0, 7) + "..."
        }
      })
      that.setData({
        flims: that.data.flims.concat(data.subjects),
        start: that.data.start + data.subjects.length,
        total: data.total
      })
      if (that.data.start === that.data.total) {
        that.setData({
          more: false
        })
      }
      wx.hideLoading();
    })
  },
  detail:function(e){
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id='+data.id+'&title='+data.title,
    })
  }
})