<template>
  <div class="boxall">
    <div class="box">
      <div class="box-text">
        <div class="text-title">
          <div class="title-box">
            会议名称
            <p v-if="this.msg.change.indexOf('item_name') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            发起人
            <p
              v-if="this.msg.change.indexOf('create_user_name') >= 0"
            >{{this.msg.change['create_user_name']}}</p>
          </div>
          <div class="title-conten">{{msg.create_user_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            组织主体
            <p v-if="this.msg.change.indexOf('organize_name') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.organize_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            类型标签
            <p v-if="this.msg.change.indexOf('item_label_ids') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_label}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            发文文号
            <p
              v-if="this.msg.change.indexOf('article_year') >= 0 ||  this.msg.change.indexOf('article_sn') >= 0"
            ></p>
          </div>
          <div class="title-conten">粤时代司党（{{msg.article_year}}）{{msg.article_sn}}号</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            发文编号
            <p v-if="this.msg.change.indexOf('item_sn') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_sn}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">
            会议时间
            <p
              v-if="this.msg.change.indexOf('start_time') >= 0 || this.msg.change.indexOf('end_time') >= 0"
            ></p>
          </div>
          <div class="title-conten">{{msg.start_time}} - {{msg.end_time}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">
            会议地点
            <p v-if="this.msg.change.indexOf('item_space') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_space}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">
            会议原因
            <p v-if="this.msg.change.indexOf('item_reason') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_reason}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">
            会议流程
            <p v-if="this.msg.change.indexOf('item_flow') >= 0"></p>
          </div>
          <div class="title-conten">{{msg.item_flow}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            参与人员
            <p v-if="this.msg.change.indexOf('users') >= 0"></p>
          </div>
          <div class="title-conten">
            <span v-for="(item,index) in msg.users" :key="index">
              {{item.user_name}}
              <span v-if="index <= msg.users.length && msg.users.length > 1">/</span>
            </span>
          </div>
        </div>

        <div class="text-title">
          <div class="title-box">
            会议任务
            <p v-if="this.msg.change.indexOf('tasks') >= 0"></p>
          </div>
          <div class="title-conten borderFall" v-if="msg.tasks.length > 0">
            <span v-for="(item,index) in msg.tasks" :key="index">{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>

    <el-button
      class="btn"
      @click="handleClick"
      :disabled="disabled"
      :class="{ btGround:type == true}"
    >{{msgBtn}}</el-button>
    <div v-show="pop" class="pop">
      <p
        v-for="(item,index) in detailsData"
        :key="index"
        @click="clickName(item,index)"
        :class="{ detailsGround:changeLeftBackground == index}"
      >{{item.feed_name}}</p>
    </div>
    <div v-show="pop" class="popBox"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: false,
      msg: "",
      msgBtn: "提交参与反馈",
      disabled: false,
      pop: false,
      value: "",
      changeLeftBackground: -1,
      feed_name: "",
      detailsData: []
    };
  },

  methods: {
    clickName(item, index) {
      this.changeLeftBackground = index;
      this.disabled = false;
      this.value = item.feed_id;
      this.feed_name = item.feed_name;
      this.type = false;
    },
    /* 反馈列表*/
    async menu() {
      const res = await this.$api.details.feedbackMenu();
      if (res.status == "success") {
        this.detailsData.push(...res.data);
      }
    },
    handleClick() {
      if (this.msgBtn == "提交参与反馈") {
        this.disabled = true;
        this.pop = true;
        this.type = true;
        this.msgBtn = "提交";
      } else if (this.msgBtn == "提交") {
        this.sum();
      }
    },
    async h5() {
      let url = window.location.href,
        reqBody = url.split("?")[1].split("=")[1];
      let res = await this.$api.common.webChangeDetail({
        unique_str: reqBody
      });
      if (res.status == "success") {
        if (!res.data.hasOwnProperty("change")) {
          res.data.change = [];
        }
        this.msg = res.data;
        if (this.msg.item_status == 4) {
          this.msgBtn = "事项已办结";
          this.pop = false;
          this.type = "";
          this.disabled = true;
          this.type = true;
        } else if (this.msg.item_status == 5) {
          this.msgBtn = "事项已取消";
          this.pop = false;
          this.type = "";
          this.disabled = true;
          this.type = true;
        } else if (this.msg.is_feed) {
          this.msgBtn = "已确认"+this.msg.feed_name;
          this.pop = false;
          this.type = "";
          this.disabled = true;
          this.type = true;
        }
      }
    },
    async sum() {
      if (this.value != "") {
        let url = window.location.href,
          reqBody = url.split("?")[1].split("=")[1];
        let resUrl = await this.$api.common.webChangeDetail({
          unique_str: reqBody
        });

        if (resUrl.status == "success") {
          let req = {
            unique_str: reqBody,
            feed_id: this.value
          };
          let res = await this.$api.common.webFeedback(req);
          if (res.status == "success") {
            this.pop = false;
            this.type = "";
            this.msgBtn = "已确定" + this.feed_name + "参与";
            this.disabled = true;
            this.type = true;
          }
        }
      } else {
        this.$message("请选择反馈事项");
      }
    }
  },
  mounted() {
    this.h5();
    this.menu();
  }
};
</script>

<style lang="scss" scoped>
.boxall {
  background: #eeeeee;
  .text-title {
    width: 100%;
    display: inline-block;
    background: #ffffff;
    margin-bottom: 20px;
    border-radius: 0 0 30px 30px;
    box-sizing: border-box;
    padding: 20px;
    .title-box {
      font-size: 15px;
      color: gray;
      margin-bottom: 10px;
      position: relative;
      p {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #5ca7ff;
        border-radius: 50%;
        position: absolute;
        top: 0px;
      }
    }
    .title-conten {
      font-size: 16px;
    }
    &:last-child {
      margin-bottom: 50px;
    }
  }
  .btn {
    width: 90%;
    position: fixed;
    background: #5ca7ff;
    height: 50px;
    bottom: 10px;
    left: 5%;
    z-index: 9999;
    color: #ffffff;
    font-size: 14px;
  }
  .pop {
    background: #ffffff;
    width: 90%;
    position: fixed;
    bottom: 70px;
    left: 5%;
    z-index: 99;
    border-radius: 5px;
    p {
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #eeeeee;
      font-size: 15px;
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .popBox {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: #000;
    opacity: 0.5;
  }
}
.detailsGround {
  color: #5ca7ff;
}
.btGround {
  color: #c0c4cc !important;
  background: #eeeeee !important;
}
</style>