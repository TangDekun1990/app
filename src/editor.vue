<template>

	<div>
		<input type="text" class="editor-title" v-model="title">

		<div id="accout_editor" type="text/plain">
			<p>请输入你想要说的话...</p>
		</div>			
		
		<div>
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
		</div>

		<el-button type="primary">保存</el-button>
	</div>

</template>


<script type="text/javascript">

	import WangEditor from 'wangeditor'

	export default{
		data (){
			return {
				dialogImageUrl : "",
				imageUrl : [],
				dialogVisible : false,

				title : '',
				editor : ''
			}	
		},
		created (){

			var myData = new Date();

			var strData = myData.getFullYear() + '-' + (myData.getMonth() + 1) + '-' + myData.getDate();

			this.title = strData;

		},
		beforeMount(){
			// this.createEditor();
		},
		beforeDestroy(){
			// this.destoryEditor();
		},
		methods : {

			// 创建编辑器
			createEditor (){

				// 将回调延迟到下次DOM更新循环之后执行。
				this.$nextTick(function(){

					this.editor = new WangEditor('#accout_editor');
					this.initEditorConfig();
					this.editor.create();

					this.editor.txt.html('<p>请输入想要说的话...</p>');

					// $("#accout_editor").css('height', 'auto');					
				})

			},

			// 销毁编辑器
			destoryEditor (){

				this.editor.destroy();
				this.editor = null;
				WangEditor.numberOfLocation--;
			},

			// 初始化编辑器配置
			initEditorConfig(){  

	            this.editor.customConfig.uploadImgServer  = '/upload';  // 图片上传地址
	            this.editor.customConfig.showLinkImg = false;

	            // this.editor.customConfig.uploadImgFileName = '_img';  // 统一指定上传的文件name，需要指定。否则默认不同的上传方式是不同的name

	            const usersecret = window.localStorage.getItem('usersecret');  // 获取 usersecret

	            this.editor.customConfig.uploadParams = {  // 自定义上传参数配置
	                usersecret: usersecret
	            };

	        },

	         // 获取编辑器 内容区内容
			getEditorContent(){ 
	            this.editorContent = this.editor.$txt.html();  // 获取 html 格式
	            // this.editor.$txt.text();  // 获取纯文本
	            // this.editor.$txt.formatText();  // 获取格式化后的纯文本

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
		}
	}
</script>

<style>
	#accout_editor{
		width : 100%;
		min-height: 330px;
		height : auto;

	}

	.editor-title{
		margin-top : 10px;
	    /*width: 100%;*/
	    padding: 0 80px 10px 40px;
	    margin-bottom: 0;
	    border: none;
	    font-size: 30px;
	    font-weight: 400;
	    line-height: 30px;
	    -webkit-box-shadow: none;
	    box-shadow: none;
	    color: #595959;
	    background-color: transparent;
	    outline: none;
	    border-radius: 0;
	    overflow: hidden;
	    -o-text-overflow: ellipsis;
	    text-overflow: ellipsis;
	    white-space: nowrap;		
	}

	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	}
	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	}
</style>