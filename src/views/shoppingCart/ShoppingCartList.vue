<template>
	<div>
		<div style="display: flex">
			<h3 style="margin-right: 15px; margin-top: 5px">收货人地址</h3>
			<el-button>新增收货地址</el-button>
		</div>

		<hr />
		<el-row type="flex" justify="start">
			<el-col class="address" :span="6" v-for="address in addresses" :key="address.id">
				<p>
					<input type="radio" :value="address.id" v-model="radio" />
					<span>{{ address.province }} {{ address.city }} ({{ address.receiver }}收)</span>
				</p>

				<p>联系方式：{{ address.telephone }}</p>
				<p>{{ address.detailAddress }}</p>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table :data="shoppingCarts" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column label="图片" prop="imgSrc" width="180">
						<template slot-scope="scope">
							<img :src="require('@/assets/' + scope.row.imgSrc)" style="width: 55%" />
						</template>
					</el-table-column>

					<el-table-column prop="bookName" label="图书名称" />

					<el-table-column prop="buyPrice" label="图书单价">
						<template slot-scope="scope">
							<span>¥ {{ scope.row.buyPrice }}</span>
						</template>
					</el-table-column>

					<el-table-column prop="buyNum" label="购买数量" />
					<el-table-column prop="totalPrice" label="小计">
						<template slot-scope="scope">
							<span>¥ {{ scope.row.totalPrice }}</span>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8" :offset="18">
				应付金额：
				<span style="margin-right: 20px">￥{{ totalPrice }}</span>
				<el-button type="primary" @click="addOrder">下 单</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			radio: "",
			addresses: [],
			totalPrice: 0,
			shoppingCarts: [],
			selectedCarts: []
		};
	},
	methods: {
		handleSelectionChange(selectedCarts) {
			this.selectedCarts = selectedCarts;
			this.totalPrice = selectedCarts.reduce((total, cart) => total + cart.totalPrice, 0);
		},

		addOrder() {
			this.axios
				.post("api/order/add", {
					addressId: this.radio,
					ids: this.selectedCarts.map(cart => cart.id)
				})
				.then(response => {
					if (response.data.code == 200) {
						this.$router.push({
							path: "/shoppingCartConfirm",
							query: {
								orderNum: response.data.data
							}
						});
					} else if (response.data.code == 1002) {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					} else {
						this.$message.error(response.data.data);
					}
				});
		},
		getUserCart() {
			this.axios.get("/api/user/userCart").then(response => {
				if (response.data.code == 200) {
					this.addresses = response.data.data.addresses;
					this.shoppingCarts = response.data.data.shoppingCarts;
					this.radio = this.addresses.find(address => address.isDefault == 1).id;
				} else {
					this.$message.error(response.data.data);
					this.$router.push("/login");
				}
			});
		}
	},
	created() {
		this.getUserCart();
	}
};
</script>

<style scoped>
.address {
	width: 300px;
	height: 120px;
	border: 1px solid;
	margin: auto 10px;
}

p {
	margin: 5px;
	font-size: 14 px;
	padding: 5px 2px;
}
</style>
