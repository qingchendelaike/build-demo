<template>
  <div class="hello">
    <com v-if="status==1">
      <div slot="test01">

      </div>
<!--      <div slot="test01"></div>-->
<!--      <div slot="test02"></div>-->
    </com>
  </div>
</template>

<script>
  import com from './com'
  export default {
    name: '',
    data () {
      return {
        status:1,
        users:[]
      }
    },
    components:{
      com
    },
    created() {

    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
