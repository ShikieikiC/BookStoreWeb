<template>
	<div>
		<el-form label-width="100px">
			<el-form-item label="订单编号：">
				<span>{{ orderNum }}</span>
			</el-form-item>
			<el-form-item label="收货地址：">
				<span>
					{{ address.province }} {{ address.city }} {{ address.detailAddress }} ({{
						address.receiver
					}}收)
				</span>
			</el-form-item>
			<el-form-item label="联系方式：">
				<p>{{ address.telephone }}</p>
			</el-form-item>
		</el-form>

		<el-table :data="orderItems" v-if="orderItems">
			<el-table-column label="图片" prop="imgSrc" width="180">
				<template slot-scope="scope">
					<img :src="require('@/assets/' + scope.row.imgSrc)" style="width: 55%" />
				</template>
			</el-table-column>

			<el-table-column prop="bookName" label="图书名称" />

			<el-table-column prop="price" label="图书单价">
				<template slot-scope="scope">
					<span>¥ {{ scope.row.price }}</span>
				</template>
			</el-table-column>

			<el-table-column prop="buyNum" label="购买数量" />
			<el-table-column prop="totalPrice" label="小计">
				<template slot-scope="scope">
					<span>¥ {{ scope.row.totalPrice }}</span>
				</template>
			</el-table-column>
		</el-table>
		<el-row>
			<el-col :span="8" :offset="18">
				应付金额：
				<span style="margin-right: 20px">￥{{ totalPrice }}</span>
				<el-button type="primary" @click="confirm">去付款</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderItems: [],
			address: "",
			totalPrice: "",
			orderNum: this.$route.query.orderNum
		};
	},
	methods: {
		confirm() {
			this.$router.push({
				path: "/shoppingCartPay",
				query: {
					orderNum: this.orderNum
				}
			});
		}
	},
	created() {
		this.$emit("setActive", 1);

		this.axios.get("api/order/queryOrderInfo?orderNum=" + this.orderNum).then(response => {
			this.orderItems = response.data.data.orderItems;
			this.address = response.data.data.address;
			this.totalPrice = this.orderItems.reduce((total, item) => total + item.totalPrice, 0);
		});
	}
};
</script>

<style lang="scss" scoped></style>
