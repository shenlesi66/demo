const app = getApp();
Page({
  data:{
    motto:"hello",
    userInfo:{},
    films:[{},{},{}]
  },
  onLoad:function(){
    wx.showLoading({
      title: '加载中。。。',
    })

    var that = this;
    var typelist = ["in_theaters","coming_soon","top250"];
    var titlelist = ["正在热映","即将上映","TOP250电影"];

    for(let i=0;i<typelist.length;i++){
      var type = typelist[i];
      app.getFilminfo(type,0,8,function(res){
        wx.hideLoading();
        var data = res.data;
        data.subjects.map((item)=>{
          if(item.title.length>8){
            item.title = item.title.slice(0,7)+"...";
          }
          if(item.rating.average>=9.5){
            item.rating.star = 'star10'
          }else{
            item.rating.star = "star" + Math.round(item.rating.average);
          }
        })
        that.data.films[i] = { title: titlelist[i], data: data.subjects,type:typelist[i]};
        that.setData({
          films: that.data.films
        });
      })
    }
  },
  detail:function(e){
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + data.id + '&title=' + data.title,
    })
  }
})