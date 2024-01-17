<template>
	<el-input-number
		v-model="num"
		controls-position="right"
		:min="0"
		:max="99"
		@change="handleChange"></el-input-number>
</template>
<script>
export default {
	data() {
		return {
			num: 0
		};
	},
	methods: {
		handleChange(num) {
			this.num = num;
			this.$emit("handleChange");
		}
	}
};
</script>
<style lang="scss" scoped></style>
