<template>
	<el-input-number
		v-model="num"
		controls-position="right"
		:min="1"
		:max="99"
	></el-input-number>
</template>
<script>
export default {
	data() {
		return {
			num: 1,
		};
	},
};
</script>
<style lang="scss" scoped></style>
