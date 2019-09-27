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
      <el-form-item label="组织主体" prop="organize_name">
        <el-cascader
          style="width:100%;"
          v-model="ruleForm.organize_name"
          :options="organData"
          :props="{
              value:'organize_id',
              children:'sub_organization',
              label:'organize_name'
            }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="类型标签" prop="labelArr">
        <div class="inpuIcon">
          <el-select v-model="labelArr" multiple collapse-tags style="width:90%;" placeholder="请选择">
            <el-option
              v-for="item in labelData"
              :key="item.label_id"
              :label="item.label_name"
              :value="item.label_id"
            ></el-option>
          </el-select>

          <el-popover
            placement="bottom"
            width="273"
            v-model="labelBool"
          >
            <h3>类型标签管理</h3>
            <div v-for="(item,index) in labelData" :key="index" class="labelBox">
              <span class="labelTitle">{{item.label_name}}</span>
              <!-- <el-input v-model="item.label_name" style="width: 160px;height: 36px;">--></el-input>
              <!--<span class="label Edit"></span>-->
              <span class="label Add">保存</span>
              <span class="label Close"></span>

            </div>
            <p class="labelP"><span class="iconAdd"><i class="el-icon-plus"></i></span> <span
              class="iconAddTitle">新增标签</span></p>
            <span slot="reference" class="icon" @click="typeLabel"></span>
          </el-popover>


        </div>
      </el-form-item>
      <el-form-item label="发文文号">
        粤时代司党
        <el-input placeholder="发文年份" class="numberInp" v-model="ruleForm.article_year"></el-input>
        <el-input class="numberInp inp" placeholder="序号" v-model="ruleForm.article_sn"></el-input>
        号
      </el-form-item>
      <el-form-item label="发文编号" prop="item_sn">
        <el-input placeholder="请输入发文编号" v-model="ruleForm.item_sn"></el-input>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'时间'" required>
        <el-col :span="10">
          <el-form-item prop="start_time">
            <el-date-picker
              v-model="ruleForm.start_time"
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
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="colIcon">
          <el-popover
            placement="bottom"
            width="356"
            v-model="visibleBool"
          >
            <p class="visible">
              <span>设置提醒时间</span>
              <span class="iconAdd" @click="addTimer(ruleForm.notices)"><i class="el-icon-plus"></i></span>
            </p>

            <div class="pop" v-for="(item,index) in ruleForm.notices" :key="index">
              <el-select v-model="item.send_type+''" class="popOver" placeholder="请选择">
                <el-option label="开始前" value="1"></el-option>
                <el-option label="开始后" value="2"></el-option>
                <el-option label="截止前" value="3"></el-option>
                <el-option label="截止后" value="4"></el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="item.time" class="popInp">
              </el-input>
              <el-select v-model="item.time_type+''" class="popTimer" placeholder="请选择">
                <el-option label="分" value="1"></el-option>
                <el-option label="小时" value="2"></el-option>
                <el-option label="天" value="3"></el-option>
              </el-select>
            </div>

            <div style="text-align: right; margin: 0">
              <el-button type="text" @click="closeTimer()">取消</el-button>
              <el-button type="primary" @click="tiemr(ruleForm.notices)">确定</el-button>
            </div>

            <span class="timeicon" slot="reference"></span>
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
          <span>{{ruleForm.users}}</span>
          <span class="iconUser" @click="userAll"></span>
        </div>
      </el-form-item>

      <el-form-item :label="typeSw(detailsData.item_type)+'任务'" prop="desc">
        <span>{{ruleForm.tasks}}</span>
      </el-form-item>

      <el-form-item label="归属系列" prop="desc">
        <el-select placeholder="请选择归属系列" v-model="ruleForm.series" style="width:100%;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="存档文件" prop="desc">
        <div class="inpuIcon">
          <el-select placeholder="请选择活动区域" v-model="ruleForm.item_archive_ids" style="width: 90%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span class="icon"></span>
        </div>
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
                regionOptions: [],
                radio: 1,
                visibleBool: false,
                labelBool: false,
                ruleForm: {
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
                    organize_name: "",
                    zh_status: "",
                    users: ""
                },
                rules: {
                    item_name: [
                        {required: true, message: "请输入会议名称", trigger: "blur"}
                    ],
                    item_reason: [
                        {required: true, message: "请输入会议原因", trigger: "blur"}
                    ],
                    item_flow: [
                        {required: true, message: "请输入会议流程", trigger: "blur"}
                    ],
                    item_space: [
                        {required: true, message: "请输入会议地点", trigger: "blur"}
                    ],

                    organize_name: [
                        {required: true, message: "请选择活动区域", trigger: "change"}
                    ],
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
                    ],
                    /*  labelArr: [
                          {
                              type: "string",
                              required: true,
                              message: "请选择类型标签",
                              trigger: "change"
                          }
                      ]*/
                },
                organData: [],
                labelData: [],
                labelArr: []
            };
        },
        methods: {
            /*参与人员*/
            userAll(){

            },
            /*标签类型*/
            typeLabel() {

            },
            /*取消时间提醒*/
            closeTimer() {
                this.ruleForm.notices = this.detailsData.notices
                this.visibleBool = false
            },
            /*添加时间提醒*/
            addTimer(val) {
                let req = {
                    notice_id: val[0]['notice_id'],
                    send_type: '1',
                    time: '',
                    time_type: '1',
                }
                val.push(req)


            },
            /*时间提醒确定*/
            tiemr(val) {

                console.log(val)
            },
            /* 类型标签 */
            async labelLists() {
                const res = await this.$api.details.labelLists();
                if (res.status == "success") {
                    this.labelData = res.data;
                }
            },
            /* 组织主体选中值 */
            handleChange(val) {
                console.log(val, "");
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
                }
            },
            /* 提交 */
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.ruleForm = JSON.parse(JSON.stringify(this.detailsData));
            let arr = this.ruleForm.item_label.split(",");
            console.log(this.ruleForm.notices)
            arr.forEach(i => {
                this.labelArr.push(i);
            });

            this.organ();
            this.labelLists();
        }
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
      background: url("../../assets/img/details_sprites.png") -11px -10px no-repeat;
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
    color: #5CA7FF;
    cursor: pointer;
  }

  .labelP {
    display: flex;

    .iconAddTitle {
      height: 21px;
      font-size: 15px;
      font-weight: 600;
      color: rgba(85, 85, 85, 1);
      line-height: 21px;
      margin-left: 11px;
    }

  }

  .pop {
    display: flex;
    margin-bottom: 10px;
  }

  .usersBox {
    display: flex;
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
    }
  }


  .labelBox {
    box-sizing: border-box;
    padding-left: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      &.label {
        width: 25px;
        height: 25px;
        background: url("../../assets/img/css_sprites.png") no-repeat;
      }

      &.Edit {
        background-position: -55px -11px;
      }

      &.Close {
        background-position: -146px -56px;
      }

      &.Add {
        text-align: center;
        width: 38px;
        height: 25px;
        background: rgba(243, 247, 253, 1);
        border-radius: 3px;
        line-height: 25px;
        font-size: 11px;
        margin: 0 10px;
      }

      &.labelTitle {
        line-height: 36px;
        width: 160px;
        height: 36px;
      }
    }
  }
</style>
