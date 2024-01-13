<template>
	<div>
		<el-dialog
			title="请付款"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<div style="display: flex; justify-content: center">
				<el-button round @click="handleClose">返 回</el-button>
				<el-button type="primary" round icon="el-icon-money" @click="pay">付 款</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderNum: this.$route.query.orderNum,
			dialogVisible: true
		};
	},
	methods: {
		pay() {
			this.axios
				.post("api/order/update", {
					orderNum: this.orderNum,
					status: 2
				})
				.then(() => {
					this.$message.success("付款成功");
					this.$router.push({
						path: "/shoppingCartAppraisal",
						query: {
							orderNum: this.orderNum
						}
					});
				});
		},
		handleClose() {
			this.$emit("setActive", 1);
			this.$router.push({
				path: "/shoppingCartConfirm",
				query: {
					orderNum: this.orderNum
				}
			});
		}
	},
	mounted() {
		this.$emit("setActive", 2);
	}
};
</script>

<style lang="scss" scoped></style>
