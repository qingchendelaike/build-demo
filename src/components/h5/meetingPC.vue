<template>
  <div class="boxall">
    <div class="box">
      <div class="box-title">
        <div class="tit">{{typeSw(msg.item_type)}}详情</div>
        <div>
          参与情况：
          <el-select v-model="value" :disabled="bool"  placeholder="请选择">
            <el-option
              v-for="item in detailsData"
              :key="item.feed_id"
              :label="item.feed_name"
              :value="item.feed_id"
            ></el-option>
          </el-select>

          <el-button type="primary" class="primaryBtn" @click="sum" :disabled="bool">{{btnValue}}</el-button>
        </div>
      </div>
      <div class="box-text">
        <div class="text-title">
          <div class="title-box">
            {{typeSw(msg.item_type)}}名称
          </div>
          <div class="title-conten">{{msg.item_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">
            发起人
          </div>
          <div class="title-conten">{{msg.create_user_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">组织主体</div>
          <div class="title-conten">{{msg.organize_name}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">类型标签</div>
          <div class="title-conten">{{msg.item_label}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">发文文号</div>
          <div class="title-conten">粤时代司党（{{msg.article_year}}）{{msg.article_sn}}号</div>
        </div>

        <div class="text-title">
          <div class="title-box">发文编号</div>
          <div class="title-conten">{{msg.item_sn}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">{{typeSw(msg.item_type)}}时间</div>
          <div class="title-conten">{{msg.start_time}} - {{msg.end_time}}</div>
        </div>
        <div class="text-title" v-if="msg.item_type != 4">
          <div class="title-box">{{typeSw(msg.item_type)}}地点</div>
          <div class="title-conten">{{msg.item_space}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">{{typeSw(msg.item_type) + (msg.item_type == 1 ? '原因' : '目的')}}</div>
          <div class="title-conten">{{msg.item_reason}}</div>
        </div>
        <div class="text-title">
          <div class="title-box">{{(msg.item_type == 4 ? '内容要求' : (typeSw(msg.item_type)+ (msg.item_type == 1 ? '流程' : '内容')))}}</div>
          <div class="title-conten">{{msg.item_flow}}</div>
        </div>

        <div class="text-title">
          <div class="title-box">参与人员</div>
          <div class="title-conten">
            <span v-for="(item,index) in msg.users" :key="index">
              {{item.user_name}}<span v-if=" msg.users !=undefined  && msg.users.length > 1 && msg.users.length != (index +1)">/</span>
            </span>
          </div>
        </div>

        <div class="text-title">
          <div class="title-box">会议任务</div>
          <div class="title-conten borderFall" v-if="msg.tasks !=undefined  && msg.tasks.length > 0">
            <p v-for="(item,index) in msg.tasks" :key="index">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnValue:"提交",
      msg: "",
      value: "",
      detailsData: [],
      bool: false
    };
  },

  methods: {
    /* 会议类型 */
    typeSw(key) {
      switch (key) {
        case 1:
          return "会议";
          break;
        case 2:
          return "课程";
          break;
        case 3:
          return "活动";
          break;
        case 4:
          return "项目";
          break;
        default:
          break;
      }
    },
    /* 反馈列表*/
    async menu() {
      const res = await this.$api.details.feedbackMenu();
      if (res.status == "success") {
        this.detailsData.push(...res.data);
      }
    },
    async h5() {
      let url = window.location.href,
        reqBody = url.split("?")[1].split("=")[1];
      let res = await this.$api.common.webDetail({
        unique_str: reqBody
      });

      if (res.status == "success") {
        this.msg = res.data;
        if (this.msg.item_status == 4) {
           this.bool = true
            this.btnValue = "事项已办结";
        } else if (this.msg.item_status == 5) {
           this.bool = true
            this.btnValue = "事项已取消";
        } else if(this.msg.is_feed){
           this.bool = true
          this.detailsData.forEach(i => {
            if(i.feed_name = this.msg.feed_name){
                this.value = i.feed_id
            }
          });
        }
      }
    },
    async sum() {
      if (this.value != "") {
        let url = window.location.href,
          reqBody = url.split("?")[1].split("=")[1];
          let req = {
            unique_str: reqBody,
            feed_id: this.value
          };
          let res = await this.$api.common.webFeedback(req);
          if (res.status == "success") {
            this.$message("提交成功");
            this.bool = true;
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
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #f0f0f0 !important  ;
}
.box-title {
  margin: 30px 0 30px 0;
  display: flex;
  height: 40px;
  box-sizing: border-box;
  padding: 0 0 0 40px;
  align-items: center;
  .tit {
    font-weight: bold;
    line-height: 40px;
    text-align: left;
    font-size: 20px;
    flex: 1;
  }
}

.borderFall {
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
  }
}

.box {
  width: 800px;
  height: auto;
  margin: 0 auto;
  text-align: center;
}

.btn {
  height: 40px;
  background: #5ba1f3;
  border: none;
  padding: 0 30px;
  line-height: 40px;
  font-size: 18px;
  color: #ffffff;
  border-radius: 3px;
}

.box .box-text {
  text-align: left;
  background: #ffffff;
  height: auto;
  margin-top: 15px;
  padding: 20px 40px;
}

.text-title {
  display: flex;
  margin-bottom: 20px;
}

.title-box {
  width: 110px;
  position: relative;
}

.title-box p {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5ba1f3;
  position: absolute;
  right: 35px;
  top: 7px;
}

.title-conten {
  flex: 1;
}
</style>