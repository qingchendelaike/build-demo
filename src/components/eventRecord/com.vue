<template>
  <div class="hello">
       <div class="com">
         <slot name="test01">test01</slot>
         <slot name="test02">test02</slot>
         <slot name="test03">test03</slot>
       </div>
  </div>
</template>

<script>

  export default {
    name: '',
    data () {
      return {
        users:[]
      }
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
