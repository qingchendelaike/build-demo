<template>
  <div class="eventDeatils" id="person-box">
    <div class="event-box">
      <i class="el-icon-arrow-left backIcon" @click="callBack"></i>
      <div class="event-centen">
        <div class="routerBox">
          <div>发起{{typeSw(this.$route.query.item_id)}}</div>
        </div>
        <div class="details-centen">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="typeSw(this.$route.query.item_id)+'名称'" prop="item_name">
              <el-input placeholder="给会议起个名字吧" v-model="ruleForm.item_name"></el-input>
            </el-form-item>
            <el-form-item label="组织主体" prop="mineStatus">
              <el-select v-model="ruleForm.mineStatus" placeholder="请选择组织主体" multiple style="width:100%;">
                <el-option :value="mineStatusValue" style="height: auto">
                  <el-tree
                    :data="organData"
                    :check-strictly="true"
                    show-checkbox
                    node-key="organize_id"
                    ref="tree"
                    highlight-current
                    :props="{
                      id: 'organize_id',
                      label: 'organize_name',
                      children:'sub_organization'
                    }"
                    default-expand-all
                    @check-change="handleCheckChange"
                    @node-click="nodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型标签" prop="labelArr">
              <div class="inpuIcon">
                <el-select v-model="ruleForm.labelArr" multiple style="width:90%;" placeholder="请选择类型标签">
                  <el-option
                    v-for="item in labelData"
                    :key="item.label_id"
                    :label="item.label_name"
                    :value="item.label_id"
                  ></el-option>
                </el-select>
                <labelMsgAdd
                  :lableText="lableText"
                  :labelData="labelData"
                  :labelBool="labelBool"
                  @labelType="labelType"
                  @closeType="closeType"
                  @addLable="addLable"
                  @closeLable="closeLable"
                  @addTitle="addTitle"
                ></labelMsgAdd>
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

            <el-form-item :label="typeSw(this.$route.query.item_id)+'时间'" required>
              <el-col :span="10">
                <el-form-item prop="start_time">
                  <el-date-picker
                    v-model="ruleForm.start_time"
                    format="yyyy-MM-dd HH:mm"
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
                    format="yyyy-MM-dd HH:mm"
                    value-format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="colIcon">
                <el-popover placement="bottom" width="356" v-model="visibleBool">
                  <p class="visible">
                    <span>设置提醒时间</span>
                    <span class="iconAdd" @click="addTimer()">
                      <i class="el-icon-plus"></i>
                    </span>
                  </p>

                  <div class="pop" v-for="(item,index) in noticesData" :key="index">
                    <el-select v-model=" item.send_type" class="popOver" placeholder="请选择">
                      <el-option label="开始前" value="1"></el-option>
                      <el-option label="开始后" value="2"></el-option>
                      <el-option label="截止前" value="3"></el-option>
                      <el-option label="截止后" value="4"></el-option>
                    </el-select>
                    <el-input placeholder="请输入内容" v-model=" item.time" class="popInp"></el-input>
                    <el-select v-model="item.time_type" class="popTimer" placeholder="请选择">
                      <el-option label="分" value="1"></el-option>
                      <el-option label="小时" value="2"></el-option>
                      <el-option label="天" value="3"></el-option>
                    </el-select>

                    <span class="label Close" @click="closeTimer(index)"></span>
                  </div>

                  <div style="text-align: right; margin: 0">
                    <el-button type="text" @click="cancelTimer()">取消</el-button>
                    <el-button type="primary" @click="tiemr()">确定</el-button>
                  </div>

                  <span class="timeicon" slot="reference"></span>
                </el-popover>
              </el-col>
            </el-form-item>

            <el-form-item :label="typeSw(this.$route.query.item_id)+'地点'" prop="item_space">
              <el-input placeholder="请输入会议地点" v-model="ruleForm.item_space"></el-input>
            </el-form-item>

            <el-form-item :label="typeSw(this.$route.query.item_id)+'原因'" prop="item_reason">
              <el-input
                type="textarea"
                :rows="3"
                v-model="ruleForm.item_reason"
                placeholder="请输入会议原因"
              ></el-input>
            </el-form-item>

            <el-form-item :label="typeSw(this.$route.query.item_id)+'流程'" prop="item_flow">
              <el-input
                type="textarea"
                :rows="3"
                v-model="ruleForm.item_flow"
                placeholder="请输入会议流程"
              ></el-input>
            </el-form-item>

            <el-form-item label="参与人员" prop="users">
              <div class="usersBox" style="  height: 40px;">
                <span v-for="(item,index) in ruleForm.users" :key="index">
                 {{item.user_name+'/'}}

                </span>
                <el-popover
                  placement="left-start"
                  popper-class="transferDia"
                  v-model="dialogVisible"
                >
                  <el-form-item label="所属组织">
                    <el-select
                      v-model="ruleForm.organize_id"
                      placeholder="请选择组织"
                      @change="organizeChange"
                    >
                      <el-option
                        v-for="item in organArr"
                        :key="item.organize_id"
                        :label="item.organize_name"
                        :value="item.organize_id"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-transfer
                    v-model="transferValue"
                    :props="{
                        key: 'user_id',
                        label: 'user_name',
                      }"
                    :data="transferData"
                    :titles="['人员列表', '已选人员']"
                    @change="transferChange"
                  ></el-transfer>
                  <div style="width: 100%;text-align: right;margin: 30px 30px 10px 0;">
                    <el-button type="text" @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="transferBtn">确定</el-button>
                  </div>
                  <span class="iconUser" slot="reference" style="display: flex;"></span>
                </el-popover>
              </div>
            </el-form-item>

            <el-form-item :label="typeSw(this.$route.query.item_id)+'任务'" >
              <div class="usersBox" style="margin:10px;">
                <span class="iconTasks" @click="iconTasks"></span>
              </div>
              <div class="tasksBox" v-show="takesData.length > 0">
                <p v-for="(item,index) in takesData" :key="index">
                  <span class="content" v-if="item.set_bool == false">{{item.content}}</span>
                  <el-input
                    v-model="item.content"
                    type="text"
                    v-if="item.set_bool == true"
                    style="width:300px;"
                  ></el-input>
                  <span class="edit" v-if="item.set_bool == false" @click="saveShow(item,index)"></span>
                  <span class="save" v-if="item.set_bool == true" @click="editShow(item,index)">保 存</span>
                  <span class="del" @click="delShow(item,index)"></span>
                  <span class="spanDel"></span>

                  <el-popover placement="left-start" trigger="click" popper-class="transferDia">
                    <el-transfer
                      v-model="item.users"
                      :props="{
                        key: 'user_id',
                        label: 'user_name',
                      }"
                      :data="organDataAll"
                      :titles="['人员列表', '已选人员']"
                    ></el-transfer>

                    <span class="addUser" slot="reference"></span>
                  </el-popover>
                </p>
              </div>
            </el-form-item>

            <el-form-item label="归属系列">
              <el-select v-model="seriesData" multiple placeholder="请选择归属系列" style="width:100%;">
                <el-option
                  v-for="item in seriseData"
                  :key="item.series_id"
                  :label="item.series_name"
                  :value="item.series_id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="存档文件" prop="filesArr">
              <div class="inpuIcon">
                <el-select v-model="ruleForm.filesArr" multiple style="width:90%;" placeholder="请选择存档文件">
                  <el-option
                    v-for="item in filesData"
                    :key="item.archive_id"
                    :label="item.archive_name"
                    :value="item.archive_id"
                  ></el-option>
                </el-select>

                <labelMsgAdd
                  :lableText="filesText"
                  :labelData="filesData"
                  :labelBool="filesBool"
                  @labelType="showfilesBool"
                  @closeType="closeFilesBool"
                  @closeLable="delFiles"
                  @addLable="saveFiles"
                  @addTitle="addFiles"
                ></labelMsgAdd>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <p class="radioCheck">提交即发送通知 请确认内容后操作</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import labelMsgAdd from "../common/labelMsgAdd";
export default {
  components: {
    labelMsgAdd
  },
  data() {
    return {
      transferSelect: [],
      dialogVisible: false,
      transferData: [],
      transferValue: [],
      mineStatusValue: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      lableText: "类型标签管理",
      filesText: "存档文件类型管理",
      filesData: [],
      filesBool: false,
      seriesData: [],
      takesData: [],
      cancelBool: false,
      regionOptions: [],
      visibleBool: false,
      labelBool: false,

      ruleForm: {
        filesArr: [],
        mineStatus: [],
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
        zh_status: "",
        users: [],
        organize_id: "",
        labelArr: [],
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
        mineStatus: [
          { required: true, message: "请选择组织主体", trigger: "change" }
        ],
        labelArr:[{ required: true, message: "请选择类型标签", trigger: "change" }],
        filesArr:[{ required: true, message: "请选择存档文件", trigger: "change" }],
        users:[ { required: true, message: "请选择参与人员" }],
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
      seriseData: [],
      organArr: [],
      organDataAll: [],
      item_key: "",
      noticesData: [],
      transferUser_id:[]
    };
  },
  methods: {
    /* 返回系统事项 */
    callBack() {
      this.$router.push("/index/eventSummary/seriesItems");
    },

    transferBtn() {
      this.dialogVisible = false;
      this.ruleForm.users = []
      this.organDataAll.forEach(i=>{
        if(this.transferUser_id.indexOf(i.user_id)>=0){
          this.ruleForm.users.push(i);
        }
      })
    },
    organizeChange(val) {
      this.ruleForm.organize_id = val;
      this.userAll();
    },
    /* 树图只选择一个 */
    nodeClick(data, checked, node) {
      this.$refs.tree.setCheckedNodes([data]);
    },
    handleCheckChange(data, checked, node) {
      if (checked == true) {
        this.$refs.tree.setCheckedNodes([data]);
        let res = this.$refs.tree.getCheckedNodes(); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.organize_name);
          arr.push(item);
        });
        this.mineStatusValue = arr;
        this.ruleForm.mineStatus = arrLabel;
        this.ruleForm.organize_id = this.mineStatusValue[0]["organize_id"];
      }
    },
    /*归属系列*/
    async seriesMenu() {
      const res = await this.$api.details.seriesMenu();
      if (res.status == "success") {
        this.seriseData = res.data;
      }
    },
    /*参与人员*/
    /* 参与人员列表 */
    async userAll() {
      let req = {
        organize_id: this.ruleForm.organize_id
      };
      const res = await this.$api.details.organizeUserLists(req);
      if (res.status == "success") {
        this.organDataAll = this.organDataAll.concat(res.data);
        let obj = {};
        this.organDataAll = this.organDataAll.reduce((item, next) => {
          obj[next.user_id]
            ? ""
            : (obj[next.user_id] = true && item.push(next));
          return item;
        }, []);
        this.transferData = this.organDataAll;
      }
    },
    /* 删除时间提醒 */
    closeTimer(index) {
      this.noticesData.splice(index, 1);
    },
    /*取消时间提醒*/
    cancelTimer() {
      this.noticesData = [];
      this.visibleBool = false;
    },
    /*添加时间提醒*/
    addTimer() {
      let req = {
        send_type: "1",
        time: "",
        time_type: "1"
      };
      this.noticesData.push(req);
    },
    /*时间提醒确定*/
    tiemr() {
      this.visibleBool = false;
    },
    /* 类型标签 */
    async labelLists() {
      let req = {
        label_type: this.$route.query.item_id
      };
      const res = await this.$api.details.labelLists(req);
      if (res.status == "success") {
        res.data.forEach(i => {
          i.set_bool = false;
        });
        this.labelData = res.data;
      }
    },

    /* 修改标签 */
    editLabel(item) {
      item.set_bool = true;
    },
    /* 保存标签 */
    async addLable(item) {
      if (item.label_name == "") {
        this.$message("请输入标签名称");
      } else {
        const res = await this.$api.details.labelAdd(item);
        if (res.status == "success") {
          item.set_bool = false;
          this.labelLists();
          // this.ruleForm.labelArr = [];
          this.$message("标签添加成功");
        }
      }
    },
    /* 删除标签 */
    async closeLable(item, index) {
      this.labelData.splice(index, 1);
      if (item.label_id) {
        let req = {
          label_id: item.label_id
        };
        const res = await this.$api.details.labelDelete(req);
        if (res.status == "success") {
          // this.labelLists()
          this.$message("删除标签成功");
        }
      }
    },
    /* 新增标签 */
    addTitle() {
      let req = {
        label_type: this.ruleForm.item_type,
        label_name: "",
        set_bool: true
      };
      this.labelData.push(req);
    },
    /* 文件类型 */

    /* 文件标签 */
    async filesType() {
      let req = {
        archive_type: this.ruleForm.item_type,
        item_id: this.ruleForm.item_id
      };
      const res = await this.$api.details.archiveList(req);
      if (res.status == "success") {
        res.data.forEach(i => {
          i.set_bool = false;
          i.label_name = i.archive_name;
        });
        this.filesData = res.data;
      }
    },

    /* 保存文件标签 */
    async saveFiles(item) {
      if (item.label_name == "") {
        this.$message("请输入标签名称");
      } else {
        item.archive_name = item.label_name;
        const res = await this.$api.details.archiveAdd(item);
        if (res.status == "success") {
          item.set_bool = false;
          this.filesType();
          // this.ruleForm.filesArr = [];
          this.$message("标签添加成功");
        }
      }
    },
    /* 删除文件标签 */
    async delFiles(item, index) {
      this.filesData.splice(index, 1);
      if (item.archive_id) {
        let req = {
          archive_id: item.archive_id
        };
        const res = await this.$api.details.archiveDelete(req);
        if (res.status == "success") {
          // this.labelLists()
          this.$message("删除标签成功");
        }
      }
    },
    /* 新增文件标签 */
    addFiles() {
      let req = {
        archive_type: this.ruleForm.item_type,
        label_name: "",
        set_bool: true
      };
      this.filesData.push(req);
    },
    /* 会议类型 */
    typeSw(key) {
      switch (key) {
        case "1":
          return "会议";
          break;
        case "2":
          return "课程";
          break;
        case "3":
          return "活动";
          break;
        case "4":
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
        this.organArr = this.dgSubject(res.data);
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
          for (let j = 0; j < dataChild.length; j++) {
            let dataObj = {};
            dataObj.organize_id = dataChild[j].organize_id;
            dataObj.organize_name = dataChild[j].organize_name;
            dataArray.push(dataObj);
          }
        }
      }
      return dataArray;
    },

    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let item_task = JSON.parse(JSON.stringify(this.takesData));
          item_task.forEach(i => {
            i.users = i.users.join(",");
          });
          let req = {
            item_name: this.ruleForm.item_name,
            item_id: this.$route.query.item_id,
            organize_id: this.ruleForm.organize_id,
            item_label_ids: this.ruleForm.labelArr.join(','),
            article_year: this.ruleForm.article_year,
            article_sn: this.ruleForm.article_sn,
            start_time: this.ruleForm.start_time,
            end_time: this.ruleForm.end_time,
            item_space: this.ruleForm.item_space,
            item_reason: this.ruleForm.item_reason,
            item_flow: this.ruleForm.item_flow,
            item_user: this.ruleForm.users,
            item_task: item_task,
            item_series: this.seriesData.join(","),
            item_archive_ids: this.ruleForm.filesArr.join(","),
            item_notice:  this.noticesData,
          };
          this.matterDetailsAdd(req);
        }
      });
    },
    /* 添加事项 */
    async matterDetailsAdd(req) {
      const res = await this.$api.details.addItem(req);
      if (res.status == "success") {
        this.$router.go(-1);
      }
    },
    transferChange(val){
      this.transferUser_id = val
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 添加会议任务 */
    iconTasks() {
      let req = {
        set_bool: true,
        content: "",
        task_id: ""
      };
      this.takesData.push(req);
    },
    /* 显示修改任务 */
    saveShow(item, index) {
      this.takesData.splice(index, 1, {
        set_bool: true,
        content: item.content,
        task_id: item.task_id
      });
    },
    /* 修改保存 */
    editShow(item) {
      item.set_bool = false;
    },
    /* 删除任务 */
    delShow(item, index) {
      this.takesData.splice(index, 1);
    },
    labelType(val) {
      this.labelBool = val;
    },
    closeType(val) {
      this.labelBool = val;
    },
    showfilesBool(val) {
      this.filesBool = val;
    },
    closeFilesBool(val) {
      this.filesBool = val;
    }
  },
  mounted() {
    this.item_key = this.$route.query.item_id;
    this.organ();
    this.labelLists();
    this.filesType();
    this.seriesMenu();
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-checkbox__inner {
  border-radius: 50%;
}
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
    background: url("../../assets/img/details_sprites.png") -11px -10px
      no-repeat;
    cursor: pointer;
    margin-top: 14px;
  }
}

.visible {
  display: flex;
  margin-bottom: 20px;

  span {
    display: inline-block;

    &:first-child {
      height: 21px;
      font-size: 15px;
      font-weight: 600;
      color: rgba(85, 85, 85, 1);
      line-height: 21px;
      flex: 1;
    }
  }
}

.iconAdd {
  width: 25px;
  font-size: 15px;
  height: 25px;
  background: #f3f7fd;
  border-radius: 3px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #5ca7ff;
  cursor: pointer;
}

.pop {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.usersBox {
  display: flex;
  align-items: center;
  span {
    &.iconUser {
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/css_sprites.png") -145px -10px no-repeat;
    }
    &.iconTasks {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/css_sprites.png") -101px -99px no-repeat;
    }
  }
}
.tasksBox {
  width: 503px;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid rgba(229, 229, 229, 1);
  font-size: 14px;
  p {
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    height: 40px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      &.content {
        width: auto;
        height: 40px;
      }
      &.spanDel {
        flex: 1;
      }
      &.save {
        width: 38px;
        height: 25px;
        border-radius: 3px;
        text-align: center;
        line-height: 25px;
        background: rgba(243, 247, 253, 1);
        font-size: 11px;
        color: rgba(92, 167, 255, 1);
      }
      &.edit {
        background: url("../../assets/img/css_sprites.png") -55px -11px
          no-repeat;
        margin: 0 10px 0 20px;
      }
      &.del {
        background: url("../../assets/img/css_sprites.png") -146px -56px
          no-repeat;
        margin-left: 10px;
      }
      &.addUser {
        background: url("../../assets/img/css_sprites.png") -145px -10px
          no-repeat;
      }
    }
  }
}

.radioCheck {
  color: #999999;
}

.eventDeatils {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  .event-box {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    padding: 23px 28px;
    background: #f6f6f6;
    border-radius: 6px;
    position: relative;
    .backIcon {
      position: absolute;
      left: 28px;
      top: 30px;
      font-size: 14px;
      cursor: pointer;
    }
    .event-centen {
      width: 950px;
      height: auto;
      margin: 0 auto;
      .details-centen {
        background: #ffffff;
        box-sizing: border-box;
        padding: 40px 183px 40px 164px;
        .text-title {
          display: flex;
          margin-bottom: 20px;
          .title-box {
            width: 87px;
          }
          .title-conten {
            flex: 1;
            &.tasks {
              width: 100%;
              box-sizing: border-box;
              padding: 0 20px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              p {
                border-bottom: 1px solid rgba(229, 229, 229, 1);
                padding: 9px 0;
                &:last-child {
                  border-bottom: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
.routerBox {
  height: 30px;
  font-size: 22px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
  margin-bottom: 15px;
}
.label {
  width: 60px;
  margin-left: 10px;
  cursor: pointer;
  height: 25px;
  background: url("../../assets/img/css_sprites.png") no-repeat;
}

.Close {
  background-position: -146px -56px;
}
</style>
