var routes = [
    {
        path:'/',
        component:{
            template:`
            <div>
                <h1>首页</h1>
                <span>$route.params.msg</span>
            </div>
            `,
            }
        },
        {
            path:'/about',
            component:{
                template:`
                <div>
                    <h1>关于我们</h1>
                    <span>$route.params.msg</span>
                </div>
                `,
                }
            },
];

// import hei from './hei.vue'
var router = new VueRouter({
    routes : routes,
})

new Vue({
    el:'#app',
    router:router,
    methods:{
        surf:function(){
          setTimeout(()=>{
              this.$router.push('/about')
          },2000)
        }
    }
});
