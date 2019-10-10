<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  watch: {
    $route(to, from) {
      if (
        to.path == "/index/person/personMSg" ||
        to.path == "/index/detailsEvent"
      ) {
        let pxH = to.path == "/index/person/personMSg" ? 126 : 226;
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
  height: 100%;
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
  &.el-popover {
    padding: 20px 0;
    .el-form {
      width: 350px;
      margin: 0 auto;
    }
    .el-transfer {
      width: 350px;
      margin: 0 auto;
    }
  }
}

.labelpop {
  padding: 30px;
  box-sizing: border-box;
  width: 273px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(188, 188, 188, 0.8);
  h3 {
    margin-bottom: 22px;
  }
  .lableTis {
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    margin:18px 0 10px 0;
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
  height: auto;
  .popoverPse {
    p {
      line-height: 20px;
      margin-top: 15px !important;
      text-align: center;
      cursor: pointer;
      &:last-child {
        border-top: 1px solid #e5e5e5;
        padding: 15px;
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
.tree-com {
  /*树形控件样式修改*/
  .el-tree {
    background-color: unset;
    margin-top: 12px;
    .el-tree-node {
      position: relative;
      &.is-current>.el-tree-node__content{
        background-color: #fff;
      }
      .el-tree-node__content {
        width: 100%;
        height: 36px;
        line-height: 36px;
        .add-icon {
          color: #333;
          position: absolute;
          right: 10px;
          top: 12px;
          font-size: 12px;
        }
        .el-tree-node__expand-icon.expanded {
          /*transform: rotate(180deg);*/
        }
        .el-tree-node__expand-icon.is-leaf {
          color: transparent;
          cursor: default;
        }
      }
    }
  }
}
.el-popper {
  .pb-popover-title {
    color: #555555;
    font-size: 15px;
  }
  .el-form {
    margin-top: 20px;
    .el-button {
      width: 100px;
    }
  }
  .popover-tip{
    margin:10px 0 5px;
  }
}
.organ-page-title{
  .el-input{
    display: inline-block;
    width:200px;
    .el-input__inner{
      height: 36px;
      line-height: 36px;

    }
  }
  .el-button--mini{
    height: 36px;
    margin-left:10px;
    border: unset;
    color:#3DA8FF;
  }
}
</style>
