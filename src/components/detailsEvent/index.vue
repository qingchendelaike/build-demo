<template>
  <div class="eventDeatils" id="person-box">
    <div class="event-box">
      <i class="el-icon-arrow-left backIcon" @click="callBack"></i>
      <div class="event-centen">
        <div class="routerBox">
          <router-link tag="div" v-for="(item,index) in detailsTree" :key="index" :to="item.url+'?item_id='+$route.query.item_id">
            {{item.name}}
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      detailsData:[],
      detailsTree:[
        {
          url:'/index/eventSummary/detailsEvent/initiateDetails',
          name:'发起详情'
        },
        {
          url:'/index/eventSummary/detailsEvent/participation',
          name:'参与反馈'
        },
        {
          url:'/index/eventSummary/detailsEvent/uploadFiles',
          name:'上传文件'
        }
      ]
    }
  },
  methods:{
     /* 返回系统事项 */
    callBack() {
      // this.$router.push('/index/eventSummary/allMatters')
      this.$router.go(-1)
    },

  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
.eventDeatils {
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  padding: 20px;
  .event-box {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    padding: 23px 28px;
    background: #f6f6f6;
    border-radius: 6px;
    position: relative;
    .backIcon {
      position: absolute;
      left: 28px;
      top: 30px;
      font-size: 14px;
      cursor: pointer;
    }
    .event-centen {
      width: 950px;
      height: auto;
      margin: 0 auto;
      .details-centen {
        background: #ffffff;
        box-sizing: border-box;
        padding: 40px 183px 40px 164px;
        .text-title {
          display: flex;
          margin-bottom: 20px;
          .title-box {
            width: 87px;
          }
          .title-conten {
            flex: 1;
            &.tasks {
              width: 100%;
              box-sizing: border-box;
              padding: 0 20px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              p {
                border-bottom: 1px solid rgba(229, 229, 229, 1);
                padding: 9px 0;
                &:last-child {
                  border-bottom: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
  .routerBox{
    display: flex;
    div{
      color:rgba(153,153,153,1);
      line-height:30px;
      height:30px;
      font-size:22px;
      cursor: pointer;
      margin-right: 40px;
      &.router-link-active{
        color: #333333;
      }
    }
  }

</style>
