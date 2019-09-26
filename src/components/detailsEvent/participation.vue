<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in detailsData" :key="index" :label="item.feed_name" :name="item.feed_id+''">
        <p class="status">
          <span>发起人：{{details.create_user_name}}</span>
          <span>事项状态：{{details.zh_status}}</span>
        </p>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="user_name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="account"
            label="登陆账号">
          </el-table-column>
          <el-table-column
            prop="feed_id"
            label="反馈状态">
            <template slot-scope="scope">
              <el-select :ref="scope.row.feed_id" v-if="scope.row.isSet == true" v-model="scope.row.feed_id"
                         placeholder="请选择">
                <el-option
                  v-for="item in detailsData"
                  :key="item.feed_id"
                  :label="item.feed_name"
                  :value="item.feed_id"
                ></el-option>
              </el-select>
              <span v-if="scope.row.isSet == false"> {{changeID(scope.row.feed_id)}}</span>
              <el-button @click="upSelect(scope.row,1)" v-if="scope.row.isSet == false">修改</el-button>
              <el-button @click="clSelect(scope.row,1)" v-if="scope.row.isSet == true">取消</el-button>
              <el-button @click="svSelect(scope.row,1)" v-if="scope.row.isSet == true">保存</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.more_remark != 0"
            prop="feed_remark"
            label="备注">
            <template slot-scope="scope">
              <span v-if="scope.row.isRemark == false"> {{scope.row.feed_remark}}</span>
              <el-input v-if="scope.row.isRemark == true" v-model="scope.row.feed_remark" placeholder="请输入内容"></el-input>

              <el-button @click="upSelect(scope.row,2)" v-if="scope.row.isRemark == false">修改</el-button>
              <el-button @click="clSelect(scope.row,2)" v-if="scope.row.isRemark == true">取消</el-button>
              <el-button @click="svSelect(scope.row,2)" v-if="scope.row.isRemark == true">保存</el-button>
            </template>


          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页  待封装为组件-->
    <div class="page-box" v-if="tableData.length > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.page"
        :page-sizes="[5, 10, 15]"
        :page-size="page.page_limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "participation",
        data() {
            return {
                activeName: '0',
                detailsData: [{feed_name: '未反馈', feed_id: 0, more_remark: 0, isSet: false}],
                tableData: [],
                arr: {},
                page: {
                    page: 0,
                    page_limit: 10,
                    total: 0
                },
                details:[]
            };
        },
        methods: {
            /*转换*/
            changeID(key) {
                for (let i = 0; i < this.detailsData.length; i++) {
                    if (key == this.detailsData[i]['feed_id']) {
                        return this.detailsData[i]['feed_name']
                    }
                }
            },
            /*取消*/
            clSelect(val,key) {
                if(key == 1){
                    val.isSet = false
                    val.feed_id = this.arr.feed_id
                }else{
                    val.isRemark = false
                    val.feed_remark = this.arr.feed_remark
                }
            },
            /*保存*/
            async svSelect(val,key) {
                let req = {
                    iu_id: val.iu_id,
                    feed_id: val.feed_id,
                    feed_remark:val.feed_remark
                }
                if(key == 2){
                    const res = await this.$api.details.feedbackEditRemark(req);
                    if (res.status == "success") {
                        this.feedbackLists()
                    }
                }else{

                    const res = await this.$api.details.feedbackEdit(req);
                    if (res.status == "success") {
                        this.feedbackLists()
                    }
                }

            },
            /*修改*/
            upSelect(val,key) {
                if(key == 1){
                    val.isSet = true
                }else{
                    val.isRemark = true
                }

                this.arr = JSON.parse(JSON.stringify(val))
            },
            /*切换*/
            handleClick() {
                this.feedbackLists()
            },
            //分页
            handleSizeChange(val) {
                this.page.page = val;
                this.feedbackLists();
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.feedbackLists();
            },
            /* 反馈列表*/
            async menu() {
                const res = await this.$api.details.feedbackMenu();
                if (res.status == "success") {
                    this.detailsData.push(...res.data);
                    this.feedbackLists()
                }
            },
            /* 反馈下拉 */
            async feedbackLists() {
                let req = {
                    item_id: this.$route.query.item_id,
                    feed_id: this.activeName,
                    page:this.page.page,
                    page_limit: this.page.page_limit,
                }
                const res = await this.$api.details.feedbackLists(req);
                if (res.status == "success") {
                    res.data.data.lists.forEach(v => {
                        v.isSet = false;
                        v.isRemark = false
                    });
                    this.tableData = res.data.data.lists
                    this.page.total = res.data.data.count;
                }
            },
            /* 查询事项详情 */
            async initiate() {
                let req = {
                    item_id: this.$route.query.item_id
                };
                const res = await this.$api.allMatters.matterDetails(req);
                if (res.status == "success") {
                    this.details = res.data;
                }
            }

        },
        mounted() {
            this.menu()
            this.initiate()
        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table";
  .status {
    margin: 10px 0 10px 0;
    color:rgba(85,85,85,1);
  }
</style>
