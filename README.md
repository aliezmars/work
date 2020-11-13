# 项目名称：
云大微监管
# 项目介绍：
本项目基于云南大学公安处对校园内违规停车不规范现象所需的管理系统的要求，同时注意到校园内存在的“僵尸车”等问题进行开发，可以进行违章行为拍照上传，学生登记自己车辆信息，查找“僵尸车”信息等功能
# 项目效果截图：
# 项目体验小程序连接：https://open.weixin.qq.com/sns/getexpappinfo?appid=wx776cb0cf8edff1f9&path=pages%2Fhome%2Fhome.html#wechat-redirect
# 项目部署教程
微信开发者工具，Node.js，Git，运行项目前请准备好这些环境
下载项目后将文件夹解压到自定义的目录下，通过微信开发者工具导入，导入时appid输入下载者自己的appid
由于用到云开发，请开发者开启云开发，并在项目选项里勾选增强编译
请将cloudfunctions目录下的login云函数安装并部署到云端依赖
请在云数据库中新建zombievehicle，vehilgals，users，stuvehicles等几个集合，保证项目正常运行。
# 开源许可证标注：


## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

