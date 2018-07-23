<template>
	<div class="sexTest-wrap">
		
		<el-form ref='form' :inline="true" :model="sizeForm" label-width="80px" size="mini" class="demo-form-inline">
			 
			<el-form-item label="性别">

				<el-radio-group v-model="sizeForm.sex" size="medium">
					 <el-radio border label="男">男</el-radio>
		  			 <el-radio border label="女">女</el-radio>			
				</el-radio-group>

			</el-form-item>

			<el-form-item label="年龄段">
				<el-select v-model="sizeForm.ageRegion" >
					<el-option label="16-24" value="16-24">16-24</el-option>
					<el-option label="25-35" value="25-35">25-35</el-option>
					<el-option label="36-45" value="36-45">36-45</el-option>
					<el-option label="46以上" value="46以上">46以上</el-option>
				</el-select>
			</el-form-item>

			<el-form-item size="large">
				<el-button type="primary" @click="onSubmit()">提交</el-button>
			</el-form-item>

			<el-form-item>
				当前测试参与人数：{{number}}
			</el-form-item>

		</el-form>


		<el-card class="box-card" v-for="item in items">
			<div class="title" v-html="item.title"></div>
			<el-table :data="item.list" stripe style="width:100%">
				<el-table-column prop="title" label="选项"  width="180">
				</el-table-column>
				<el-table-column prop="number" label="小计" width="80">
				</el-table-column>
				<el-table-column label="比例" width="300">
	
					<template slot-scope="scope">
						<el-progress :text-inside="true" :stroke-width="18" :percentage="getScale(scope.row.number)" color="rgba(142, 113, 199, 0.7)"></el-progress>
					</template>
	
				</el-table-column>
			</el-table>
		</el-card>
	</div>

	
</template>

<script>
	import ajaxFn from '../Ajax.js'

	export default {
		data (){

			return{
				sizeForm : {
					sex : '男',
					ageRegion : '16-24'
				},
				number : 0,
				items : []
			}
		},
		computed : {
		},
		methods : {
			onSubmit(){

				var that = this;

				// console.log('sss', this.sex, this.ageRegion);

				ajaxFn.getAwardStatistical({
					sex : this.sizeForm.sex,
					age : this.sizeForm.ageRegion
				},function(res){

					that.items = that.convertData( res.items );

					// console.log('json', JSON.stringify(that.items));

					that.number = res.number;
				})
			},

			convertData( data ){


				if(!data) return;

				
				for(var i = 0, len = data.length; i < len; i++){

					let list = data[i]['list'];

					for(let j = 0, len = list.length; j < len; j++){

						var number = list[j]['number'];

						data[i]['list'][j]['sacle'] = this.getScale(number);
					}
				}

				return data;
			},

			getScale(count){

				return Math.round( (count / this.number) * 100 );
			}
		}
	}
</script>

<style>
	.sexTest-wrap{
		margin-top : 30px;
		padding-bottom: 10px;
		
	}

	.demo-form-inline{
		border-bottom : 1px solid #eaeefb;
	}

	.box-card{
		width : 600px;
		margin : 30px auto;
	}
</style>