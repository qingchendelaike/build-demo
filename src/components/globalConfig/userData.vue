<template>
  <div class="box">
    <div class="nav">
      <power-nav
        class="powerNav"
        :down="true"
        :titlePop="titlePop"
        :queryBool="false"
        :queryForm="{}"
        :form="{}"
      ></power-nav>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="user_name" label="姓名" fixed="left"></el-table-column>
      <el-table-column prop="zh_sex" label="性别"></el-table-column>
      <el-table-column prop="zh_identify" label="人员身份"></el-table-column>
      <el-table-column prop="zh_status" label="人员状态"></el-table-column>

      <el-table-column prop="zh_sex" label="所属组织"></el-table-column>
      <el-table-column prop="zh_identify" label="党内职务"></el-table-column>
      <el-table-column prop="zh_status" label="任期时间"></el-table-column>

      <el-table-column prop="apply_time" label="入党申请书提交时间"></el-table-column>
      <el-table-column prop="active_time" label="入党积极分子时间"></el-table-column>
      <el-table-column prop="train_time" label="参与培训时间"></el-table-column>
      <el-table-column prop="develop_time" label="发展对象时间"></el-table-column>
      <el-table-column prop="party_time" label="入党时间"></el-table-column>
      <el-table-column prop="formal_time" label="转正时间"></el-table-column>

      <el-table-column prop="zh_sex" label="所属部门"></el-table-column>
      <el-table-column prop="zh_identify" label="员工职级"></el-table-column>

      <el-table-column prop="id_card" label="身份证号"></el-table-column>
      <el-table-column prop="birth" label="出身年月"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="zh_nation" label="民族"></el-table-column>
      <el-table-column prop="sources" label="籍贯"></el-table-column>
      <el-table-column prop="graduation" label="毕业院校"></el-table-column>
      <el-table-column prop="education" label="学历">
        
      </el-table-column>

      <el-table-column prop="work_time" label="参与工作时间"></el-table-column>


      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
           <span class="tableEdit" slot="reference"></span>
          <!-- <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="500"
            placement="bottom"
            popper-class="popDel"
            @show="showEdit(scope)"
            title="编辑职务"
          >
            <el-form label-width="100px">
              <el-form-item label="职务名称">
                <el-input v-model="scope.row.duty_name" placeholder="请输入职务名称"></el-input>
              </el-form-item>

              <el-form-item label="权限字符">
                <el-input v-model="scope.row.duty_string" placeholder="请输入权限字符"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="scope.row.remark" placeholder="请输入备注内容"></el-input>
              </el-form-item>

              <el-form-item>
                <div style="text-align: right;">
                  <el-button type="text" @click="handleClose(scope.$index, scope.row)">取消</el-button>
                  <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确定</el-button>
                </div>
              </el-form-item>
            </el-form>

            <span class="tableEdit" slot="reference"></span>
          </el-popover>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页  待封装为组件-->
    <div class="page-box" v-if="tableData.length > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="page.page_limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import powerNav from "@/components/common/powerNav";
export default {
  components: {
    powerNav
  },
  data() {
    return {
      titlePop: "人员资料库",
      content: [],
      tableData: [],
      page: {
        currentPage: 1,
        total: 0,
        page_limit: 10
      }
    };
  },
  methods: {
    async lists() {
      let params = {
        params: this.content,
        page: this.page.currentPage,
        page_limit: this.page.page_limit
      };
      let res = await this.$api.globalConfig.partyUserList(params);
      if (res.status == "success") {
        this.tableData = res.data.lists;
        this.page.total = res.data.count;
      }
    },
    handleSizeChange(val) {
      this.page.page_limit = val;
      this.lists();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.lists();
    }
  },
  mounted() {
    this.lists();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/table.scss";
.box {
  background: #f6f6f6;
  margin-left: 5px;
  padding: 20px 30px;
  box-sizing: border-box;
  height: 100%;
  border-radius: 3px;
}
.nav {
  display: flex;
  align-items: center;
  .powerNav {
    flex: 1;
  }
}
.tableEdit {
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url("../../assets/img/css_sprites.png") -55px -10px no-repeat;
}
.tableDel {
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url("../../assets/img/css_sprites.png") -145px -55px no-repeat;
}

.box-title-icon {
  cursor: pointer;
}
</style>
