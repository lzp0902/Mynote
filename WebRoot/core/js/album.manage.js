// JavaScript Document

var strGlobalAction = '';
var intGlobalId		= 0;

$(function(){
	
	$("#album_manage_list li").hover(
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;
				
		var code = $('#act_template').html();
		code = code.replace(/\[ID\]/g,key);
		
	  	$(act).html(code);
	  	//$(act).html($('#action').html());
       	$(this).addClass('hover');
      }, 
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;		 
		intGlobalId	= 0;
		$(act).html('');
      	$(this).removeClass('hover');
      }
	);
	  
   $(":checkbox.item").click(function(){
									  
   		var chk = '#chk_' + $(this).attr('key');
   		var li = '#item_' + $(this).attr('key');
		
		if($(chk).attr("checked"))
		{
			//$(chk).attr("checked",false);
			$(li).addClass('selected');
		}
		else
		{
			//$(chk).attr("checked",true);
			$(li).removeClass('selected');
		}
	});		   
		   
	$('#chkAll').click(function(){
			$("input:checkbox").check();					 
	});
	
	$('#chkNone').click(function(){
			$("input:checkbox").check('off');					 
	});
	
	$('#chkToggle').click(function(){
			$("input:checkbox").check('toggle');					 
	});
		
		
	$('#btnSave').click(function(){
		save();
	});
	
	$('#btnCancel').click(function(){
		$('#quick_add').slideUp();
	});
	
	$('#btnDelete').click(function(){
			if(confirm('确定要删除选定的相册及相册中的照片?')) doBatch('delete');			
			return true;
	});
	
	$('#btnRecycle').click(function(){
			if(confirm('确定要把选中的照片放入回收站吗?')) doBatch('recycle');			
			return true;
	});
	
		   
});


function doMove()
{
	$('#batch_type').val('move');
	
	var moveto = $('#moveto_select').val();
	
	$('#moveto_categoryid').val(moveto);
	
	$('#frmMain').submit();
}


function recycle(id)
{
		if(confirm('确定要放入回收站吗?'))
		{
			doRecycle(id);
		}
		
		return true;
}

function setOrder(id,type)
{
	var url = '/api/album/setOrder/?type=' + type + '&id=' + id;
	$.getJSON(url,function(data){
							
			if(data.error)
			{
				alert(data.error);
				return false;
			}
			else
			{
				window.location.reload();
			}								
							
	});
		
}

function doBatch(type)
{
	 $('#batchType').val(type);
	 
	var url = '/api/album/batch/';
	
	$.post(url, $("#frmMain").serialize(),function(data){
			   
				if(data.error)
				{
					alert(data.error);
					return false;
				}
				else
				{
					alert('操作成功!');
					window.location.reload();
				}
 }, "json");

}


function edit(id)
{
	alert("id--:"+id);
	var url = '/api/album/get/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			alert("chenggong");
			 resetForm();
			 $("#albumname").val(data.albumname);
			 $("#description").val(data.description);
			 $("#id").val(data.albumid);
			 $('#quick_add').slideDown(function(){$('#url').focus();});
		}
	 });
}
function save()
{
	 
	if($('#url').val() == '')
	{
		alert('请输入URL!');
		$('#url').focus();
		return false;
	}
	 
	$('#btnSave').attr('disabled',true);
	var url = '/api/album/save/';
	
	$.post(url, $("#frmAdd").serialize(),function(data){
	   $('#btnSave').attr('disabled',false);
	   
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			alert('操作成功！');
			window.location.reload();
		}
	 }, "json");
	
}


function resetForm()
{

	 $("#albumname").val('');
	 $("#description").val('');
	 $("#id").val('');
	 
	 return true;
	
}


function del(id)
{
		if(confirm('确定要删除相册及相册里所有的照片吗?\r\n\r\n警告：此操作不可恢复！'))
		{
			doDel(id);
		}
		
		return true;
}

function doRecycle(id)
{	 
	var url = '/api/album/recycle/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			$('#item_'+id).slideUp();
		}
 });
}

function doRestore(id)
{	 
	var url = '/api/album/restore/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			alert('操作成功!');
			window.location.reload();
		}
 });
}

function doDel(id)
{	 
	var url = '/api/album/delete/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			$('#item_' + id).slideUp();
		}
 });

}

