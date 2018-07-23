<template>
	<div>
		<div style="margin: 20px;"></div>

		  <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left:20px">
		    <el-tab-pane label="发布帖子" name="plate"></el-tab-pane>
		    <el-tab-pane label="发布爆照" name="baozhao"></el-tab-pane>
		  </el-tabs>

		<el-form  label-width="80px" :model="formLabelAlign" width="500px" @submit.native.prevent="true">
		  <el-form-item label="标题">
		    <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <el-form-item label="内容">
		    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formLabelAlign.content" placeholder="请输入内容"></el-input>
		  </el-form-item> 
		  <el-form-item label="帖子类型">
		    <el-select v-model="formLabelAlign.region" placeholder="请选择帖子类型">

		      <el-option :label="item.pl_name" :value="item.pl_id" v-for="item in menus2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="图片">
		  	<el-upload
				action="http://m.houyipapa.com/images"
				list-type="picture-card"
				ref = "upload"
				:show-file-list="true"
				:on-success="handleAvatarSuccess"
				:on-remove="handleRemove"
				:before-upload="beforeUpload"
				:multiple="false">
				
				<i class="el-icon-plus"></i>

			</el-upload>	
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		  </el-form-item>

		  <el-form-item>
		    <el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
		    <el-button @click="resetForm('formLabelAlign')">重置</el-button>
		  </el-form-item>

		</el-form>
		
	</div>
</template>

<script type="text/javascript">

	import ajaxFn from './Ajax.js'
	import Base64 from 'js-base64'


	export default{
		data (){
			return {
		        formLabelAlign: {
		          title		: '',
		          content 	: '',
		          region 	: ''
		        },
		        dialogVisible 	: false,
		        dialogImageUrl  : '',
		        imageUrl        : [],
		        menus2			: [],
		        activeName		: 'plate'
			}	
		},

		created() {

			this.getPostList();
		},

		methods : {

			submitForm(){
				var _this = this;

				// console.log( JSON.stringify( this.formLabelAlign.content ));

				if(this.activeName == 'plate'){
					this.submitPlate();
				}else{
					this.submitBaozhao();
				}



			},

			submitBaozhao() {

				var _this = this;


				ajaxFn.sendEssayadd({
					es_title 	: this.formLabelAlign.title,
					es_content	: Base64.Base64.encode( this.formLabelAlign.content ),
					es_img		: this.joinImageToString( this.imageUrl ),
					is_ni		: 0,
					pl_id		: this.formLabelAlign.region
				},function(res){

			        _this.$message({
			          message: '恭喜你，发布成功',
			          type: 'success'
			        });

				},function(){

					_this.$message.error('发布出问题了哦');
				})				
			},

			// 提交帖子
			submitPlate() {

				var _this = this;
				

				ajaxFn.sendEssayadd({
					es_title 	: this.formLabelAlign.title,
					es_content	: Base64.Base64.encode(  this.formLabelAlign.content ),
					es_img		: this.joinImageToString( this.imageUrl ),
					type        : 2,
					is_ni		: 0,
					pl_id		: this.formLabelAlign.region
				},function(res){

			        _this.$message({
			          message: '恭喜你，发布成功',
			          type: 'success'
			        });

				},function(){

					_this.$message.error('发布出问题了哦');
				})

			},

			handleClick() {
				console.log(this.activeName);
			},

			// 重置表单内容
			resetForm(){

				this.formLabelAlign.title 	= '';
				this.formLabelAlign.content = '';
				this.formLabelAlign.region  = '';

		        this.dialogVisible 	= false;

			},

			joinImageToString( imgs ){
				if( imgs.length <= 0 ) return;

				var strImgs = '';

				for(var i = 0, len = imgs.length; i < len; i++){
					strImgs += imgs[i]['imgData'] + ";"
				}

				return strImgs;
			},

			// 获取帖子列表
			getPostList(){

				this.menus2 = [];

				var self = this;

				ajaxFn.getBaozhaoList({
					type : 1
				},function(res){


					self.menus2 = self.menus2.concat(res.list);

					console.log('res' + JSON.stringify(self.menus2));

				})		

				// 心情帖子
				ajaxFn.getBaozhaoList({
					type : 3
				},function(res){

					console.log('ress' + JSON.stringify(res));

					self.menus2 = self.menus2.concat(res.list);
				})			

			},

			// 获取爆照列表选项
			getBaozhaoOptionList() {

				var self = this;

				ajaxFn.getBaozhaoList({
					type : 2
				},function(res){
					self.menus2 = res.list;
				})				
			},

	        // 处理上传图片成功后
	        handleAvatarSuccess(res, file){
	        	// console.log(file.uid);
	        	// console.log(res);
	        	// this.imageUrl.push({ imgData : URL.createObjectURL(file.raw), id : file.uid });
	        },

	        // 删除图片
	        handleRemove(file, fileList){

	        	// console.log(file.uid);
	        	// console.log(URL.createObjectURL(file.raw));

	        	if(this.imageUrl.length <= 0) return;

	        	for(var i = 0, len = this.imageUrl.length; i < len; i++){
	        		var uid = this.imageUrl[i]['id'];
	        		if( uid == file.uid ){
	        			this.imageUrl.splice(i, 1);
	        		}
	        	}

	        	// console.log( this.imageUrl );

	        },

	        // 在图片上传之前，把图片先通过ajax上传，然后获取到服务器的图片地址
	        beforeUpload (file){

	        	// console.log("file" + file);

	        	var _this = this;

	        	var fd = new FormData();
	        	fd.append('file[]', file);

				$.ajax({
					type 		: 'post',
					url  		: 'http://m.houyipapa.com/images',
					data 		: fd,
					cache 		: false,
					processData : false,
					contentType : false,
					dataType    : 'json',
					success     : function(res){
						if(res.state == 1){
							var imgUrl = res.path;

	        				_this.imageUrl.push({ imgData : imgUrl, id : file.uid });

						}

					}
				})
	        }
		},

		watch : {
			activeName (){

				this.resetForm();

				if(this.activeName == 'plate'){
					this.getPostList();
				}else{
					this.getBaozhaoOptionList();
				}

			}
		}
	}
</script>
