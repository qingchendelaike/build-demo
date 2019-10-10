<template>
  <div class="box">
    <div class="nav">
      <power-nav
        class="powerNav"
        :down="true"
        :queryBool="false"
        :titlePop="titlePop"
        :queryForm="exportForm"
        :exportsRouter="exportsRouter"
        :form={}
      ></power-nav>

      <div class="box-title-icon" v-popover:queryEl @click="queryIcon">
        <span class="query-icon"></span>
        <span>查询条件</span>
      </div>

      <div class="box-title-icon" style=" margin-left: 10px;" @click="add" v-popover:addEl>
        <i class="el-icon-plus"></i>
        <span>新增党务用户</span>
      </div>

      <el-popover ref="queryEl" placement="bottom" width="450" trigger="manual" v-model="queryPop">
        <el-form ref="queryForm" :model="queryForm" label-width="120px">
          <el-form-item label="姓名或登录账号" prop="content">
            <el-input v-model.trim="queryForm.content" placeholder="请输入姓名或登录账号"></el-input>
          </el-form-item>

          <el-form-item label="人员身份" prop="identify">
            <el-select v-model="queryForm.identify" placeholder="请选择人员身份" style="width: 100%;">
              <el-option label="普通群众" value="1"></el-option>
              <el-option label="申请人" value="2"></el-option>
              <el-option label="入党积极分子" value="3"></el-option>
              <el-option label="发展对象" value="4"></el-option>
              <el-option label="预备党员" value="5"></el-option>
              <el-option label="正式党员" value="6"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item label="所属组织" prop="organize_id">
            <el-select v-model="queryForm.organize_id" placeholder="请选择党内组织" style="width: 100%;">
                <el-option
                  v-for="item in organData"
                  :key="item.organize_id"
                  :label="item.organize_name"
                  :value="item.organize_id"
                ></el-option>
              </el-select>
          </el-form-item>

           <el-form-item label="组织职务" prop="duty_id">
              <el-select v-model="queryForm.duty_id" placeholder="请选择党内职务" style="width: 100%;">
                <el-option
                  v-for="item in jobData"
                  :key="item.duty_id"
                  :label="item.duty_name"
                  :value="item.duty_id"
                ></el-option>
              </el-select>
          </el-form-item>

         <el-form-item label="党内职务" prop="status">
            <el-select v-model="queryForm.status" placeholder="请选择党内职务" style="width: 100%;">
              <el-option label="使用中" value="1"></el-option>
              <el-option label="已转出" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div style="text-align: right;">
              <el-button type="text" @click="closePop('queryForm')">取消</el-button>
              <el-button type="primary" @click="queryAll('queryForm')">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-popover>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="phone" label="登录账号"></el-table-column>
      <el-table-column prop="user_name" label="真实姓名"></el-table-column>
      <el-table-column label="所属组织">
        <template slot-scope="scope">{{scope.row.organize_duty[0] | dataSpice}}</template>
      </el-table-column>
      <el-table-column label="党内职务">
        <template slot-scope="scope">{{scope.row.organize_duty[1] | dataSpice}}</template>
      </el-table-column>
      <el-table-column label="任期时间">
        <template slot-scope="scope">{{scope.row.organize_duty[2] | dataSpice}}</template>
      </el-table-column>
      <el-table-column prop="zh_identify" label="人员身份"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="450"
            placement="bottom"
            popper-class="popDel"
            title="编辑党务用户"
            @show="showPop(scope)"
          >
            <div style="height: 550px;overflow: auto;">
              <el-form label-width="100px" :model="userInfo" :rules="rules" ref="userInfo">
                <el-form-item label="真实姓名">
                  <el-input v-model="userInfo.user_name" placeholder="请输入真实姓名"></el-input>
                </el-form-item>

                <el-form-item label="手机号码">
                  <el-input v-model="userInfo.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="电子邮箱">
                  <el-input v-model="userInfo.email" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>

                <el-form-item label="重置密码">
                  <el-radio v-model="radio" label="0">否</el-radio>
                  <el-radio v-model="radio" label="1">是</el-radio>
                </el-form-item>

                <el-form-item label="人员身份">
                  <el-select v-model="userInfo.identify" placeholder="请选择人员身份" style="width: 100%;">
                    <el-option label="普通群众" value="1"></el-option>
                    <el-option label="申请人" value="2"></el-option>
                    <el-option label="入党积极分子" value="3"></el-option>
                    <el-option label="发展对象" value="4"></el-option>
                    <el-option label="预备党员" value="5"></el-option>
                    <el-option label="正式党员" value="6"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="组织及职务">
                  <div class="orginBox" v-for="(item,index) in orginJob" :key="index">
                    <el-select v-model="item.orgin" placeholder="请选择党内职务" style="width: 45%;">
                      <el-option
                        v-for="item in organData"
                        :key="item.organize_id"
                        :label="item.organize_name"
                        :value="item.organize_id"
                      ></el-option>
                    </el-select>
                    <el-select v-model="item.job" placeholder="请选择党内职务" style="width: 45%;">
                      <el-option
                        v-for="item in jobData"
                        :key="item.duty_id"
                        :label="item.duty_name"
                        :value="item.duty_id"
                      ></el-option>
                    </el-select>
                    <span class="delOrgin" @click="delOrgin(index,2)" v-if="orginJob.length>1"></span>
                  </div>
                  <el-button type="text" @click="addOrgin(2)">添加</el-button>
                </el-form-item>
                <el-form-item>
                  <div style="text-align: right;">
                    <el-button type="text" @click="handleClose(scope.$index, scope.row)">取消</el-button>
                    <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确定</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <span class="tableEdit" slot="reference"></span>
          </el-popover>
          <el-popover
            trigger="click"
            :ref="`popover-${scope.$index}`"
            width="261"
            placement="bottom-end"
            popper-class="popDel"
          >
            <h4>删除用户</h4>
            <p style="margin:10px;">确定删除该用户？该操作不可恢复。</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="text"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
              >取消</el-button>
              <el-button type="primary" @click="partyUserDelete(scope.$index, scope.row)">确定</el-button>
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
      <div style="maxHeight: 550px;overflow: auto;">
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
            <el-select v-model="addForm.code" placeholder="请选择人员身份" style="width: 100%;">
              <el-option label="普通群众" value="1"></el-option>
              <el-option label="申请人" value="2"></el-option>
              <el-option label="入党积极分子" value="3"></el-option>
              <el-option label="发展对象" value="4"></el-option>
              <el-option label="预备党员" value="5"></el-option>
              <el-option label="正式党员" value="6"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="党内职务" prop="party">
            <el-select v-model="addForm.party" placeholder="请选择党内职务" style="width: 100%;">
              <el-option label="使用中" value="1"></el-option>
              <el-option label="已转出" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="组织及职务">
            <div class="orginBox" v-for="(item,index) in addForm.orginJob" :key="index">
              <el-select v-model="item.orgin" placeholder="请选择党内组织" style="width: 45%;">
                <el-option
                  v-for="item in organData"
                  :key="item.organize_id"
                  :label="item.organize_name"
                  :value="item.organize_id"
                ></el-option>
              </el-select>
              <el-select v-model="item.job" placeholder="请选择党内职务" style="width: 45%;">
                <el-option
                  v-for="item in jobData"
                  :key="item.duty_id"
                  :label="item.duty_name"
                  :value="item.duty_id"
                ></el-option>
              </el-select>
              <span class="delOrgin" @click="delOrgin(index)" v-if="addForm.orginJob.length>1"></span>
            </div>
            <el-button type="text" @click="addOrgin()">添加</el-button>
          </el-form-item>
          <el-form-item>
            <div style="text-align: right;">
              <el-button type="text" @click="resetForm('addForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>
  </div>
</template>

<script>
const md5 = require("md5");
import powerNav from "@/components/common/powerNav";
export default {
  components: {
    powerNav
  },
  data() {
    return {
      exportsRouter:'/partyUser/export',
      queryForm: {
        content: "",
        organize_id: "",
        duty_id: "",
        status: "",
        identify: ""
      },
      exportForm:{},
      queryPop: false,
      radio: "0",
      titlePop: "用户管理",
      dataRow: {},
      checkTree: [],
      addVisible: false,
      tableData: [],
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
        orginJob: [
          {
            job: "",
            orgin: ""
          }
        ]
      },
      jobData: [],
      organData: [],
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        code: [{ required: true, message: "请选择人物身份", trigger: "change" }]
      },
      userInfo: {},
      orginJob: []
    };
  },
  filters: {
    dataSpice(val) {
      let arr = val.split(","),
        arrstr = "";
      for (let i = 0; i < arr.length; i++) {
        arrstr += arr[i] + "\n";
      }
      return arrstr;
    }
  },
  methods: {
    closePop(formName) {
      this.queryPop = false;
      this.$refs[formName].resetFields();
    },
    queryAll(formName) {
      this.exportForm = JSON.parse(JSON.stringify(this.queryForm));
       this.lists();
      this.closePop(formName)
    },
    queryIcon() {
      this.queryPop = !this.queryPop;
    },
    async showPop(scope) {
      const res = await this.$api.globalConfig.partyUserInfo({
        user_id: scope.row.user_id
      });
      if (res.status == "success") {
        this.orginJob = [];
        this.userInfo = res.data;
        this.userInfo.identify = this.userInfo.identify + "";
        let arr = res.data.organize_duty;
        arr.forEach(i => {
          this.orginJob.push({
            orgin: parseInt(i.split(",")[1].split("-")[0]),
            job: parseInt(i.split(",")[1].split("-")[1])
          });
        });
      }
    },

    /* 取消 */
    handleClose(index, row) {
      row = this.dataRow;
      this.$refs[`popedit-${index}`].doClose();
    },
    /* 修改 */
    async handleEdit(index, row) {
      let orginArr = [];
      this.orginJob.forEach(i => {
        orginArr.push(i.orgin + "-" + i.job);
      });
      let req = {
        user_id: row.user_id,
        user_name: this.userInfo.user_name,
        phone: this.userInfo.phone,
        email: this.userInfo.email,
        status: this.userInfo.status,
        identify: this.userInfo.identify,
        is_reset: this.radio,
        organize_duty: orginArr
      };
      const res = await this.$api.globalConfig.partyUserEdit(req);
      if (res.status == "success") {
        this.$refs[`popedit-${index}`].doClose();
        this.lists();
      }
    },
    /* 用户删除 */
    async partyUserDelete(index, row) {
      const res = await this.$api.globalConfig.partyUserDelete({
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
          let orginArr = [];
          this.addForm.orginJob.forEach(i => {
            orginArr.push(i.orgin + "-" + i.job);
          });
          let req = {
            user_name: this.addForm.name,
            phone: this.addForm.phone,
            email: this.addForm.email,
            status: this.addForm.party,
            identify: this.addForm.code,
            password: md5(this.addForm.pwd),
            organize_duty: orginArr
          };
          this.partyUserAdd(req, formName);
        }
      });
    },
    async partyUserAdd(req, formName) {
      let res = await this.$api.globalConfig.partyUserAdd(req);
      if (res.status == "success") {
        this.resetForm(formName);
        this.lists();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addVisible = false;
      this.addForm.orginJob = this.orginJob = [{ job: "", orgin: "" }];
    },
    add() {
      this.addVisible = !this.addVisible;
    },
    async lists() {
      let params = {
        content: this.queryForm.content,
        organize_id: this.queryForm.organize_id,
        duty_id: this.queryForm.duty_id,
        status: this.queryForm.status,
        identify: this.queryForm.identify,
        page: this.page.currentPage,
        page_limit: this.page.page_limit
      };
      let res = await this.$api.globalConfig.dutyUserLists(params);
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

    async dutyUserMenu() {
      let res = await this.$api.globalConfig.dutyUserMenu();
      if (res.status == "success") {
        this.jobData = res.data;
      }
    },
    async dutyUserOrgan() {
      let res = await this.$api.globalConfig.dutyUserOrgan();
      if (res.status == "success") {
        this.organData = this.dgSubject(res.data);
      }
    },
    /* 组织添加多个 */
    addOrgin(key) {
      let req = {
        job: "",
        orgin: ""
      };
      if (key) {
        this.orginJob.push(req);
      } else {
        this.addForm.orginJob.push(req);
      }
    },
    delOrgin(index, key) {
      if (key) {
        this.orginJob.splice(index, 1);
      } else {
        this.addForm.orginJob.splice(index, 1);
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
        if (dataChild) {
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
    this.lists();
    this.dutyUserMenu();
    this.dutyUserOrgan();
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
.tableDel,
.delOrgin {
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url("../../assets/img/css_sprites.png") -145px -55px no-repeat;
}

.box-title-icon {
  cursor: pointer;
}

.orginBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.box-title-icon {
  color: #675757;
}
.query-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../assets/img/css_sprites.png") -6px -143px no-repeat;
  vertical-align: bottom;
}
</style>
