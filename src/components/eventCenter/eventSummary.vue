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
      <el-drawer
        :visible.sync="drawerBool"
        direction="rtl"
        custom-class="pop-drawer"
        :show-close="false"
        title="发起事项"
      >
        <router-link
          v-for="(item,index) in dataMarrts"
          tag="div"
          class="drawer-box"
          :to="item.value"
          :key="index"
        >
          <img :src="item.icon" alt />
          <span>{{item.key}}</span>
        </router-link>
      </el-drawer>

      <div @click="drawer" :class="[drawerBool==true?'drawerLeft':'drawerRight','drawer-switch']">
        <i class="el-icon-plus"></i>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      drawerBool: false,
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
      ],
      dataMarrts: [
        {
          value: "/",
          key: "会议",
          icon: require("../../assets/img/meeting.png")
        },
        {
          value: "/",
          key: "课程",
          icon: require("../../assets/img/course.png")
        },
        {
          value: "/",
          key: "活动",
          icon: require("../../assets/img/activity.png")
        },
        {
          value: "/",
          key: "项目方案",
          icon: require("../../assets/img/plan.png")
        }
      ]
    };
  },
  methods: {
    drawer() {
      this.drawerBool = !this.drawerBool;
    }
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
.main-box {
  position: relative;
  padding: 20px 35px 20px 20px;
  .drawer-switch {
    position: fixed;
    top: 99px;
    right: 0;
    width: 46px;
    height: 46px;
    z-index: 999999;
    background: linear-gradient(
      270deg,
      rgba(221, 45, 30, 1) 0%,
      rgba(248, 84, 74, 1) 100%
    );
    border-radius: 3px 0px 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    color: #fff;
    &:before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 24px solid transparent;
      border-bottom: 22px solid transparent;
      border-left: 7px solid #fff;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.drawerLeft {
  right: 200px !important;
  animation: two linear 0.15s;
}

.drawerRight {
  right: 0 !important;
  animation: two2 linear 0.2s;
}
@keyframes two {
  from {
    right: 0;
  }
  to {
    right: 200px;
  }
}

@keyframes two2 {
  from {
    right: 200px;
  }
  to {
    right: 0;
  }
}
</style>