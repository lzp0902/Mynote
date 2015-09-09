// JavaScript Document

var timer = 0;
var draftTimer;
var intLastSaveTime  = 0;
var intSecPerMin = 60 * 1000;	//每分钟的秒数，可以改小点用于调试

$(function(){

	$('#timer').change(function(){
								
		clearInterval(draftTimer);	
		
		var m = $(this).val();
				
		switch(m)
		{
			case '1':
			case '2':
			case '5':
				draftTimer	= setInterval(saveDraft, m * intSecPerMin);
				break;
			case '0':
				$('#autosave_tips').hide();
				break;				
			default:
		}
	});

	$('#linkNewCategory').click(function(){
			$(this).hide();
			$('#frmNewCategory').show();
	});
	
	$('#btnNewCategoryCannel').click(function(){
			$('#frmNewCategory').hide();
			$('#linkNewCategory').show();
	});
	
	$('#newCategory').keypress(function(event) {
	  if (event.keyCode == '13') {
			//防止回车时提交表单
			return false;
			event.keyCode == null;
			$('#btnNewCategory').click();
	   }
	});
											
	$('#btnNewCategory').click(function(){
		var name = $('#newCategory').val();
		
		if(name == '')
		{
			alert('请输入分类名称!');
			$('#newCategory').focus();
			return false;
		}
		
		var url = '/api/note/saveCategory/?categoryname=' + encodeURI(name);
		
		$('#btnNewCategory').attr('disabled',true);
		
		$.getJSON(url,function(data){
			   
			   $('#btnNewCategory').attr('disabled',false);
			   
				if(data.error)
				{
					alert(data.error);
					return false;
				}
				else
				{
					addOption(data.id,data.name);
					$('#newCategory').val('');
					$('#frmNewCategory').hide();
					$('#linkNewCategory').show();
					return true;
				}
		   });
		
	});
		
	$('#btnSave').click(function(){
			if(checkForm())
			{	
				saveNote();
			}
	});
	
	$('#btnSaveTop').click(function(){
		$('#btnSave').click();
	});
	
	$('#btnSaveDraft').click(function(){
			saveDraft();
	});
	
	var m = $('#timer').val();
	if(m > 0)
	{
		draftTimer = setInterval(saveDraft, m * intSecPerMin);
	}
	
	
	lastSaveTimer = setInterval(showLastSave, intSecPerMin);
});

function checkForm()
{
	if($('#title').val() == '')
	{
		alert('请输入标题!');
		$('#title').focus();
		return false;
	}
	var content = FCKeditorAPI.GetInstance('content').GetXHTML( true );
	if(content == '')
	{
		alert('请输入内容!');
		FCKeditorAPI.GetInstance('content').Focus(); 
		return false;
	}
	return true;
}

function addOption(id,name)
{
	var c = document.getElementById('categoryid');
	c.options[c.length]=new Option(name,id);
	c.options[c.length-1].selected = true;

	return true;
}

function saveNote()
{
	$('#loading').show();
	$('#buttons').hide();
	 
	var content = FCKeditorAPI.GetInstance('content').GetXHTML( true );
	
	$('#content').val(content);
	
	var url = 'add.action';
	$.post(url, $("#frmMain").serialize(),function(data){
			   $('#btnSave').attr('disabled',false);
				if(data.error)
				{
					alert(data.error);
					$('#loading').hide();
					$('#buttons').show();
					return false;
				}
				else
				{
					window.location.href='note';
				}
	 }, "json");
}

function saveDraft()
{
	timer ++;
	
	var content = FCKeditorAPI.GetInstance('content').GetXHTML( true );
	//var a = $('#content').val();
	if(content == $('#content').val())
	{
		//timer ++;
		//$('#autoSaveStatus').html('不需要保存' + timer + "<hr>" + content + "<hr>" + a );
		return false;
	}
	
	$('#autosave_tips').show();
	
	$('#autosaveing').show();
	$('#autoSaveStatus').hide();
	
	$('#content').val(content);
	
	//var content = $('#content').val();
	
	var url = '/api/note/saveDraft/';
	$.post(url, $("#frmMain").serialize(),function(data){
				if(data.error)
				{
					$('#autoSaveStatus').html(data.error);
					alert(data.error);
					return false;
				}
				else
				{
					$('#autosaveing').hide();
					$('#autoSaveStatus').show();
					
					$('#draftid').val(data.draftid);
					//最后保存时间
					intLastSaveTime	= new Date().getTime();
					showLastSave();
				}
	 }, "json");
}

function showLastSave()
{
	if(intLastSaveTime == 0) return false;
	strTips	= getDateDiff(intLastSaveTime);
	$('#autoSaveTime').html(strTips);
}

function getDateDiff(dateTimeStamp)
{

	var second = 1000;
	var minute = second * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	 
	if(diffValue < 0){
		 //非法操作
		 //alert("结束日期不能小于开始日期！");
		 return false;
	 }
	 
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
	var secC =diffValue/second;
	 
	if(monthC>=1){
		result= parseInt(monthC) + "个月前";
	}
	else if(weekC>=1){
		result= parseInt(weekC) + "个星期前";
	}
	else if(dayC>=1){
		result= parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result= parseInt(hourC) +"个小时前";
	}
	else if(minC>=1){
		result= parseInt(minC) +"分钟前";
	}
	else if(secC>=2){
		result= parseInt(secC) +"秒前";
	}else{
		result="刚刚";
	}
	
	return result;
}