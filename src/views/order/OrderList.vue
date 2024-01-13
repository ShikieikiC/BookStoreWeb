<template>
	<el-row>
		<el-col>
			<el-form :inline="true">
				<el-form-item label="订单编号">
					<el-input placeholder="订单编号" v-model="orderNum" @input="queryOrder(1)" />
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select placeholder="订单状态" v-model="status" @input="queryOrder(1)">
						<el-option
							v-for="status in orderStatus"
							:key="status.value"
							:label="status.label"
							:value="status.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryOrder(1)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="clear">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col>
			<el-table :data="orders" stripe style="width: 100%">
				<el-table-column prop="orderNum" label="订单编号">
					<template slot-scope="scope">
						<span v-if="scope.row.status == 5">{{ scope.row.orderNum }}</span>
						<el-link type="primary" @click="goToInfo(scope.row)" v-else>
							{{ scope.row.orderNum }}
						</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="totalPrice" label="总价格" />
				<el-table-column prop="createTime" label="创建时间" />
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						{{ orderStatus.find(status => status.value == scope.row.status).label }}
					</template>
				</el-table-column>
				<el-table-column prop="score" label="评分">
					<template slot-scope="scope">
						<el-rate
							v-if="scope.row.score > -1"
							v-model="scope.row.score"
							disabled
							text-color="#ff9900"></el-rate>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col>
			<PaginationVue
				ref="page"
				@handleCurrentChange="queryOrder($refs.page.pageNum)"
				@handleSizeChange="queryOrder($refs.page.pageNum)" />
		</el-col>
	</el-row>
</template>

<script>
import PaginationVue from "@/components/Pagination.vue";
import Rate from "@/components/Rate.vue";

export default {
	data() {
		return {
			orders: [],
			status: "",
			orderNum: "",
			orderStatus: [
				{ label: "全部", value: "" },
				{ label: "代付款", value: 1 },
				{ label: "代评价", value: 2 },
				{ label: "已收货", value: 3 },
				{ label: "已取消", value: 4 },
				{ label: "已完成", value: 5 }
			],
			test: 2
		};
	},
	components: {
		PaginationVue,
		Rate
	},
	methods: {
		clear() {
			this.status = "";
			this.orderNum = "";
			this.$refs.page.pageNum = 1;
			this.queryOrder(1);
		},
		queryOrder(pageNum) {
			this.axios
				.post("api/order/queryOrder", {
					pageNum: pageNum,
					pageSize: this.$refs.page.pageSize,
					params: {
						orderNum: this.orderNum,
						status: this.status
					}
				})
				.then(response => {
					if (response.data.code == 200) {
						this.orders = response.data.data.list;
						this.$refs.page.total = response.data.data.total;
					} else {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					}
				});
		},
		goToInfo(order) {
			this.$router.push({
				path: `/shoppingCart${order.status == 1 ? "Confirm" : "Appraisal"}`,
				query: {
					orderNum: order.orderNum
				}
			});
		}
	},
	mounted() {
		this.queryOrder(1);
	}
};
</script>

<style scoped></style>
