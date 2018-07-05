<template>
    <ul>
        <!-- <li>
            <router-link :to="{name:'helloworld',params:{earthmsg:'你好世界'}}">hello world</router-link>
        </li>
        <li>
            <router-link :to="{name:'heihei',params:{worldmsg:'嘿嘿'}}">hei</router-link>
        </li>         -->
        <li>
            <router-link :to="{path:'/hello',query:{earthmsg:'你好世界'}}">hello world</router-link>
        </li>
        <li>
            <router-link :to="{path:'/heihei',query:{worldmsg:'嘿嘿'}}">hei</router-link>
        </li>         
    </ul>
</template>
<script>
export default {
    name:'list',
}
</script>
<style scoped>
    
</style>
