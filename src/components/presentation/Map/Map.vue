<template>
  <div id="allmap" style="width:100%;height:800px"></div>
</template>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  export default {
    data:function(){
      return{
        positionArray: [],
      }
    },
    props:{
      mapHeight:{
        type:Number,
      default: 800
      },
      longitude:{
        type:Number,
      default:  103.9378300000
      },
      latitude:{
        type:Number,
      default: 30.7550430000
      },

    },
    methods:{
        getAllMarkers:function (map) {
            let that = this;
            Vue.http.get("gateway/mapall").then(function (response) {
              console.log("map response");
              console.log(response);
              if(!response.body.err) {
                that.positionArray = response.body.data;
                for(let i=0,len=that.positionArray.length;i<len;i++) {
                  console.log('positionArray[i].longitude = ' +that.positionArray[i].longitude+' positionArray[i].latitude = ' + that.positionArray[i].latitude)
                  let point = new BMap.Point(that.positionArray[i].longitude, that.positionArray[i].latitude);
                  let label = new BMap.Label("网关 "+that.positionArray[i].gatewayId,{offset:new BMap.Size(20,-10)});
                  that.addMarker(map,point,label);
                }

              } else {
                console.log('get gatewaymapinfo is err,because ' + response.body.err)
              }
            }, function (error) {
              console.log(error)
            });
        },
        addMarker:function(map,point,label){
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.setLabel(label);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            let that = this;
            marker.addEventListener("click",that.presentPosition);
        },
       deleteAllMarkers:function (map) {
           let allOverlay = map.getOverlays();
           for (let i = 0; i < allOverlay.length ; i++){
               allOverlay[i].removeEventListener("click",this.presentPosition);
               map.removeOverlay(allOverlay[i]);
           }
       },
        presentPosition:function (e) {
            console.log("marker:");
            let marker = e.target;
            console.log(marker);
            console.log('click marker');
            let p = marker.getPosition();       //获取marker的位置
            alert("网关的位置是" + p.lng + "," + p.lat);
        }
    },

    mounted: function() {
      let map = new BMap.Map("allmap");
      let center = new BMap.Point(this.longitude-0.03, this.latitude+0.02);
      map.centerAndZoom(center, 15);
      map.enableScrollWheelZoom(true);
      let that = this;
      setImmediate(function () {
         that.getAllMarkers.call(that,map);
      });
      setInterval(function () {
          that.deleteAllMarkers.call(that,map);   /*清除之前的坐标点*/
          that.getAllMarkers.call(that,map);
      }, 1000*120)
    },
    created: function () {
    }
  }
</script>
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
