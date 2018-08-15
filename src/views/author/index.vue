<template>
    <div>
       
    </div>
    
</template>
<script>
export default {
  data() {
    return {
     
        
    };
  },
  created() {
    let url=this.Cookies.get("beforeUrl");
    this.$router.push(url);
    
  }
};
</script>

