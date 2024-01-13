<template>
	<div>
		<h3>限时秒杀</h3>
		<el-row>
			<el-col :span="5" v-for="book in books" :key="book.bookId">
				<!-- 放商品列表 -->
				<el-card>
					<div>
						<img
							:src="require('@/assets/' + book.imgSrc)"
							@click="
								$router.push({
									path: '/killBookInfo',
									query: { killBook: book }
								})
							" />
					</div>
					<div>
						<p>{{ book.bookName }}</p>
						<span>现价：￥{{ book.newPrice }}</span>
						<p class="old">原价：￥{{ book.oldPrice }}</p>
						<p>{{ book.provider }}</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			books: []
		};
	},

	created() {
		this.axios.get("api/killBook/queryAll").then(response => {
			if (response.data.data) {
				this.books = response.data.data;
			}
		});
	}
};
</script>

<style scoped>
img {
	width: 50%;
}
.el-col {
	text-align: center;
	margin: 5px 12px;
}
el-card {
	width: 80%;
}
.old {
	text-decoration: line-through;
}
</style>
