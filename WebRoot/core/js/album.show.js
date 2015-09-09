// JavaScript Document

$(function(){
		   
	$("#photo_list li").hover(
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;
				
		var code = $('#act_template').html();
		code = code.replace(/\[ID\]/g,key);
		
	  	$(act).html(code);
	  	//$(act).html($('#action').html());
      }, 
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;		 
		intGlobalId	= 0;
		$(act).html('');
      }
	);
	
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
		$('#quick_add').slideToggle(function(){$('#title').focus();});
	});
	
	$('#_btnAdd').click(function(){
		resetForm();
		$('#quick_add').slideToggle(function(){$('#title').focus();});
	});
	
	
	$('#btnCannel').click(function(){
		$('#quick_add').slideToggle();
	});		
		   
});


function edit(id)
{
	
	var url = '/api/album/get/' + id;
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
			 $("#description").val(data.description);
			 $("#id").val(data.albumid);
			 $("#isshare").val(data.isshare);
			 
			 $('#quick_add').slideDown(function(){$('#title').focus();});
		}
	 });
}


function save()
{
	 
	if($('#albumname').val() == '')
	{
		alert('请输入相册名称!');
		$('#albumname').focus();
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

	 $("#title").val('');
	 $("#isshare").val('0');
	 $("#description").val('');
	 $("#id").val('');
	 
	 return true;
	
}


function recycle(id)
{
		if(confirm('确定要放入回收站吗?'))
		{
			doRecycle(id);
		}
		
		return true;
}

function doRecycle(id)
{	 
	var url = '/api/photo/recycle/' + id;
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