// JavaScript Document


$(function(){
		   
		   
	$("#note_category_list li").hover(
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;
				
		if($(act).attr('depth') > 0)
		{
			var code = $('#act_template_sub').html();
		}
		else
		{
			var code = $('#act_template').html();
		}
		code = code.replace(/\[ID\]/g,key);
		
	  	$(act).html(code);
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
	
	$('#chkAll').click(function(){
			$("input:checkbox").check();					 
	});
	
	$('#chkNone').click(function(){
			$("input:checkbox").check('off');					 
	});
	
	$('#chkToggle').click(function(){
			$("input:checkbox").check('toggle');					 
	});
	
	
	$('#btnAdd').click(function(){
		resetForm();
		$('#quick_add_category').slideToggle(function(){$('#categoryname').focus();});
	});
	
	$('#_btnAdd').click(function(){
		resetForm();
		$('#quick_add_category').slideToggle(function(){$('#categoryname').focus();});
	});
	
	$('#btnCannel').click(function(){
		$('#quick_add_category').slideToggle();
	});

	$('#btnDelete').click(function(){
			if(confirm('确定要删除选中的分类吗?')) doBatch('delete');			
			return true;
	});
	
	$('#btnShare').click(function(){
			if(confirm('确定将选中的分类设为“公开”吗?')) doBatch('share');
			return true;
	});
	
	$('#btnHide').click(function(){
			if(confirm('确定将选中的分类设为“私密”吗?')) doBatch('hide');
			return true;
	});
	
	$('#btnSave').click(function(){
			saveCategory();
	});
		   
});

function resetForm()
{
	$("#categoryname").val('');
	$("#description").val('');
	$("#parentid").val(0);
	$("#isshare").val(0);								
	$("#id").val(0);
	
	return true;
}


function addSub(id)
{
	 resetForm();
	 $("#parentid").val(id);
	 
	 $('#quick_add_category').slideDown();
}

function edit(id)
{
	
	var url = '/api/note/getCategory/' + id;
	$.getJSON(url,function(data){
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			resetForm();
			 $("#description").val(data.description);
			 $("#categoryname").val(data.categoryname);
			 $("#parentid").val(data.parentid);
			 $("#id").val(data.categoryid);
			 $("#isshare").val(data.isshare);
			 
			 $('#quick_add_category').slideDown(function(){$('#categoryname').focus();});
		}
	 });
}

function del(id)
{
	if(confirm('确定要删除此分类吗?\r\n\r\n警告：此操作不可恢复！'))
	{
		doDel(id);
	}
	
	return true;
}


function saveCategory()
{
	 
	if($('#categoryname').val() == '')
	{
		alert('请输入分类名!');
		$('#categoryname').focus();
		return false;
	}
	 
	 $('#btnSave').attr('disabled',true);
	var url = '/api/note/saveCategory/';
	$.post(url, $("#frmAdd").serialize(),function(data){
	   $('#btnSave').attr('disabled',false);
	   
		if(data.error)
		{
			alert(data.error);
			return false;
		}
		else
		{
			//alert(data.message);
			window.location.reload();
		}
 }, "json");

}


function doBatch(type)
{
	 $('#batchType').val(type);
	 
	var url = '/api/note/batchCategory/';
	
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


function doDel(id)
{	 
	var url = '/api/note/deleteCategory/' + id;
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
	var url = '/api/note/setCategoryOrder/?type=' + type + '&id=' + id;
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
