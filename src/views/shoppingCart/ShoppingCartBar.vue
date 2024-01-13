<template>
	<div>
		<el-steps :space="200" simple :active="active" finish-status="success">
			<el-step title="1. 查询购物车" />
			<el-step title="2. 确认订单信息" />
			<el-step title="3. 付款" />
			<el-step title="4. 评价" />
		</el-steps>

		<router-view @setActive="getActive" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0
		};
	},
	methods: {
		getActive(active) {
			this.active = active;
		}
	}
};
</script>

<style scoped></style>
