// JavaScript Document

$(function(){
	$('#btnCancel').click(function(){
		$('#content').val('');
		$('#quick_post').slideUp();
	});
	$('#btnSave').click(function(){
		save()
	});	
});

function save()
{
	$('#btnSave').attr('disabled',true);
	var url = 'savePreferences';
	$.post(url, $("#frmMain").serialize(),function(data){
			   $('#btnSave').attr('disabled',false);
				if(data==1)
				{
					alert('数据保存成功!');
					window.location.href='preference';
				}
				else
				{
					alert(data.error);
					return false;
				}
	 }, "json");
}