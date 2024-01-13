<template>
	<el-container style="height: 100%">
		<el-header>
			<el-row>
				<el-col :span="11">
					<div class="grid-content bg-purple">
						<el-menu default-active="1" mode="horizontal" router>
							<el-menu-item index="/">首页</el-menu-item>
							<el-submenu index="2">
								<template slot="title">图书类型</template>
								<el-menu-item index="2-1">科幻</el-menu-item>
								<el-menu-item index="2-2">武侠</el-menu-item>
								<el-menu-item index="2-3">历史</el-menu-item>
								<el-menu-item index="2-4">言情</el-menu-item>
								<el-menu-item index="2-5">推理</el-menu-item>
							</el-submenu>
							<el-menu-item index="/killBook">秒杀图书</el-menu-item>
							<el-menu-item index="/shoppingCart">购物车</el-menu-item>
							<el-menu-item index="/order">我的订单</el-menu-item>
							<el-menu-item index="/item">商品管理</el-menu-item>
							<el-menu-item index="/adv">广告管理</el-menu-item>
						</el-menu>
					</div>
				</el-col>
				<el-col :span="5" :offset="0" style="margin-top: 9px">
					<div class="grid-content bg-purple-light">
						<Search />
					</div>
				</el-col>
				<el-col :span="1" :offset="2" style="margin-top: 9px">
					<el-button type="primary" @click="$router.push('/login')">登录</el-button>
				</el-col>
				<el-col :span="1" style="margin-top: 9px">
					<el-button type="warning" @click="logout">注销</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<router-view />
		</el-main>
	</el-container>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
	data() {
		return {
			input: ""
		};
	},
	components: {
		Search
	},
	methods: {
		logout() {
			this.$router.push("/login");
			sessionStorage.clear();
		}
	}
};
</script>

<style scoped></style>
