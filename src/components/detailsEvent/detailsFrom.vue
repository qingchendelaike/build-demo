<template>
  <div class="details-centen">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="typeSw(detailsData.item_type)+'名称'" prop="item_name">
        <el-input placeholder="给会议起个名字吧" v-model="ruleForm.item_name"></el-input>
      </el-form-item>
      <el-form-item label="组织主体" prop="mineStatus">
        <el-select v-model="ruleForm.mineStatus" placeholder="请选择组织主体" multiple style="width:100%;">
          <!-- //option展开高度太小，把height设置为auto就好啦 -->
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
          <!--collapse-tags -->
          <el-select v-model="ruleForm.labelArr" multiple class="selcectType" placeholder="请选择类型标签">
            <el-option
              v-for="item in labelData"
              :key="item.label_id"
              :label="item.label_name"
              :value="item.label_id"
              v-show="item.is_del == '0'"
            ></el-option>
          </el-select>

          <labelMsg
            v-if="is_special"
            :lableText="lableText"
            :labelData="labelData"
            :labelBool="labelBool"
            @labelType="labelType"
            @closeType="closeType"
            @addLable="addLable"
            @closeLable="closeLable"
            @addTitle="addTitle"
          ></labelMsg>
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

      <el-form-item :label="typeSw(detailsData.item_type)+'时间'" required>
        <el-col :span="10">
          <el-form-item prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
              format="yyyy.MM.dd HH:mm"
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
              format="yyyy.MM.dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="colIcon">
          <el-popover placement="bottom" width="356" v-model="visibleBool">
            <p class="visible">
              <span>设置提醒时间</span>
              <span class="iconAdd" @click="addTimer(ruleForm.notices)">
                <i class="el-icon-plus"></i>
              </span>
            </p>

            <div class="pop" v-for="(item,index) in noticesData" :key="index">
              <el-select v-model=" item.send_type + ''" class="popOver" placeholder="请选择">
                <el-option label="开始前" value="1"></el-option>
                <el-option label="开始后" value="2"></el-option>
                <el-option label="截止前" value="3"></el-option>
                <el-option label="截止后" value="4"></el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model.number=" item.time" class="popInp"></el-input>
              <el-select v-model="item.time_type+ ''" class="popTimer" placeholder="请选择">
                <el-option label="分钟" value="1"></el-option>
                <el-option label="小时" value="2"></el-option>
                <el-option label="天" value="3"></el-option>
              </el-select>
              <span class="label Close" @click="closeTimer(index)"></span>
            </div>

            <div style="text-align: right; margin: 0">
              <el-button type="text" @click="cancelTimer()">取消</el-button>
              <el-button type="primary" @click="tiemr(ruleForm.notices)">确定</el-button>
            </div>

            <span class="timeicon" @click="timeShow" slot="reference">
              <img style="width:100%;height:100%;" v-show="noticesData.length > 0" src="../../assets/img/icon_remind_on.png" alt="">
            </span>
          </el-popover>
        </el-col>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'地点'" prop="item_space">
        <el-input placeholder="请输入会议地点" v-model="ruleForm.item_space"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'原因'" prop="item_reason">
        <el-input type="textarea" :rows="3" v-model="ruleForm.item_reason" placeholder="请输入会议原因"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'流程'" prop="item_flow">
        <el-input type="textarea" :rows="3" v-model="ruleForm.item_flow" placeholder="请输入会议流程"></el-input>
      </el-form-item>

      <el-form-item label="参与人员" prop="users">
        <div class="usersBox">
          <!-- <span v-for="(item,index) in ruleForm.users" :key="index">{{item.user_name+'/'}}</span> -->
          <span>{{ruleForm.users | filterUser}}</span>
          <el-popover placement="left-start" popper-class="transferDia" v-model="dialogVisible">
            <el-form-item label="所属组织">
              <el-select v-model="detailsOrganize_id" placeholder="请选择组织" @change="organizeChange">
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
              <el-button type="text" @click="transferBtnClose">取消</el-button>
              <el-button type="primary" @click="transferBtn">确定</el-button>
            </div>
            <span class="iconUser" slot="reference" style="display: flex;"></span>
          </el-popover>
        </div>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'任务'">
        <div class="usersBox">
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

            <el-popover
              placement="left-start"
              popper-class="transferDia"
              trigger="click"
              :ref="`popover-${index}`"
            >
              <el-transfer
                v-model="item.users"
                :props="{
                  key: 'user_id',
                  label: 'user_name',
                }"
                :data="ruleForm.users"
                :titles="['人员列表', '已选人员']"
              ></el-transfer>
              <div style="width: 100%;text-align: right;margin: 30px 30px 10px 0;">
                <el-button type="text" @click="startPopBoolClose(`popover-${index}`)">取消</el-button>
                <el-button type="primary" @click="startPopBoolSub(`popover-${index}`)">确定</el-button>
              </div>
              <span class="addUser" @click="startClickPop" slot="reference">
                <img style="width:100%;height:100%;" v-show="item.users.length > 0" src="../../assets/img/icon_addmembers_on.png" alt="">
              </span>
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
          <el-select v-model="ruleForm.filesArr" multiple class="selcectType" placeholder="请选择存档文件">
            <el-option
              v-for="item in filesData"
              :key="item.archive_id"
              :label="item.archive_name"
              :value="item.archive_id"
              v-show="item.is_del == '0'"
            ></el-option>
          </el-select>
          <labelMsg
            v-if="is_special"
            :lableText="filesText"
            :labelData="filesData"
            :labelBool="filesBool"
            @labelType="showfilesBool"
            @closeType="closeFilesBool"
            @closeLable="delFiles"
            @addLable="saveFiles"
            @addTitle="addFiles"
          ></labelMsg>
        </div>
      </el-form-item>

      <el-form-item>
        <el-popover
          ref="popover"
          placement="top"
          title="确认取消事项？"
          width="280"
          v-model="cancelBool"
          trigger="click"
        >
          <p>将及时发送取消事项通知，请确认后操作。</p>
          <div style="text-align: right; margin: 0">
            <el-button type="text" @click="cancelBool= false">取消</el-button>
            <el-button type="primary" @click="cancelBtnDel()">确定</el-button>
          </div>
          <el-button slot="reference">取消事项</el-button>
        </el-popover>

        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-checkbox v-model="radio">
          <span class="radioCheck">发送变动通知，选中后提交即发送，请确认内容后操作</span>
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import labelMsg from "../common/labelMsg";
export default {
  components: {
    labelMsg
  },
  props: ["detailsData"],
  data() {
    return {
      detailsOrganize_id: "",
      noticesData: [],
      transferSelect: [],
      dialogVisible: false,
      transferData: [],
      transferOldData: [],
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
      radio: false,
      visibleBool: false,
      labelBool: false,
      ruleForm: {
        labelArr: [],
        mineStatus: [],
        filesArr: [],
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
        users: []
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
        labelArr: [
          { required: true, message: "请选择类型标签", trigger: "change" }
        ],
        filesArr: [
          { required: true, message: "请选择存档文件", trigger: "change" }
        ],
        users: [{ required: true, message: "请选择参与人员" }],
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
      transferUser_id: [],
      is_special: false,
      startPop: [],
      organizeValue: ""
    };
  },
  methods: {
    startPopBoolClose(val) {
      this.$refs[val][0].doClose();
      this.takesData = this.startPop;
    },
    startPopBoolSub(val) {
      this.$refs[val][0].doClose();
    },
    startClickPop() {
      this.startPop = JSON.parse(JSON.stringify(this.takesData));
    },
    transferChange(val) {
      this.transferUser_id = val;
    },
    transferBtnClose() {
      this.transferValue = this.organizeValue;
      this.dialogVisible = false;
      this.detailsOrganize_id = "";
      this.transferOldData = this.transferData = [];
    },
    transferBtn() {
      this.dialogVisible = false;
      this.ruleForm.users = [];
      this.transferData.forEach(i => {
        if (this.transferUser_id.indexOf(i.user_id) >= 0) {
          this.ruleForm.users.push(i);
        }
      });
      this.detailsOrganize_id = "";
      this.transferOldData = this.transferData = [];
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
    /*取消事项  确定按钮*/
    async cancelBtnDel() {
      let req = {
        item_id: this.ruleForm.item_id
      };
      const res = await this.$api.details.cancelItem(req);
      if (res.status == "success") {
        this.cancelBool = false;
        this.$router.go(-1);
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
      this.organizeValue = JSON.parse(JSON.stringify(this.transferValue));
      let req = {
        item_id: this.ruleForm.item_id,
        organize_id: this.detailsOrganize_id
      };
      const res = await this.$api.details.organizeUserLists(req);
      if (res.status == "success") {
        this.transferOldData = this.transferData = [];
        this.transferOldData = JSON.parse(JSON.stringify(res.data));
        res.data = res.data.concat(this.ruleForm.users);
        let resObj = {};
        this.transferData = res.data.reduce((cur, next) => {
          resObj[next.user_id]
            ? ""
            : (resObj[next.user_id] = true && cur.push(next));
          return cur;
        }, []);
      }
    },
    /* 删除时间提醒 */
    closeTimer(index) {
      this.ruleForm.notices.splice(index, 1);
    },
    timeShow() {
      this.noticesData = this.ruleForm.notices;
    },
    /*取消时间提醒*/
    cancelTimer() {
      this.noticesData = this.ruleForm.notices;
      this.visibleBool = false;
    },
    /*添加时间提醒*/
    addTimer(val) {
      let req = {
        send_type: "1",
        time: "",
        time_type: "1"
      };

      if (val.length > 0 && val[0]["notice_id"]) {
        req.notice_id = val[0]["notice_id"];
      }
      val.push(req);
      this.noticesData = val;
    },
    /*时间提醒确定*/
    tiemr(val) {
      this.ruleForm.notices = val;
      this.visibleBool = false;
    },
    /* 类型标签 */
    async labelLists() {
      let req = {
        label_type: this.ruleForm.label_type,
        item_id: this.ruleForm.item_id
      };
      const res = await this.$api.details.labelLists(req);
      if (res.status == "success") {
        res.data.forEach(i => {
          if (i.is_del == "1") {
            this.ruleForm.labelArr.push(i.label_id);
          }
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
          this.filesType()
          this.$message("删除标签成功");
        }
      }
    },
    /* 新增标签 */
    addTitle() {
      let req = {
        label_type: this.ruleForm.label_type,
        label_name: "",
        is_del: 0,
        set_bool: true
      };
      this.labelData.push(req);
    },
    /* 文件类型 */

    /* 文件标签 */
    async filesType() {
      let req = {
        archive_type: this.ruleForm.label_type,
      };
      const res = await this.$api.details.archiveList(req);
      if (res.status == "success") {
        res.data.forEach(i => {
          if (i.is_del == "1") {
            this.ruleForm.filesArr.push(i.archive_id);
          }
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
          this.$message("删除标签成功");
        }
      }
    },
    /* 新增文件标签 */
    addFiles() {
      let req = {
        archive_type: this.ruleForm.label_type,
        label_name: "",
        is_del: 0,
        set_bool: true
      };
      this.filesData.push(req);
    },

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
          let item_task = JSON.parse(JSON.stringify(this.takesData)),
            taskBool = false;
          for (let i = 0; i < item_task.length; i++) {
            if (item_task[i]["users"].length == 0) {
              taskBool = true;
              break;
            }
            item_task[i]["users"] = item_task[i]["users"].join(",");
          }
          if (taskBool) {
            this.$message("请为任务添加指定人");
            return;
          }
          let req = {
            item_name: this.ruleForm.item_name,
            item_id: this.ruleForm.item_id,
            organize_id: this.ruleForm.organize_id,
            item_label_ids: this.ruleForm.labelArr.join(","),
            article_year: this.ruleForm.article_year,
            article_sn: this.ruleForm.article_sn,
            start_time: this.ruleForm.start_time,
            item_sn: this.ruleForm.item_sn,
            end_time: this.ruleForm.end_time,
            item_space: this.ruleForm.item_space,
            item_reason: this.ruleForm.item_reason,
            item_flow: this.ruleForm.item_flow,
            item_user: this.ruleForm.users,
            item_task: item_task,
            item_series: this.seriesData.join(","),
            item_archive_ids: this.ruleForm.filesArr.join(","),
            item_notice: this.ruleForm.notices,
            is_send: this.radio
          };

          this.matterDetailsEdit(req);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 修改事项 */
    async matterDetailsEdit(req) {
      const res = await this.$api.details.editItem(req);
      if (res.status == "success") {
        this.$router.go(-1);
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 添加会议任务 */
    iconTasks() {
      let req = {
        set_bool: true,
        content: "",
        task_id: "",
        users: []
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
  filters: {
    filterUser(val) {
      let num = val.length,
        str = "";
      for (let i = 0; i < val.length; i++) {
        if (i == num - 1 || i > 6) {
          str += val[i].user_name + " 等" + num + "人";
          break;
        } else {
          str += val[i].user_name + "/";
        }
      }
      return str;
    }
  },
  watch: {
    transferValue: {
      handler(newValue, oldValue) {
        if (newValue.length < oldValue.length) {
          let c = [...newValue, ...oldValue],
            d = new Set(c),
            e = Array.from(d),
            f = [
              ...e.filter(_ => !newValue.includes(_)),
              ...e.filter(_ => !oldValue.includes(_))
            ];

          let transData = this.transferOldData.map(i => {
            return i.user_id;
          });

          if (transData.indexOf(parseInt(f.join(","))) < 0) {
            for (let i = 0; i < this.transferData.length; i++) {
              if(this.transferData[i]['user_id'] == parseInt(f.join(","))){
                 let num = this.transferData.indexOf(this.transferData[i])
                  this.transferData.splice(num,1)
                break
              }
            } 
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    let datailsObject = JSON.parse(JSON.stringify(this.detailsData));

    this.ruleForm.item_name = datailsObject.item_name;
    this.ruleForm.item_label = datailsObject.item_label;
    this.ruleForm.item_id = datailsObject.item_id;
    this.ruleForm.label_type = datailsObject.item_type;
    this.ruleForm.item_label_ids = datailsObject.item_label_ids;
    this.ruleForm.article_year = datailsObject.article_year;
    this.ruleForm.article_sn = datailsObject.article_sn;
    this.ruleForm.item_sn = datailsObject.item_sn;
    this.ruleForm.start_time = datailsObject.start_time;
    this.ruleForm.end_time = datailsObject.end_time;
    this.ruleForm.item_reason = datailsObject.item_reason;
    this.ruleForm.item_flow = datailsObject.item_flow;
    this.ruleForm.item_space = datailsObject.item_space;
    this.ruleForm.item_archive = datailsObject.item_archive;
    this.ruleForm.item_archive_ids = datailsObject.item_archive_ids;
    this.ruleForm.create_user_name = datailsObject.create_user_name;
    this.ruleForm.zh_status = datailsObject.zh_status;
    this.ruleForm.users = datailsObject.users;
    this.ruleForm.organize_name = datailsObject.organize_name;
    this.ruleForm.tasks = datailsObject.tasks;
    this.ruleForm.series = datailsObject.series;
    this.ruleForm.notices = datailsObject.notices;
    this.ruleForm.organize_id = datailsObject.organize_id;

    this.takesData = JSON.parse(JSON.stringify(this.ruleForm.tasks));
    this.ruleForm.mineStatus.push(this.ruleForm.organize_name);
    this.takesData.forEach(i => {
      i.set_bool = false;
      i.users = i.users.split(",");
      if (i.users) {
        for (let j = 0; j < i.users.length; j++) {
          i.users[j] = parseInt(i.users[j]);
        }
      }
    });

    this.ruleForm.series.forEach(i => {
      this.seriesData.push(i.series_id);
    });
    this.ruleForm.item_label_ids.split(",").forEach(i => {
      this.ruleForm.labelArr.push(parseInt(i));
    });
    this.ruleForm.item_archive_ids.split(",").forEach(i => {
      this.ruleForm.filesArr.push(parseInt(i));
    });

    this.ruleForm.users.forEach(i => {
      this.transferValue.push(i.user_id);
    });

    this.organ();
    this.labelLists();
    this.filesType();
    this.seriesMenu();
    this.is_special = this.$api.common.user().is_special;
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
  .selcectType {
    flex: 1;
  }
  span {
    display: inline-block;
    width: 50px;
    text-align: right;
    height: 25px;
    /* background: url("../../assets/img/details_sprites.png") no-repeat;

    /* &.icon {
      background-position: -56px -10px;
      cursor: pointer;
    } */
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
  height: 40px;
  align-items: center;
  span {
    &.iconUser {
      margin-left: 30px;
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

.radioCheck {
  color: #999999;
}
</style>
