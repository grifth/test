<template>
<div class="article">
    <div class="UserInfo">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="userInfomation">
            <section>
              <img :src="userinfo.avatar_url" >
              <span>{{userinfo.loginname}}</span>
              <p>
                {{userinfo.score}}积分
              </p>
              <p>
                注册时间:{{userinfo.create_at|formatDate}}
              </p>
            </section>
            <section>
                <div class="replies">
                  <p>回复的主题</p>
                    <ul>
                      <li v-for="item in userinfo.recent_replies">
                          <router-link :to="{
                            name:'post_content',
                            params:{
                              id:item.id
                            }
                          }">
                            {{item.title}}
                          </router-link>
                      </li>
                    </ul>
                </div>
                <div class="topics">
                    <p>创建的主题</p>
                    <ul>
                        <li v-for="item in userinfo.recent_topics">
                          <router-link :to="{
                            name:'post_content',
                            params:{
                              id:item.id
                            }
                          }">
                            {{item.title}}
                          </router-link>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "Article",
        data(){
            return{
                isLoading:false,
                userinfo:{}
            }
        },
        methods:{
            getArticleData(){
              this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then(res=>{
                  if(res.data.success == true){
                    this.isLoading =false;
                    this.userinfo = res.data.data;
                  }
                })
                .catch(function (err) {
                  console.log(err)
                })
            }
        },
        beforeMount(){
            this.isLoading =true;
            this.getArticleData();
        },

        }
</script>

<style >
.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 30px;
}
.userInfomation li {
  list-style:none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #DDDDDD solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.userInfomation > div >ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div >ul > li > a {
  color: #094E99;
  text-decoration: none;
}
</style>
