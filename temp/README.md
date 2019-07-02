# webpack-config

- webpack-common.js
- webpack-dev.js
- webpack.build.js
- webpack-test.build.js
- webpack-prod.build.js

#### merge 关系

- dev merge common
- build merge common
- test & prod merge common

#### common & dev 区别

- common 里没有处理 css less scss 样式相关的处理
  - 因为 dev 环境不需要压缩
  - 把压缩放在 build 所以把样式处理分开
- common 里不写热更新，dev 里写
- common 里不写 htmlWebpackPlugin
  - 因为 dev 跟 build 里的 htmlWebpackPlugin 不一样
  - dev 里的不需要压缩。build 里的需要压缩

#### build

- 是为了给 test 跟 prod merge 用的
- 有了 css 的压缩
- cleanWebpackPlugin
- htmlWebpackPlugin 加了压缩的功能
