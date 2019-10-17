<template>
    <div class="imgBox">
        <div>
        <img src="../assets/img/404.png" alt="">
        <p>您没有这个页面权限或网络错误 
            <router-link tag="a" to="/">返回登录页,重新登录</router-link>
        </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.imgBox{
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    p{
        width: 100%;
        text-align: center;
    }
}
</style>