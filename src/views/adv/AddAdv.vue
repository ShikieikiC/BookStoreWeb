<template>
	<div>
		<el-dialog
			title="添加广告"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<el-form :model="adv" label-width="90px">
				<el-form-item label="广告标题">
					<el-input v-model="adv.title" placeholder="请输入广告标题"></el-input>
				</el-form-item>
				<el-form-item label="客户端类型">
					<el-select v-model="adv.typeId" placeholder="请选择客户端类型">
						<el-option label="普通用户" :value="1" />
						<el-option label="会员" :value="2" />
					</el-select>
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
			adv: {
				title: "",
				typeId: ""
			},
			dialogVisible: true
		};
	},
	methods: {
		add() {
			this.axios.post("api/adv/add", this.adv).then(response => {
				this.$message.success(response.data.data);
				this.$router.push("/adv");
			});
		},
		handleClose() {
			this.$router.push("/adv");
		}
	}
};
</script>
