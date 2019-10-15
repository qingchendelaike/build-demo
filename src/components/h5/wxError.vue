<template>
  <div class="boxLogin">
    <div class="btn">
          <i class="el-icon-close" style="font-size: 25px;margin-right: 10px;"> </i>
         <p>绑定失败，请重新绑定！！！</p>
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
    color:red;
    display: flex;
    height: 25px;
    line-height: 25px;
    p{
      font-size: 16px;
    }
  }
}
</style>