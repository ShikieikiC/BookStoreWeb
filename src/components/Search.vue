<template>
	<div>
		<el-input
			placeholder="请输入内容"
			v-model="input"
			clearable
			style="width: 70%"
		></el-input>
		<el-button type="primary" icon="el-icon-search"></el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			input: "",
		};
	},
};
</script>

<style lang="scss" scoped></style>
