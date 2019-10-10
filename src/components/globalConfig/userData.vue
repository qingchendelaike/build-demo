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

      <div class="box-title-icon" v-popover:queryEl @click="queryCondi">
        <span class="query-icon"></span>
        <span>查询条件</span>
      </div>

      <el-popover ref="queryEl" placement="bottom" trigger="manual" width="500" v-model="queryPop">
        <p>
          <span>自定义查询</span>
          <span @click="addUser">新增</span>
        </p>
        <el-row>
          <el-col :span="8">字段</el-col>
          <el-col :span="8">字段</el-col>
          <el-col :span="8">值</el-col>
        </el-row>
        <el-row v-for="(item,index) in content" :key="index">
          <el-col :span="8">
            <el-select v-model="item.name" placeholder="请选择">
              <el-option label="姓名" value="1"></el-option>
              <el-option label="性别" value="2"></el-option>
              <el-option label="人员身份" value="3"></el-option>
              <el-option label="人员状态" value="4"></el-option>
              <el-option label="所属组织" value="5"></el-option>
              <el-option label="党内职务" value="6"></el-option>
              <el-option label="任期时间" value="time"></el-option>
              <el-option label="入党申请书提交时间" value="time"></el-option>
              <el-option label="入党积极分子时间" value="time"></el-option>
              <el-option label="参与培训时间" value="time"></el-option>
              <el-option label="发展对象时间" value="time"></el-option>
              <el-option label="入党时间" value="time"></el-option>
              <el-option label="转正时间" value="time"></el-option>
              <el-option label="所属部门" value="14"></el-option>
              <el-option label="员工职级" value="15"></el-option>
              <el-option label="身份证号" value="16"></el-option>
              <el-option label="出身年月" value="years"></el-option>
              <el-option label="年龄" value="18"></el-option>
              <el-option label="民族" value="19"></el-option>
              <el-option label="籍贯" value="20"></el-option>
              <el-option label="毕业院校" value="21"></el-option>
              <el-option label="学历" value="22"></el-option>
              <el-option label="参与工作时间" value="years"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="item.size" placeholder="请选择">
              <el-option label="大于" value=">"></el-option>
              <el-option label="等于" value="="></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="大于等于" value=">="></el-option>
              <el-option label="小于等于" value="<="></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <!--  <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </el-col>
        </el-row>
      </el-popover>
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
      <el-table-column prop="zh_education" label="学历"></el-table-column>

      <el-table-column prop="work_time" label="参与工作时间"></el-table-column>

      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            :ref="`popedit-${scope.$index}`"
            width="450"
            placement="bottom"
            popper-class="popDel"
             @show="showEdit(scope)"
          >
            <div class="editBox">
              <h4>编辑资料——{{scope.row.user_name}}</h4>
              <el-form label-width="150px">
                <p class="box-title">基础资料</p>
                <el-form-item label="性别">
                  <el-select v-model="scope.row.sex+''" placeholder="请选择" style="width:100%;">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="身份证号">
                  <el-input v-model="scope.row.id_card" placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="出生年月">
                  <el-date-picker
                    v-model="scope.row.birth"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择出生年月"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="民族">
                  <el-select v-model="scope.row.nation_id+''" placeholder="请选择" style="width:100%;">
                    <el-option label="汉族" value="0"></el-option>
                    <el-option label="少数名族" value="1"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="籍贯">
                  <el-input v-model="scope.row.sources" placeholder="请输入籍贯"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校">
                  <el-input v-model="scope.row.graduation" placeholder="请输入毕业院校"></el-input>
                </el-form-item>

                <el-form-item label="学历">
                  <el-select v-model="scope.row.education+''" placeholder="请选择" style="width:100%;">
                    <el-option label="初中" value="1"></el-option>
                    <el-option label="高中" value="2"></el-option>
                    <el-option label="中专" value="3"></el-option>
                    <el-option label="大专" value="4"></el-option>
                    <el-option label="本科" value="5"></el-option>
                    <el-option label="硕士" value="6"></el-option>
                    <el-option label="博士" value="7"></el-option>
                    <el-option label="博士后" value="8"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="参加工作时间">
                  <el-date-picker
                    v-model="scope.row.work_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择参加工作时间"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>
                <p class="box-title">公司资料</p>
                <el-form-item label="所属部门">
                  <el-input placeholder="请输入所属部门"></el-input>
                </el-form-item>
                <el-form-item label="员工职级">
                  <el-input placeholder="请输入员工职级"></el-input>
                </el-form-item>

                <p class="box-title">党务资料</p>
                <el-form-item label="人员身份">
                  <el-select v-model="scope.row.identify+''" placeholder="请选择" style="width:100%;">
                    <el-option label="普通群众" value="1"></el-option>
                    <el-option label="申请人" value="2"></el-option>
                    <el-option label="入党积极分子" value="3"></el-option>
                    <el-option label="发展对象" value="4"></el-option>
                    <el-option label="预备党员" value="5"></el-option>
                    <el-option label="正式党员" value="6"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="入党申请书提交时间">
                  <el-date-picker
                    v-model="scope.row.apply_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="入党积极分子时间">
                  <el-date-picker
                    v-model="scope.row.active_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="参加培训时间">
                  <el-date-picker
                    v-model="scope.row.train_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="发展对象时间">
                  <el-date-picker
                    v-model="scope.row.develop_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="入党时间">
                  <el-date-picker
                    v-model="scope.row.party_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="转正时间">
                  <el-date-picker
                    v-model="scope.row.formal_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                    style="width:100%;"
                  ></el-date-picker>
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
  data() {
    return {
      titlePop: "人员资料库",
      queryPop: false,
      content: [
        {
          name: "",
          size: "",
          nameVal: ""
        }
      ],
      tableData: [],
      nameData: [],
      page: {
        currentPage: 1,
        total: 0,
        page_limit: 10
      },
      dataRow:{}
    };
  },
  methods: {
    showEdit(scope) {
      this.dataRow = JSON.parse(JSON.stringify(scope.row));
    },
    /* 取消 */
    handleClose(index, row) {
      this.tableData.splice(index, 1, this.dataRow);
      this.$refs[`popedit-${index}`].doClose();
    },
    /* 修改 */
    async handleEdit(index, row) {

      /* const res = await this.$api.globalConfig.dutyEdit(row);
      if (res.status == "success") {
        this.$refs[`popedit-${index}`].doClose();
        this.lists();
      } */
    },
    queryCondi() {
      this.queryPop = !this.queryPop;
    },
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
    },
    addUser() {
      this.content.push({
        name: "",
        size: "",
        nameVal: ""
      });
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
.editBox {
  height: 500px;
  overflow-x: auto;
  .box-title {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    box-sizing: border-box;
    padding-left: 13px;
  }
}
</style>
