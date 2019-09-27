<template>
  <div class="details-centen">
    <el-form
      :model="detailsData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="typeSw(detailsData.item_type)+'名称'" prop="name">
        <el-input placeholder="给会议起个名字吧"></el-input>
      </el-form-item>
      <el-form-item label="组织主体" prop="region">
        <el-select placeholder="请选择活动区域" style="width: 100%;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型标签">
        <div class="inpuIcon">
          <el-select placeholder="请选择活动区域" style="width: 90%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span class="icon"></span>
        </div>
      </el-form-item>
      <el-form-item label="发文文号" prop="delivery">
        粤时代司党
        <el-input style="width:96px" placeholder="发文年份"></el-input>
        <el-input class="num" style="width:96px" placeholder="序号"></el-input>号
      </el-form-item>
      <el-form-item label="发文编号" prop="type">
        <el-input placeholder="请输入发文编号"></el-input>
      </el-form-item>
      <el-form-item :label="typeSw(detailsData.item_type)+'时间'" prop="resource">
        <el-col :span="9">
          <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" style="text-align: center;" :span="2">-</el-col>
        <el-col :span="9">
          <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
        </el-col>
        <el-col :span="2">
          <span class="timeicon">321312</span>
        </el-col>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'地点'" prop="desc">
        <el-input placeholder="请输入会议地点"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'原因'" prop="desc">
        <el-input type="textarea" :rows="3" placeholder="请输入会议原因"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'流程'" prop="desc">
        <el-input type="textarea" :rows="3" placeholder="请输入会议流程"></el-input>
      </el-form-item>

      <el-form-item label="参与人员" prop="desc">
        <span></span>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'任务'" prop="desc">
        <span></span>
      </el-form-item>

      <el-form-item label="归属系列" prop="desc">
        <el-select placeholder="请选择归属系列" style="width:100%;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="存档文件" prop="desc">
        <div class="inpuIcon">
          <el-select placeholder="请选择活动区域" style="width: 90%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span class="icon"></span>
        </div>
      </el-form-item>

      <el-form-item >
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
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
    }
    /* 组织主体 */
  },
  mounted() {}
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
    }
  }
   .timeicon{
      display: inline-block;
    width: 25px;
    height: 25px;
    background: url("../../assets/img/details_sprites.png") no-repeat;
      background-position: -56px -10px;
    }
}
</style>