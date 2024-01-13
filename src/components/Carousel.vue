<template>
	<el-carousel height="250px">
		<el-carousel-item v-for="img in imgs" :key="img">
			<img :src="require(`@/assets/${img}`)" />
		</el-carousel-item>
	</el-carousel>
</template>

<script>
export default {
	data() {
		return {
			imgs: ["11.jpg", "22.jpg", "33.jpg"]
		};
	}
};
</script>

<style scoped>
img {
	width: 100%;
}
</style>
