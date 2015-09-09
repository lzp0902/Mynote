
var totalSize = 0;
var fileIds = []; // 当前选择的文件
var arrFileSaved = []; 
var strFileSaved = ''; 
var fileCount = 0;
var isUploading = false;

function preLoad() {
	if (!this.support.loading) {
		//alert("You need the Flash Player 9.028 or above to use SWFUpload.");
		//浏览器不支持Flash上传，显示普通文件上传控件
		alert('浏览器不支持Flash上传，使用表单的文件控件上传');
		return false;
	}
}

function loadFailed() {
	//alert("Something went wrong while loading SWFUpload. If this were a real application we'd clean up and then give you an alternative");
	//加载失败，使用表单的文件控件上传
	alert('加载失败，使用表单的文件控件上传');
	return false;
}


function startUpload()
{
	if(isUploading)
	{
		//alert('正在上传图片中，请稍后...');
		return false;
	}
	
	if (swfu.getStats().files_queued == 0)
	{
		alert('请选择要上传的图片!');
		return false;
	}
	
	for(strName in arrPost)
	{ 
		swfu.addPostParam(strName,arrPost[strName]);
	}

	isUploading = true;
	swfu.startUpload();
	
	return true;
}

function removeFile(fileId)
{
	//alert(id);		
	var file = swfu.getFile(fileId);
	if (!file) return;
	
	fileCount--;
	
	updateTotal(0 - file.size);
	updateFileCount();		

	swfu.cancelUpload(fileId);
	
	document.getElementById(fileId).style.display = "none";	
}

function removeAll() 
{
	for (var i = 0; i < fileIds.length; i++)
	{
		removeFile(fileIds[i]);
	}
	
	fileCount = 0;
	totalSize = 0;
	updateFileCount();
	updateTotal();		
}

function getSizeInKMG(num) {
	if(isNaN(num)) {
		return false;
	}
	num = parseInt(num);
	var unit = [" B", " KB", " MB", " GB"];
	for(var i = 0; i < unit.length; i += 1) {
		if(num < 1024) {
			num = num + "";
			if(num.indexOf(".") != -1 && num.indexOf(".") != 3) {
				num = num.substring(0,4);
			}
			else {
				num = num.substring(0,3);
			}
			break;
		}
		else {
			num = num/1024;
		}
	}
	return num + unit[i];
}


function updateFileCount() {
	document.getElementById("divFileCount").innerHTML = fileCount;
}

function updateTotal(size) {
	if (!isNaN(size)) totalSize += size;
	//document.getElementById('divTotalSize').innerHTML = '总计：' + getSizeInKMG(totalSize);
}



function fileQueueError(file, errorCode, message) {
	try {
		var imageName = "error.gif";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "You have attempted to queue too many files.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			imageName = "zerobyte.gif";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			imageName = "toobig.gif";
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		default:
			alert(message);
			break;
		}

		addImage("/libs/swfupload/images/" + imageName);

	} catch (ex) {
		this.debug(ex);
	}

}


function fileQueued(file)
{
	
	//alert(file.name);
	fileCount++;
	
    var objDivFile = document.createElement("DIV");
    objDivFile.id	= file.id;
	
	var strDivCode = document.getElementById('divFileItem').innerHTML;
	strDivCode = strDivCode.replace(/\[ID\]/g, file.id); 
	strDivCode = strDivCode.replace(/\[INDEX\]/g, file.index); 
	strDivCode = strDivCode.replace(/\[NAME\]/g, file.name); 
	strDivCode = strDivCode.replace(/\[SIZE\]/g, getSizeInKMG(file.size)); 

	objDivFile.innerHTML	= strDivCode;
	
	document.getElementById('divFileList').appendChild(objDivFile);	
	
	fileIds[fileIds.length] = file.id; // 选择了这个文件

	updateTotal(file.size);
	updateFileCount();
}


function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
			//this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {

	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  this.customSettings.upload_target);
		progress.setProgress(percent);
		if (percent === 100) {
			//progress.setStatus("Creating thumbnail...");
			progress.toggleCancel(false, this);
		} else {
			strId = file.id + '_icon';
			document.getElementById(strId).innerHTML = '上传中...' + percent + '%';
			
			//document.getElementById(strId).innerHTML = '上传中...' + percent + '%' + '<div style="width:50px;height:6px;border:1px solid #676767;text-align:left;"><img  style="width:' + percent + '%;background:#129B01;height:6px;" src="images/bg_upload.gif" /></div>';
			//document.getElementById(strId).innerHTML = '<div style="width:50px;height:16px;border:1px solid #676767;text-align:left;padding-top:5px;"><img  style="width:' + percent + '%;background:#129B01;height:6px;" src="images/bg_upload.gif" /></div>';
			
			//progress.setStatus("正在上传...");
			progress.toggleCancel(true, this);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	
	try{
		data = eval('(' + serverData + ')');
	} catch (ex) {
		data.error = serverData;
	}
	
	try {
		var progress = new FileProgress(file,  this.customSettings.upload_target);

		if (!data.error) {
			
			//addImage(data.thumb);
			
			//progress.setStatus("缩图创建成功.");
			strId = file.id + '_icon';
			document.getElementById(strId).innerHTML = '<img src="/images/icon_r.gif" >';

			progress.toggleCancel(false);

			arrFileSaved[arrFileSaved.length] = data.thumb;
			strFileSaved  += ',' + data.thumb;
			
		} else {
			//addImage("images/upload/error.gif");
			progress.setStatus("Error.");
			progress.toggleCancel(false);
			alert(data.error);
		}

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			this.startUpload();
		} else {
			//
			//var progress = new FileProgress(file,  this.customSettings.upload_target);
			//progress.setComplete();
			//progress.setStatus("全部图片上传完成.");
			//progress.toggleCancel(false);
			
			callback();
			
			/*
			objFrm = document.getElementById('frmMain');
			objFrm.saved = strFileSaved;
			objFrm.submit();
			*/
			
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	var imageName =  "error.gif";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("已取消");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			return true;
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("Stopped");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "uploadlimit.gif";
			break;
		default:
			alert(message);
			break;
		}

		addImage("/libs/swfupload/images/" + imageName);

	} catch (ex3) {
		this.debug(ex3);
	}

}


function addImage(src) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";

	document.getElementById("thumbnails").appendChild(newImg);
	if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}

	newImg.onload = function () {
		fadeIn(newImg, 0);
	};
	
	newImg.src = src;
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */

function FileProgress(file, targetID) {
	this.fileProgressID = "divFileProgress";

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfuploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};