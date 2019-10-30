<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="item_name" label="事项" width="300px;">
        <template slot-scope="scope">
          <span @click="itemDeatils(scope.row)" style="cursor: pointer;">{{ scope.row.item_name }}</span>

          <span class="time_label" v-show="scope.row.time_label">{{ scope.row.time_label }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zh_type" label="类型"></el-table-column>
      <el-table-column prop="organize_name" label="组织主体"></el-table-column>
      <el-table-column prop="time" label="时间" width="300px;"></el-table-column>
      <el-table-column prop="zh_status" label="状态" width="120px;">
        <template slot-scope="scope">
          <span>{{ scope.row.zh_status }}</span>
          <el-popover trigger="hover" placement="bottom-end">
            <div class="popover-box">
              <p v-for="(item,index) in scope.row.tasks" :key="index">{{item}}</p>
            </div>
            <span slot="reference" class="is_task" v-if="scope.row.is_task == 1"></span>
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
export default {
  props: ["tableData", "page"],
  methods: {
    /* 事项详情 */
    itemDeatils(val) {
      this.$router.push({
        path: "/index/eventSummary/detailsEvent/initiateDetails",
        query: { item_id: val.item_id }
      });
    },
    //分页
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    /* 任务状态 */
    tableRowClassName({ row, rowIndex }) {
      if (row.zh_status == "未开始") {
        return "notBegun-row";
      } else if (row.zh_status == "进行中") {
        return "inHand-row";
      } else if (row.zh_status == "已截止") {
        return "cutOff-row";
      } else if (row.zh_status == "已办结") {
        return "completed-row";
      } else if (row.zh_status == "已取消") {
        return "cancelled-row";
      }
      return "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/table.scss";
.time_label {
  height: 16px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(221, 45, 30, 1);
  line-height: 16px;
  background: rgba(254, 235, 239, 1);
  border-radius: 3px;
  margin-left: 21px;
  padding: 2px;
}

.is_task {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: sub;
  background: url("../../assets/img/index_sprites.png") -12px -59px no-repeat;
  cursor: pointer;
}

.popover-box {
  padding: 13px;
  p {
    font-size: 13px;
    padding: 9px 11px 9px 15px;
    border: 1px solid rgba(229, 229, 229, 1);
    border-bottom: none;
    &:first-child {
      border-radius: 3px 3px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 0px 3px 3px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
  }
}
</style>