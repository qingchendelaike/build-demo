<template>
  <div class="eventDeatils" id="person-box">
    <div class="event-box">
      <i class="el-icon-arrow-left backIcon" @click="callBack"></i>

      <div class="event-centen">
        <router-link v-for="(item,index) in detailsTree" :key="index" :to="item.url == pathUrl.path ? (item.url+'?item_id='+pathUrl.query.item_id) :item.url">
          {{item.name}}
        </router-link>
        <p class="status">
          <span>发起人：{{detailsData.create_user_name}}</span>
          <span>事项状态：{{detailsData.zh_status}}</span>
        </p>

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
      pathUrl:"",
      detailsTree:[
        {
          url:'/index/detailsEvent/initiateDetails',
          name:'发起详情'
        },
        {
          url:'/index/detailsEvent/initiateDetails',
          name:'参与反馈'
        },
        {
          url:'/index/detailsEvent/uploadFiles',
          name:'上传文件'
        }
      ]
    }
  },
  methods:{
     /* 返回系统事项 */
    callBack() {
      this.$router.push('/index/eventSummary/seriesItems')
    },
    /* 查询事项详情 */
    async initiate() {
      let req = {
        item_id: this.$route.query.item_id
      };
      const res = await this.$api.allMatters.matterDetails(req);
      if (res.status == "success") {
        this.detailsData = res.data;
        this.detailsTasks = res.data.tasks;
      }
    }
  },
  mounted(){
      this.initiate()
      this.pathUrl = this.$route
  }
}
</script>

<style lang="scss" scoped>
.eventDeatils {
  width: 100%;
  min-width: 1200px;
  height: 100%;
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
      .status {
        margin: 15px 0 10px 0;
        span {
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>