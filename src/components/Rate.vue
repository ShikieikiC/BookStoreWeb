<template>
	<div style="display: flex; justify-content: center">
		<el-rate v-model="score" :colors="colors"></el-rate>
	</div>
</template>

<script>
export default {
	data() {
		return {
			score: 0,
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
		};
	}
};
</script>

<style lang="scss" scoped></style>
