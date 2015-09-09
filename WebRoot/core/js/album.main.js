// JavaScript Document

var strGlobalAction = '';
var intGlobalId		= 0;

$(function(){
	
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
	var url = 'savealbum';
	
	$.post(url, $("#frmAdd").serialize(),function(data){
	   $('#btnSave').attr('disabled',false);
	   
		if(data==1)
		{
			window.location.href = 'album'
		}
		else
		{
			alert("失败");
			return false;
			//alert('操作成功！');
			//window.location.reload();
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