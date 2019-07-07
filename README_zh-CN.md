# jokes

[English](./README.md)

> 搞笑的图片或者视频合集。httsp://jokes.js.org
> 此项目非常需要你的贡献来让更多的搞笑事情上线！

[![Build Status](https://travis-ci.com/Jeff-Tian/jokes.svg?branch=master)](https://travis-ci.com/Jeff-Tian/jokes)
[![codecov](https://codecov.io/gh/Jeff-Tian/jokes/branch/master/graph/badge.svg)](https://codecov.io/gh/Jeff-Tian/jokes)
[![Git commit with emojis!](https://img.shields.io/badge/gitmoji-git%20commit%20with%20emojis!-brightgreen.svg)](https://gitmoji.js.org)

## 提交新的搞笑合集（通过合并请求）

1. 准备搞笑图片和视频
2. Fork 这个仓库
3. 给你的搞笑合集起个名字并创建相应的文件夹到 `assets/images`，比如 `assets/images/DonaldTrump`
4. **[可选]** 如果你还同时有视频资源，那么你可以再创建一个文件夹到 `/assets/videos`，比如 `assets/videos/DonaldTrump`
5. 将图片放到你刚才创建的文件夹下。图片放到 `assets/images/DonaldTrump`，视频放到 `assets/videos/DonaldTrump`
6. 提交代码并提 PR 给我
7. 我合并后，你的搞笑合集就能通过 https://jokes.js.org/DonaldTrump 访问啦！

## 本地运行

```shell
npm install
bower install

npm start
```

打开浏览器并浏览至： http://localhost:60005/

## 欢迎你的贡献

本仓库欢迎所有类型的问题反馈和合并请求。如果你要提合并请求，请保证包含了相关的测试并且所有的测试都成功通过：

```shell
npm test
```
