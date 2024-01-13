<template>
	<el-row type="flex" justify="center">
		<el-col :span="6" :offset="18">
			<el-form>
				<el-form-item>
					<p style="font-size: 38px">欢迎登录</p>
				</el-form-item>
				<el-form-item>
					<el-input v-model="loginform.username" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="loginform.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="login" type="primary" style="width: 100%">登录</el-button>
					<p>
						<span>忘记密码？</span>
						<router-link style="color: #409eff; text-decoration: none" to="/login">
							前往重置
						</router-link>
					</p>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data() {
		return {
			loginform: {
				username: "",
				password: ""
			}
		};
	},
	methods: {
		login() {
			this.axios.post("/api/user/login", this.loginform).then(response => {
				if (response.data.code == 200) {
					sessionStorage.setItem("token", response.data.msg);
					this.$router.push("/");
				} else {
					this.$message.error(response.data.data);
				}
			});
		}
	}
};
</script>

<style scoped>
.el-row {
	/* background: darkslategray; */
	background-image: url("@/assets/login.jpg");
	height: 100%;
}
.el-col {
	background: white;
	padding: 15% 20px;
	border-radius: 2px; /*加圆角 */
}
.el-input {
	margin: 8px 1px;
}
</style>
