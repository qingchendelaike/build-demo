<template>
  <div>
    <header-event
      @onSubmitClose="onSubmitClose"
      :btn="btn"
      @pScreen="pScreen"
      :manual="manual"
      :headerTitle="headerTitle"
      @onSubmit="onSubmit"
      :loading="loading"
      :exportList="exportList"
      :exportsRouter="exportsRouter"
    ></header-event>

    <!-- 表格分页 -->
    <table-page
      :tableData="tableData"
      :page="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-page>
  </div>
</template>

<script>
import headerEvent from "../common/headerEvent";
import tablePage from "../common/tablePage";
export default {
  components: {
    headerEvent,
    tablePage
  },
  data() {
    return {
      headerTitle: "我执行的",
      tableData: [],
      loading: false,
      manual: false,
      exportList: "handleExport",
      exportsRouter: "/item/handleExport",
      btn: "确定",
      page: {
        currentPage: 1,
        total: 0,
        page_limit: 10
      },
      form: {
        item_name: "",
        item_status: "",
        start_time: "",
        end_time: "",
        organize_id: "",
        item_type: ""
      }
    };
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.page.page_limit = val;
      this.lists();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.lists();
    },

    onSubmit(val, key, btnVal) {
      this.loading = key;
      this.form = val;
      this.btn = btnVal;
      this.lists();
    },
    pScreen(key) {
      this.manual = key;
    },
    onSubmitClose(key, btnVal) {
      this.loading = this.manual = key;
      this.btn = btnVal;
    },
    /* 所有事项列表 */
    async lists() {
      let req = {
        item_name: this.form.item_name,
        organize_id: this.form.organize_id,
        item_type: this.form.item_type,
        item_status: this.form.item_status,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        page: this.page.currentPage,
        page_limit: this.page.page_limit
      };
      const res = await this.$api.allMatters.handleLists(req);
      this.loading = false;
      this.btn = "确定";
      if (res.status == "success") {
        this.manual = false;
        this.tableData = res.data.lists;
        this.page.total = res.data.count;
      }
    }
  },
  mounted() {
    this.lists();
  }
};
</script>