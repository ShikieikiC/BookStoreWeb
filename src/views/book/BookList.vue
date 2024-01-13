<template>
	<div>
		<CarouselVue />
		<el-col
			:span="4"
			style="text-align: center; margin: 10px 24px"
			v-for="book in books"
			:key="book.id">
			<el-card>
				<img :src="require(`@/assets/${book.imgSrc}`)" @click="bookInfo(book.id)" />
				<div>
					<h4>{{ book.name }}</h4>
					<span>¥{{ book.price }}</span>
					<span>{{ book.provider }}</span>
				</div>
			</el-card>
		</el-col>
	</div>
</template>

<script>
import CarouselVue from "@/components/Carousel.vue";

export default {
	methods: {
		bookInfo(bookId) {
			this.$router.push({ path: "/bookInfo", query: { id: bookId } });
		}
	},
	data() {
		return {
			books: []
		};
	},
	created() {
		this.axios.get("/api/book/queryAll").then(response => {
			this.books = response.data.data;
		});
	},
	components: {
		CarouselVue
	}
};
</script>

<style scoped>
img {
	width: 55%;
}
</style>
