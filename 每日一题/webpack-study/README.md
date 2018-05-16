# webpack 初学

## Sass 简介

Sass (Syntactically Awesome StyleSheets)

Sass 是对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、 mixins、导入等众多功能， 并且完全兼容 CSS 语法。 Sass 有助于保持大型样式表结构良好， 同时也让你能够快速开始小型项目， 特别是在搭配 Compass 样式库一同使用时。

更多内容，请看 [Sass官方文档](http://sass.bootcss.com/docs/sass-reference/)

## Node-sass安装与报错

安装前提

在 Linux  deepin 环境中

- node 和 npm 安装

  - `sudo apt-get install -y nodejs npm`

- node-sass 安装

  - `sudo npm install -g node-sass`

  可能会出现以下报错

  ![](https://i.loli.net/2018/02/17/5a878e33dbf11.png)

- 解决办法：未找到什么就安装什么

  - `sudo apt-get install g++`

- 重新执行 `sudo npm install -g node-sass`

- 一般就可以成功了，如果还有其他问题，可以搜索 ：**node-sass 安装出错**，找到和你匹配的问题描述和对应的解决方案，一般可以解决问题。


## Node-sass 的使用

>  [参考文档 node-sass-git-hub](https://github.com/sass/node-sass) 
>
>  [推荐：node-sass 教程](https://www.w3cplus.com/sassguide/)

修改 css 文件名为 scss，使用以下命令讲 scss 翻译成为 css 

`node-sass style.scss style.css`

## Node-sass 的作用

### 代码格式化

右图为 sass 格式的 css 代码，使用命令`node-sass  style.scss style.css`转换以后为左图  

![](https://i.loli.net/2018/02/17/5a8832c8ea020.png)

我们发现，css 代码被格式化了

### 嵌套

![](https://i.loli.net/2018/02/17/5a8835bfc4e8d.png)

作用：使用缩进表示层叠结构

小结：

上面有几个细节需要注意

- **不可以直接引用原来的 scss 代码作为 css 代码，浏览器无法识别，造成报错**
- **使用 scss 语法的时候必须使用命令 `node-sass A.scss B.css` 翻译成对应的 css 代码。**

这里大家可能感觉很智障，难道我每一次写 scss 代码为了看预览效果都要使用这个命令转换一次吗？很鸡肋啊，能不能我在**每一次修改 scss 代码的时候自动转换成对应的 css** 呢？

答案：

搜索关键词 `node sass watch` ，此时我们在 overflow 中可以看到对应的[答案](https://stackoverflow.com/questions/34797140/using-node-sass-watch-option-with-npm-run-script)。

`node-sass A.scss B.css -w A.scss`  表示监听单文件 `A.scss` 

然后，当我们对代码进行修改的时候，它就会自动监听和转换成 css 代码

![](https://i.loli.net/2018/02/17/5a883fd1ad52d.png)

以上，就是**自动化**



> **知识拓展**
>
> scss 和 sass 的区别
>
> 含义：
>
> - sass 本是 Ruby 社区发明的为前端工程师所使用的更厉害的 css
> - scss 比 sass 更厉害的 css
>    区别：
>
> 举例：
> css代码
> ```css
> body{
>  
> }
> body p{
>  color: red;
> }
> ```
> sass 代码
> ```css
> body
> 	p
> 	color: red
> ```
> 表示的意思和上面的 ccs 代码意义是一样的，但是此时有些前端程序员表示一脸懵逼，看不懂 ？？！！
> 然后，Ruby 社区为了让 sass 代码更容易被前端程序员看懂，进行了改进
> scss 代码
> ```css
> body{
>  p{
>    color: red;
>  }
> }
> ```
> 此时，前面一脸懵逼的前端程序员表示，诶，可以看懂了耶，不就是表示在 `body` 里面的 `p` 的字体颜色设置为红色嘛
> 与 sass  的代码区别是，**加了大括号**，结构化更明显了

## Bebel 简介

[Babel 官网](https://babeljs.io/)

作用：

在一般的 js 语法中，如果使用了 `let` 等 IE 不能识别的新语法，容易造成报错，事实上，在一定的条件下进行转化，可以使用`var` 来代替`let`表达同样的意思。

此时，就有一种自动化的工具，自动的将 `let` 转化为同等意思的 `var` ，使得 IE 中可以识别和使用。  

## Babel 的安装和使用 

- `npm install --save-dev babel-cli babel-preset-env`

![](https://i.loli.net/2018/02/18/5a89810441e19.png)

- 创建 `.babelrc` 文件，往里面写入内容

- 使用 指导说明`guide` ,进入命令行接口 `CLI (command-line interface)` 

  - [安装说明](https://babeljs.io/docs/setup#installation)

  ![](https://i.loli.net/2018/02/18/5a89819e11e74.png)

  - 安装 

    - `npm install --save-dev babel-cli`

    执行代码以后发现 `package.json` 文件会多出以下代码

    ```javascript
    {
      "devDependencies": {
    +   "babel-cli": "^6.0.0"
      }
    }
    ```

  - 使用

    - 在`package.json` 中的 `scripts` 添加代码如下，**注意要在上一行添加一个逗号**
      （如果没有package.json，直接使用命令 `npm init` 创建该文件，然后再往里面添加`build` ，重新执行前面的命令）

      ```javascript
        {
          "name": "my-project",
          "version": "1.0.0",
      +   "scripts": {
            "xxx": "xxxx",
      +     "build": "babel src -d lib"
      +   },
          "devDependencies": {
            "babel-cli": "^6.0.0"
          }
        }
      ```

    - 验证

      `npm run build` 意思是执行上面代码 `babel src -d lib`

      意思和`#./node_modules/.bin/babel src -d lib`一样，因为前面的babel我们是局部安装的

    - 结果分析

      - 如果报错：可能是涉及到全局安装和局部安装的问题，解释如下
        - `npm install xxx` 局部安装xxx，可在任意文件夹下执行xxx的命令
        - `npm install -g xxx` 全局安装xxx，只可以在安装文件夹下执行xxx命令
      - `src doesn't exist`  表示 `src` 目录不存在

    - 分析 `babel src -d lib`

      - `src`  原始目录 
      - `-d` destination
      - `lib`  转换后的文件所放在的目录
      - 总体理解为，**将目录 `src` 里面的文件(IE 不能识别的js文件)转换为 `lib` (IE 可以识别的js文件)目录**  ，之前的 node-sass 我们只是尝试了一次转换一个 scss 文件 ，而 babel 可以一次执行一个 js 目录 ，更快捷**高效** 

    - `babel`的使用

      - 之前我们在 `npm init` 后在局部安装了`babel`，因此每次使用 `babel` 的时候都要带上 `babel` 所在的文件路径

      - 分析 `babel src -d lib` 时知道，我们要使用 `babel` 转换一个目录的时候，需要修改 `src` 为当前我们的 js 所在的目录，然后是对应 `lib`  所在的目录，即可完成转换

      - 单个文件或目录转换命令使用示例

        ![](https://i.loli.net/2018/02/19/5a8a2f47ca24e.png)

      - 自动转换

        [CLI-USE-DOCS](https://babeljs.io/docs/usage/cli/) 页面搜索关键词 `watch` 

        `npx babel script.js --watch --out-file script-compiled.js`

        因为 `script` 是之前我们添加的内容，此处自动转换的命令就是在上一个命令的基础上**添加了一个 `--watch`** 

        ![](https://i.loli.net/2018/02/19/5a8a346624d4b.png)

        执行完了代码以后我们发现，**下面代码没有结束标志**，说明在监听我们的 js 文件，一旦发生改变，就会自动转换。


## 小结

### 对于 Node-sass 

- 基础篇

最开始，我们 是**手动执行命令**进行单个文件翻译，显得累赘。

**学会 `--watch` 的使用以后**

使用 `node-sass` 可以**自动监听单个scss 文件** ，一旦发生改变就自动翻译成对应的  css文件

- 升级篇

同时，我们通过**自动监听  scss文件 所在的目录** ，一旦目录的任意一个 scss 文件发生改变，就自动翻译成对应的 css 文件 

此时，**后台需要一直开启 `node-sass` 监听 scss 目录** 

### 对于 Babel

- 基础篇

和 `node-sass` 一样，最开始，我们需要**手动执行命令翻译单个 js 文件**，显得累赘

**学会 `--watch` 的使用以后**

使用 `Babel` 可以**自动监听单个 js 文件**，一旦监听的 js 文件发生改变，就自动翻译到对应的 js文件中

- 升级篇

同时，我们可以**自动监听 js 文件所在的目录**，一旦目录所在的任意一个 js 文件发生改变，就翻译到对应的 js 目录中

### 实际使用

- `css,js`文件的翻译

因此 ，知道了 `node-sass` 和 `babel` 的使用后，我们在实际开发中，**都需要分别开启一个线程，用于监听 `scss` 文件和 `js` 文件的变动且自动翻译。**  

- 文件位置的变动

[watch-cli-github](https://github.com/doowb/watch-cli)

以及，我们的 `index` 文件和 图片等文件 ，需要和转换后的 `css ` 和 `js` 文件目录保持一致，此时就需要使用到其他工具，如 `watch` (搜索 关键词 `watch cli`)  

一旦我们 的文件位置发生变动，需要重新编辑对应的命令，因此以上问题的存在使得代码转换不是很方便

- 图片压缩的处理

同时，为了加快网页的加载速度，我们需要对图片进行处理 ，即在不影响图片效果的前提下对图片尽可能压缩成更小 

 此时，我们迫切的需要一个将上面的功能都集中在一起同时易于使用的工具来协助我们开发 ，由此，就有了打包工具的诞生。

## Webpack 的出现

### 在webpack 之前的打包工具

- grunt
- gulp



## webpack 的使用
### webpack 的安装

>  参考[webpack官网](https://doc.webpack-china.org/guides/getting-started)

- 清除原来存在的 `package.json`

`rm package.json`

- 初始化一个新的 `package.json` 

`npm init -y`

- 安装 webpack  

`npm install --save-dev webpack`

此时，我们打开 `package.json` 文件 ，发现其中有 

```javascript
  "devDependencies": {
    "webpack": "^3.11.0"
  }
```

**表示 webpack 安装成功**

### webpack 的配置

#### 配置 config.js 

- 创建一个 `webpack.config.js` 文件

- 填充内容

  ```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  ```

  表示**将当前目录下的 src 目录中的 `index` js 文件输出和翻译到 `dist`目录 中名字为`bundle` 的  js 文件** 

  因此，如果没有这个目录和文件我们需要创建该目录和文件

  `mkdir src`

  `cd src && touch index.js`

- 使用转换命令

  -  `node_modules/.bin/webpack`  局部使用该命令

  - 也可以使用 `npx webpack` 它会自动在当前目录下寻找名字为 `webpack` 的文件并执行

    ![](https://i.loli.net/2018/02/19/5a8aa8eb91847.png)

  -  打开 `bundle.js`  文件

    ![](https://i.loli.net/2018/02/19/5a8aaa04cf71e.png)

    ​

    我们发现里面居然有了代码 ，它明明是之前空的 `index.js` 文件所转换过来的啊，怎么 会有这么多代码？

    其实，现在**里面的代码是 `webpack` 的初始配置代码**。我们可以做一个小测试

    > 在 `index.js` 文件中输入 `alert(1)`
    >
    > 执行上述转换的命令
    >
    > 查看 dist 目录中的 bundle.js 文件 

    综上，我们就实现了使用 webpack 自动将文件拷贝到 dist 目录中。但是，还有个问题没有解决，我们没有对语法进行过翻译。


#### 配置 babel

> 搜索关键词 “`webpack babel`”  ，可以看到使用文档 [webpack-babel-loader](https://github.com/babel/babel-loader)

**此处开始一定要严格按照说明操作**

**此处开始一定要严格按照说明操作**

**此处开始一定要严格按照说明操作**

（别问我问什么这样说，说多了都是泪，一旦步骤有错，后面就是 无止尽的坑！！！）

- 在 README文件中，**进入 `7.x branch`**

![](https://i.loli.net/2018/02/20/5a8b7d282d6ed.png)

- 使用 `npm` 安装  `babel-loader`

  `npm install --save-dev babel-loader babel-core babel-preset-env webpack`

- 在 `webpack.config.js` 添加配置信息

  ```javascript
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
  ```

  配置以后代码如下， 切记在上一个大括号后面**添加一个逗号**

  ```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },    //不要遗漏此处的逗号
    module: {
  	  rules: [
  	    {
  	      test: /\.js$/,
  	      exclude: /(node_modules|bower_components)/,
  	      use: {
  	        loader: 'babel-loader',
  	        options: {
  	          presets: ['env']
  	        }
  	      }
  	    }
  	  ]
  	}
  };
  ```

- 测试  `npx webpack` 观察是否报错，如果有报错，缺少啥文件就使用`npm install`安装啥文件

- 测试语法转换 

  - 编辑 `index.js` 使用命令 `echo let a=1;alert(a) >> index,js`

  - 执行命令 `npx webpack`

    结果如图，转换成功

    ![](https://i.loli.net/2018/02/20/5a8b839bef12b.png)

    至此，使用 `webpack`  工具转换 js 语法就已经完全实现了

- babel 与 模块化

  在目录 `src` 中创建以下文件

  - module-1.js
  - module-2.js
  - app.js

而我们在使用 `app.js` 引用 `module-1.js` 和 `module-2.js`的时候，应该是将它们作文函数来引用 

- 编辑 `module-1.js`

```javascript
function fn(){
	console.log(1)
}

export default fn

```

- 编辑  `module-2.js`

```javascript
function fn(){
	console.log(2)
}

export default fn

```

- 编辑 `app.js`

```javascript
import x from './module-1.js'
import y from './module-2.js'

x()
console.log('hello')
y()
```

 此处的 x  就是对应 `module-1.js` 的 `fn` ，同理， `y` 是对应 `module-2.js` 的 `fn`

我们分别调用它们测试可以到效果，看到效果之前 ，我们需要修改 `webpack.config.js` 的配置

```javascript
const path = require('path');

module.exports = {
  entry: './src/js/app.js', //修改配置文件目录
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js/') //修改配置文件目录
  },
  module: {
	  rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env']
	        }
	      }
	    }
	  ]
	}
};
```

-  使用命令 `rm -rf dist` 删除目录中原来的 `dist` 
-  执行命令 `npx webpack` 进行转换 

![](https://i.loli.net/2018/02/20/5a8b8ba8c21ef.png)

我们发现，此时三个文件变成了一个文件

测试结果如下

![](https://i.loli.net/2018/02/20/5a8b8dc04373b.png)

成功实现 babel  和 模块化的结合

#### 配置 sass

> 搜索关键词  “webpack  sass”，查看[说明文档](https://github.com/webpack-contrib/sass-loader)

- 安装 `sass`

  `npm install sass-loader node-sass webpack --save-dev`

- 配置 `webpack.config.js`，通过文档我们 可以看到这个配置和之前我们配置的 `babel` 有相似之处，不需要完全复制。

  ```javascript
  const path = require('path');

  module.exports = {
    entry: './src/js/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/js/')
    },
    module: {
  	  rules: [
  	    {
  	      test: /\.js$/,
  	      exclude: /(node_modules|bower_components)/,
  	      use: {
  	        loader: 'babel-loader',
  	        options: {
  	          presets: ['env']
  	        }
  	      }
  	    },//此处开始为 sass 的配置信息
  	    {
          test: /\.scss$/,
  	        use: [{
  	            loader: "style-loader" // creates style nodes from JS strings
  	        }, {
  	            loader: "css-loader" // translates CSS into CommonJS
  	        }, {
  	            loader: "sass-loader" // compiles Sass to CSS
  	        }]
          }
  	  ]
  	}
  };
  ```
  验证配置是否成功 `npx webpack` 

  ![](https://i.loli.net/2018/02/20/5a8b97bcbcad1.png)

-  sass 与 模块化 


上图我们可以看到 ，没有任何 scss 文件被翻译成 css 加载进 bundle.js ，是因为我们没有在 app.js 中引入 css 

引入后文件代码如下

```javascript
import x from './module-1.js'
import y from './module-2.js'
import '../css/style.scss' //t引入scss

x()
console.log('hello')
y()
```

验证是否报错，输入 `npx webpack`，报错如下

![](https://i.loli.net/2018/02/20/5a8b998db30f5.png)

提示缺失 `style-loader`  ，那我们就安装这个文件

`npm i style-loader` 

再次验证 `npx webpack` ,发现报错

![](https://i.loli.net/2018/02/20/5a8b9a0cf082c.png)

`npm i css-loader` 然后 `npx webpack`

![](https://i.loli.net/2018/02/20/5a8b9ec70c78d.png)

此时没有报错，同时多了几个文件，可以明显的看到 `style.scss`  文件被翻译写入了 `bundle.js`  文件中

此时，我们可能会感到很奇怪，明明是 css 文件啊，怎么变成了 js 文件？？

事实上，是写入了 `bundle.js`  以字符串的形式放入一个数组中。然后在加载页面的时候使用 js 写入 `style` 中 

![](https://i.loli.net/2018/02/20/5a8c1d8abc91f.png)

此时，我们分析一下 webpack 是怎么把我们的 css 从 scss 变成 js 最后添加到 style 中的。

我们可以看 `webpack.config.js` 文件的部分代码可知

```javascript
{
        test: /\.scss$/,
	        use: [{
	            loader: "style-loader" // creates style nodes from JS strings
	        }, {
	            loader: "css-loader" // translates CSS into CommonJS
	        }, {
	            loader: "sass-loader" // compiles Sass to CSS
	        }]
        }
```

解释为：

- 如果文件中有 `.scss` 名字结尾的文件 ，先使用 `sass-loader`  转换成为 css
- 将上面转换的 css 使用 `css-loader` 翻译成  `ConmmonJs` 
- 将上面的 `js` 文件使用 `style-loader` 写入页面中的 `style` 中 



- 新的问题

  前面我们使用webpack将 scss 翻译 css ，实际上是为了使用 scss 提高我们的开发效率

  而眼前我们还有个问题没有解决，那就是**不同浏览器对新语法不兼容的问题**。

  具体可以使用工具网站对兼容性进行 [查询](https://caniuse.com/)

比如，我们的 css 中使用了新的语法 `flex` 但是旧版的 IE 以及其他浏览器没有兼容。此时，我们该怎么办？

```css
body{
	background: gray;
	display: flex;
}

```

此时，我们可以说使用 [AutoPrefixer](https://autoprefixer.github.io/) 进行转换，例如

![](https://i.loli.net/2018/02/20/5a8c25b79d80c.png)

这时我们会想，既然有这么方便的工具可以使用，是否可以添加到 webpack 进去实现自动化呢？

答案是可以的。

> 搜索关键词 "webpack autoprefixer" ，我们可以在[autoprefixer](https://github.com/passy/autoprefixer-loader) 上找到对应的配置办法

根据[说明文档](https://github.com/passy/autoprefixer-loader)，我们 可以看到（此时千万要细心看英文说明）

![](https://i.loli.net/2018/02/20/5a8c27a31a1a0.png)

意思是说当前的 `autoprefixer-loader` 为不可用，推荐使用 `postcss-loader`

此时，我们进入[postcss-loader](https://github.com/postcss/postcss-loader)

- 安装文件 

  - `npm i -D postcss-loader`

- 创建 `postcss.config.js` 并配置

  ```javascript
  module.exports = {
    parser: 'sugarss',
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      'cssnano': {}
    }
  }
  ```

- 配置 `webpack.config.js` 特别要小心，不要误点了第一个配置信息而配置错误

  ![](https://i.loli.net/2018/02/20/5a8c28d85d53d.png)

  ​

  尝试添加进  `webpack.config.js`

  ```javascript
  const path = require('path');

  module.exports = {
    entry: './src/js/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/js/')
    },
    module: {
  	  rules: [
  	    {
  	      test: /\.js$/,
  	      exclude: /(node_modules|bower_components)/,
  	      use: {
  	        loader: 'babel-loader',
  	        options: {
  	          presets: ['env']
  	        }
  	      }
  	    },
  	    {
          test: /\.scss$/,
  	        use: [{
  	            loader: "style-loader" // creates style nodes from JS strings
  	        },
  	        {
  	            loader: "css-loader" // translates CSS into CommonJS
  	        	options: { importLoaders: 1 } //添加代码
                   
              },
              { 
  	        	loader: 'postcss-loader'  //添加代码
  	        },
  	        {
  	            loader: "sass-loader" // compiles Sass to CSS
  	        }]
          }
  	  ]
  	}
  };
  ```

  报错信息如下

  ![](https://i.loli.net/2018/02/20/5a8c3192ce89f.png)

  ​

  安装 `postcss-import` 

  `npm i postcss-import`

  执行 `npx webpack`  后再次报错

  ![](https://i.loli.net/2018/02/20/5a8c322fdb925.png)

  安装 `postcss-cssnext`

  `npm i postcss-cssnext`

  执行 `npx webpack`  后再次报错

  ![](https://i.loli.net/2018/02/20/5a8c3344bc353.png)

  安装 `sugarss`

  `npm i sugarss`

  执行 `npx webpack`  后再次报错

  ![](https://i.loli.net/2018/02/20/5a8c3e3f77c57.png)

  ​

  此时，我们根据报错信息查找 对应的[解决方法](https://github.com/postcss/postcss/issues/1062)，可能是 `sugarss` 的问题，因此，我们在 config.js 删除

  ```javascript
  module.exports = {
   /* parser: 'sugarss',*/
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      'cssnano': {}
    }
  }
  ```

  再次执行 `npx webpack` ,得到如下

  ![](https://i.loli.net/2018/02/20/5a8c43a5a297e.png)

  ​​

  我们发现，此时没有报错，同时浏览器预览的 style 也显示了变化后的效果

  按照提示，我们尝试着删掉一些东西

  ```javascript
  module.exports = {
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      // 'cssnano': {}
    }
  }
  ```

  然后我们验证是否可以在使用 `flex` 的时候自动添加前缀
  在 `style.scss` 中添加代码

  ```css
  body{
    background: red;
    display: flex;
  }
  ```

  ​

  ![](https://i.loli.net/2018/02/20/5a8c438c5ff71.png)

  ​

- 以上，经过一番折腾，我们终于处理完了webpack 的配置和基本使用，看到这么多报错，尴尬癌要犯了.....




## 总结 

以上，就是一次虽然“艰难”，但是还是完成了的一次 webpack 配置。

核心知识是以下

- 所有的文件都看作是 **模块** ，使用 `export` 和 `import`  来引用
- css  翻译的原理 
  - 使用 `node-sass` 将 `scss` 翻译成 `css`
  - 不兼容的 css 语法使用 `autoprefix` 来自动添加前缀实现页兼容
  - 使用 js  将 css 写入页面中 
- js 处理的原理
  - 使用 `babel` 将 ES6 语法翻译成 ES5 ，存放在 bundle.js 中
  - 通过引入 bundle.js ，加载需要的  js











