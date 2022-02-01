// 通过 axios 处理请求
const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板列表
 * @return Pormise
 */
async function getRepoList() {
  return axios.get("https://api.github.com/orgs/Vite2-Vue3-Ts-Pinia-VueRouter-Template/repos");
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */

async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/Vite2-Vue3-Ts-Pinia-VueRouter-Template/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}