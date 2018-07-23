<template>
	<div class="note">

		<div class="article">
			<h4 class="title" v-html="s_e_title"></h4>
			<div class="author">
				<a href="" class="avatar">
					<img :src="s_e_img" alt="">
				</a>
				<div class="info">
					<span class="name" v-html="s_name">
					</span>
					<div class="meta">
						<span class="publish-time">2018.02.3</span>
					</div>
				</div>
			</div>

			<!-- 内容 Start -->
			<div class="show-content">
				<div class="show-content-free" >
					
					<div v-html="s_e_content"></div>
					
					<div v-for="imgurl in s_e_imgs" class="imgs-contents">
						<img :src="imgurl" alt="">
					</div>
				</div>
			</div>
			<!-- 内容 End -->
		</div>	

		<div class="note-bottom">
			<div class="comment-list">
				<div class="comment-post">

					<div class="score-panel">
						<div class="block-score-title">
							赶快来给他评分吧
						</div>
						<div class="block block-score">
						  <span class="demonstration" v-html="value1_tips"></span>
						  <el-rate
						    v-model="value1"
						    show-text
						    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						  </el-rate>
						</div>
						<div class="block block-score">
						  <span class="demonstration" v-html="value2_tips"></span>
						  <el-rate
						    v-model="value2"
						    show-text
						    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						  </el-rate>
						</div>
						<div class="block block-score">
						  <span class="demonstration" v-html="value3_tips"></span>
						  <el-rate
						    v-model="value3"
						    show-text
						    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						  </el-rate>
						</div>	

						<div class="score-content">
							<span v-html="score"></span>分
						</div>					
					</div>


					<form action="" class="new-comment">
						<a href="" class="avatar">
							<img :src="userHdImg" alt="">
						</a>
						<textarea placeholder="写下你的评论..." v-model="commentContent"></textarea>
						<div class="write-function-block">
							<div class="emoji-modal-wrap"></div>
							<div class="hint">Ctrl+Enter 发表</div>
							<a href="javascript:void(0)" class="btn btn-send" @click="btnSendComment">发送</a>
							<a href="javascript:void(0)" class="cancel" @click="btnCancel">取消</a>
						</div>
					</form>
				</div>

				<div class="normal-comment-list">
					<div>

						<div>
						  <div class="top-title">
						    <span>{{commentList.length}}评论</span>
						    <a class="author-only">只看作者</a>
						    <a class="close-btn" style="display: none;">关闭评论</a>
						    <div class="pull-right">
						      <a class="active">按喜欢排序</a>
						      <a class="">按时间正序</a>
						      <a class="">按时间倒序</a></div>
						  </div>
						</div>

						<div class="comment">

							<div v-for="item in commentList" class="comment-list-item">

							    <div>
							        <div class="author">


							            <div class="v-tooltip-container" style="z-index: 0;">
							                <div class="v-tooltip-content">
							                    <a href="/u/f304af1dc0c2" target="_blank" class="avatar">
							                        <img :src="item.p_us_img">
							                    </a>
							                </div>
							            </div>

							            <div class="info">
							                <a href="/u/f304af1dc0c2" target="_blank" class="name" v-html="item.p_user_name"></a>
											<div class="meta">
							                    <span v-html="convertDate(item.com_time)"></span>
							                </div>
							            </div>
							        </div>

							        <div class="comment-wrap">
							            <p v-html="item.com_content"></p>
								       	<div class="tool-group">
								                <a class="javascript:void(0)" @click="sendZan(item.com_id)">
								                    <i class="iconfont ic-zan"></i>
								                    <span>{{item.sum_praise || 0}}人赞</span>
								                </a>
								        </div>
								    </div>
							    </div>

							    <div class="sub-comment-list" v-if="item.hf.length >= 1" >
				        			
				        			<div  class="sub-comment" v-for="subComment in item.hf">
							            <p>
							                <div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;">
							                    <div class="v-tooltip-content">
							                        <a href="/u/becfd1bf1231" target="_blank" v-html="subComment.us_name"></a>：</div>
							                </div>
							                <span v-html="subComment.rev_content">

							               	</span>
							            </p>
							            <div class="sub-tool-group">
							                <span v-html="subComment.rev_time"></span>
							                <a class="">
							                    <i class="iconfont ic-comment"></i>
							                    <span></span>
							                </a>
							                <a class="report">
							                    <span>举报</span>
							                </a>
							            </div>
							        </div>
		
							        <div class="sub-comment more-comment" v-if="item.hf.length >= 3">
						
							            <span class="line-warp">还有{{item.count}}条评论，
							                <a>展开查看</a>
							            </span>
							        </div>							    
			
							    </div>

						    </div>

						</div>

					</div>
				</div>
			</div>
		</div>

	    <div class="moreComment" @click="openMoreCommentByPlate()">
	    	查看更多评论
	    </div>
	</div>
</template>

<script type="text/javascript">

	import ajaxFn from './Ajax.js'
	import Base64 from 'js-base64'
	
	export default {
		data (){
			return {
				userHdImg : '',
				s_e_id : 9,
				s_e_title : '',
				s_e_content   : '',
				s_e_imgs : [],
				s_e_img : 'http://39.106.106.115/storage/uploads/46a01ecfe7c22aa321284142f741bec6.pn',
				s_name : '',
				es_hf_sum : 2,
				commentList : [],
				commentContent : '',

				hfid : '',
				cmd_id : '',

				score  : 0,
				value1_tips : '',
				value1 		: 0,

				value2_tips : '',
				value2 		: 0,

				value3_tips : '',
				value3 		: 0,

				page : 1,

				commentPage : 0
			}
		},

		watch : {
			'$route' (to, from){

				// console.log('pageq' + JSON.stringify(to.query.page));

				this.s_e_id = to.query.page;
				this.commentPage   = 0;

				this.getEssayInfo(to.query.page);
				this.getCommentList(to.query.page);
			}
		},

		methods : {

			sendZan( commentId ) {
				if( commentId ) return;

				
			},

			getCommentList( pageid ){

				var _self = this;

				ajaxFn.getBaoZhaoCommentList({
					es_id : pageid,
					page  : this.commentPage++	
				},function(res){
					_self.commentList = res.pl;
					console.log( 'comments' + JSON.stringify( res ) );

				})
			},

			// 获取文章内容
			getEssayInfo( pageid ){

				var _self = this;

				ajaxFn.getBaozhaoInfo({
					es_id : pageid,
					page  : 0,
					type  : 0,
					nature : 0
				},function(res){

					// console.log( 'ssss' + JSON.stringify( res ) );

					_self.s_e_id = res.es_id;
					_self.s_e_title = res.es_content;
					_self.s_e_img = res.us_img;
					_self.s_name  = '';
					_self.es_hf_sum = res.sum_integral;
					_self.s_e_content = res.es_content;
					_self.commentContent = "";
					_self.s_e_imgs = res.es_img.split(';');

					_self.value1_tips = res.label[0]['title'];
					_self.value2_tips = res.label[1]['title'];
					_self.value3_tips = res.label[2]['title'];
					_self.value1	  = 0;
					_self.value2	  = 0;
					_self.value3	  = 0;
					_self.score 	  = res.score;


					// _self.commentList = res.pl;
				})
			},


			// 回复评论
			replyComment( name, cmd_id, s_e_id){

				// console.log('name' + name);
				// console.log('cmd_id' + cmd_id);
				// console.log('s_e_id' + s_e_id);

				this.commentContent = "@"+name;
				this.cmd_id = cmd_id;
				this.hfid = s_e_id;
			},

			reportComment(name, cmd_id, s_e_id){

				this.commentContent = "#"+name;
				this.cmd_id = cmd_id;
				this.hfid = s_e_id;				
			},

			// 发送评论内容
			btnSendComment(){

				if(this.commentContent == '' || !this.commentContent){

					this.$message({
						type : 'warning',
						message : '请输入评论信息'
					})
					return;
				}

				var _self = this;
				// console.log( this.commentContent );
				// 如果包含@就说明是对回复的内容进行评论
				// 包含#就说明是对回复的内容进行举报
				if( this.commentContent.indexOf('@') == 0 ){
					_self.sendCommentToReplyComment();	

				}else if( this.commentContent.indexOf('#') == 0){

					_self.reportCommentToReplyComment();
				}else{
					_self.sendCommentToEssay();
					_self.sendPlateScore();
				}


			},

			// 举报评论
			reportCommentToReplyComment(){

				var _self = this;
				// debugger
				ajaxFn.sendCommentToEssayFn({
					re_es_con : Base64.Base64.encode(this.commentContent),
					rev_id    : this.hfid
				},function(){

					_self.getEssayInfo( _self.s_e_id );
				})

			},

			// 对评论的内容进行评论
			sendCommentToReplyComment(){

				var _self = this;
				// debugger
				ajaxFn.sendCommentToPlateByEssayFn({
					rev_content : Base64.Base64.encode(this.commentContent),
					re_us_id    : this.hfid,
					com_id      : this.cmd_id 
				},function(){

					_self.getEssayInfo( _self.s_e_id );
				})
			},

			// 发送文章的评论分数
			sendPlateScore() {

				if( this.value1 == '' && this.value2 == '' && this.value3 == '' ) return;

				ajaxFn.sendPlateScore({
					es_id		: this.s_e_id,
					labela		: this.value1,
					labelb		: this.value2,
					labelc		: this.value3
				},function(){

				})
			},

			// 发送文章评论
			sendCommentToEssay(){

				var _self = this;
				// debugger
				ajaxFn.sendCommentToPlate({
					com_content : Base64.Base64.encode(this.commentContent),
					es_id      : this.s_e_id
				},function(){

					_self.getEssayInfo( _self.s_e_id );
				})
			},

			btnCancel(){

				this.commentContent = "";
			},

			openMoreCommentByPlate(){

				var _self = this;

				ajaxFn.getPlateInfo({
					es_id : this.s_e_id,
					page  : this.page++,
					type  : 0,
					nature : 0
				},function(res){

					_self.commentList = _self.commentList.concat( res.pl );
				})
			},

			convertDate( timespan ) {

				// console.log(timespan);

			    var date = new Date();  
			    date.setTime(timespan * 1000);  
			    var y = date.getFullYear();      
			    var m = date.getMonth() + 1;      
			    m = m < 10 ? ('0' + m) : m;      
			    var d = date.getDate();      
			    d = d < 10 ? ('0' + d) : d;      
			    var h = date.getHours();    
			    h = h < 10 ? ('0' + h) : h;    
			    var minute = date.getMinutes();    
			    var second = date.getSeconds();    
			    minute = minute < 10 ? ('0' + minute) : minute;      
			    second = second < 10 ? ('0' + second) : second;     
			    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

			}
		},

		mounted : function(){

			var userInfo = sessionStorage.getItem('PAPABEIPCHOUTAI');

			if( userInfo ){

				userInfo = JSON.parse(userInfo);
				this.userHdImg = userInfo.img;
			}
			
		}
	}
</script>

<style>
	.moreComment{
		padding-left : 20px;
		padding-bottom : 10px;
		cursor: pointer;
	}
	.imgs-contents{
		margin-top : 10px;
	}
	.imgs-contents img{
		width : 500px;
	}
	.block-score-title,
	.block-score{
		width: 300px;
	    margin: 10px auto;
	}
	.block-score-title{
		text-align: left;
		width: 200px;
	}
	.demonstration{
		float : left;
		margin-right : 10px;
		width : 80px;
	}

	.comment-list-item{
		margin-top : 20px;
		border-bottom: 1px solid #f0f0f0;
	}


	.score-panel{
		position: relative;
	}
	.score-content{
		position: absolute;
	    right: 20%;
	    top: 40%;
	    font-size: 30px;
	    font-style: italic;
	    color: rgb(247, 186, 42);

	}
	.score-content span{
		margin-right : 5px;
	}
</style>