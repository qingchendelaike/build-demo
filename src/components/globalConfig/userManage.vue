<template>
  <div class="box">
    <div class="nav">
      <power-nav
        @queryAll="queryAll"
        class="powerNav"
        :down="true"
        :queryBool="false"
        :titlePop="titlePop"
      ></power-nav>

      <div class="box-title-icon" @click="add" v-popover:addEl>
        <i class="el-icon-plus"></i>
        <span>新增职务</span>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="登录账号"></el-table-column>
      <el-table-column prop="user_name" label="真实姓名"></el-table-column>
      <el-table-column label="所属组织">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column label="党内职务">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column label="任期时间">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column prop="zh_identify" label="人员身份"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="500"
            placement="bottom"
            popper-class="popDel"
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
              <el-form-item label="菜单权限">
                <div style="height: 180px;overflow-x: auto;">
                  <el-tree
                    :data="treeData"
                    :ref="`addTree-${scope.$index}`"
                    show-checkbox
                    :default-checked-keys="checkTree"
                    node-key="power_id"
                    :props="defaultProps"
                  ></el-tree>
                </div>
              </el-form-item>

              <el-form-item>
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
            <h4>删除职务</h4>
            <p style="margin:10px;">确定删除该职务？该操作不可恢复。</p>
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
      title="新增党务用户"
      width="450"
      trigger="manual"
      v-model="addVisible"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" prop="pwd">
          <el-input v-model="addForm.pwd" type="password" placeholder="请输入登录密码"></el-input>
        </el-form-item>

        <el-form-item label="人员身份" prop="code">
          <el-select v-model="addForm.code" placeholder="请选择人员身份">
            <el-option label="普通群众" value="1"></el-option>
            <el-option label="申请人" value="2"></el-option>
            <el-option label="入党积极分子" value="3"></el-option>
            <el-option label="发展对象" value="4"></el-option>
            <el-option label="预备党员" value="5"></el-option>
            <el-option label="正式党员" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="党内职务" prop="party">
          <el-select v-model="addForm.party" placeholder="请选择党内职务">
            <el-option label="使用中" value="1"></el-option>
            <el-option label="已转出" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="组织及职务" prop="job">
          <el-input v-model="addForm.job" placeholder="请选择组织及职务"></el-input>
        </el-form-item>

        <el-form-item>
          <div style="text-align: right;">
            <el-button type="text" @click="resetForm('addForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-popover>
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
      titlePop: "用户管理",
      dataRow: {},
      checkTree: [],
      addVisible: false,
      tableData: [],
      treeData: [],
      content: "",
      page: {
        currentPage: 1,
        total: 0,
        page_limit: 10
      },
      defaultProps: {
        children: "sub_power",
        label: "power_name"
      },
      addForm: {
        name: "",
        phone: "",
        email: "",
        pwd: "",
        code: "",
        party: "1",
        job: ""
      },
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        code:[{ required: true, message: '请选择人物身份', trigger: 'change' }]
      }
    };
  },
  methods: {
    /* 取消 */
    handleClose(index, row) {
      row = this.dataRow;
      this.$refs[`popedit-${index}`].doClose();
    },
    /* 修改 */
    async handleEdit(index, row) {
      row.duty_authority = this.$refs[`addTree-${index}`]
        .getCheckedKeys()
        .join(",");
      const res = await this.$api.globalConfig.dutyEdit(row);
      if (res.status == "success") {
        this.$refs[`popedit-${index}`].doClose();
        this.lists();
      }
    },
    /* 系列删除 */
    async handleDelete(index, row) {
      const res = await this.$api.globalConfig.dutyDelete({
        duty_id: row.duty_id
      });
      if (res.status == "success") {
        this.$refs[`popover-${index}`].doClose();
        this.lists();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.$refs.addTree.getCheckedKeys().length > 0) {
          let req = {
            duty_name: this.addForm.name,
            duty_string: this.addForm.power,
            remark: this.addForm.remark,
            duty_authority: this.$refs.addTree.getCheckedKeys().join(",")
          };
          this.addPower(req, formName);
        }
      });
    },
    async addPower(req, formName) {
      let res = await this.$api.globalConfig.dutyAdd(req);
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
        page: this.page.currentPage,
        page_limit: this.page.page_limit
      };
      let res = await this.$api.globalConfig.dutyUserLists(params);
      if (res.status == "success") {
        /*  let listArr = res.data.lists
          listArr.forEach(i => {
              if(i.organize_duty.length > 0){
                this.forList(i.organize_duty)
              }
          });
 */
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
    async powerLists() {
      let res = await this.$api.globalConfig.powerLists();
      if (res.status == "success") {
        this.treeData = res.data;
      }
    }
  },
  mounted() {
    this.lists();
    this.powerLists();
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
