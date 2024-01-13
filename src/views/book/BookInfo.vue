<template>
	<div>
		<el-row>
			<el-col :span="7">
				<img :src="book.imgSrc ? require(`@/assets/${book.imgSrc}`) : ''" />
			</el-col>
			<el-col :span="12" :offset="3">
				<el-form label-width="80px">
					<el-form-item label="书籍名称">
						<span>{{ book.name }}</span>
					</el-form-item>

					<el-form-item label="作者名称">
						<span>{{ book.author }}</span>
					</el-form-item>

					<el-form-item label="出版社">
						<span>{{ book.provider }}</span>
					</el-form-item>

					<el-form-item label="单价">
						<span>¥{{ book.price }}</span>
					</el-form-item>

					<el-form-item label="库存">
						<span>{{ book.storeCount }}</span>
					</el-form-item>

					<el-form-item label="购买数量">
						<InputNumber ref="inputNumber" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="addToCart">添加到购物车</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import InputNumber from "@/components/InputNumber.vue";

export default {
	data() {
		return {
			book: {}
		};
	},
	components: {
		InputNumber
	},
	methods: {
		addToCart() {
			this.axios
				.post("/api/shoppingCart/add", {
					bookId: this.book.id,
					buyNum: this.$refs.inputNumber.num
				})
				.then(response => {
					if (response.data.code == 200) {
						this.$message.success(response.data.data);
						this.$router.push("/");
					} else if (response.data.code == 1002) {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					}
				});
		}
	},
	created() {
		this.axios.get(`/api/book/bookInfo/${this.$route.query.id}`).then(response => {
			if (response.data.code == 200) {
				this.book = response.data.data;
			} else if (response.data.code == 1002) {
				this.$message.error(response.data.data);
				this.$router.push("/login");
			} else {
				this.$message.error(response.data.data);
				this.$router.push("/");
			}
		});
	}
};
</script>

<style scoped>
img {
	width: 100%;
}
</style>
