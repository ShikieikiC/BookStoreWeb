const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			"/api": {
				//1：api开头的请求都要求代理服务器进行转发
				target: "http://127.0.0.1:8081", // 2：代理服务器的目标（即后端
				changeOrigin: true, // 3：是否是跨域请求
				pathRewrite: {
					"^/api": "/", // 4：代理服务器转发时url修改的规则
				},
			},
		},
	},
});
