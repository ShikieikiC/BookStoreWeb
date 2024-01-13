<template>
	<el-row>
		<el-col>
			<el-form :inline="true">
				<el-form-item label="商品名称">
					<el-input placeholder="请输入商品名称" v-model="name" @input="queryItem(1)"></el-input>
				</el-form-item>
				<el-form-item label="商品状态">
					<el-select placeholder="请选择商品状态" v-model="status" @input="queryItem(1)">
						<el-option label="全部" :value="''" />
						<el-option label="上架" :value="1" />
						<el-option label="下架" :value="0" />
					</el-select>
				</el-form-item>
				<el-form-item label="商品类型">
					<el-select placeholder="请选择商品类型" v-model="typeId" @input="queryItem(1)">
						<el-option label="全部" :value="''" />
						<el-option v-for="tp in types" :label="tp.name" :value="tp.id" :key="tp.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序">
					<el-select placeholder="请选择排序" v-model="order" @input="queryItem(1)">
						<el-option label="默认排序" :value="''"></el-option>
						<el-option label="按上架时间升序" :value="1"></el-option>
						<el-option label="按上架时间降序" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryItem(1)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="clear">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-col>
			<el-button type="primary" @click="$router.push('/addAdv')">新增</el-button>
			<el-button type="danger" @click="deleteBatch">批量删除</el-button>
		</el-col>

		<el-col>
			<el-table :data="items" stripe style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="id" label="ID" width="55" />
				<el-table-column label="图片" prop="imgSrc" width="180">
					<template slot-scope="scope">
						<img :src="require('@/assets/' + scope.row.imgSrc)" style="width: 55%" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="商品名称" />
				<el-table-column prop="brand" label="品牌" />
				<el-table-column prop="typeId" label="分类">
					<template slot-scope="scope">
						<span>{{ types.find(type => type.id == scope.row.typeId).name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格">
					<template slot-scope="scope">
						<span>¥ {{ scope.row.price }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="buyCount" label="销量" />
				<el-table-column prop="storeCount" label="库存" />
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span>{{ scope.row.status == 1 ? "上架" : "下架" }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col>
			<PaginationVue
				ref="page"
				@handleCurrentChange="queryItem($refs.page.pageNum)"
				@handleSizeChange="queryItem($refs.page.pageNum)" />
		</el-col>
	</el-row>
</template>

<script>
import PaginationVue from "@/components/Pagination.vue";

export default {
	data() {
		return {
			name: "",
			status: "",
			typeId: "",
			order: "",

			items: [],
			types: [],
			selectedIds: []
		};
	},
	components: { PaginationVue },
	methods: {
		deleteBatch() {
			this.axios.post("api/item/deleteBatch", this.selectedIds).then(() => {
				this.$refs.page.pageNum = 1;
				this.queryItem(1);
			});
		},
		remove(id) {
			this.axios.get("api/item/delete?id=" + id).then(() => {
				this.$refs.page.pageNum = 1;
				this.queryItem(1);
			});
		},
		handleSelectionChange(selectedItems) {
			this.selectedIds = selectedItems.map(item => item.id);
			console.log(this.selectedIds);
		},
		clear() {
			this.status = "";
			this.name = "";
			this.typeId = "";
			this.order = "";
			this.$refs.page.pageNum = 1;
			this.queryItem(1);
		},
		queryItem(pageNum) {
			this.axios
				.post("api/item/queryAll", {
					pageNum: pageNum,
					pageSize: this.$refs.page.pageSize,
					params: {
						name: this.name,
						typeId: this.typeId,
						order: this.order,
						status: this.status
					}
				})
				.then(response => {
					if (response.data.code == 200) {
						this.items = response.data.data.list;
						this.$refs.page.total = response.data.data.total;
					} else {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					}
				});
		}
	},
	mounted() {
		this.axios.get("api/item/queryAllType").then(response => {
			this.types = response.data.data;
		});
		this.queryItem(1);
	}
};
</script>

<style lang="scss" scoped></style>
