<template>
	<el-row>
		<el-col class="killBook" :span="12">
			<img :src="require('@/assets/' + killBook.imgSrc)" style="width: 80%" alt="" />
		</el-col>

		<el-col class="killBook" :span="12">
			<el-form label-width="80px">
				<el-form-item label="书籍名称">
					{{ killBook.bookName }}
				</el-form-item>

				<el-form-item label="价格">￥{{ killBook.newPrice }}</el-form-item>
				<el-form-item label="数量">
					{{ killBook.killCount }}
				</el-form-item>
				<el-button type="primary" @click="startKill" v-loading.fullscreen.lock="fullscreenLoading">
					立即抢购
				</el-button>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data() {
		return {
			buyNum: 1,
			killBook: this.$route.query.killBook,
			fullscreenLoading: false,
			orderNum: "",
			timer: ""
		};
	},
	methods: {
		startKill() {
			this.fullscreenLoading = true;
			this.axios.get("api/killBook/startKill?bookId=" + this.killBook.bookId).then(response => {
				if (response.data.code == 200) {
					this.orderNum = response.data.data;
					this.timer = setInterval(this.queryOrder, 2000);
				} else {
					this.$message.error(response.data.data);
				}
			});
		},
		queryOrder() {
			this.axios.get("api/killOrder/queryByOrderNum?orderNum=" + this.orderNum).then(response => {
				if (response.data.data) {
					clearInterval(this.timer);
					this.fullscreenLoading = false;
					this.$message.success("抢购成功");
					this.$router.push("/killBookPay");
				}
			});
		}
	}
};
</script>

<style scoped>
.killBook {
	float: left;
}
</style>
