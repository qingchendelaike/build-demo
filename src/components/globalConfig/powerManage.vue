<template>
  <div class="box">
    <div class="nav">
      <power-nav @queryAll="queryAll" class="powerNav" :queryForm="{}" :form="formNav"></power-nav>

      <div class="box-title-icon" @click="add" v-popover:addEl>
        <i class="el-icon-plus"></i>
        <span>新增职务</span>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="duty_name" label="职务名称"></el-table-column>
      <el-table-column prop="duty_string" label="权限字符"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="500"
            placement="bottom"
            popper-class="popDel"
            @show="showEdit(scope)"
            title="编辑职务"
          >
            <el-form label-width="100px" :model="editFrom" :rules="rulesEdit" ref="editForm">
              <el-form-item label="职务名称" prop="duty_name">
                <el-input v-model="editFrom.duty_name" placeholder="请输入职务名称"></el-input>
              </el-form-item>

              <el-form-item label="权限字符" prop="duty_string">
                <el-input v-model="editFrom.duty_string" placeholder="请输入权限字符"></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input v-model="editFrom.remark" placeholder="请输入备注内容"></el-input>
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
      title="新增职务"
      width="550px"
      trigger="manual"
      v-model="addVisible"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="职务名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入职务名称"></el-input>
        </el-form-item>

        <el-form-item label="权限字符" prop="power">
          <el-input v-model="addForm.power" placeholder="请输入权限字符"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" placeholder="请输入备注内容"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" prop="tree">
          <el-tree
            :data="treeData"
            ref="addTree"
            show-checkbox
            node-key="power_id"
            :props="defaultProps"
          ></el-tree>
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
import powerNav from "@/components/common/powerNav";
export default {
  components: {
    powerNav
  },
  data() {
    return {
      formNav: {
        labelName: "职务名称",
        name: "",
        placeName: "请输入职务名称"
      },
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
        power: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入职务名称", trigger: "blur" }],
        power: [{ required: true, message: "请输入权限字符", trigger: "blur" }]
      },
      rulesEdit: {
        duty_name: [
          { required: true, message: "请输入职务名称", trigger: "blur" }
        ],
        duty_string: [
          { required: true, message: "请输入权限字符", trigger: "blur" }
        ]
      },
      editFrom: {
        duty_name: "",
        duty_string: "",
        remark: ""
      }
    };
  },
  methods: {
    foreachTree(tree, key) {
      for (let i = 0; i < tree.length; i++) {
        tree[i].disabled = key == 1 ? true : false;
        if (tree[i]["sub_power"].length > 0) {
          this.foreachTree(tree[i]["sub_power"], key);
        }
      }
    },
    showEdit(scope) {
      this.editFrom = scope.row;
      this.$refs[`addTree-${scope.$index}`].setCheckedKeys([]);
      this.dataRow = JSON.parse(JSON.stringify(scope.row));
      this.checkTree = scope.row.duty_authority.split(",");
      if (scope.row.is_special == 1) {
        this.foreachTree(this.treeData, 1);
      } else {
        this.foreachTree(this.treeData, 0);
      }
    },
    /* 取消 */
    handleClose(index, row) {
      this.tableData.splice(index, 1, this.dataRow);
      this.$refs[`popedit-${index}`].doClose();
    },
    /* 修改 */
    async handleEdit(index, row) {
      this.$refs["editForm"].validate(valid => {
        if (valid && this.$refs[`addTree-${index}`].getCheckedKeys().length > 0) {
          this.editFromData(index, row);
        }
      });
    },

    async editFromData(index, row) {
      let arr = [...this.$refs[`addTree-${index}`].getCheckedKeys(),...this.$refs[`addTree-${index}`].getHalfCheckedKeys()] 
      row.duty_authority = arr.join(",");
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
      this.$refs.addTree.setCheckedKeys([]);
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
      let res = await this.$api.globalConfig.dutyLists(params);
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
