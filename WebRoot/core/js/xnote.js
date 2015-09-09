// JavaScript Document

$(function(){

	$("ul.list li").hover(
      function () {
		var key	= $(this).attr('key');
		
		var act = '#act_' + key;
				
		var code = $('#act_template').html();
		code = code.replace(/\[ID\]/g,key);
		
	  	$(act).html(code);
      }, 
      function () {
		var key	= $(this).attr('key');
		var act = '#act_' + key;		 
		$(act).html('');
      }
	);

});

function xReminder(id)
{
	
	this._id = id;
	
	
	this.add	= function()
	{
		$('#quick_add').slideToggle(function(){$('#content').focus();});
	}
	
	this.cancel	= function(id)
	{
		if(!id)
		{
			$('#content').val('');
			$('#quick_add').slideToggle();
		}
		else
		{
			//取消修改
			var s = $('#show_' + id);
			var e = $('#edit_' + id);
			
			$(e).slideUp(300,function(){
				$(e).html('')
				$(s).slideDown(300);
			});
		}
	}
		
	this.save	= function()
	{
		
		var content = $('#content').val();
	
		if(content == '')
		{
			alert('请输入提醒内容!');
			$('#content').focus();
			return false;
		}
				
		$('#quick_buttons').hide();
		$('#quick_saveing').show();
					
		var url = '/api/reminder/save/';
			
		$.post(url, $("#frmAdd").serialize(),function(data){
				   $('#btnSave').attr('disabled',false);
				   
				   reminder.setTimes(data.time);
					
					if(data.error)
					{
						alert(data.error);
						return false;
					}
					else
					{
						$('#quick_add').slideUp();
						window.location.reload();
					}
					
		 }, "json");
	}
	
	
	this.edit	= function(id)
	{
		
		//$('#item_' + id ).hide();
		$('#loading_' + id ).show();
		
		var url = '/index.php?act=reminder.edit&id=' + id;
		
		var s = $('#show_' + id);
		var e = $('#edit_' + id);
		
		$(e).load(url,function(data){
			
			$('#loading_' + id ).hide();
			
			$(s).slideUp(300,function(){
				$(e).slideDown(300);
			});
			
		});
	}
	
	this.update	= function(id)
	{
		alert('update');
	}
	
	this.del	= function(id)
	{
		alert('del');
	}	
		
	this.setTimes	= function(time)
	{
		for(k in time)
		{
			$('#'+k).val(time[k]);	
		}
		 
		return true;	
	}
}

function xPost(id)
{
	
	this._id = id;
	
	this.add	= function()
	{
		$('#quick_add').slideToggle(function(){$('#content').focus();});
	}
	
	this.cancel	= function(id)
	{
		//取消修改
		var e = '#edit_' + id;
		var s = '#show_' + id;
		var a = '#act_' + id;
		
		$(a).show();	
		$(e).slideUp().html('');	
		$(s).slideDown();	
	}
		
	this.save	= function()
	{
		
		var content = $('#content').val();
		
		if(content == '')
		{
			alert('请输入随笔内容!');
			$('#content').focus();
			return false;
		}
		
		$('#quick_buttons').hide();
		$('#quick_saveing').show();
		var url = 'postsave';
		//alert("gdsgfsd");
		$.post(url, $("#frmPost").serialize(),function(data){
					//alert("34243:"+data);	
					if(data==1)
					{
						$('#quick_add').slideUp();
						window.location.href = 'post';
					}
					else
					{
						//alert(data.error);
						$('#quick_saveing').hide();
						$('#quick_buttons').show();
						return false;
					}
					
		 }, "json");
	}	
	
	this.edit	= function(id)
	{
		var s = '#show_' + id;
		var e = '#edit_' + id;
		var a = '#act_' + id;
		
		var code = $('#act_edit').html();
		code = code.replace(/\[ID\]/g,id);
			
		$(e).html(code);
		$(a).hide();
		
		var content = $('#content_' + id).html();
		
		/*
		content = content.replace(/\<BR\>/g,"\r\n");	
		content = content.replace(/\<br\>/g,"\r\n");
		*/
		
		$('#edit_content_' + id).val(content);
		
		$(s).slideUp(300,function(){
			$(e).slideDown(300);
		});	
	}
	
	this.update	= function(id)
	{
		var content = $('#edit_content_' + id).val();
		
		if(content == '')
		{
			alert('请输入随笔内容!');
			$('#edit_content_' + id).focus();
			return false;
		}
			
		$('#edit_id_' + id).val(id);
			
		var url = 'postedit';
		$.post(url, $("#frmEdit_" + id).serialize(),function(data){
			//alert("gfdgfdsgfd----"+data);
					if(data==1)
					{
						$('#content_' + id).html(data.content);
						post.cancel(id)
						window.location.href = 'post';
					}
					else
					{
						alert(data.error);
						return false;
					}
		 }, "json");
	}
	
	this.del	= function(id)
	{
		if(!window.confirm('确认要删除此记录吗？'))
		{
			return false;
		}
			
		var url = 'postdelete?id=' + id;
		alert("url:"+url);
		$.getJSON(url,function(data){
				if(data.error)
				{
					alert(data.error);
					return false;
				}
				else
				{
					var name = '#item_' + id;
					$(name).slideUp();
				}
		 });
	}
	
	this.copy	= function(id)
	{
		if(!$.browser.msie)
		{
			alert('此功能仅支持IE浏览器');
			return false;
		}
		
		var name = '#content_' + id;
		var content = $(name).html().replace(/<BR>/g,"\r\n");
		window.clipboardData.setData("Text", content);
		alert("已复制到剪贴板！");  
	}
	
	this.search		= function()
	{
		$('#main_search').slideToggle();
	}
	
	this.order		= function(id,type)
	{
		var url = '/api/post/setOrder/?type=' + type + '&id=' + id;
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
		
	this.setTimes	= function(time)
	{
		for(k in time)
		{
			$('#'+k).val(time[k]);	
		}
		 
		return true;	
	}
}