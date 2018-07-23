
var CryptoJS = require("crypto-js");

var key =  CryptoJS.enc.Utf8.parse('7db9ed0c70fdfd28');
var iv = CryptoJS.enc.Utf8.parse('b7e65dffe0175837');



var

	baseUrl = 'http://m.houyipapa.com/',
	// baseUrl = 'http://123.206.82.39/',

	bDebug = true,

	_timeOut = 5000,

	timeObj = null;


function start(path, data, callback, errorCallback, files, bReport){

	var ajax = function(){

		var ajaxConfigs = {
			type 	 : 'POST',
			url 	 :  baseUrl + path,
			data 	 :  {},
			dataType : 'text',
			headers  : {'type' : 3},
			timeout  : _timeOut,
			success  : function( res ){

				// 需要对数据进行解密并转换成JSON对象
				res = aesDecrypt(res, key, iv);

				res = JSON.parse(res);

				// console.log("res" + JSON.stringify( res ) )

				if( res && res.state == 1 ){

					callback && callback( res );

					// sattus = 1001 登陆失效
				} else {

					// _.toast( res.message );

					errorCallback && errorCallback( res.msg, res );
				}

			},
			error : function( er ){
				errorCallback && errorCallback( "请检查网络环境" );
			}
		}

		var userInfo = sessionStorage.getItem("PAPABEIPCHOUTAI");
		// debugger
		if( userInfo ) {

			userInfo = JSON.parse( userInfo );

			$.extend(data, {
				us_id  : userInfo.us_id,
				token : userInfo.token
			});
		}else{

			$.extend(data,{
				token : 'KO8vPXaARiqh'
			})
		}

		console.log('解密' + JSON.stringify(data));

		// 需要对数据进行加密
		$.extend(ajaxConfigs.data,{
			body : aesEncrypt( JSON.stringify(data), key, iv )
		})

		// var res = aesDecrypt(ajaxConfigs.data, key, iv);
		// console.log('ajaxConfigs' + JSON.stringify( ajaxConfigs.data ) )
		// console.log('ajaxConfigs' + JSON.stringify( ajaxConfigs.url ) )
		$.ajax( ajaxConfigs );
	}

	if( bDebug ) {
		ajax();
	}
}

/**
 * 加密
 * https://github.com/brix/crypto-js/tree/develop/test
 * https://zhidao.baidu.com/question/1819427615658816228.html
 * @param  {[type]} data [description]
 * @param  {[type]} key  [description]
 * @return {[type]}      [description]
 */
function aesEncrypt(data, key, iv) {

    var encrypted = CryptoJS.AES.encrypt(data, key, {
    	iv : iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString();
}

/**
 * 解密
 * @param  {[type]} encrypted [description]
 * @param  {[type]} key       [description]
 * @return {[type]}           [description]
 */
function aesDecrypt(encrypted, key, iv) {

	var encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
	var encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHexStr);

    var decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
    	iv : iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);// 转换为 utf8 字符串
    return decrypted;
}

var Models = {

	//获取圈子的接口
	getFoundinfo : function(params, callback, errorCallback){

		return start('plateshow', params, callback, errorCallback);
	},

	// 获取专栏列表
	getSpecial : function(params, callback, errorCallback){

		return start('special', params, callback, errorCallback);
	},

	// 获取专栏详情
	getEssayInfo : function(params, callback, errorCallback){

		return start('s_essayinfo', params, callback, errorCallback);
	},

	// 获取专栏评论
	getCommentList : function(params, callback, errorCallback){

		return start('commentall', params, callback, errorCallback);
	},

	// 登陆
	login : function(params, callback, errorCallback){

		return start('loginCheck', params, callback, errorCallback);
	},

	// 发表评论
	sendComment : function(params, callback, errorCallback){

		return start('specialpadd', params, callback, errorCallback);
	},

	// 对评论的内容进行回复
	sendCommentToEssayFn : function(params, callback, errorCallback){

		return start('specialreply', params, callback, errorCallback);
	},

	// 对评论的内容进行举报
	repostrevertComment : function(params, callback, errorCallback){

		return start('specialrepostrevert', params, callback, errorCallback);
	},

	// 获取帖子板块列表
	getPostInfo : function(params, callback, errorCallback){

		return start('plateshow', params, callback, errorCallback);
	},	

	// 获取热门帖子列表
	getHotPlateList : function(params, callback, errorCallback){

		return start('foundinfo1', params, callback, errorCallback);
	},	

	// 获取帖子列表
	getPlateInfoList : function(params, callback, errorCallback){

		return start('plateinfo', params, callback, errorCallback);
	},	

	// 获取帖子正文
	getPlateInfo : function(params, callback, errorCallback){

		return start('foundshow', params, callback, errorCallback);
	},	

	// 给帖子发表评论
	sendCommentToPlate : function(params, callback, errorCallback){

		return start('reviewadd', params, callback, errorCallback);
	},	

	// 给帖子发表评论进行回复
	sendCommentToPlateByEssayFn : function(params, callback, errorCallback){

		return start('replyadd', params, callback, errorCallback);
	},	

	// 举报帖子评论内容
	repostrevertCommentToPlate : function(params, callback, errorCallback){

		return start('repostrevert', params, callback, errorCallback);
	},	

	// 发送帖子
	sendEssayadd  : function(params, callback, errorCallback){

		return start('essayadd', params, callback, errorCallback);
	},	

	// 获取爆照分类
	getBaozhaoList : function(params, callback, errorCallback){

		return start('addinfo', params, callback, errorCallback);
	},	

	// 获取爆照列表数据
	getBaozhaoListInfo : function(params, callback, errorCallback){

		return start('typebz', params, callback, errorCallback);
	},	

	// 获取精选爆照列表数据
	getJinxuanBaozhaoList : function(params, callback, errorCallback){

		return start('indexzy', params, callback, errorCallback);
	},	

	// 爆照
	sendBaozaho : function(params, callback, errorCallback){

		return start('addessay', params, callback, errorCallback);
	},	

	// 爆照详情
	getBaozhaoInfo : function(params, callback, errorCallback){

		return start('infobz', params, callback, errorCallback);
	},	

	// 爆照评分
	sendPlateScore : function(params, callback, errorCallback){

		return start('score', params, callback, errorCallback);
	},	

	// 爆照评论的列表
	getBaoZhaoCommentList : function(params, callback, errorCallback){

		return start('commentsall', params, callback, errorCallback);
	},	

	// 获取统计数据
	getAwardStatistical : function(params, callback, errorCallback){

		return start('award_cs_statistical', params, callback, errorCallback);
	},	
}

// module.exports = Models;

export default Models;

