<template>
  <div class="uploadFiles">
    <div class="status">
      <span>发起人：{{detailsData.create_user_name}}</span>
      <span class="statusFlex">事项状态：{{detailsData.zh_status}}</span>
      <div v-if="detailsData.item_status == 1 || detailsData.item_status==2 || detailsData.item_status ==3">
      <el-popover
        placement="left-start"
        popper-class="transferDia"
        v-model="dialogVisible">
        <el-form :model="diaFormData" ref="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="活动名称" prop="metterName">
            <el-input v-model="diaFormData.metterName" placeholder="请填写催办事项与催办内容"></el-input>
          </el-form-item>

          <el-form-item label="搜索选项">
            <el-autocomplete
              v-model="diaFormData.name"
              :fetch-suggestions="querySearchAsync"
              placeholder="输入姓名"
              @select="handleSelect"
              style="width:100%;"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </el-form-item>
        </el-form>
        <el-transfer
          v-model="transferValue"
          :props="{
            key: 'user_id',
            label: 'user_name',
            disabled:'is_choose' == true
          }"
          :data="transferData"
          :titles="['所有事项', '已选事项']"
        ></el-transfer>
        <p v-if="diaFormData.bool" style="width: 100%;color: red;text-align: center;margin-top: 10px;">
          {{diaFormData.boolMsg}}</p>

        <div style="width: 100%;text-align: right;margin: 30px 30px 10px 0;">
          <el-button type="text" @click="closeMatter('ruleForm')">取消</el-button>
          <el-button type="primary" @click="sumMatter('ruleForm')">确定</el-button>
        </div>

        <!-- 状态为：未开始 进行中 已截止 显示-->
          <span class="statusRed"  v-if="detailsData.is_self || detailsData.is_special" slot="reference" @click="itemUserLists" >催办</span>
      </el-popover>
    </div>
    </div>

    <div class="filesBox" v-for="(item,index) in tableData" :key="index">
      <div class="meeting">
        <span>{{item.archive_name}}</span>
        <!-- 状态为：未开始 进行中 已截止 显示-->
        <div v-if="detailsData.item_status == 1 || detailsData.item_status==2 || detailsData.item_status ==3">
          <p class="upFiles" @click="upFiles($event,item)" >
            <span class="meetIcon"></span>
            <span>上传文件</span>
            <input type="file"/>
          </p>
        </div>
      </div>
      <el-table
        :data="item.file_lists"
        style="width: 100%">
        <el-table-column
          prop="file_name"
          label="文件名（点击可在线预览）"
          width="380">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="上传者"
          width="80">
        </el-table-column>
        <el-table-column
          prop="updated_at"
          label="时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- 状态为：未开始 进行中 已截止 显示-->
            <div class="operationBox" v-if="detailsData.item_status == 1 || detailsData.item_status==2 || detailsData.item_status ==3" >
              <!-- <a class="scopeIcon dow" :href="scope.row.file_url" download="w3logo" title="下载文件"></a>-->
              <span class="scopeIcon dow" @click="dow(scope.row)" title="下载文件"></span>
              <span class="scopeIcon up" title="更换文件" v-if="detailsData.item_status != 4">
                <input type="file" @change="changeFile($event,scope.row)">
              </span>
              <el-popover
                placement="bottom"
                width="230"
                v-model="visible">
                <h3>确认删除</h3>
                <p style="margin: 15px 0;">确定删除该文件？该操作不可恢复</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="del(scope.row)">确定</el-button>
                </div>
                <span slot="reference" v-if="detailsData.item_status != 4" class="scopeIcon del" title="删除文件"></span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="operationBox" v-if="detailsData.item_status == 1 || detailsData.item_status==2 || detailsData.item_status ==3" >
      <el-popover
        placement="top"
        v-model="finisVisible">
        <h3>确认办结</h3>
        <p style="margin: 15px;">确定办结该事项？请核对存档文件后操作。</p>
        <div style="text-align: right; margin: 0">
          <el-button type="text" @click="finisVisible = false">取消</el-button>
          <el-button type="primary" @click="finisMatter">确定</el-button>
        </div>
        <el-button slot="reference" style="margin-top: 30px;" type="primary" v-show="detailsData.is_special"
                   :disabled="detailsData.item_status == 4">{{detailsData.item_status == 4 ?'已办结':'办结事项'}}
        </el-button>
      </el-popover>
    </div>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                finisVisible: false,
                dialogVisible: false,
                transferValue: [],
                transferData: [],
                diaFormData: {
                    name: "",
                    metterName: '',
                    bool: false,
                    boolMsg: ''
                },
                rules: {
                    metterName: [
                        {required: true, message: '请填写催办事项与催办内容', trigger: 'blur'},
                    ],
                },
                restaurants: [],
                visible: false,
                detailsData: '',
                tableData: []
            };
        },
        methods: {
            /*催办取消*/
            closeMatter(val) {
                this.$refs[val].resetFields();
                this.dialogVisible = this.diaFormData.bool = false
                this.diaFormData.boolMsg = ""
            },
            /*催办提交*/
            sumMatter(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        if (this.transferValue.length == 0) {
                            this.diaFormData.bool = true
                            this.diaFormData.boolMsg = "请选择催办人员"
                        } else {
                            this.pushUp()
                        }
                    }
                });
            },
            async pushUp() {
                let req = {
                    item_id: this.detailsData.item_id,
                    user_ids: this.transferValue.join(','),
                    push_remark: this.diaFormData.metterName
                }
                const res = await this.$api.details.pushUp(req);
                if (res.status == "success") {
                    this.closeMatter('ruleForm')
                    this.$message('催办发送成功')
                }
            },

            /*搜索人员*/
            querySearchAsync(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString
                    ? restaurants.filter(this.createStateFilter(queryString))
                    : restaurants;
                results.forEach(i => {
                    i.value = i.user_name;
                });
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            },

            createStateFilter(queryString) {
                return state => {
                    console.log(state)
                    return (
                        state.user_name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
                    );
                };
            },
            handleSelect(item) {
                this.transferValue.push(item.user_id);
            },
            /*下载文件*/
            async dow(row) {
                const res = await this.$api.allMatters.ticket(
                    localStorage.getItem("Token")
                );
                if (res.status == "success") {
                    window.open(
                        `${window.location.protocol}//192.168.2.22:8020/item/downloadFile?download_ticket=${res.data}&file_id=${row.file_id}`
                    );
                }
            },
            async changeFile($event, row) {
                if ($event.path[0]['files'][0]) {
                    let formdata = new FormData();
                    formdata.append("file", $event.path[0]['files'][0]);
                    formdata.append("file_id", row.file_id);
                    const res = await this.$api.details.changeFile(formdata);
                    if (res.status == "success") {
                        this.fileLists()
                    }

                }
            },
            /*删除文件*/
            async del(row) {
                let req = {
                    file_id: row.file_id
                }
                const res = await this.$api.details.delFile(req);
                if (res.status == "success") {
                    this.fileLists()
                }
            },
            /* 查询事项详情 */
            async initiate() {
                let req = {
                    item_id: this.$route.query.item_id
                };
                const res = await this.$api.allMatters.matterDetails(req);
                if (res.status == "success") {
                    this.detailsData = res.data;
                }
            },
            /*上传文件*/
            async upFiles($event, item) {
                if ($event.path[0]['files'][0]) {
                    let formdata = new FormData();
                    formdata.append("file", $event.path[0]['files'][0]);
                    formdata.append("item_id", this.detailsData.item_id);
                    formdata.append("archive_id", item.archive_id);
                    const res = await this.$api.details.ploadFile(formdata);
                    if (res.status == "success") {
                        this.fileLists()
                    }
                }
            },
            /*文件列表*/
            async fileLists() {
                let req = {
                    item_id: this.$route.query.item_id
                }
                const res = await this.$api.details.fileLists(req);
                if (res.status == "success") {
                    this.tableData = res.data.data
                }
            }
            ,
            /* 参与人员 */
            async itemUserLists() {
                let req = {
                    item_id: this.$route.query.item_id,
                }
                const res = await this.$api.details.itemUserLists(req);
                if (res.status == "success") {
                    this.transferData = this.restaurants = res.data;
                }
            },
            /*事项完结*/
            async finisMatter() {
                let req = {
                    item_id: this.$route.query.item_id,
                }
                const res = await this.$api.details.finishItem(req);
                if (res.status == "success") {
                    this.finisVisible = false
                    this.initiate()
                }
            },

        },
        mounted() {
            this.initiate()
            this.fileLists()
        }
    };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/table";

  .uploadFiles {
    .status {
      margin: 10px 0 10px 0;
      color: rgba(85, 85, 85, 1);
      height: 25px;
      display: flex;
      align-content: center;

      .statusFlex {
        flex: 1;
        padding-left: 20px;
      }
    }

    .el-table {
      margin-top: 10px;
      margin-left: 0;
    }

    .meeting {
      display: flex;
      height: 22px;
      line-height: 22px;
      align-items: center;
      font-weight: 400;
      color: rgba(103, 87, 87, 1);

      span {
        display: inline-block;

        &:first-child {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: rgba(85, 85, 85, 1);
        }
      }

      .upFiles {
        display: flex;
        align-items: center;
        position: relative;

        .meetIcon {
          width: 20px;
          height: 20px;
          background: url("../../assets/img/css_sprites.png") -183px -78px no-repeat;
        }

        input {
          position: absolute;
          width: 76px;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }

    }
  }

  .statusRed {
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #ff4001;
    border-radius: 3px;
    color: #fff;
  }

  .operationBox {
    display: flex;
    align-items: center;

    span {
      cursor: pointer;

      &.scopeIcon {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url("../../assets/img/css_sprites.png") no-repeat;
      }

      &.dow {
        background-position: -10px -10px;
      }

      &.up {
        background-position: -100px -55px;
        margin: 0 30px;

        input {
          width: 25px;
          opacity: 0;
        }
      }

      &.del {
        background-position: -145px -55px;
      }
    }
  }
</style>
