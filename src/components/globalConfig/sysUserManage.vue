<template>
  <div class="box">
    <div class="nav">
      <role-nav
       @queryAll="queryAll" 
       class="roleNav" 
       :down="true"
       :titlePop="titlePop"
       :searchNamePop="searchNamePop"
       :searchPlacePop="searchPlacePop"
       :queryForm="{}">
       </role-nav>

      <div class="box-title-icon" @click="add" v-popover:addEl>
        <i class="el-icon-plus"></i>
        <span>新增系统用户</span>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="account" label="登录账号"></el-table-column>
      <el-table-column prop="user_name" label="用户名称"></el-table-column>
      <el-table-column prop="role_name" label="系统角色"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="500"
            placement="bottom"
            popper-class="popDel"
            @show="showEdit(scope)"
            title="编辑系统用户"
          >
            <el-form label-width="100px" :rules="rules">
              <el-form-item label="登录账号" prop="account">
                <el-input v-model="scope.row.account" placeholder="请输入登录账号"></el-input>
              </el-form-item>

              <el-form-item label="用户名称" prop="user_name">
                <el-input v-model="scope.row.user_name" placeholder="请输入用户名称"></el-input>
              </el-form-item>

              <el-form-item label="重置密码" prop="is_reset">
                  <el-radio v-model="radio" label="0">否</el-radio>
                  <el-radio v-model="radio" label="1">是</el-radio>
              </el-form-item>

             <el-form-item label="系统角色" prop="role_id">
                   <el-select v-model="scope.row.role_id" placeholder="请选择系统角色" style="width: 100%;">
                    <el-option
                      v-for="item in roleData"
                      :key="item.role_id"
                      :label="item.role_name"
                      :value="item.role_id">
                    </el-option>
            </el-select>
              </el-form-item>

              <el-form-item>
                <!-- <el-button
                  type="text"
                  @click="scope._self.$refs[`popedit-${scope.$index}`].doClose()"
                >取消</el-button>-->
                <div style="text-align: right;">
                <el-button type="text" @click="handleClose(scope.$index, scope.row)">取消</el-button>
                <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确定</el-button>
                </div>
              </el-form-item>
            </el-form>

            <span class="tableEdit" slot="reference"></span>
          </el-popover>

          <el-popover
            trigger="click"
            :ref="`popover-${scope.$index}`"
            width="261"
            placement="bottom-end"
            popper-class="popDel"
          >
            <h4>删除系统用户</h4>
            <p style="margin:10px;">确定删除该系统用户？该操作不可恢复。</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="text"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
              >取消</el-button>
              <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
            </div>
            <span class="tableDel" slot="reference"></span>
          </el-popover>
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

    <!-- 添加 -->
    <el-popover
      ref="addEl"
      placement="bottom-start"
      title="新增系统用户"
      width="550px"
      trigger="manual"
      v-model="addVisible"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="addForm.account" placeholder="请输入登录账号"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" prop="password">
          <el-input v-model="addForm.password" placeholder="请输入登录密码" show-password></el-input>
        </el-form-item>

        <el-form-item label="用户名称" prop="user_name">
          <el-input v-model="addForm.user_name" placeholder="请输入用户名称"></el-input>
        </el-form-item>

        <el-form-item label="系统角色" prop="role_id">
            <el-select v-model="addForm.role_id" placeholder="请选择系统角色" style="width: 100%;">
              <el-option
                v-for="item in roleData"
                :key="item.role_id"
                :label="item.role_name"
                :value="item.role_id">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="resetForm('addForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
  </div>
</template>

<script>
import roleNav from "@/components/common/roleNav";
const md5 = require("md5");
export default {
  components: {
    roleNav
  },
  data() {
    return {
      dataRow: {},
      addVisible: false,
      radio: "0",
      titlePop:"系统用户管理",
      searchNamePop:"登录账号",
      searchPlacePop:"请输入登录账号",
      roleData:[],
      tableData: [],
      content: "",
      page: {
        currentPage: 1,
        total: 0,
        page_limit: 10
      },
      addForm: {
        account: "",
        user_name: "",
        password: "",
        role_id: ""
      },
      rules: {
        account: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        user_name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择系统角色", trigger: "blur" }],
        is_reset: [{ required: true, message: "请选择是否重置密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    showEdit(scope) {
      this.dataRow = JSON.parse(JSON.stringify(scope.row));
    },
    /* 取消 */
    handleClose(index, row) {
      this.tableData.splice(index,1,this.dataRow)
      this.$refs[`popedit-${index}`].doClose();
      
    },
    /* 修改 */
    async handleEdit(index, row) {
      row.is_reset = this.radio;
      const res = await this.$api.globalConfig.systemUserEdit(row);
      if (res.status == "success") {
        this.$refs[`popedit-${index}`].doClose();
        this.lists();
      }
    },
    /* 删除 */
    async handleDelete(index, row) {
      const res = await this.$api.globalConfig.systemUserDelete({
        user_id: row.user_id
      });
      if (res.status == "success") {
        this.$refs[`popover-${index}`].doClose();
        this.lists();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let req = {
            account: this.addForm.account,
            password: md5(this.addForm.password),
            user_name: this.addForm.user_name,
            role_id: this.addForm.role_id
          };
          this.addSystemUser(req, formName);
        }
      });
    },
    async addSystemUser(req, formName) {
      let res = await this.$api.globalConfig.systemUserAdd(req);
      if (res.status == "success") {
        this.resetForm(formName);
        this.lists();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addVisible = false;
    },
    add() {
      this.addVisible = !this.addVisible;
    },
    queryAll(val) {
      this.content = val;
      this.lists();
    },
    async lists() {
      let params = {
        content: this.content,
        page: this.page.currentPage,
        page_limit: this.page.page_limit
      };
      let res = await this.$api.globalConfig.systemUserLists(params);
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
    },
    async roleMenu() {
      let res = await this.$api.globalConfig.roleMenu();
      if (res.status == "success") {
        this.roleData = res.data;
      }
    }
  },
  mounted() {
    this.lists();
    this.roleMenu();
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
  .roleNav {
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
