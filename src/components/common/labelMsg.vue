<template>
  <el-popover placement="bottom" trigger="manual" popper-class="labelpop" v-model="labelBool">
    <h3>{{lableText}}</h3>
    <div
      v-for="(item,index) in labelData"
      :key="index"
      class="labelBox"
      v-show="item.is_del == '0'"
    >
      <span class="labelTitle" v-show="item.set_bool == false">{{item.label_name}}</span>
      <el-input v-model="item.label_name" v-show="item.set_bool" style="width: 150px;height: 36px;"></el-input>
      <!-- <span class="label Edit" v-show="item.set_bool == false" @click="editLabel(item)"></span> -->
      <span class="label Add" v-show="item.set_bool" @click="addLable(item)">保存</span>
      <span class="label Close" @click="closeLable(item,index)"></span>
    </div>
    <p class="labelP" @click="addTitle">
      <span class="iconAdd">
        <i class="el-icon-plus"></i>
      </span>
      <span class="iconAddTitle">新增标签</span>
    </p>
    <p class="lableTis">删除或修改类型名称不影响已归属其下的会议，请谨慎操作</p>
    <div style="text-align: right; margin: 0">
      <el-button type="text" @click="closeType">取消</el-button>
      <el-button type="primary" @click="closeType">确定</el-button>
    </div>
    <span slot="reference" class="icon" @click="labelType"></span>
  </el-popover>
</template>


<script>
export default {
  props: ["labelData", "labelBool","lableText"],
  data() {
    return {};
  },
  methods: {
    editLabel(item) {
      this.$emit("editLabel", item);
    },
    addLable(item) {
      console.log(item)
      this.$emit("addLable", item);
    },
    closeLable(item, index) {
      this.$emit("closeLable", item, index);
    },
    addTitle() {
      this.$emit("addTitle");
    },
    labelType() {
      this.$emit("labelType", true);
    },
    closeType() {
      this.$emit("closeType", false);
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
span {
  &.icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url("../../assets/img/details_sprites.png") no-repeat;
    background-position: -56px -10px;
    cursor: pointer;
  }
}

.labelBox {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 17px;

  span {
    cursor: pointer;
    &.label {
      width: 25px;
      height: 25px;
      background: url("../../assets/img/css_sprites.png") no-repeat;
    }

    &.Edit {
      margin-right: 10px;
      background-position: -55px -11px;
    }

    &.Close {
      background-position: -146px -56px;
    }

    &.Add {
      text-align: center;
      width: 38px;
      height: 25px;
      background: rgba(243, 247, 253, 1);
      border-radius: 3px;
      line-height: 25px;
      font-size: 11px;
      margin: 0 10px;
    }

    &.labelTitle {
      line-height: 36px;
      width: 160px;
      height: 36px;
    }

    &.Add {
      color: #5ca7ff;
    }
  }
}

.labelP {
  display: flex;
  .iconAddTitle {
    height: 21px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(85, 85, 85, 1);
    line-height: 21px;
    margin-left: 11px;
  }
  
.iconAdd {
  width: 25px;
  font-size: 15px;
  height: 25px;
  background: #f3f7fd;
  border-radius: 3px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #5ca7ff;
  cursor: pointer;
}
}


</style>