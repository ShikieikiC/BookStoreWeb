<template>
	<el-row>
		<el-col>
			<el-form :inline="true">
				<el-form-item label="菜品名称">
					<el-input placeholder="菜品名称" v-model="name" @input="queryFood(1)" />
				</el-form-item>
				<el-form-item label="菜品分类">
					<el-select placeholder="菜品分类" v-model="typeId" @input="queryFood(1)">
						<el-option
							v-for="tp in foodTypes"
							:key="tp.value"
							:label="tp.label"
							:value="tp.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryFood(1)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="clear">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col>
			<el-table :data="foods" stripe style="width: 100%">
				<el-table-column prop="id" label="编号" width="80px" />
				<el-table-column prop="imgSrc" label="图片">
					<template slot-scope="scope">
						<img :src="require('@/assets/' + scope.row.imgSrc)" style="width: 30%" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称" />
				<el-table-column prop="price" label="价格">
					<template slot-scope="scope">
						<span>¥ {{ scope.row.price }}</span>
					</template>
				</el-table-column>
				<el-table-column label="购买数量">
					<template slot-scope="scope">
						<InputNumber :ref="'buyNum_' + scope.row.id" @handleChange="count(scope.row)" />
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col>
			<Pagination
				ref="page"
				@handleCurrentChange="queryFood($refs.page.pageNum)"
				@handleSizeChange="queryFood($refs.page.pageNum)" />
		</el-col>

		<el-col :span="8" :offset="18">
			应付金额：
			<span style="margin-right: 20px">￥{{ totalPrice }}</span>
			<el-button type="primary" @click="addOrder">下单</el-button>
		</el-col>
	</el-row>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import InputNumber from "@/components/InputNumber.vue";

export default {
	data() {
		return {
			foods: [],
			name: "",
			typeId: "",
			foodTypes: [
				{ label: "全部", value: "" },
				{ label: "轻食", value: 1 },
				{ label: "牛排", value: 2 },
				{ label: "饮品", value: 3 }
			],
			selectedFoods: [],
			totalPrice: 0
		};
	},
	components: {
		Pagination,
		InputNumber
	},
	methods: {
		count(food) {
			if (
				this.$refs["buyNum_" + food.id].num > 0 &&
				!this.selectedFoods.find(selectedFood => selectedFood.id == food.id)
			) {
				this.selectedFoods.push(food);
			}

			this.totalPrice = this.selectedFoods.reduce((sum, food) => {
				return sum + this.$refs["buyNum_" + food.id].num * food.price;
			}, 0);
		},

		clear() {
			this.name = "";
			this.typeId = "";
			this.$refs.page.pageNum = 1;
			this.queryFood(1);
		},

		queryFood(pageNum) {
			this.axios
				.post("api/food/queryAll", {
					pageNum: pageNum,
					pageSize: this.$refs.page.pageSize,
					params: {
						name: this.name,
						typeId: this.typeId
					}
				})
				.then(response => {
					if (response.data.code == 200) {
						this.foods = response.data.data.list;
						this.$refs.page.total = response.data.data.total;
					} else {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					}
				});
		},
		addOrder() {
			this.axios
				.post("api/foodOrder/add", {
					totalPrice: this.totalPrice
				})
				.then(response => {
					this.$message.success("下单成功");
					this.$router.push({
						path: "/foodPay",
						query: {
							totalPrice: this.totalPrice,
							orderNum: response.data.data
						}
					});
				});
		}
	},
	mounted() {
		this.queryFood(1);
	}
};
</script>

<style scoped></style>
