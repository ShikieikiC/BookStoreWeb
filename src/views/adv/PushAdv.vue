<template>
	<div>
		<el-dialog
			title="推送广告"
			:visible.sync="dialogVisible"
			width="30%"
			center
			:before-close="handleClose">
			<el-form :model="adv" label-width="90px">
				<el-form-item label="失效日期">
					<el-date-picker
						v-model="adv.endTime"
						type="date"
						placeholder="请选择失效日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="push">推 送</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			adv: {
				id: this.$route.query.id,
				endTime: ""
			},
			dialogVisible: true
		};
	},
	methods: {
		push() {
			this.axios.post("api/adv/push", this.adv).then(response => {
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
