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
      <el-form-item label="类型标签">
        <div class="inpuIcon">
          <el-select v-model="labelArr" multiple collapse-tags style="width:90%;" placeholder="请选择">
            <el-option
              v-for="item in labelData"
              :key="item.label_id"
              :label="item.label_name"
              :value="item.label_id"
            ></el-option>
          </el-select>

          <span class="icon"></span>
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
          <el-popover
            placement="bottom"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
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

      <el-form-item label="参与人员" prop="desc">
        <span>{{ruleForm.users}}</span>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'任务'" prop="desc">
        <span>{{ruleForm.tasks}}</span>
      </el-form-item>

      <el-form-item label="归属系列" prop="desc">
        <el-select placeholder="请选择归属系列" v-model="ruleForm.series" style="width:100%;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="存档文件" prop="desc">
        <div class="inpuIcon">
          <el-select placeholder="请选择活动区域" v-model="ruleForm.item_archive_ids" style="width: 90%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span class="icon"></span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消事项</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
export default {
  props: ["detailsData"],
  data() {
    return {
      regionOptions: [],
      radio: 1,
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
        organize_name: "",
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
      },
      organData: [],
      labelData: [],
      labelArr: []
    };
  },
  methods: {
    /* 类型标签 */
    async labelLists() {
      const res = await this.$api.details.labelLists();
      if (res.status == "success") {
        this.labelData = res.data;
      }
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
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.ruleForm = JSON.parse(JSON.stringify(this.detailsData));
    let arr = this.ruleForm.item_label.split(",");

    arr.forEach(i => {
      this.labelArr.push(i);
    });

    this.organ();
    this.labelLists();
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
    background: url("../../assets/img/details_sprites.png") no-repeat;
    background-position: -11px -10px;
    margin-top: 14px;
    cursor: pointer;
  }
}
</style>