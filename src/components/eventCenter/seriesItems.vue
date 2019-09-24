<template>
  <div class="article-box">
    <!-- 头部 -->
    <div class="main-title">
      <div class="title-text">系列事项</div>
      <div v-if="num == false" @click="newNum()">
        <span class="title-ent-icon"></span>
        <span class="title-ent">进入管理模式</span>
      </div>
      <div v-if="num == true" @click="newNum()">
        <span class="title-back-icon"></span>
        <span class="title-back">退出管理模式</span>
      </div>
      <div v-if="num == true">
        <span class="title-new-icon" width="431px;" v-popover:popover @click="handleAdd"></span>
        <span class="title-new">新建系列</span>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table :data="tableData" class="tb-edit" style="width: 99%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label v-for="(item,index) in props.row.sub_item" :key="item.item_id">
              <span>{{ item.item_name }}</span>
              <span :style="{'width':num ==true?'235px':'250px'}">{{ item.time }}</span>
              <el-popover
                trigger="click"
                :ref="`matter-${index}`"
                width="301"
                placement="bottom-end"
                popper-class="popDel"
              >
                <h4>移除事项</h4>
                <p>确定移除该事项？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" @click="matterBtn(`matter-${index}`)">取消</el-button>
                  <el-button type="primary" @click="matterBtnDel(props.row,item)">确定</el-button>
                </div>
                <span class="demo-icon" slot="reference" v-if="num">
                  <i class="el-icon-minus deleteIcon" slot="reference"></i>
                </span>
              </el-popover>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="系列名称" prop="series_name">
        <template slot-scope="scope">
          <div class="clickInp">
            <el-input
              size="small"
              v-model="scope.row.series_name"
              placeholder="请输入内容"
              v-if="scope.row.isSet"
            ></el-input>
            <span v-if="scope.row.isSet == false">{{scope.row.series_name}}</span>
            <i
              v-if="num"
              :class="[scope.row.isSet == false ? 'el-icon-edit':'', 'tdEditIcon' ]"
              @click="iconEdit(scope.$index, scope.row)"
            >{{scope.row.isSet == false ? '' : '保存'}}</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="260px" prop="series_time"></el-table-column>
      <el-table-column label="操作" v-if="num" width="120px">
        <template slot-scope="scope">
          <!-- 事项添加 -->
          <i class="el-icon-plus addIcon" @click="matterAdd(scope.$index, scope.row)"></i>

          <!-- 系列删除 -->
          <el-popover
            trigger="click"
            :ref="`popover-${scope.$index}`"
            width="301"
            placement="bottom-end"
            popper-class="popDel"
          >
            <h4>移除系列</h4>
            <p>确定移除该系列？移除后与其绑定的所有事项将解绑，该操作不可恢复。</p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="text"
                @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
              >取消</el-button>
              <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
            </div>
            <i slot="reference" class="el-icon-minus deleteIcon"></i>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 系列添加 -->
    <el-popover trigger="manual" ref="popover" width="371" placement="bottom-end" v-model="visible">
      <el-form :model="addFrom" label-width="80px" style="padding:18px">
        <el-form-item label="系列名称">
          <el-input v-model="addFrom.series" placeholder="请输入系列名称"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right; margin: 0">
          <el-button type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" @click="sumHandle">提交</el-button>
        </el-form-item>
      </el-form>
    </el-popover>

    <!-- 事项添加 -->
    <el-dialog
      :modal="false"
      custom-class="transferDia"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
    >
      <el-transfer v-model="value" :data="data" :titles="['所有事项', '已选事项']"></el-transfer>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1, 4],
      dialogVisible: true,
      visible: false,
      tableData: [],
      addFrom: {
        series: ""
      },
      page: {
        page: 0,
        page_limit: 10,
        total: 0
      },
      num: false
    };
  },
  methods: {
    /* 事项添加 */
    matterAdd(index, row) {
      console.log(index, row);
    },
    /* 事项关闭 */
    matterBtn(val) {
      this.$refs[val][0].doClose();
    },
    /* 事项删除 */
    async matterBtnDel(props, item) {
      let req = {
        series_id: props.series_id,
        item_id: item.item_id
      };
      const res = await this.$api.allMatters.matterSeriesDelete(req);
      if (res.status == "success") {
        this.list();
      }
    },
    /* 系列编辑 */
    async iconEdit(index, row) {
      row.isSet = !row.isSet;
      /* 修改系统系列名称 */
      if (row.isSet == false) {
        let req = {
          series_id: row.series_id,
          series_name: row.series_name
        };
        const res = await this.$api.allMatters.seriesItemEdit(req);
        if (res.status == "success") {
          this.list();
        }
      }
    },
    /* 系列列表 */
    async list() {
      const res = await this.$api.allMatters.seriesItemLists(this.page);
      if (res.status == "success") {
        for (let i = 0; i < res.data.lists.length; i++) {
          res.data.lists[i]["isSet"] = false;
        }
        this.tableData = res.data.lists;
        this.page.total = res.data.count;
      }
    },
    //分页
    handleSizeChange(val) {
      this.page.page = val;
      this.list();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.list();
    },
    /* 是否进入管理者模式 */
    newNum() {
      this.num = !this.num;
    },
    /* 显示系列添加弹窗 */
    handleAdd() {
      this.visible = !this.visible;
    },
    /* 添加系列事项 */
    async sumHandle() {
      const res = await this.$api.allMatters.seriesItemAdd({
        series_name: this.addFrom.series
      });
      if (res.status == "success") {
        this.visible = false;
        this.addFrom.series = "";
        this.list();
      }
    },
    /* 系列删除 */
    async handleDelete(index, row) {
      const res = await this.$api.allMatters.seriesItemDelete({
        series_id: row.series_id
      });
      if (res.status == "success") {
        this.$refs[`popover-${index}`].doClose();
        this.list();
      }
    }
    /* 事项删除 */
  },
  mounted() {
    this.list();
  }
};
</script>

<style scoped lang="scss">
.tb-edit {
  margin: 19px 0 0 5px;
  /deep/ .el-table__row {
    td {
      &:hover {
        .tdEditIcon {
          display: inline;
        }
      }
    }
  }
  .clickInp {
    display: flex;
    align-items: center;
    .tdEditIcon {
      font-style: normal;
      display: none;
      cursor: pointer;
      font-size: 14px;
      color: #5ca7ff;
      margin: 0 5px;
      width: 40px;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 20px 0 20px 80px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.article-box {
  .page-box {
    margin-top: 40px;
    text-align: right;
  }

  .main-title {
    display: flex;
    div {
      &:not(:first-child) {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      &.title-text {
        font-size: 22px;
        flex: 1;
      }
      span {
        display: inline-block;
        &:first-child {
          width: 20px;
          height: 20px;
          background: url("../../assets/img/seriesItems_sprites.png") no-repeat;
          margin-right: 5px;
        }
        &.title-ent-icon {
          background-position: -13px -60px;
        }
        &.title-back-icon {
          background-position: -59px -13px;
        }
        &.title-back {
          margin-right: 10px;
        }
        &.title-new-icon {
          background-position: -11px -14px;
        }
      }
    }
  }

  .addIcon {
    cursor: pointer;
    color: #5ca7ff;
    font-size: 16px;
    margin-right: 15px;
  }
  .deleteIcon {
    cursor: pointer;
    color: #ff4001;
    font-size: 16px;
  }
  .demo-table-expand {
    &.el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
    /deep/ .el-form-item__content {
      display: flex;
      span {
        display: inline-block;
        &:first-child {
          flex: 1;
        }
        &.demo-icon {
          text-align: center;
          width: 135px;
        }
      }
    }
  }
}

</style>