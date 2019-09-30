<template>
  <div class="event-centen">
    <p class="status">
      <span>发起人：{{detailsData.create_user_name}}</span>
      <span>事项状态：{{detailsData.zh_status}}</span>
    </p>

    <detailsFrom
      v-if="((detailsData.item_status == 1 || detailsData.item_status == 2) && detailsData.is_self) || ((detailsData.item_status == 1 || detailsData.item_status == 2) && detailsData.is_special)"
      :detailsData="detailsData"
    ></detailsFrom>

    <details-tip
      v-else-if="detailsData.item_status == 1 || detailsData.item_status == 2 || detailsData.item_status == 3 || detailsData.item_status == 5 || detailsData.item_status == 4"
      :detailsData="detailsData"
      :detailsTasks="detailsTasks"
      @delDetauls="delDetauls"
      @threeSum="threeSum"
    ></details-tip>


  </div>
</template>

<script>
import detailsTip from "./detailsTip";
import detailsFrom from "./detailsFrom";
export default {
  components: {
    detailsTip,
    detailsFrom
  },
  data() {
    return {
      visible: false,
      detailsData: {},
      detailsTasks: "",
      detailsType: ""
    };
  },
  methods: {
    /* 提交事项备注 */
    async threeSum(req) {
      const res = await this.$api.allMatters.matterDetailsRemark(req);
      if (res.status == "success") {
        this.callBack();
      }
    },
    /* 删除事项详情 */
    async delDetauls(req) {
      const res = await this.$api.allMatters.matterDetailsDel(req);
      if (res.status == "success") {
        this.callBack();
      }
    },
    /* 返回系统事项 */
    callBack() {
      this.$router.push("/index/eventSummary/seriesItems");
    },
    /* 查询事项详情 */
    async initiate() {
      let req = {
        item_id: this.$route.query.item_id
      };
      const res = await this.$api.allMatters.matterDetails(req);
      if (res.status == "success") {
        this.detailsData = res.data;
        this.detailsTasks = res.data.tasks;
      }
    }
  },
  mounted() {
    this.initiate();
  }
};
</script>

<style lang="scss" scoped>
  .status{
    margin: 30px 0 10px 0;
    span:first-child{
      margin-right: 10px;
    }
  }

</style>
