<template>
	<div class="block">
		<el-dialog
			title="请评价"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<Rate ref="rate" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">关 闭</el-button>
				<el-button type="primary" @click="appraise">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Rate from "@/components/Rate.vue";

export default {
	methods: {
		handleClose() {
			this.$router.push("/order");
		},
		appraise() {
			this.axios
				.post("api/order/update", {
					orderNum: this.$route.query.orderNum,
					score: this.$refs.rate.score,
					status: 5
				})
				.then(() => {
					this.$message.success("评价成功");
					this.$router.push("/order");
				});
		}
	},
	data() {
		return {
			dialogVisible: true
		};
	},
	components: {
		Rate
	},
	mounted() {
		this.$emit("setActive", 3);
	}
};
</script>
