// JavaScript Document

$(function(){
	$('#btnSave').click(function(){
		save()
	});	
});
function showQuestion(strQuestion)
{
	if(strQuestion != "[快速选择密码提示问题]" && strQuestion != "================")
	{
		document.frmMain.question.value = strQuestion;
		document.frmMain.question.focus();
	}
}
function save()
{
	//姓名
	if($('#truename').val()== '')
	{
		alert("请输入您的姓名!");
		$('#truename').focus();
		return false;
	}
	//alert("性别前");
	//问题
	if($('#question').val() == '')
	{
		alert("请输入密码提示问题!");
		$('#question').focus();		
		return false;
	}
	//性别
	if($('#gender').val() == '')
	{
		alert("请选择您的性别!");
		return false;
	}
	//alert("性别后");
	//生日
	if($('#byear').val() == '' || $('#bmonth').val() == '' || $('#bday').val() == '')
	{
		alert("请输入您真实的生日,这将是您找回账号的重要凭证!");
		
		if($('#byear').val()=='')
		{
			$('#byear').focus();
		}
		else if($('#bmonth').val()=='')
		{
			$('#bmonth').focus();
		}else{
			$('#bday').focus();
		}

		return false;
	}
	
	//Email
	email = $('#email').val()
	pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g;


	if($('#email').val() == '')
	{
		alert("请输入您的电子邮箱!");
		$('#email').focus();		
		return false;
	}

	if(!pattern.test(email))
	{
		alert("请输入正确的电子邮箱!");
		$('#email').focus();
		return false;
	}
	
	//当前密码
	if($('#password').val()== '')
	{
		alert("请输入当前使用的密码!");
		$('#password').focus();
		return false;
	}
	$('#btnSave').attr('disabled',true);
	var url = 'saveInfo';
	$.post(url, $("#frmMain").serialize(),function(data){
			   $('#btnSave').attr('disabled',false);
				//alert("修改成功");//data.error
				if(data==1)
				{
					alert('个人资料修改成功!');
					window.location.href='infodetail';
				}
				else
				{
					alert("密码不正确");
					return false;
				}
	 }, "json");
}