<template>
  <el-container class="container-box">
    <el-aside width="190px">
      <router-link
        v-for="(item,index) in indecChild"
        :to="item.path"
        :key="index"
        tag="div"
      >{{item.name}}</router-link>
    </el-aside>
    <el-main class="main-box">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      indecChild: [
        {
          path: "/index/eventSummary/allMatters",
          name: "所有事项"
        },
        {
          path: "/index/eventSummary/seriesItems",
          name: "系列事项"
        },
        {
          path: "/index/eventSummary/ieXecute",
          name: "我执行的"
        },
        {
          path: "/index/eventSummary/iLaunched",
          name: "我发起的"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container-box {
  height: 100%;
  padding: 20px;
  /deep/ .el-aside {
    height: 100%;
    background: rgba(246, 246, 246, 1);
    box-shadow: 6px 0px 5px 0px rgba(236, 236, 236, 1);
    border-radius: 3px;
    div {
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 21px;
      cursor: pointer;
      margin-bottom: 29px;
      &:first-child {
        margin-top: 26px;
      }
      &.router-link-active {
        color: #000;
      }
    }
  }
  /deep/.el-main {
    height: 100%;
    background: rgba(246, 246, 246, 1);
    border-radius: 3px;
    padding: 23px 38px 23px 30px;
  }
}
</style>