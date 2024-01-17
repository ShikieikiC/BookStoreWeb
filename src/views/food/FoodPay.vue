<template>
	<div>
		<el-dialog
			title="请付款"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<span>合计：¥ {{ totalPrice }} 元</span>
			<div style="display: flex; justify-content: center">
				<el-button round @click="handleClose">取消订单</el-button>
				<el-button type="primary" round icon="el-icon-money" @click="check">付 款</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			totalPrice: this.$route.query.totalPrice,
			orderNum: this.$route.query.orderNum,
			dialogVisible: true
		};
	},
	methods: {
		check() {
			this.axios.get("api/foodOrder/queryByOrderNum?orderNum=" + this.orderNum).then(response => {
				if (response.data.data.status == 1) {
					this.pay();
				} else {
					this.$message.error("订单已超时");
					this.$router.push("/food");
				}
			});
		},
		pay() {
			this.axios
				.post("api/foodOrder/update", {
					orderNum: this.orderNum,
					status: 2
				})
				.then(() => {
					this.$message.success("付款成功");
					this.$router.push("/food");
				});
		},
		handleClose() {
			this.axios
				.post("api/foodOrder/update", {
					orderNum: this.orderNum,
					status: 3
				})
				.then(() => {
					this.$message.error("订单取消");
					this.$router.push("/food");
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
