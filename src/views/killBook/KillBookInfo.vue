<template>
	<el-row>
		<el-col class="killBook" :span="12">
			<!-- 放图片 -->
			<img :src="require('@/assets/' + killBook.imgSrc)" style="width: 80%" alt="" />
		</el-col>

		<el-col class="killBook" :span="12">
			<!-- 放书籍详细信息 -->
			<el-form label-width="80px">
				<el-form-item label="书籍名称">
					{{ killBook.bookName }}
				</el-form-item>

				<el-form-item label="价格">￥{{ killBook.newPrice }}</el-form-item>
				<el-form-item label="数量">
					{{ killBook.killCount }}
				</el-form-item>
				<el-button type="primary" @click="startKill">立即抢购</el-button>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data() {
		return {
			buyNum: 1,
			killBook: this.$route.query.killBook
		};
	},
	methods: {
		startKill() {
			this.axios.get("api/killBook/startKill?bookId=" + this.killBook.bookId).then(response => {
				if (response.data.code == 200) {
					this.$message.success(response.data.data);
					this.$router.push("/killBook");
				} else {
					this.$message.error(response.data.data);
				}
			});
		}
	}
};
</script>

<style scoped>
.killBook {
	float: left;
}
</style>
