<template>
  <div class="box-title">
    <span class="box-text">职务权限管理</span>
    <div class="box-title-icon" v-if="down">
      <span class="box-icon"></span>
      <span>导出</span>
    </div>
    <div class="box-title-icon" v-popover:queryEl @click="queryCondi">
      <span class="query-icon"></span>
      <span>查询条件</span>
    </div>

    <el-popover ref="queryEl" placement="bottom" trigger="manual" v-model="queryPop">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="职务名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入职务名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="closePop('form')">取消</el-button>
          <el-button type="primary" @click="queryAll('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    down: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryPop: false,
      form: {
        name: ""
      }
    };
  },
  methods: {
    queryCondi() {
      this.queryPop = !this.queryPop;
    },
    closePop(formName) {
      this.queryPop = false;
      this.$refs[formName].resetFields();
    },
    queryAll(formName) {
       this.$emit("queryAll", this.form.name);
        this.queryPop = false;
        this.$refs[formName].resetFields();
     /*  if (this.form.name.length != 0) {
        this.$emit("queryAll", this.form.name);
        this.queryPop = false;
        this.$refs[formName].resetFields();
      } */
    }
  }
};
</script>

<style lang="scss" scoped>
.box-title {
  height: 30px;
  font-size: 22px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
  display: flex;
  align-items: center;
  .box-text {
    flex: 1;
  }
  .box-title-icon {
    font-size: 14px;
    font-weight: 400;
    color: rgba(103, 87, 87, 1);
    line-height: 20px;
    margin-right: 15px;
    cursor: pointer;
    span {
      display: inline-flex;
    }
    .box-icon {
      width: 20px;
      height: 20px;
      background: url("../../assets/img/index_sprites.png") -13px -14px
        no-repeat;
      vertical-align: bottom;
    }
    .query-icon {
      width: 20px;
      height: 20px;
      background: url("../../assets/img/css_sprites.png") -6px -143px no-repeat;
      vertical-align: bottom;
    }
  }
}
</style>
