<template>
	<el-row>
		<el-col>
			<el-form :inline="true">
				<el-form-item label="客户端类型">
					<el-select placeholder="请选择客户端类型" v-model="typeId" @input="queryAdv(1)">
						<el-option label="全部" :value="''" />
						<el-option label="普通用户" :value="1" />
						<el-option label="会员" :value="2" />
					</el-select>
				</el-form-item>
				<el-form-item label="广告标题">
					<el-input placeholder="请输入广告标题" v-model="title" @input="queryAdv(1)" />
				</el-form-item>
				<el-form-item label="广告状态">
					<el-select placeholder="请选择广告状态" v-model="status" @input="queryAdv(1)">
						<el-option label="全部" :value="''" />
						<el-option label="上架" :value="1" />
						<el-option label="下架" :value="0" />
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="queryAdv(1)">查询</el-button>
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
			<el-table :data="advs" stripe style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="id" label="ID" width="55" />
				<el-table-column label="图片" prop="imgSrc" width="180">
					<template slot-scope="scope">
						<img :src="require('@/assets/' + scope.row.imgSrc)" style="width: 55%" />
					</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" width="220px" />
				<el-table-column prop="typeId" label="客户端类型" width="150px">
					<template slot-scope="scope">
						<span>{{ types.find(type => type.id == scope.row.typeId).name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="startTime" label="推送时间" width="200px" />
				<el-table-column prop="endTime" label="失效时间" width="200px" />
				<el-table-column prop="status" label="状态" width="100px">
					<template slot-scope="scope">
						<span>{{ scope.row.status == 1 ? "上架" : "下架" }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<div style="display: flex">
							<el-button
								icon="el-icon-s-promotion"
								style="color: #2c93df"
								@click="
									$router.push({
										path: '/pushAdv',
										query: {
											id: scope.row.id
										}
									})
								">
								推送
							</el-button>
							<el-button
								icon="el-icon-edit-outline"
								style="color: goldenrod"
								@click="
									$router.push({
										path: '/updateAdv',
										query: {
											adv: scope.row
										}
									})
								">
								修改
							</el-button>
							<el-button
								:icon="scope.row.status == 1 ? 'el-icon-remove' : 'el-icon-circle-plus'"
								:style="{ color: scope.row.status == 1 ? 'red' : 'green' }"
								@click="changeStatus(scope.row.id)">
								{{ scope.row.status == 1 ? "下架" : "上架" }}
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col>
			<PaginationVue
				ref="page"
				@handleCurrentChange="queryAdv($refs.page.pageNum)"
				@handleSizeChange="queryAdv($refs.page.pageNum)" />
		</el-col>
	</el-row>
</template>

<script>
import PaginationVue from "@/components/Pagination.vue";

export default {
	data() {
		return {
			title: "",
			status: "",
			typeId: "",

			advs: [],
			types: [
				{ id: 1, name: "普通用户" },
				{ id: 2, name: "会员" }
			],
			selectedIds: []
		};
	},
	components: { PaginationVue },
	methods: {
		changeStatus(id) {
			this.axios.get("api/adv/changeStatus?id=" + id).then(() => {
				this.queryAdv(this.$refs.page.pageNum);
			});
		},
		deleteBatch() {
			this.axios.post("api/adv/deleteBatch", this.selectedIds).then(response => {
				if (response.data.code == 200) {
					this.$refs.page.pageNum = 1;
					this.queryAdv(1);
				} else {
					this.$message.error(response.data.data);
				}
			});
		},

		handleSelectionChange(selectedAdvs) {
			this.selectedIds = selectedAdvs.map(adv => adv.id);
		},

		clear() {
			this.status = "";
			this.title = "";
			this.typeId = "";
			this.$refs.page.pageNum = 1;
			this.queryAdv(1);
		},

		queryAdv(pageNum) {
			this.axios
				.post("api/adv/queryAll", {
					pageNum: pageNum,
					pageSize: this.$refs.page.pageSize,
					params: {
						title: this.title,
						typeId: this.typeId,
						status: this.status
					}
				})
				.then(response => {
					if (response.data.code == 200) {
						this.advs = response.data.data.list;
						this.$refs.page.total = response.data.data.total;
					} else {
						this.$message.error(response.data.data);
						this.$router.push("/login");
					}
				});
		}
	},
	mounted() {
		this.queryAdv(1);
	}
};
</script>

<style lang="scss" scoped></style>
