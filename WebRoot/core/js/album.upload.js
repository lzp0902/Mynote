// JavaScript Document

function callback()
{
	alert('上传完成!');
	window.location.href = '/album/' + albumid + '/';
}

function init_upload()
{
	
	var url = "/api/photo/saveUpload/?PHPSESSID=" + PHPSESSID;
	

	var settings = {
		upload_url: url ,
		//post_params: {"PHPSESSID": PHPSESSID},
		
		// File Upload Settings
		file_size_limit : "10 MB",
		file_types : "*.jpg;*.png",
		file_types_description : "JPG Images; PNG Image",
		file_upload_limit : 100,
		file_queue_limit : 0,

		// Button Settings
		//button_image_url : "/libs/swfupload/images/SmallSpyGlassWithTransperancy_17x18.png",
		button_placeholder_id : "spanButtonPlaceholder",
		button_width: 60,
		button_height: 18,
		button_text : '<span class="button">添加照片</span>',
		button_text_style : '.button {font-size: 12px; color:#0000ff;text-decoration:underline;}',
		button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor: SWFUpload.CURSOR.HAND,

		// The event handler functions are defined in handlers.js
		swfupload_preload_handler : preLoad,
		swfupload_load_failed_handler : loadFailed,		
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		file_queued_handler : fileQueued,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,
		
		// Flash Settings
		flash_url : "/libs/swfupload/swfupload.swf",
		flash9_url : "/libs/swfupload/swfupload_fp9.swf",

		custom_settings : {
			upload_target : "divFileProgressContainer"
		},
		
		// Debug Settings
		debug: false
	};

	swfu = new SWFUpload(settings);
}


$(function(){
	init_upload();
	
	
	$('#btnUpload').click(function(){	 
		$(this).val('正在上传').attr('disabled',true);
		if(!startUpload())
		{
			$(this).val('开始上传').attr('disabled',false);
		}
	});
});