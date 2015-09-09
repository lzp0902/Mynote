<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="记事本，网络记事本，在线记事本，网络相册，日记本" />
<meta name="description" content="tquan网络记事本，安全、便捷、稳定的云端记事本。提供包括记事、随笔、日记本、收藏夹、短信备
	忘和无限容量的网络相册。采用安全的加密访问，支持手机同步浏览。" />
<title>云笔记</title>
<link href="./css/themes/main/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./js/jquery/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="./css/thickbox/thickbox.js"></script>
<link type="text/css" href="./css/thickbox/thickbox.css" rel="stylesheet" />
<script type="text/javascript" src="./js/common.js"></script>
</head>
<body>
	<div id='header'>
		<div id="header_top">
				<div id="header_title">
					<h1 class="header">记事本</h1>
					<div class="description">轻松自在随风飘,天地悠悠任我闯.</div>
				</div>
			<div id="header_slogan" style="text-align:right;">
				安全、便捷、稳定的云端记事本 <br />
			</div>
			<div class="clear"></div>
		</div>
		<div id="header_menu">
			<div class="left">
				<ul class="menu_list">
					<li class="first"><a href="javascript:void(0)" target="_parent">主页</a></li>
					<li><a href="post" target="_parent">随笔</a></li>
					<li><a href="note" target="_parent">记事本</a></li>
					<li><a href="favorite" target="_parent">收藏夹</a></li>
					<li><a href="album" target="_parent">相册</a></li>
					<li><a href="feedbacklist" target="_parent">帮助我们提高</a></li>
				</ul>
				<div class="left" style="line-height:16px; margin-top:3px;">
					家，世界上最重要的地方!</div>
			</div>
			<div class="right">
				<ul class="menu" style="line-height:16px; margin-top:3px;">
					<li class="first"><a href="index" target="_parent">登录</a>
					</li>
					<li><a href="register" target="_parent">注册</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="index_main">
		<div id="index_left">
			<div id="logo_main">
				<img src="./css/themes/main/images/xnote.logo.gif">
			</div>
			<div id="intro">
				<ul>
					<li></li>
					<li><div class="title">简洁</div>
						<span>风格简洁，拥有随笔、记事本、相册、收藏夹等功能</span>
					</li>
					<li><div class="title">快速</div>
						<span>专门针对电信和联通进行优化，加快数据访问速度</span>
					</li>
					<li><div class="title">安全</div>
						<span>采用https加密连接访问，保证数据传输安全</span>
					</li>
					<li><div class="title">随身</div>
						<span>支持手机访问，带上手机随时随地做记录</span>
					</li>
					<li></li>
				</ul>
			</div>
		</div>
		<div id="index_right">
			<div>
				<br/> <span>手机版：http://m.tquaner.com</span> <br /> <br /> <span>推荐使用：
				<a href='javascript:void(0)' style="text-decoration:underline;">一键添加!</a>
				</span>
			</div>
			<div style="margin:20px 0; font-size:15px;">
				<form method="post" name="frmLogin" id="frmLogin">
					<div style="margin:10px 0;">
						<label>用户名</label> <input name="username" type="text"
							id="username" value="" maxlength="20" class="login" />
					</div>
					<div style="margin:10px 0;">
						<label>密&nbsp;&nbsp;&nbsp;码</label> <input name="password" type="password"
							id="password" value="" maxlength="30" class="login" />
						&nbsp;&nbsp;<a href="getpass">忘记密码了?</a>
					</div>
					<div style="margin:10px 0; padding-left:40px;">
						<input type="checkbox" name="autologin" id="autologin" value="1"
							class="chk" style="line-height:30px; vertical-align:middle;" />
						<label for="autologin">自动登录</label>
						<div id="safetips" class="hide">提示：请不要在网吧或公用电脑上选择此项</div>
						<div id="loading" class="hide" style="margin:10px 0;">
							<img src="./images/loading.16.gif" align="absmiddle" />正在登录...
						</div>
						<div id="buttons" style="margin-top:10px;">
							<input id="btnLogin" type="submit" value="登录" class="btn btn_def"
								onmouseout="this.className='btn btn_def'"
								onmouseover="this.className='btn btn_def_hv'" />
						</div>
					</div>
					<div style="margin:15px 0; padding-left:40px;"></div>
				</form>
			</div>
			<div>
				还没有开通网络记事本？<a href="register" class="uline">立即注册</a>
			</div>
			<br />
		</div>
	</div>
	<script language="JavaScript" type="text/javascript">
		if (top != self) {
			window.parent.tb_remove();
			window.parent.location.href = '/';
		}
		var childWindow;
		function toQzoneLogin() {
			childWindow = window.open("/connect/qq/oauth/redirect_to_login.php",
							"TencentLogin",
							"width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
		}
		function closeChildWindow() {
			childWindow.close();
		}
		$(function() {
			$('#btnLogin').click(function() {
				login()
				return false;
			});
			$('#username').focus(function() {
				$(this).addClass('highlight1');
			}).blur(function() {
				$(this).removeClass('highlight1');
			});
			$('#password').focus(function() {
				$(this).addClass('highlight1');
			}).blur(function() {
				$(this).removeClass('highlight1');
			});
			$('#btnTry').click(function() {
				window.location.href = '/member/mengmeng/';
			});
			$('#autologin').click(function() {
				if (this.checked) {
					$('#safetips').show();
				} else {
					$('#safetips').hide();
				}
			});
		});
		function login() {
			var username = $('#username').val();
			var password = $('#password').val();
			if (username == '') {
				alert('请输入用户名!');
				$('#username').focus();
				return false;
			}
			if (password == '') {
				alert('请输入登录密码!');
				$('#password').focus();
				return false;
			}
			$('#loading').show();
			$('#buttons').hide();
			var url = 'tologin';
			$.post(url, $("#frmLogin").serialize(),function(data){
				   $('#btnLogin').attr('disabled',false);
					if(data=="账号或密码错误"||data=="账号不存在！")
					{
						alert(data);
						$('#loading').hide();
						$('#buttons').show();
						return false;
					}
					else
					{
						window.location.href = 'note';
					}
		 }, "json");
		}
	</script>
	<%@ include file="footer.jsp"%>
	<script type="text/javascript" src="./js/stats.js"></script>
</body>
</html>