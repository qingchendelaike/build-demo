<template>
  <el-container class="container-box">
    <el-aside width="190px">
      <router-link
        v-for="(item,index) in indecChild"
        :to="item.url"
        :key="index"
        v-show="item.show_menu == true"
        tag="div"
      >
        <span :class="[$route.path.indexOf(item.url)>-1 ? item.icon[1]:'',item.icon[0]]"></span>
        
        {{item.power_name}}
      </router-link>
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
          :to="item.value+'?item_id='+item.id"
          :key="index"
        >
          <img :src="item.icon" alt />
          <span>{{item.key}}</span>
        </router-link>
      </el-drawer>

      <div @click="drawer" :class="[drawerBool==true?'drawerLeft':'drawerRight','drawer-switch']">
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      drawerBool: false,
      indecChild: [],
      dataMarrts: [
        {
          value: "/index/eventSummary/launchFrom",
          key: "会议",
          id: 1,
          icon: require("../../assets/img/meeting.png")
        },
        {
          value: "/index/eventSummary/launchFrom",
          key: "课程",
          id: 2,
          icon: require("../../assets/img/course.png")
        },
        {
          value: "/index/eventSummary/launchFrom",
          key: "活动",
          id: 3,
          icon: require("../../assets/img/activity.png")
        },
        {
          value: "/index/eventSummary/launchFrom",
          key: "项目",
          id: 4,
          icon: require("../../assets/img/plan.png")
        }
      ]
    };
  },
  methods: {
    drawer() {
      this.drawerBool = !this.drawerBool;
    }
  },
  mounted() {
    this.indecChild = this.$api.common.user().userpower_lists[1][
      "sub_power"
    ][0]["sub_power"];
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
      display: flex;
      justify-content: center;
      font-size: 15px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 21px;
      cursor: pointer;
      margin-top: 29px;
      &:first-child {
        margin-top: 26px;
      }
      &.router-link-active {
        color: #000;
      }
      span {
        display: inline-block;
        width: 19px;
        height: 19px;
        margin-right: 11px;
        /* 所有事项 */
        &.matters {
          background: url("../../assets/img/navslide_sprites.png") -142px -73px
            no-repeat;
        }
        &.selectMatters {
          background: url("../../assets/img/navslide_sprites.png") -109px -40px
            no-repeat;
        }
        /* 系列事项 */
        &.seriesItems {
          background: url("../../assets/img/navslide_sprites.png") -110px -6px
            no-repeat;
        }
        &.selectSeriesItems {
          background: url("../../assets/img/navslide_sprites.png") -7px -76px
            no-repeat;
        }

        /* 我发起的 */
        &.launched {
          background: url("../../assets/img/navslide_sprites.png") -7px -6px
            no-repeat;
        }
        &.selectLaunched {
          background: url("../../assets/img/navslide_sprites.png") -42px -6px
            no-repeat;
        }

        /* 我执行的 */
        &.eXecute {
          background: url("../../assets/img/navslide_sprites.png") -40px -40px
            no-repeat;
        }
        &.selectEXecute {
          background: url("../../assets/img/navslide_sprites.png") -76px -6px
            no-repeat;
        }
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
  padding: 20px 35px 20px 15px;
  margin-left: 5px;
  background: #f6f6f6;
  .drawer-switch {
    position: fixed;
    top: 99px;
    right: 0;
    width: 46px;
    height: 46px;
    z-index: 999999;
    background: url("../../assets/img/additem.png") 100% 100% no-repeat;
    border-radius: 3px 0px 0px 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    // color: #fff;
    /* &:before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 24px solid transparent;
      border-bottom: 22px solid transparent;
      border-left: 7px solid #fff;
      position: absolute;
      top: 0;
      left: 0;
    } */
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