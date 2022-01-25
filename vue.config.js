let path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',              // 部署应用时的根路径
    outputDir: 'dist',             // 打包项目输出路径，默认为 dist
    assetsDir: 'static',           // 用于放置生成的静态资源的路径
    indexPath: 'index.html',       // 指定生成的 index.html
    filenameHashing: true,         // 生成的静态资源在它们的文件名中是否包含 hash
    lintOnSave: false,             // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码，这个值会在 @vue/cli-plugin-eslint 被安装之后生效，默认为 true
    runtimeCompiler: false,        // 是否使用包含运行时编译器的Vue构建版本，设置为 true 后可以在Vue组件中使用 template 选项，但是这会让应用额外增加10kb左右
    productionSourceMap: false,    // 生产环境是否生成map文件
    pages: {
      index: {
        // page 的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'admin',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      // 当使用只有入口的字符串格式时，
      // 模板会被推导为 `public/subpage.html`
      // 并且如果找不到的话，就回退到 `public/index.html`。
      // 输出文件名会被推导为 `subpage.html`。
      // subpage: 'src/subpage/main.js'
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 15360 })) //小于15k的图片转换成base64编码，以内联的形式添加到文件内
    },
    css: {
        requireModuleExtension: true,
        extract: false,
        sourceMap: false,
        loaderOptions: {
            // css: {
            //     //这里的选项会传递给 css-loader
            // },
            // postcss: {
            //     //这里的选项会传递给 postcss-loader
            // }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                'views': resolve('src/views')
            }
        },
        //警告 webpack 的性能提示
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    devServer: {
        open: true, // 自动打开浏览器，也可以在package.json配置
        // host: 'http://talk.nice-6.com', //主机地址
        port: 81, //默认端口
        https: false,
        proxy: { //代理设置
            '/': { //访问路由
                //target: 'https://eportal.ttelectronicschina.com', //目标接口域名
                //target: 'http://localhost:55316',
                //target: 'https://localhost:5001',
                //target: 'http://172.21.3.18:8010',//开发（本地服务器发布）
                //target: 'http://test.forier.cn',//开发（外网服务器发布）
                target: 'https://schmeng510.com',//开发（外网服务器发布）
                //target: 'http://172.21.0.71:8031',
                secure: true, //https协议才设置
                ws: true,
                changeOrigin: true, //是否跨域
                // pathRewrite: {
                //     '^/login': '/login', //重写接口
                // },
           }
        }
        
    },
    pluginOptions: { // 第三方插件配置

    },
    // //富文本图片上传
    // dev: {
    //     // Paths
    //     assetsSubDirectory: 'static',
    //     assetsPublicPath: '/',
    //     host: 'localhost', // can be overwritten by process.env.HOST
    //     port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //     autoOpenBrowser: true,
    //     cssSourceMap: true,
    //     proxyTable: {
    //         '/api': {
    //             target: 'http://localhost:18080/', //设置调用接口域名和端口号别忘了加http
    //             changeOrigin: true,
    //             pathRewrite: {
    //             '^/api': '/' //这里理解成用‘/api'代替target里面的地址，组件中我们调接口时直接用/api代替
    //             // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add'即可 代理后地址栏显示/
    //             }
    //         },
    //         '/manager': {
    //             target: 'http://localhost:18081/',
    //             changeOrigin: true,
    //             pathRewrite: {
    //             '^/manager': '/'
    //             }
    //         }
    //     }
    // }
        
  }
