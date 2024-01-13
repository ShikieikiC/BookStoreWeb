<template>
	<div>
		<el-dialog
			title="修改广告"
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
				<el-form-item label="失效日期">
					<el-date-picker
						v-model="adv.endTime"
						type="date"
						placeholder="请选择失效日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						:disabled="adv.startTime == null"></el-date-picker>
				</el-form-item>
				<el-form-item label="广告状态">
					<el-select placeholder="请选择广告状态" v-model="adv.status" @input="queryAdv(1)">
						<el-option label="全部" :value="''" />
						<el-option label="上架" :value="1" />
						<el-option label="下架" :value="0" />
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="update">修 改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			adv: this.$route.query.adv,
			dialogVisible: true
		};
	},
	methods: {
		update() {
			this.axios.post("api/adv/update", this.adv).then(response => {
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
