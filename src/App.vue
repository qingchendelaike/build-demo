<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  watch: {
    $route(to, from) {
      if (to.path == "/index/person/personMSg" || to.path =='/index/detailsEvent') {
        let pxH = to.path == "/index/person/personMSg" ? 126:226
        this.$nextTick(() => {
          this.$api.common.maxHeight("person-box", pxH);
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
.transferDia {
  width: 486px;
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-transfer-panel {
    width: 100%;
  }
  .el-transfer__buttons {
    transform: rotate(90deg);
    margin-left: 36%;
  }
  .el-transfer-panel__list {
    height: auto;
    max-height: 212px;
  }
  .el-transfer-panel__body {
    height: auto;
    max-height: 212px;
  }
  .el-dialog__footer {
    width: 100%;
  }
}

/* 分页 */
.page-box {
  margin-top: 40px;
  text-align: right;
  .el-pagination button:disabled {
    background: transparent;
  }
  .el-pager li {
    background: transparent;
  }
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background: transparent;
  }
}

/* 抽屉动画 */
.pop-drawer {
  width: 200px !important;
  background: rgba(246, 246, 246, 1);
  border-radius: 6px 0px 0px 6px;
  .drawer-box {
    margin: 0 auto 20px auto;
    padding: 12px;
    width: 110px;
    height: 110px;
    box-sizing: border-box;
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 7px 0px rgba(236, 236, 236, 1);
    border-radius: 6px;
    img {
      display: block;
      width: 50px;
      height: 50px;
      margin-bottom: 15px;
    }
    span {
      height: 21px;
      font-size: 15px;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
  }
}

/* 个人信息 */
.personal {
  text-align: center;
  width: 110px;
  height: 140px;
  .popoverPse {
    p {
      line-height: 20px;
      margin-top: 15px !important;
      cursor: pointer;
      &:last-child {
        border-top: 1px solid #e5e5e5;
        padding-top: 15px;
      }
      &:first-child {
        margin-top: 0;
      }
    }
  }
  &.el-popover {
    padding: 0;
  }
}
/* 事项详情 */
.event-centen {
  /deep/ .el-tabs {
    .el-tabs__active-bar {
      background-color: transparent;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      color: #999999;
    }
    .el-tabs__item:hover {
      color: #000;
    }
    .el-tabs__item {
      &.is-active {
        color: #000;
      }
    }
  }
}
</style>
