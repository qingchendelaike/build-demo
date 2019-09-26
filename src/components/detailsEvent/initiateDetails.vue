<template>
  <div class="event-centen">
    <details-tip
      v-if="detailsData.item_status == 3 || detailsData.item_status == 5"
      :detailsData="detailsData"
      :detailsTasks="detailsTasks"
      @delDetauls="delDetauls"
      @threeSum="threeSum"
    ></details-tip>
    <detailsFrom
      v-if="detailsData.item_status == 1 || detailsData.item_status == 2"
      :detailsData="detailsData"
    ></detailsFrom>
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
