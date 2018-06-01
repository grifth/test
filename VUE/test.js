 new Vue({
     el: '#app',
     data: {
         message: 'hi',
         items: {
             "百度": "https://www.baidu.com",
             "搜狐": "https://www.sohu.com",
             "新浪": "https://www.sina.com",
             "淘宝": "https://www.taobao.com"
         }
     },
     methods: {
         reverseMessage: function() {
             this.message = this.message.split('').reverse().join('')
         }
     },
     // components: {
     //       'todo-item': {
     // template: '<li>这是个待办项</li>'
     //       }
     //     }
 })