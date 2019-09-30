<template>
  <div class="details-centen">
    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}名称</div>
      <div class="title-conten">{{detailsData.item_name}}</div>
    </div>
    <div class="text-title">
      <div class="title-box">组织主体</div>
      <div class="title-conten">{{detailsData.organize_name}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">类型标签</div>
      <div class="title-conten">{{detailsData.item_type | typeSw}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">发文文号</div>
      <div class="title-conten">粤时代司党（{{detailsData.article_year}}）{{detailsData.article_sn}}号</div>
    </div>

    <div class="text-title">
      <div class="title-box">发文编号</div>
      <div class="title-conten">{{detailsData.item_sn}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}时间</div>
      <div class="title-conten">{{detailsData.start_time}} - {{detailsData.end_time}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}地点</div>
      <div class="title-conten">{{detailsData.item_space}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}原因</div>
      <div class="title-conten">{{detailsData.item_reason}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}流程</div>
      <div class="title-conten">{{detailsData.item_flow}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">参与人员</div>
      <div class="title-conten">{{detailsData.users}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">{{detailsData.item_type | typeSw}}任务</div>
      <div class="title-conten tasks" v-show="detailsTasks.length > 0">
        <p v-for="(item,index) in detailsData.tasks" :key="index">{{item.content}}</p>
      </div>
    </div>

    <div class="text-title">
      <div class="title-box">归属系列</div>
      <div class="title-conten">{{detailsData.series}}</div>
    </div>

    <div class="text-title">
      <div class="title-box">存档文件</div>
      <div class="title-conten">{{detailsData.item_archive}}</div>
    </div>

    <div v-if="detailsData.item_status == 3 || detailsData.item_status == 4">
      <div class="text-title" v-if="detailsData.is_self || detailsData.is_special" >
        <div class="title-box">事项备注</div>
        <div class="title-conten">
          <el-input type="textarea" :rows="3" placeholder="如有特殊情况说明，可添加事项备注" v-model="textarea"></el-input>
        </div>
      </div>
    </div>
    <div class="text-title" v-if="detailsData.item_status == 5 || detailsData.is_special">
      <div class="title-box"></div>
      <div class="title-conten">
        <el-popover placement="top" width="340" height="185" v-model="visible">
          <h3>确认彻底删除？</h3>
          <p>彻底删除事项将同步删除其下所有文件与关联内容，该操作不可恢复。</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="delDetauls">确定</el-button>
          </div>
          <el-button slot="reference" type="primary">彻底删除</el-button>
        </el-popover>
      </div>
    </div>

    <div v-if="detailsData.item_status == 3 || detailsData.item_status == 4">
    <div class="text-title"  v-if="detailsData.is_self || detailsData.is_special">
      <div class="title-box"></div>
      <div class="title-conten">
        <el-button type="primary" @click="threeSum">提交</el-button>
        <p style="color:rgba(153,153,153,1);margin-top: 20px;">事项已办结，如有特殊说明，可添加事项备注</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["detailsData", "detailsTasks"],
        data() {
            return {
                detailsType: "",
                visible: false,
                textarea: "",
            };
        },
        methods: {
            /* 提交备注 */
            threeSum() {
                let req = {
                    item_id: this.detailsData.item_id,
                    item_remark: this.textarea
                };
                this.$emit("threeSum", req);
            },
            /* 删除 */
            delDetauls() {
                let req = {
                    item_id: this.detailsData.item_id
                };
                this.$emit("threeSum", req);
            },
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
        },
        filters: {
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
            }
        },
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

          .statusThree {
            height: 17px;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
            margin-top: 20px;
          }
        }
      }
    }

    .status {
      margin: 15px 0 10px 0;

      span {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }

</style>
