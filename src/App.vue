<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  watch: {
    $route(to, from) {
      if (to.path == "/index/person/personMSg") {
        this.$nextTick(() => {
          this.$api.common.maxHeight("person-box", 126);
        });
      } else {
        this.$nextTick(() => {
          this.$api.common.maxHeight();
        });
      }
    }
  }
};
</script>


<style lang="scss">
html,
body,
#app {
  min-width: 1200px;
  height:100%;
  font-size: 14px;
}
* {
  padding: 0;
  margin: 0;
}

.popDel {
  h4 {
    height: 22px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-bottom: 15px;
  }
  &.el-popover {
    padding: 30px;
    min-width: 110px;
  }
}

/* 事项添加 transfer */

.transferDia{
  width: 486px;
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-transfer-panel{
    width: 100%;
  }
  .el-transfer__buttons{
    transform: rotate(90deg);
  }
  .el-transfer-panel__list{
    max-height: 246px;
  }
  .el-transfer-panel__body{
    height: auto;
    max-height: 246px;
  }
}

</style>
