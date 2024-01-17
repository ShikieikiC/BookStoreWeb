<template>
	<div>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:page-sizes="[5, 10, 20]"
			:page-size="pageSize"
			:current-page="pageNum"
			:total="total"
			background
			layout="sizes, prev, pager, next, total" />
	</div>
</template>

<script>
export default {
	methods: {
		handleSizeChange(pageSize) {
			this.pageSize = pageSize;
			this.pageNum = 1;
			this.$emit("handleSizeChange");
		},
		handleCurrentChange(pageNum) {
			this.pageNum = pageNum;
			this.$emit("handleCurrentChange");
		}
	},
	data() {
		return {
			pageSize: 5,
			pageNum: 1,
			total: 0
		};
	}
};
</script>

<style lang="scss" scoped></style>
