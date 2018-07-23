<template>
	<el-container class="container">

		<el-main >
			<div class="main" >
				<h4 class="title">登录</h4>

				<el-form ref="loginForm" :model="loginForm" :rules="rulesForm" status-icon  label-width="80px" >
					
					<el-form-item>
						<el-radio  v-model="loginForm.type" value="1"  label="1">手机号登陆</el-radio>	
	  					<el-radio  v-model="loginForm.type" value="2" label="2">账号登陆</el-radio>						
					</el-form-item>		

					<el-form-item label="账号" prop="name">
						<el-input v-model="loginForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pwd">
						<el-input v-model="loginForm.pwd" type="password" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
					    <el-button @click="resetForm('loginForm')">取消</el-button>
					</el-form-item>					
				</el-form>	
			</div>
		</el-main>


	</el-container>
  

</template>

<script>

	import ajaxFn from './Ajax.js'
	import md5 from 'js-md5';


	export default {
		data(){

			var validateName = (rule, value, callback) => {
				if( value === '' ){
					callback && callback( new Error('请输入账号') );
				}else{
					callback && callback();
				}

			}

			var validatePwd = (rule, value, callback) => {
				if( value === '' ){
					callback && callback( new Error('请输入密码') );
				}else{
					callback && callback();
				}
				
			}

			return {
				loginForm : {
					name : '',
					pwd  : '',
					type : '1'
				},
				rulesForm : {
					name : [
						{ validator: validateName, trigger: 'blur' }
					],
					pwd : [
						{ validator: validatePwd, trigger: 'blur' }
					]
				}
			}
		},
		methods : {
			submitForm(formName){

				var _self = this;

				this.$refs[formName].validate( (valid) => {

					if(valid){

						_self.logoForm();

						// console.log('submit');

					}else{
						return false;
					}

				} )
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			logoForm(){
				var _self = this;

				ajaxFn.login({
					us_tel : this.loginForm.name,
					password : md5( this.loginForm.pwd ),
					type : this.loginForm.type
				},function(res){

					// console.log(res);

					sessionStorage.setItem('PAPABEIPCHOUTAI', JSON.stringify(res));

					// window.location.href = './notes';

					_self.$router.push( { path : '/home/notes', query : { type : 3 } } );

				},function(msg){

					_self.$notify.error({
						title : '提示',
						message : msg
					})

				})

			}
		}
	}


</script>

<style>
	body,html{
		margin : 0px;
		padding : 0px;
	}
	
	.container{
		background-color : #f1f1f1;
		height: 100%;
    	min-height: 750px;
	}
	.main{
		width : 400px;
	    margin: 60px auto 0;
	    padding: 50px 50px 30px;
	    background-color: #fff;
	    border-radius: 4px;
	    box-shadow: 0 0 8px rgba(0,0,0,.1);
	    vertical-align: middle;
	}
	.main .title{
		text-align: center;
	    font-weight: 700;
	    color: #ea6f5a;
	}
</style>