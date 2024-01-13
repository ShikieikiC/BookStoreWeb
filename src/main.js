import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";

//用axios拦截器加请求头
axios.interceptors.request.use(config => {
	const token = sessionStorage.getItem("token");
	if (token) {
		config.headers.token = token;
	}
	return config;
});

Vue.prototype.axios = axios; //把axios配置成全局变量

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
