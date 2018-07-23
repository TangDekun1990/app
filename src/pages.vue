<template>
	<div class="note">

		<div class="article">
			<!-- <h4 class="title" v-html="s_e_title"></h4>
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
			</div> -->

			<!-- 内容 Start -->
			<div class="show-content">
				<div class="show-content-free">
					<iframe :src="s_e_url" frameborder="0" style="min-height:400px;width:100%"></iframe>
				</div>
			</div>
			<!-- 内容 End -->
		</div>	

		<div class="note-bottom">
			<div class="comment-list">
				<div class="comment-post">
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
						    <span>{{es_hf_sum}}评论</span>
						    <a class="author-only">只看作者</a>
						    <a class="close-btn" style="display: none;">关闭评论</a>
						    <div class="pull-right">
						      <a class="active">按喜欢排序</a>
						      <a class="">按时间正序</a>
						      <a class="">按时间倒序</a></div>
						  </div>
						</div>

						<div class="comment">

							<div v-for="item in commentList" style="margin-top:20px">

							    <div>
							        <div class="author">
							            <div data-v-f3bf5228="" class="v-tooltip-container" style="z-index: 0;">
							                <div class="v-tooltip-content">
							                    <a href="/u/f304af1dc0c2" target="_blank" class="avatar">
							                        <img :src="item.p_us_img">
							                    </a>
							                </div>
							            </div>
							            <div class="info">
							                <a href="/u/f304af1dc0c2" target="_blank" class="name" v-html="item.p_user_name"></a>
				
							                <div class="meta">
							                    <span>2018.02.06 12:34</span>
							                </div>
							            </div>
							        </div>

							        <div class="comment-wrap">
							            <p v-html="item.com_content"></p>
							            <div class="tool-group">
							                <a class="">
							                    <i class="iconfont ic-zan"></i>
							                    <span>{{item.count}}人赞</span></a>
							                <a class="" @click="replyComment(item.p_user_name, item.com_id, item.s_e_id)">
							                    <i class="iconfont ic-comment"></i>
							                    <span>回复</span></a>
							                <a class="report" @click="reportComment(item.p_user_name, item.com_id, item.s_e_id)">
							                    <span>举报</span></a>
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
		
							        <div class="sub-comment more-comment" v-if="item.hf.length > 3">
							            <a class="add-comment-btn">
							                <i class="iconfont ic-subcomment"></i>
							                <span>添加新评论</span></a>
							            <span class="line-warp">还有{{item.hf.length}}条评论，
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
				s_e_title : '情侣间前戏怎么做才最有激情',
				s_e_url   : '',
				s_e_img : 'http://39.106.106.115/storage/uploads/46a01ecfe7c22aa321284142f741bec6.pn',
				s_name : '啪啪象',
				es_hf_sum : 2,
				commentList : [],
				commentContent : '',

				hfid : '',
				cmd_id : ''
			}
		},

		watch : {
			'$route' (to, from){

				// console.log('pageq' + JSON.stringify(to.query.page));

				this.getEssayInfo(to.query.page);
				this.getCommentList(to.query.page);
			}
		},

		methods : {

			// 获取文章内容
			getEssayInfo( pageid ){

				var _self = this;

				ajaxFn.getEssayInfo({
					id : pageid
				},function(res){

					// console.log( JSON.stringify( res.s_e_id ) );
					_self.s_e_id = res.s_e_id;
					_self.s_e_title = res.s_e_title;
					_self.s_e_img = res.s_e_img;
					_self.s_name = res.s_name;
					_self.es_hf_sum = res.es_hf_sum;
					_self.s_e_url = res.s_e_url;
					_self.commentContent = "";

				})
			},

			// 获取评论内容
			getCommentList( pageid ){
				var _self = this;

				ajaxFn.getCommentList({
					s_e_id : pageid,
					page   : 0
				},function(res){

					// console.log(res);
					_self.commentList = res.list;
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
				}


			},

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
				ajaxFn.sendCommentToEssayFn({
					rev_content : Base64.Base64.encode(this.commentContent),
					re_us_id    : this.hfid,
					com_id      : this.cmd_id 
				},function(){

					_self.getEssayInfo( _self.s_e_id );
				})
			},


			// 发送文章评论
			sendCommentToEssay(){

				var _self = this;
				// debugger
				ajaxFn.sendComment({
					com_content : Base64.Base64.encode(this.commentContent),
					s_e_id      : this.s_e_id
				},function(){

					_self.getEssayInfo( _self.s_e_id );
				})
			},

			btnCancel(){

				this.commentContent = "";
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