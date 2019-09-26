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
          <el-input v-model="detailsData.item_name"></el-input>
        </el-form-item>
        <el-form-item label="组织主体" prop="region">
            <el-cascader :options="regionOptions" :show-all-levels="false"></el-cascader>

         
        </el-form-item>
        <el-form-item label="类型标签">
          <div class="inpuIcon">
            <el-input></el-input>
          </div>
        </el-form-item>
        <el-form-item label="发文文号" prop="delivery">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发文编号" prop="type">
          <el-input></el-input>
        </el-form-item>
        <el-form-item :label="typeSw(detailsData.item_type)+'时间'" prop="resource">
          <el-input></el-input>
        </el-form-item>

        <el-form-item :label="typeSw(detailsData.item_type)+'地点'" prop="desc">
          <el-input></el-input>
        </el-form-item>

        <el-form-item :label="typeSw(detailsData.item_type)+'流程'" prop="desc">
          <el-input></el-input>
        </el-form-item>

        <el-form-item :label="typeSw(detailsData.item_type)+'任务'" prop="desc">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="归属系列" prop="desc">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="存档文件" prop="desc">
          <el-input></el-input>
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
      regionOptions:[],
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
    },
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
      }}
</style>