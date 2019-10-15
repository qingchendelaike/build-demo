<template>
  <div class="boxLogin">
    <div class="btn">
         <i class="el-icon-check"  style="font-size: 25px;margin-right: 10px;color:red;"> </i>
         <p>绑定成功，请后续留意本号消息通知</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.boxLogin {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
     display: flex;
    height: 25px;
    line-height: 25px;
    p{
      font-size: 16px;
    }
  }
}
</style>