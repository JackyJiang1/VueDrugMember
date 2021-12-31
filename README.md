<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lacy
 * @Date: 2021-02-03 14:18:00
 * @LastEditors: 
 * @LastEditTime: 2021-03-22 11:26:17
-->

## 项目安装
```
yarn
```

### 项目运行
```
yarn serve
```

### 项目打包
```
yarn build
```


### 添加依赖包
```
yarn add [package]
yarn add [package]@latest
yarn add [package]@[version]
yarn add [package]@[tag]
```

### 将依赖项添加到不同依赖项类别中
分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别中：  
```
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

### 升级依赖包
yarn upgrade 更新依赖包时package.json文件不会更新；如需更新，请使用 yarn add [package] 命令
```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

### 移除依赖包
```
yarn remove [package]
```

### 安装项目的全部依赖
```
yarn 或者 yarn install
```

### 修改镜像源
阿里旗下维护着一个完整的 npm 镜像源 https://registry.npm.taobao.org/ 同样适用于 yarn  

1.临时修改
```
yarn save [package] --registry https://registry.npm.taobao.org/
```

2.全局修改
```
yarn config set registry https://registry.npm.taobao.org/
```
