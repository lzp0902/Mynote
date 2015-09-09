// JavaScript Document

var strGlobalAction = '';
var intGlobalId		= 0;

$(function(){
	
	$("#favo_list li").hover(
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
		   

	$('#btnSearch').click(function(){
		   $('#main_search').slideToggle();
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
		
	$('#btnYes_Move').click(function(){
		doMove();
	});
	
	$('#btnShowMore').toggle(function(){
			$("#quick_add").addClass('more');
	},
function(){
			$("#quick_add").removeClass('more');
	}	
	);
	
	
	$('#btnSave').click(function(){
		save();
	});
	
	
	$('#btnAdd').click(function(){
		resetForm();
		$('#quick_add').slideToggle(function(){$('#url').focus();});
	});
	
	$('#_btnAdd').click(function(){
		resetForm();
		$('#quick_add').slideToggle(function(){$('#url').focus();});
	});
	
	
	$('#btnCannel').click(function(){
		$('#quick_add').slideToggle();
	});	
	
	$('#btnYes_Move').click(function(){
		doMove();
	});
	
	
	
	/* note.recycle */
	$('#btnRestoreAll').click(function(){
									   
		if(!confirm('确定要还原所有收藏吗?'))
		{
			return false;
		}
									   
		var url = '/api/favorite/restoreAll/';
		$.getJSON(url,function(data){
			if(data.error)
			{
				alert(data.error);
				return false;
			}
			else
			{
				alert('操作成功！回收站中的收藏已经全部还原！');
				window.location.reload();
			} });
			
	});	
	
	$('#btnDeleteAll').click(function(){
									  
		if(!confirm('确定要彻底删除回收站里的所有收藏吗?\r\n\r\n警告：此操作不可恢复，请谨慎操作！'))
		{
			return false;
		}
									   
									   
		var url = '/api/favorite/deleteAll/';
		$.getJSON(url,function(data){
			if(data.error)
			{
				alert(data.error);
				return false;
			}
			else
			{
				alert('操作成功！回收站中的收藏已经全部删除！');
				window.location.reload();
			}
		});
									  
			
	});	
	
	
		   
});

function showAction(action)
{
	strGlobalAction = action;
	
	switch(action)
	{
		case 'recycle':
			$('#tbTipsContent').html('确定要把选中的收藏放入回收站吗?');
			tb_show('确认删除','#TB_inline?&height=100&width=320&inlineId=TB_Tips&modal=true');
			break;
		case 'share':
			$('#tbTipsContent').html('确定“公开”选中的收藏吗?','doAction(\'share\')');
			tb_show('公开收藏','#TB_inline?&height=100&width=320&inlineId=TB_Tips&modal=true');	
			break;
		case 'move':
			 tb_show('修改分类','#TB_inline?&height=120&width=320&inlineId=TB_move&modal=true');
			break;
		case 'hide':
			$('#tbTipsContent').html('确定把选中的收藏状态设为“私密”吗?');
			tb_show('隐藏收藏','#TB_inline?&height=100&width=320&inlineId=TB_Tips&modal=true');	
			break;
		case 'delete':
			$('#tbTipsContent').html('确定删除选中的收藏吗?<br/><font color=#676767>(注:记录删除后不可恢复!)</font>');
			tb_show('确认删除','#TB_inline?&height=100&width=320&inlineId=TB_Tips&modal=true');
			break;
		case 'restore':
			$('#tbTipsContent').html('确定还原选中的收藏吗?');
			tb_show('确认还原','#TB_inline?&height=100&width=320&inlineId=TB_Tips&modal=true');	
			break;
	}
	
	return false;
}


function doAction()
{
	var action = strGlobalAction;
	
	switch(action)
	{
		case 'share':
		case 'hide':
		case 'move':
		case 'delete':
		case 'restore':
		case 'recycle':
			document.frmMain.type.value = action;
			document.frmMain.submit();
			break;
			
	}
}



function edit(id)
{
	
	var url = '/api/favorite/get/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			 resetForm();
			 $("#title").val(data.title);
			 $("#url").val(data.url);
			 $("#categoryid").val(data.categoryid);
			 $("#description").val(data.description);
			 $("#id").val(data.favoriteid);
			 
			 $('#quick_add').slideDown(function(){$('#url').focus();});
		}
	 });
}

/*
function goto(id)
{
	
	var url = '/api/favorite/jumpto/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			return true;
		}
	 });
}
*/

function save()
{
	 
	if($('#url').val() == '')
	{
		alert('请输入URL!');
		$('#url').focus();
		return false;
	}
	 
	$('#btnSave').attr('disabled',true);
	var url = '/api/favorite/save/';
	
	$.post(url, $("#frmAdd").serialize(),function(data){
	   $('#btnSave').attr('disabled',false);
	   
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			//alert('操作成功！');
			window.location.href='/favorite/main/';
		}
	 }, "json");
	
}


function resetForm()
{

	 $("#title").val('');
	 $("#url").val('http://');
	 $("#categoryid").val('');
	 $("#description").val('');
	 $("#id").val('');
	 
	 return true;
	
}


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


function restore(id)
{
		if(confirm('确定要还原此记录吗?'))
		{
			doRestore(id);
		}
		
		return true;
}

function del(id)
{
		if(confirm('确定要删除此收藏吗?\r\n\r\n警告：此操作不可恢复！'))
		{
			doDel(id);
		}
		
		return true;
}

function doRecycle(id)
{	 
	var url = '/api/favorite/recycle/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			alert('操作成功!');
			$('#item_'+id).slideUp();
		}
 });
}

function doRestore(id)
{	 
	var url = '/api/favorite/restore/' + id;
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
	var url = '/api/favorite/delete/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			alert('删除成功!');
			window.location.reload();
		}
 });

}

function setOrder(id,type)
{
	var url = '/api/favorite/setOrder/?type=' + type + '&id=' + id;
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
