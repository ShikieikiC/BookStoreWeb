<template>
	<div>
		<el-dialog
			title="添加商品"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<el-form :model="item" label-width="80px">
				<el-form-item label="商品名称">
					<el-input v-model="item.name" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="商品类型">
					<el-select v-model="item.typeId" placeholder="请选择商品类型">
						<el-option v-for="tp in types" :label="tp.name" :value="tp.id" :key="tp.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="品牌">
					<el-input v-model="item.brand" placeholder="请输入商品品牌"></el-input>
				</el-form-item>
				<el-form-item label="价格">
					<el-input v-model="item.price" placeholder="请输入商品价格"></el-input>
				</el-form-item>
				<el-form-item label="库存">
					<el-input v-model="item.storeCount" placeholder="请输入商品库存"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="add">添 加</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			item: {
				name: "",
				typeId: "",
				brand: "",
				price: "",
				storeCount: ""
			},
			types: [],
			dialogVisible: true
		};
	},
	methods: {
		add() {
			this.axios.post("api/item/add", this.item).then(response => {
				this.$message.success(response.data.data);
				this.$router.push("/item");
			});
		},
		handleClose() {
			this.$router.push("/item");
		}
	},
	mounted() {
		this.axios.get("api/item/queryAllType").then(response => {
			this.types = response.data.data;
		});
	}
};
</script>
