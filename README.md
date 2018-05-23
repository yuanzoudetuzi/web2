# Lora Web Project

> A Vue.js + NodeJs project which provides a web console for a Lora IoT project.

## Build Setup

``` bash
# install dependencies
npm install

# build Vue project for production, every time after you change the vue project, you should run this command to build.
npm run build

# start NodeJs server at localhost:80
sudo node app.js


config 下面的 index.js
关注 build：
    index: path.resolve(__dirname, '../views/index.html'), 生成的index.html所在地
    assetsRoot: path.resolve(__dirname, '../server/public'), 资源文件的根目录
    assetsSubDirectory: 'static', 根目录下的子文件夹

