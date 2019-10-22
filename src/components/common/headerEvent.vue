<template>
  <div class="main-title">
    <div class="main-title-text">
      {{headerTitle}}
      <i style="font-size: 17px;" class="el-icon-warning" v-popover:popover></i>
    </div>

    <div @click="pScreen" v-popover:popoverScreen>
      <span class="main-title-event-icon"></span>
      <span class="main-title-event">筛选事项</span>
    </div>

    <div @click="exports(exportList)">
      <span class="main-title-export-icon"></span>
      <span class="main-title-export">导出</span>
    </div>

    <!-- 筛选 -->
    <el-popover ref="popoverScreen" v-model="manual" trigger="manual" placement="bottom-end">
      <div class="screen">
        <el-form ref="formData" :model="formData" label-width="40px">
          <el-form-item label="名称" prop="item_name">
            <el-input v-model="formData.item_name" placeholder="请输入事项名称"></el-input>
          </el-form-item>
          <el-form-item label="主体" prop="organize_id">
            <el-select style="width: 100%;" v-model="formData.organize_id" placeholder="请选择组织主体">
              <el-option
                v-for="(item,index) in popData"
                :label="item.organize_name"
                :value="item.organize_id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-status">
            <el-col :span="11">
              <el-form-item label="状态" prop="item_status">
                <el-select v-model="formData.item_status" placeholder="请选择事项状态">
                  <el-option label="未开始" value="1"></el-option>
                  <el-option label="进行中" value="2"></el-option>
                  <el-option label="已截止" value="3"></el-option>
                  <el-option label="已办结" value="4"></el-option>
                  <el-option label="已取消" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="类型" prop="item_type">
                <el-select v-model="formData.item_type" placeholder="请选择事项类型">
                  <el-option label="会议" value="1"></el-option>
                  <el-option label="课程" value="2"></el-option>
                  <el-option label="活动" value="3"></el-option>
                  <el-option label="项目方案" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="时间">
            <el-col :span="11">
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="datetime"
                placeholder="选择开始日期"
                v-model="formData.start_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" style="text-align:center;" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择结束时间"
                v-model="formData.end_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item style="text-align: right;">
            <el-button @click="onSubmitClose('formData')">取消</el-button>
            <el-button type="primary" @click="onSubmit" :loading="loading">{{btn}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>

    <!-- 状态事项说明 -->
    <el-popover width="480" ref="popover" trigger="hover" placement="bottom-end">
      <div class="all">
        <p class="a">
          <span>未开始</span>
          <span>未到事项开始时间，所有事项详情均可编辑，可选择是否发送变动通知，可上传文件、催办反馈</span>
        </p>
        <p class="b">
          <span>进行中</span>
          <span>处于事项开始时间与截止时间之间，事项详情可编辑，可上传文件、催办反馈</span>
        </p>
        <p class="c">
          <span>已截止</span>
          <span>事项截止时间点后则视为截止，事项详情不可编辑，可上传文件、催办反馈、添加特殊情况备注</span>
        </p>
        <p class="d">
          <span>已办结</span>
          <span>经由党办人员确认存档文件后办结事项，事项详情不可编辑，只供查看或添加特殊情况备注</span>
        </p>
        <p class="e">
          <span>已取消</span>
          <span>发起人可取消事项，被取消的事项记录与文件仍在案，需由党办人员确认是否彻底删除该事项</span>
        </p>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {BASE_URL} from '@/api/utils'
export default {
  props: [
    "headerTitle",
    "loading",
    "manual",
    "btn",
    "allexports",
    "exportList",
    "exportsRouter"
  ],
  data() {
    return {
      popData: [],
      formData: {
        item_name: "",
        item_status: "",
        start_time: "",
        end_time: "",
        organize_id: "",
        item_type: ""
      }
    };
  },
  methods: {
    onSubmitClose(formName) {
      this.formData.start_time = this.formData.end_time = "";
      this.$refs[formName].resetFields();
      this.$emit("onSubmitClose", false, "确定");
    },
    /* 筛选提交 */
    onSubmit() {
      this.$emit("onSubmit", this.formData, true, "");
    },
    /* 导出表格 */
    async exports(val) {
      const res = await this.$api.allMatters.ticket(
        sessionStorage.getItem("Token")
      );
      if (res.status == "success") {
        this.formData.export_ticket = res.data;
        let exportUrl = "";
        Object.keys(this.formData).map(key => {
          exportUrl += key + "=" + this.formData[key] + "&";
        });
        window.open(
          `${BASE_URL}/${this.exportsRouter}?${exportUrl}`
        );
      }
    },
    pScreen() {
      this.$emit("pScreen", true);
    },
    /* 主体 */
    async subject() {
      const res = await this.$api.allMatters.organization(
        sessionStorage.getItem("Token")
      );
      if (res.status == "success") {
        let data = res.data;
        this.popData = this.dgSubject(data);
      }
    },
    /* 循环出组织主体 */
    dgSubject(data) {
      let dataArray = [];
      for (let i = 0; i < data.length; i++) {
        let dataObj = {};
        dataObj.organize_id = data[i].organize_id;
        dataObj.organize_name = data[i].organize_name;
        dataArray.push(dataObj);
        let dataChild = data[i]["sub_organization"];
        if(dataChild){
            // if (dataChild.length > 0) {
                for (let j = 0; j < dataChild.length; j++) {
                    let dataObj = {};
                    dataObj.organize_id = dataChild[j].organize_id;
                    dataObj.organize_name = dataChild[j].organize_name;
                    dataArray.push(dataObj);
                }
            // }
        }
      }
      return dataArray;
    }
  },
  mounted() {
    let data = new Date().getFullYear();
    this.formData.start_time = data+'-01-01'
    this.formData.end_time = data+'-12-31';
    this.subject()
  }
};
</script>

<style lang="scss" scoped>
.main-box {
  .main-title {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding-right: 3px;
      cursor: pointer;
    }
    .main-title-text {
      height: auto;
      flex: 1;
      @extend .fontSizeExplain;
    }
    .main-title-event {
      margin-right: 15px;
    }
    .main-title-event-icon {
      padding-right: 0px;
      width: 20px;
      background: url("../../assets/img/index_sprites.png") -61px -13px no-repeat;
      vertical-align: bottom;
    }
    .main-title-export-icon {
      width: 20px;
      background: url("../../assets/img/index_sprites.png") -13px -14px no-repeat;
      vertical-align: bottom;
    }
  }

  .is_task {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: sub;
    background: url("../../assets/img/index_sprites.png") -12px -59px no-repeat;
    cursor: pointer;
  }
}

.popover-box {
  padding: 13px;
  p {
    font-size: 13px;
    padding: 9px 11px 9px 15px;
    border: 1px solid rgba(229, 229, 229, 1);
    border-bottom: none;
    &:first-child {
      border-radius: 3px 3px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 0px 3px 3px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
  }
}

.screen {
  padding: 18px;
  width: 460px;
}

.form-status {
  /deep/ div:first-child {
    &.el-form-item__content {
      margin-left: 0 !important;
    }
  }
}

.all {
  p {
    height: 56px;
    width: 480px;
    font-size: 13px;
    border: 1px solid rgba(229, 229, 229, 1);
    border-bottom: none;
    &:last-child {
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
    &::after {
      content: "";
      position: absolute;
      left: 27px;
      width: 2px;
      height: 12px;
      border-radius: 2px;
    }
    &.a {
      &::after {
        top: 34px;
        background: #5ca7ff;
      }
    }
    &.b {
      &::after {
        top: 91px;
        background: #50e3c2;
      }
    }
    &.c {
      &::after {
        top: 147px;
        background: #e5e5e5;
      }
    }
    &.d {
      &::after {
        bottom: 93px;
        background: #f8e71c;
      }
    }
    &.e {
      &::after {
        bottom: 37px;
        background: #ff4001;
      }
    }
  }
  span {
    display: inline-block;
    &:first-child {
      width: 43px;
      padding: 18px 20px 19px 21px;
      border-right: 1px solid rgba(229, 229, 229, 1);
      font-weight: 600;
      float: left;
    }
    &:last-child {
      line-height: 18px;
      width: 355px;
      padding: 9px 11px 9px 15px;
      float: left;
    }
  }
}
</style>
