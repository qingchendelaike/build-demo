<template>
  <div class="details-centen">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="typeSw(detailsData.item_type)+'名称'" prop="item_name">
        <el-input placeholder="给会议起个名字吧" v-model="ruleForm.item_name"></el-input>
      </el-form-item>
      <el-form-item label="组织主体" prop="organize_name">
        {{ruleForm.organize_name}}
        <el-cascader
          style="width:100%;"
          v-model="ruleForm.organize_name"
          :options="organData"
          :props="{
              value:'organize_id',
              children:'sub_organization',
              label:'organize_name'
            }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="类型标签" prop="labelArr">
        <div class="inpuIcon">
          <!--collapse-tags -->
          <el-select v-model="labelArr" multiple style="width:90%;" placeholder="请选择">
            <el-option
              v-for="item in labelData"
              :key="item.label_id"
              :label="item.label_name"
              :value="item.label_id"
              v-show="item.is_del == '0'"
            ></el-option>
          </el-select>

          <labelMsg
          :lableText="lableText"
            :labelData="labelData"
            :labelBool="labelBool"
            @labelType="labelType"
            @closeType="closeType"
            @editLabel="editLabel"
            @addLable="addLable"
            @closeLable="closeLable"
            @addTitle="addTitle"
          ></labelMsg>
        </div>
      </el-form-item>
      <el-form-item label="发文文号">
        粤时代司党
        <el-input placeholder="发文年份" class="numberInp" v-model="ruleForm.article_year"></el-input>
        <el-input class="numberInp inp" placeholder="序号" v-model="ruleForm.article_sn"></el-input>号
      </el-form-item>
      <el-form-item label="发文编号" prop="item_sn">
        <el-input placeholder="请输入发文编号" v-model="ruleForm.item_sn"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'时间'" required>
        <el-col :span="10">
          <el-form-item prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
              value-format="yyyy-MM-dd HH:mm"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" style="text-align: center;" :span="2">-</el-col>
        <el-col :span="10">
          <el-form-item prop="end_time">
            <el-date-picker
              v-model="ruleForm.end_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="colIcon">
          <el-popover placement="bottom" width="356" v-model="visibleBool">
            <p class="visible">
              <span>设置提醒时间</span>
              <span class="iconAdd" @click="addTimer(ruleForm.notices)">
                <i class="el-icon-plus"></i>
              </span>
            </p>

            <div class="pop" v-for="(item,index) in ruleForm.notices" :key="index">
              <el-select v-model="item.send_type + ''" class="popOver" placeholder="请选择">
                <el-option label="开始前" value="1"></el-option>
                <el-option label="开始后" value="2"></el-option>
                <el-option label="截止前" value="3"></el-option>
                <el-option label="截止后" value="4"></el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="item.time + ''" class="popInp"></el-input>
              <el-select v-model="item.time_type" class="popTimer" placeholder="请选择">
                <el-option label="分" value="1"></el-option>
                <el-option label="小时" value="2"></el-option>
                <el-option label="天" value="3"></el-option>
              </el-select>
            </div>

            <div style="text-align: right; margin: 0">
              <el-button type="text" @click="closeTimer()">取消</el-button>
              <el-button type="primary" @click="tiemr(ruleForm.notices)">确定</el-button>
            </div>

            <span class="timeicon" slot="reference"></span>
          </el-popover>
        </el-col>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'地点'" prop="item_space">
        <el-input placeholder="请输入会议地点" v-model="ruleForm.item_space"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'原因'" prop="item_reason">
        <el-input type="textarea" :rows="3" v-model="ruleForm.item_reason" placeholder="请输入会议原因"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'流程'" prop="item_flow">
        <el-input type="textarea" :rows="3" v-model="ruleForm.item_flow" placeholder="请输入会议流程"></el-input>
      </el-form-item>

      <el-form-item label="参与人员" prop="users">
        <div class="usersBox">
          <span>{{ruleForm.users}}</span>
          <span class="iconUser" @click="userAll"></span>
        </div>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'任务'" prop="desc">
        <div class="usersBox" style="margin:10px;">
          <span class="iconTasks" @click="iconTasks"></span>
        </div>
        <div class="tasksBox" v-show="takesData.length > 0">
          <p v-for="(item,index) in takesData" :key="index">
            <span class="content" v-if="item.set_bool == false">{{item.content}}</span>
            <el-input
              v-model="item.content"
              type="text"
              v-if="item.set_bool == true"
              style="width:300px;"
            ></el-input>
            <span class="edit" v-if="item.set_bool == false" @click="saveShow(item,index)"></span>
            <span class="save" v-if="item.set_bool == true" @click="editShow(item,index)">保 存</span>
            <span class="del" @click="delShow(item,index)"></span>
            <span class="spanDel"></span>
            <span class="addUser"></span>
          </p>
        </div>
      </el-form-item>

      <el-form-item label="归属系列" prop="desc">
        <el-select v-model="seriesData" multiple placeholder="请选择归属系列" style="width:100%;">
          <el-option
            v-for="item in seriseData"
            :key="item.series_id"
            :label="item.series_name"
            :value="item.series_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="存档文件" prop="desc">
        <div class="inpuIcon">
          {{ ruleForm.item_archive}}
          {{ruleForm.item_archive_ids}}
          <!-- <el-select placeholder="请选择活动区域" v-model="ruleForm.item_archive_ids" style="width: 90%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>-->
          <span class="icon"></span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-popover
          ref="popover"
          placement="top"
          title="确认取消事项？"
          width="280"
          v-model="cancelBool"
          trigger="click"
        >
          <p>将及时发送取消事项通知，请确认后操作。</p>
          <div style="text-align: right; margin: 0">
            <el-button type="text" @click="cancelBool= false">取消</el-button>
            <el-button type="primary" @click="cancelBtnDel()">确定</el-button>
          </div>
          <el-button slot="reference">取消事项</el-button>
        </el-popover>

        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-radio-group v-model="radio">
          <el-radio :label="1">
            <span class="radioCheck">发送查阅通知，选中后提交即发送，请确认内容后操作</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import labelMsg from "../common/labelMsg";
export default {
  components: {
    labelMsg
  },
  props: ["detailsData"],
  data() {
    return {
      lableText:'类型标签管理',
      seriesData: [],
      takesData: [],
      cancelBool: false,
      regionOptions: [],
      radio: 1,
      visibleBool: false,
      labelBool: false,
      ruleForm: {
        item_name: "",
        item_label: "",
        item_label_ids: "",
        article_year: "",
        article_sn: "",
        item_sn: "",
        start_time: "",
        end_time: "",
        item_reason: "",
        item_flow: "",
        item_space: "",
        item_archive: "",
        item_archive_ids: "",
        create_user_name: "",
        organize_name2: [1, 4],
        zh_status: "",
        users: ""
      },
      rules: {
        item_name: [
          { required: true, message: "请输入会议名称", trigger: "blur" }
        ],
        item_reason: [
          { required: true, message: "请输入会议原因", trigger: "blur" }
        ],
        item_flow: [
          { required: true, message: "请输入会议流程", trigger: "blur" }
        ],
        item_space: [
          { required: true, message: "请输入会议地点", trigger: "blur" }
        ],

        organize_name: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        start_time: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        end_time: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
        /*  labelArr: [
                          {
                              type: "string",
                              required: true,
                              message: "请选择类型标签",
                              trigger: "change"
                          }
                      ]*/
      },
      organData: [],
      labelData: [],
      labelArr: [],
      seriseData: []
    };
  },
  methods: {
    /*取消事项  确定按钮*/
    async cancelBtnDel() {
      let req = {
        item_id: this.ruleForm.item_id
      };
      const res = await this.$api.details.cancelItem(req);
      if (res.status == "success") {
        this.cancelBool = false;
        console.log("取消成功");
      }
    },
    /*归属系列*/
    async seriesMenu() {
      const res = await this.$api.details.seriesMenu();
      if (res.status == "success") {
        this.seriseData = res.data;
      }
    },
    /*参与人员*/
    userAll() {},
    /*取消时间提醒*/
    closeTimer() {
      this.ruleForm.notices = this.detailsData.notices;
      this.visibleBool = false;
    },
    /*添加时间提醒*/
    addTimer(val) {
      let req = {
        notice_id: val[0]["notice_id"],
        send_type: "1",
        time: "",
        time_type: "1"
      };
      val.push(req);
    },
    /*时间提醒确定*/
    tiemr(val) {
      console.log(val);
    },
    /* 类型标签 */
    async labelLists() {
      let req = {
        label_type: this.ruleForm.item_type,
        item_id: this.ruleForm.item_id
      };
      const res = await this.$api.details.labelLists(req);
      if (res.status == "success") {
        res.data.forEach(i => {
          if (i.is_del == "1") {
            this.labelArr.push(i.label_id);
          }
          i.set_bool = false;
        });
        this.labelData = res.data;
      }
    },

    /* 修改标签 */
    editLabel(item) {
      item.set_bool = true;
    },
    /* 保存标签 */
    async addLable(item) {
      if (item.label_name == "") {
        this.$message("请输入标签名称");
      } else {
        item.set_bool = false;
        if (item.label_type) {
          const res = await this.$api.details.labelAdd(item);
          if (res.status == "success") {
            this.labelLists();
            this.labelArr = [];
            this.$message("标签添加成功");
          }
        } else {
          let req = {
            label_id: item.label_id,
            label_name: item.label_name
          };
          const res = await this.$api.details.labelEdit(req);
          if (res.status == "success") {
            this.$message("修改标签成功");
          }
        }
      }
    },
    /* 删除标签 */
    async closeLable(item, index) {
      this.labelData.splice(index, 1);
      if (item.label_id) {
        let req = {
          label_id: item.label_id
        };
        const res = await this.$api.details.labelDelete(req);
        if (res.status == "success") {
          // this.labelLists()
          this.$message("删除标签成功");
        }
      }
    },
    /* 新增标签 */
    addTitle() {
      let req = {
        label_type: this.ruleForm.item_type,
        label_name: "",
        is_del: 0,
        set_bool: true
      };
      this.labelData.push(req);
    },

    /* 组织主体选中值 */
    handleChange(val) {
      console.log(val, "");
    },
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
    /* 组织主体 */
    async organ() {
      const res = await this.$api.details.organization();
      if (res.status == "success") {
        this.organData = res.data;
      }
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.arrData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 添加会议任务 */
    iconTasks() {
      let req = {
        set_bool: true,
        content: "",
        task_id: ""
      };
      this.takesData.push(req);
    },
    /* 显示修改任务 */
    saveShow(item, index) {
      // console.log(item,index)
      this.takesData.splice(index, 1, {
        set_bool: true,
        content: item.content,
        task_id: item.task_id
      });
    },
    /* 修改保存 */
    editShow(item) {
      item.set_bool = false;
    },
    /* 删除任务 */
    delShow(item, index) {
      this.takesData.splice(index, 1);
    },
    labelType(val) {
      this.labelBool = val;
    },
    closeType(val) {
      this.labelBool = val;
    }
  },
  mounted() {
    this.ruleForm = JSON.parse(JSON.stringify(this.detailsData));
    this.takesData = JSON.parse(JSON.stringify(this.ruleForm.tasks));
    this.takesData.forEach(i => {
      i.set_bool = false;
    });

    /* seriesData */
    this.ruleForm.series.forEach(i => {
      this.seriesData.push(i.series_id);
    });

    this.organ();
    this.labelLists();
    this.seriesMenu();
  }
};
</script>

<style lang="scss" scoped>
.event-centen {
  width: 950px;
  height: auto;
  margin: 0 auto;

  .details-centen {
    background: #ffffff;
    box-sizing: border-box;
    padding: 40px 183px 40px 164px;
  }
}

.numberInp {
  width: 96px;
  margin: 0 15px;

  &.inp {
    margin-left: 0;
  }
}

.inpuIcon {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url("../../assets/img/details_sprites.png") no-repeat;

    &.icon {
      background-position: -56px -10px;
      cursor: pointer;
    }
  }
}

.el-col-2 {
  &.colIcon {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: flex-end;
  }

  .timeicon {
    display: inline-block;
    width: 25px;
    line-height: 20px;
    height: 25px;
    background: url("../../assets/img/details_sprites.png") -11px -10px
      no-repeat;
    cursor: pointer;
    margin-top: 14px;
  }
}

.visible {
  display: flex;
  margin-bottom: 20px;

  span {
    display: inline-block;

    &:first-child {
      height: 21px;
      font-size: 15px;
      font-weight: 600;
      color: rgba(85, 85, 85, 1);
      line-height: 21px;
      flex: 1;
    }
  }
}

.iconAdd {
  width: 25px;
  font-size: 15px;
  height: 25px;
  background: #f3f7fd;
  border-radius: 3px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #5ca7ff;
  cursor: pointer;
}

.pop {
  display: flex;
  margin-bottom: 10px;
}

.usersBox {
  display: flex;
  align-items: center;
  span {
    &.iconUser {
      margin-left: 30px;
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/css_sprites.png") -145px -10px no-repeat;
    }
    &.iconTasks {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/css_sprites.png") -101px -99px no-repeat;
    }
  }
}
.tasksBox {
  width: 503px;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid rgba(229, 229, 229, 1);
  font-size: 14px;
  p {
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    height: 40px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      &.content {
        width: auto;
        height: 40px;
      }
      &.spanDel {
        flex: 1;
      }
      &.save {
        width: 38px;
        height: 25px;
        border-radius: 3px;
        text-align: center;
        line-height: 25px;
        background: rgba(243, 247, 253, 1);
        font-size: 11px;
        color: rgba(92, 167, 255, 1);
      }
      &.edit {
        background: url("../../assets/img/css_sprites.png") -55px -11px
          no-repeat;
        margin: 0 10px 0 20px;
      }
      &.del {
        background: url("../../assets/img/css_sprites.png") -146px -56px
          no-repeat;
        margin-left: 10px;
      }
      &.addUser {
        background: url("../../assets/img/css_sprites.png") -145px -10px
          no-repeat;
      }
    }
  }
}

.radioCheck {
  color: #999999;
}
</style>
