<template>
	<el-container class="container">


		<el-dialog title="添加账号" :visible.sync="dialogFormVisible">

		  <el-form :model="userFrom">

		    <el-form-item label="账号" >
		      <el-input v-model="userFrom.userName" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="密码" >
		      <el-input v-model="userFrom.pwd" auto-complete="off"></el-input>
		    </el-form-item>


		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addGroupInfo()">确 定</el-button>
		  </div>

		</el-dialog>


		<!-- 左侧菜单 -->
		<el-aside class="aside aside-left-menus-1 aside-left-menus" style="width:150px;">
			<el-menu
				
				class="el-menu-vertical-demo el-menu-box"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"

				>

				<el-submenu index='1'>
					<template slot="title">
						<i class="el-icon-star-off"></i>
						<span>专栏</span>
					</template>

					<el-menu-item :index="calcuIndex(index, 1)"  v-for="(item, index) in menus1" @click="gotoNotes(1, item.s_id)" :key="item.s_id" >{{item.s_name}}</el-menu-item>
					
				</el-submenu>

				<el-submenu index='3'>
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<span>帖子</span>
					</template>

					<el-menu-item :index="calcuIndex(index, 3)" v-for="(item, index) in menus2" @click="gotoNotes(3, item.pl_id)" :key="item.pl_id">{{item.pl_name}}</el-menu-item>
				</el-submenu>

				<el-submenu index='4'>
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<span>精华帖</span>
					</template>

					<el-menu-item index="4-1" @click="getHotPlateListByOnePage(4, 1)">点击看精贴</el-menu-item>
				</el-submenu>

				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<span>爆照</span>
					</template>
					<el-menu-item :index="calcuIndex(index, 5)" @click="gotoNotes(5, item.pl_id)" v-for="(item, index) in menus3" :key="item.pl_id">{{item.pl_name}}</el-menu-item>
				</el-submenu>

				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-tickets"></i>
						<span>数据统计</span>
					</template>
					<el-menu-item index="6" @click="openDataStatistics(6, null)" >性能力检测</el-menu-item>
					<el-menu-item index="7" @click="openDataStatisticstest(7, null)" >性能力检测2</el-menu-item>
				</el-submenu>

			</el-menu>
			
			<el-popover
			  ref="popover4"
			  placement="top"
			  width="114"
			  v-model="visible2"
			  trigger="click">
			  	  <i class="el-icon-plus" @click="dialogFormVisible = true"></i>
				  <div v-for="o in gridData" :key="o.name" @click="switchGroup(o.name)" class="text item">
				    {{o.name }}
				  </div>
			</el-popover>
				
			<div class="user-group">
				<el-button class="btn-user-group" v-popover:popover4 v-html="currentUserName"></el-button>
			</div>
		</el-aside>

		<!-- 主界面 -->
		<el-main class="main-box">
			<el-row type="flex" class="row-bg">
				<el-col :span="6" class="main-left-menu-box">
					<div class="main-left-menu">

						<!-- 新建文章 Start -->
						<div class="main-add-article" @click="openEditorPage">
							<i class="el-icon-plus"></i>
							<span>新建文章</span>							
						</div>
						<!-- 新建文章 End -->

						<el-menu
							default-active="2"
							class="el-menu-vertical-demo el-menu"
							>
							<el-menu-item  class="main-left-menu-item"  @click="gotoNotesPage(items.s_e_id)" v-for="items in noteList" :key="items.s_e_id" :index="'items.s_e_id'" :data-ids="items.s_e_id" v-bind:class="{active :items.s_e_id == itemIndex }" >
								<img :src="items.s_e_img" alt="" class="left-menu-img">
								<span slot="title" >{{items.s_e_title}}</span>
							</el-menu-item>

						</el-menu>	

						<!-- 点击添加更多 -->
						<div class="main-add-article" @click="getMoreData">
							<span v-html="tips"></span>							
						</div>

					</div>
				</el-col>
				<el-col :span="18" class="main-right-content">
					<component v-bind:is="pageView"></component>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	import pages_vue  from './pages.vue'
	import editor_vue from './editor.vue'
	import upload_vue from './upload.vue'
	import plate_vue  from './plate.vue'
	import baozhao_vue from './baozhao.vue'

	import statisticsPage_sexTest_vue from './components/sexTest.vue'
	import aa    from './components/application.vue'

	import md5 from 'js-md5';


	import ajaxFn from './Ajax.js'

	export default {
		data() {

			return {
				noteList : [],

				notePage : 0,

				menus1 : [],
				menus2 : [],
				menus3 : [],

				pathType : 3,

				subTitleType : 1,

				itemIndex : 1,

				isHotPlate : 1,

				pageView : 'plate_vue',

				tips : '点击获取更多',

				gridData : [{
		          name: '王小虎',
				}],

				visible2 : false,

				dialogFormVisible : false,


				userFrom : {
					userName : '',
					pwd      : ''
				},

				currentUserName : ''
			}
		},
		components : {
			pages_vue,
			editor_vue,
			plate_vue,
			upload_vue,
			baozhao_vue,

			statisticsPage_sexTest_vue,

			aa
		},

		created(){

			this.initPages();

		},

		methods : {

			initPages() {

				this.getFoundList();
				this.getPostList();

				this.getHotPlateList();
				this.getBaozhaoList();

				this.setMultipleUserInfo();				
			},


			// 获取爆照列表数据
			getBaozhaoList() {

				var self = this;

				ajaxFn.getBaozhaoList({
					type : 2
				},function(res){

					res.list.unshift({
						pl_id   : 0,
						pl_name : '精选爆照'
					})

					self.menus3 = res.list;
				})
			},



			// 获取热门帖子列表
			getHotPlateList(){

				var self = this;

				ajaxFn.getHotPlateList({
					page : self.notePage++
				},function(res){

					self.noteList = self.noteList.concat( self.convertNodeData( res.hot ) );
				})

			},

			// 获取热门帖子列表
			getHotPlateListByOnePage(){

				this.notePage = 0;
				this.pageView = 'plate_vue';
				this.noteList = [];
				this.isHotPlate = 1;
				this.pathType = 3;

				this.$router.push( { path : 'notes', query : { type : this.pathType} } );

				this.getHotPlateList();
			},


			// 获取专栏列表
			getFoundList(){
				var self = this;

				ajaxFn.getFoundinfo({
					page : 0
				},function(res){

					self.menus1 = res.special;
				})
			},

			// 获取帖子列表
			getPostList(){

				var self = this;

				ajaxFn.getPostInfo({
					page : 0
				},function(res){

					self.menus2 = res.plate;
				})			
			},

			/**
			 * 根据标题设置路由路径
			 * @param  {[type]} typeid       [一级路由]
			 * @param  {[type]} subTitleType [二级路由]
			 * @return {[type]}              [description]
			 */
			gotoNotes ( typeid, subTitleType ) {

				
				if( typeid == 1 ){
					this.pageView = 'pages_vue';
				}else if( typeid == 3 ){
					this.pageView = 'plate_vue';
				}else if( typeid == 5 ){
					this.pageView = 'baozhao_vue';
				}
				
				this.notePage 		= 0;
				this.pathType 		= typeid;
				this.subTitleType 	= subTitleType;
				this.isHotPlate 	= 0;
				this.noteList 		= [];

				this.$router.push( { path : 'notes', query : { type : typeid , subTitleType : subTitleType} } );

				// console.log('pathType' + this.pathType);
			},

			// 获取节点数据来自专栏 
			gotoNotesPage ( pageid ) {
				// console.log( pageid );

				if( this.pathType == 1 ){
					this.pageView = 'pages_vue';
				}else if( this.pathType == 3 ){
					this.pageView = 'plate_vue';
				}else if( this.pathType == 5 ){
					this.pageView = 'baozhao_vue';
				}
				
				this.itemIndex = pageid;

				this.$router.push( { path : 'notes', query : { type : this.pathType, subTitleType : this.subTitleType, page : pageid } } );
			},

			/**
			 * 获取更多数据
			 * @return {[type]} [description]
			 */
			getMoreData (){

				var self = this;


				if( this.pathType == 1 ){

					this.getNodeData();

				}else if ( this.pathType == 3 && this.isHotPlate ){

					this.getHotPlateList();

				}else if( this.pathType == 3 ){

					this.getNodeDataByPlate();

				}else if( this.pathType == 5 && this.subTitleType == 0 ){
					
					this.getJingxuanNodeDataByBaozhao();

				}else if( this.pathType == 5 ){

					this.getNodeDataByBaozhao();
				}
			},

			/**
			 * 获取数据
			 * @return {[type]} [description]
			 */
			getNodeData() {

				var self = this;

				ajaxFn.getSpecial({
					s_id : self.subTitleType,
					page : self.notePage++
				},function(res){


					if( res.list.length <= 0 ){

						self.tips = '没有更多数据了';

					}else{


						self.noteList =	self.noteList.concat( res.list );

					}
					
				})
			},

			// 获取节点数据来自帖子
			getNodeDataByPlate(){

				var self = this;

				ajaxFn.getPlateInfoList({
					pl_id : self.subTitleType,
					page  : self.notePage++,
					type  : 1
				},function(res){

					// console.log('plateNode' + JSON.stringify( res ) );

					if( res.essay.length <= 0 ){

						self.tips = '没有更多数据了';

					}else{
						
						self.noteList = self.noteList.concat( self.convertNodeData(res.essay) );
					}
					
				})
			},


			// 获取节点数据来自爆照
			getNodeDataByBaozhao() {

				var self = this;

				ajaxFn.getBaozhaoListInfo({
					pl_id : self.subTitleType,
					page  : self.notePage++
				},function(res){


					if( res.list.length <= 0 ){

						self.tips = '没有更多数据了';

					}else{
						
						self.noteList = self.noteList.concat( self.convertNodeData2(res.list) );
					}
					
				})				
			},


			// 获取精选爆照数据
			getJingxuanNodeDataByBaozhao() {

				var self = this;

				ajaxFn.getJinxuanBaozhaoList({
					type  : '2',
					page  : self.notePage++
				},function(res){
					// console.log('res'+JSON.stringify(res))
					if( res.list.length <= 0 ){

						self.tips = '没有更多数据了';

					}else{
						
						self.noteList = self.noteList.concat( self.convertNodeData2(res.list) );
					}
				})			
			},

			// 转换节点数据，通过爆照数据
			convertNodeData2( nodeList ) {

				const newNodeData = [];

				for(var i = 0, len = nodeList.length; i < len; i++){

					newNodeData.push({
						s_e_id  : nodeList[i]['es_id'],
						s_e_img : nodeList[i]['es_img'],
						s_e_title : nodeList[i]['es_content']
					})
				}

				return newNodeData;
			},

			/**
			 * 转换节点数据
			 * @param  {[type]} nodeList [description]
			 * @return {[type]}          [description]
			 */
			convertNodeData( nodeList ){

				const newNodeData = [];

				for(var i = 0, len = nodeList.length; i < len; i++){

					newNodeData.push({
						s_e_id  : nodeList[i]['es_id'],
						s_e_img : nodeList[i]['us_img'],
						s_e_title : nodeList[i]['es_title']
					})
				}

				return newNodeData;
			},

			openEditorPage () {

				this.pageView = 'upload_vue';
			},

			// 是计算菜单的索引，需要做字符串连接
			calcuIndex(index, type) {

				return index.toString() + type;
			},

			addGroupInfo() {

				var self = this;

				this.loginUser(function(){
					self.saveUserInfoToLoacl();
					self.setMultipleUserInfo();
					self.dialogFormVisible = false;
				});
			},


			// 用户登录
			loginUser( callback ) {

				var self = this;

				ajaxFn.login({
					us_tel : this.userFrom.userName,
					password : md5( this.userFrom.pwd ),
					type : 2
				},function(res){

					// console.log(res);

					sessionStorage.setItem('PAPABEIPCHOUTAI', JSON.stringify(res));

					callback && callback();

				},function(msg){

					self.$notify.error({
						title : '提示',
						message : msg
					})

				})
			},

			// 检查用户是否存在
			checkUserInfoInLocal( userInfo ) {
				var bIn = false;

				if( !userInfo ) return bIn;

				for(var i = 0, len = userInfo.length; i < len; i++){

					if(userInfo[i]['userName'] == this.userFrom.userName){
						bIn = true;
						break;
					}
				}				

				return bIn;
			},


			// 保存用户信息到本地
			saveUserInfoToLoacl(){

				var userInfoByLocal = localStorage.getItem('USERINFOBYPAPABEIHOUTAI');

			
				if( userInfoByLocal ){
					userInfoByLocal = JSON.parse(userInfoByLocal);

					// 如果检测到有改用户信息存在，就不要进行保存了
					if( this.checkUserInfoInLocal(userInfoByLocal) ) return;


					userInfoByLocal.push({
						userName : this.userFrom.userName,
						pwd      : this.userFrom.pwd
					})

				}else{

					userInfoByLocal = [];

					userInfoByLocal.push({
						userName : this.userFrom.userName,
						pwd      : this.userFrom.pwd
					})
				}

				// 最后保存用户信息
				localStorage.setItem('USERINFOBYPAPABEIHOUTAI', JSON.stringify(userInfoByLocal));
			},

			setMultipleUserInfo() {

				var newUserInfoGrid = [];

				var userInfoByLocal = localStorage.getItem('USERINFOBYPAPABEIHOUTAI');
				var currentUserInfo = sessionStorage.getItem('PAPABEIPCHOUTAI');

				currentUserInfo = JSON.parse(currentUserInfo);

				if( userInfoByLocal ){
					userInfoByLocal = JSON.parse(userInfoByLocal);

					for(var i = 0, len = userInfoByLocal.length; i < len; i++){
						newUserInfoGrid.push({
							name : userInfoByLocal[i]['userName']
						})
					}
				}

				this.gridData = newUserInfoGrid;
				this.currentUserName = currentUserInfo.nickname;
			},

			// 切换账号信息
			switchGroup (name) {
				if( !name ) return;

				var self = this;

				var userInfoByLocal = localStorage.getItem('USERINFOBYPAPABEIHOUTAI');

				if( userInfoByLocal ){

					userInfoByLocal = JSON.parse(userInfoByLocal);

					for(var i = 0, len = userInfoByLocal.length; i < len; i++){
						
						if( userInfoByLocal[i]['userName'] == name ){
							self.userFrom.userName = userInfoByLocal[i].userName;
							self.userFrom.pwd 	   = userInfoByLocal[i].pwd;

							self.loginUser(function(){
								self.initPages();
								self.visible2 = false;
							});
							break;
						}
					}
				}
			},

			// 打开统计页面
			openDataStatistics(){

				this.pageView = 'statisticsPage_sexTest_vue';
			},

			openDataStatisticstest(){
				this.pageView = 'aa';
			}
		},

		watch : {

			// 改变一级路径的状态
			pathType : function(){
				// console.log('pathType', this.pathType);
			},

			// 改变二级路由状态
			subTitleType : function(){

				this.notePage = 0;
				this.tips = '点击加载更多数据';

				if( this.pathType == 1 ){
					this.getNodeData();
				}else if( this.pathType == 3 ){
					this.getNodeDataByPlate();
				}else if( this.pathType == 5 && this.subTitleType == 0 ){
					this.getJingxuanNodeDataByBaozhao();
				}else if( this.pathType == 5 ){
					this.getNodeDataByBaozhao();
				}
				
			},

			// 改变三级目录的状态
			itemIndex : function(){

				// console.log(this.itemIndex);
			},

		}
	}
</script>

<style>
	@import './css/note.css';
</style>