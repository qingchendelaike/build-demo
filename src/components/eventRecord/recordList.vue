<template>
  <el-container class="container-box record-wrapper">
    <el-main class="main-box" id="scrollContainer">
      <el-timeline id="scrollContainerBox">
        <el-timeline-item
          v-for="(item,index) in modelData"
          :key="index"
          :class="{'today':isToday(item.date)}"
          :timestamp="item.date"
          placement="top"
        >
          <div class="icon-collection">
            <span class="today-icon" v-show="dateYear(item.date,index)">{{item.date|getYear()}}</span>
            <el-popover
              placement="right"
              width="486"
              v-model="visible[index]"
              v-if="item.notice_lists.length>0"
              @show="initActiveMsgIndex()"
            >
              <div class="msg-tip" v-if="item.notice_lists[activeMsgIndex]">
                <h3 class="popover-title">
                  {{item.notice_lists[activeMsgIndex].name}}
                  <i
                    class="el-icon-close fr"
                    @click="hidePopover(index)"
                  ></i>
                </h3>
                <p class="msg-content">{{item.notice_lists[activeMsgIndex].content}}</p>
                <div class="msg-btn" v-if="item.notice_lists.length>1">
                  <el-button
                    size="mini"
                    v-if="activeMsgIndex>0"
                    type="text"
                    @click="activeMsgIndex=activeMsgIndex-1"
                  >上一条</el-button>
                  <el-button
                    type="primary"
                    v-if="activeMsgIndex<item.notice_lists.length-1"
                    @click="activeMsgIndex=activeMsgIndex+1"
                  >下一条</el-button>
                </div>
              </div>

              <span class="user-waring alarm-icon" slot="reference">
                <i v-if="showMsgAlarm(item.notice_lists)" class="red-icon"></i>
              </span>
            </el-popover>
          </div>
          <el-card
            v-for="(eventItem,index) in item.item_lists"
            :key="index"
            :class="eventItem.item_status|itemStatusColor()"
          >
            <span class="event-title" @click="itemDeatils(eventItem)" style="cursor: pointer;">
              <img class="event-icon" :src="eventItem.item_type|imgType()" alt />
              {{eventItem.item_name}}
            </span>
            <span class="event-state">
              {{eventItem.item_status|itemStatusText()}}
              <el-popover
                v-if="eventItem.tasks&&eventItem.tasks.length>0"
                placement="bottom"
                width="370"
                trigger="click"
              >
                <ul class="tip-list">
                  <li v-for="tip in eventItem.tasks" :key="tip">{{tip}}</li>
                </ul>
                <i class="tip-icon" slot="reference"></i>
              </el-popover>
            </span>
            <span class="event-time">{{eventItem.time}}</span>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>
    <span class="time-location">
      <el-collapse-transition>
        <span v-show="showDate">
          <label class="el-form-item__label date-label" for>开始日期</label>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd"
            @change="refreshData()"
          ></el-date-picker>
        </span>
      </el-collapse-transition>
      <el-button @click="toggleDate()">
        <span class="location-icon"></span>
      </el-button>
    </span>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      value1: "", //日期
      showDate: false,
      visible: [],
      activeMsgIndex: 0,
      /* 字段说明
        zh_type：类型 1-会议 2-课程 3-活动 4-项目方案
        item_name：事项名称
        zh_status：状态：1-未开始 2-进行中 3-已截止 4-已办结 5-已取消
        time：	起始时间
         */
      modelData: [],
      boxTop: 0
    };
  },
  filters: {
    getYear(date) {
      let d = new Date(date.replace(/-/g, "/"));
      let todaysDate = new Date();
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return "Today";
      } else {
        //不是今天，获取当前的年份
        return new Date(date).getFullYear();
      }
    },
    imgType(type) {
      //根据类型获取图标
      //类型 1-会议 2-课程 3-活动 4-项目方案
      switch (type) {
        case 1:
          return require("../../assets/img/dashiji_icon_meeting.png");
        case 2:
          return require("../../assets/img/dashiji_icon_course.png");
        case 3:
          return require("../../assets/img/dashiji_icon_activity.png");
        case 4:
          return require("../../assets/img/dashiji_icon_plan.png");
      }
    },
    itemStatusText(status) {
      //状态：1-未开始 2-进行中 3-已截止 4-已办结 5-已取消
      switch (status) {
        case 1:
          return "未开始";
        case 2:
          return "进行中";
        case 3:
          return "已截止";
        case 4:
          return "已办结";
        case 5:
          return "已取消";
      }
    },
    itemStatusColor(status) {
      //状态：1-未开始 2-进行中 3-已截止 4-已办结 5-已取消
      switch (status) {
        case 1:
          return "blue-br";
        case 2:
          return "green-br";
        case 3:
          return "grey-br";
        case 4:
          return "yellow-br";
        case 5:
          return "red-br";
      }
    }
  },
  created() {
    this.getInitData();
  },
  mounted() {
    //判断today的位置，居中
    if (document.querySelector(".today")) {
      let tTop = document.querySelector(".today").offsetTop;
      let tWidth = document.querySelector(".today").clientHeight / 2;
      let halfDis = document.querySelector("#scrollContainer").clientHeight / 2;
      if (tTop > halfDis) {
        let scrollDis = Math.abs(halfDis - tTop - tWidth);
        document.querySelector("#scrollContainer").scrollBy(0, scrollDis);
      }
    }
    let _this = this;
    document.querySelector("#scrollContainer").onscroll = function(e) {
      let divscroll = document.querySelector("#scrollContainer");
      let scrollTop = divscroll.scrollTop; //页面上卷的高度
      let wholeHeight = divscroll.scrollHeight; //页面底部到顶部的距离
      let divHeight = divscroll.clientHeight; //页面可视区域的高度
      axios.defaults.headers["Token"] = sessionStorage.getItem("Token");
      if (scrollTop + divHeight >= wholeHeight) {
        axios
          .get(`${process.env.API_ROOT}/item/itemCollectLists`, {
            params: {
              max_date: _this.modelData[_this.modelData.length - 1]["date"]
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              let nextData = res.data.data;
              for (let i = 0; i < nextData.length; i++) {
                _this.modelData.push(nextData[i]);
              }
            }
          });
      }
      if (scrollTop == 0) {
        axios
          .get(`${process.env.API_ROOT}/item/itemCollectLists`, {
            params: {
              min_date: _this.modelData[0]["date"]
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              let prevData = res.data.data;
              for (let j = prevData.length - 1; j >= 0; j--) {
                _this.modelData.unshift(prevData[j]);
              }
            }
          });
      }
    };
  },
  methods: {
    handleScroll() {
      // 这是一个示例代码，打印出监听滚动的组件滚动距离
      var scrollTop = this.$refs.viewBox.scrollTop;
      console.log(scrollTop);
    },
    /* 事项详情 */
    itemDeatils(val) {
      this.$router.push({
        path: "/index/eventSummary/detailsEvent/initiateDetails",
        query: { item_id: val.item_id }
      });
    },
    isToday(str) {
      let d = new Date(str.replace(/-/g, "/"));
      let todaysDate = new Date();
      if (str == this.value1) {
        return true;
      }
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
      } else {
        return false;
      }
    },
    dateYear(date, index) {
      //显示年份，是否显示按钮
      // 判断是否为今天
      if (this.isToday(date)) {
        return true;
      } else {
        //判断是否为新的一年
        let currentDate = new Date(date).getFullYear();
        if (index > 0) {
          let prevDate = new Date(this.modelData[index - 1].date).getFullYear();
          if (currentDate != prevDate) {
            //新的一年
            return true;
          } else {
            //不是新的一年
            return false;
          }
        } else {
          return false;
        }
      }
    },
    showMsgAlarm(msgList) {
      //消息提示小红点
      for (let i = 0; i < msgList.length; i++) {
        if (!msgList[i].is_view) {
          return true;
        }
      }
      return false;
    },
    async getInitData() {
      let res = await this.$api.eventRecord.getData({});
      if (res.status == "success") {
        this.modelData = res.data;
        let scrollContainer = document.querySelector("#scrollContainer");
        let scrollTop = scrollContainer.scrollTop;
        if (scrollTop == 0) {
          this.$nextTick(() => {
            document.querySelector("#scrollContainer").scrollTop = 10;
          });
        }
      }
      for (let i = 0; i < this.modelData.length; i++) {
        this.visible[i] = false;
      }
    },
    async getData(req) {
      let res = await this.$api.eventRecord.getData(req);
      return res.data;
    },
    toggleDate() {
      this.showDate = !this.showDate;
    },
    async refreshData() {
      //选择日期，刷新值
      if (this.value1 != null) {
        let res = await this.$api.eventRecord.getData({});
        let bool = this.modelData.every(i => {
          return i.date != this.value1;
        });
        if (bool) {
          this.$message("该日期下无事项");
          return;
        }
        this.modelData = res.data;
        //居中当前选择的日期
        let tTop = document.querySelector(".today").offsetTop;

        let halfDis =
          document.querySelector("#scrollContainer").clientHeight / 2;
        if (tTop > halfDis) {
          let scrollDis = Math.abs(halfDis - tTop);
          document.querySelector("#scrollContainer").scrollBy(0, scrollDis);
        }
      }
    },
    hidePopover(i) {
      this.$set(this.visible, i, false);
    },
    // showPrev(index,activeMsgIndex){
    //   this.activeMsgIndex=activeMsgIndex-1;
    // },
    // showNext(){
    //   this.activeMsgIndex=this.activeMsgIndex-1;
    // }
    initActiveMsgIndex() {
      this.activeMsgIndex = 0;
    }
    /*   hasScrollbar() {
      console.log(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight))
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
} */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.record-wrapper.el-container {
  height: calc(100% - 66px) !important;
  .main-box {
    background: rgba(246, 246, 246, 1);
    border-radius: 6px;
    margin: 20px;
    padding: 15px 135px 15px 110px;
    .el-timeline {
      position: relative;
    }
    .today {
      .el-timeline-item__node {
        background-color: #fff;
        border: 3px solid #ff4001;
        box-sizing: border-box;
      }
    }
    .el-timeline-item__content {
      position: relative;
      .icon-collection {
        position: absolute;
        top: -30px;
        left: -145px;
        width: 108px;
        text-align: right;
        line-height: 31px;
        height: 31px;
        .alarm-icon {
          display: inline-block;
          background: url("../../assets/img/nav_icon_news.png") no-repeat;
          background-size: cover;
          width: 18px;
          height: 23px;
          margin-left: 5px;
          position: relative;
          .red-icon {
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 100%;
            background-color: #ff4001;
            position: absolute;
            top: 3px;
            right: -1px;
          }
        }
        .today-icon {
          width: 60px;
          height: 26px;
          display: inline-block;
          background: url("../../assets/img/dashiji_icon_data.png") no-repeat;
          background-size: cover;
          line-height: 26px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          position: relative;
          top: -4px;
        }
      }
    }

    .el-card {
      margin-bottom: 10px;
      position: relative;
      &.blue-br {
        border-right: 4px solid #3da8ff;
      }
      &.green-br {
        border-right: 4px solid #50e3c2;
      }
      &.grey-br {
        border-right: 4px solid #e5e5e5;
        color: #b4b4b4;
      }
      &.yellow-br {
        border-right: 4px solid #fbe700;
        color: #b4b4b4;
      }
      &.red-br {
        border-right: 4px solid #dd2d1e;
      }
    }

    .el-card__body {
      padding: 15px;
      .event-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
      }
      .event-title {
        width: 65%;
      }
      .event-state {
        width: 8%;
        position: absolute;
        .tip-icon {
          width: 25px;
          height: 25px;
          display: inline-block;
          background: url("../../assets/img/index_sprites.png") no-repeat -10px -57px;
          position: absolute;
          margin-left: 10px;
          top: -2px;
          /*left:10px;*/
        }
      }
      .event-time {
        width: 20%;
        float: right;
      }
    }
  }
  .time-location {
    position: fixed;
    right: 100px;
    bottom: 50px;
    display: inline-block;
    box-shadow: 0px 2px 16px 0px rgba(188, 188, 188, 0.8);
    background-color: #fff;
    .date-label {
      line-height: 50px;
      margin-left: 30px;
    }
    .el-input {
      top: -5px;
      margin-left: 5px;
      width: 190px;
      height: 40px;
    }
    .el-button {
      width: 50px;
      height: 50px;
      padding: 0;
      box-sizing: border-box;
      border: unset;
      .location-icon {
        width: 18px;
        height: 23px;
        display: inline-block;
        background: url("../../assets/img/icon_location.png") no-repeat;
        background-size: cover;
      }
    }
  }
}
/*事项提醒*/
.tip-list {
  list-style: none;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  li {
    /*height: 40px;*/
    padding: 10px 15px;
  }
  li + li {
    border-top: 1px solid #e5e5e5;
  }
}
.msg-tip {
  padding: 8px 5px 18px 18px;
  .fr {
    float: right;
  }
  .popover-title {
    font-size: 15px;
    margin-bottom: 15px;
  }
  .msg-content {
    max-height: 100px;
    padding: 10px 20px;
    font-size: 14px;
    overflow: auto;
    border-radius: 3px;
    border: 1px solid rgba(229, 229, 229, 1);
  }
  .msg-btn {
    text-align: right;
    margin-top: 30px;
  }
}
</style>
