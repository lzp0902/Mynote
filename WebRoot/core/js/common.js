// JavaScript Document

function show(id,isshow)
{
	var obj = document.getElementById(id);
	
	obj.style.display = isshow?'block':'none';
}

function doCancel()
{
	tb_remove();
}
function chkSearch(f)
{
	if(f.query.value == '')
	{
		alert('请输入搜索关键词!');
		f.query.focus();
		return false;
	}
	f.submit.value 	= '正在搜索...';
	f.submit.disabled	= true;
	
	return true;
}

function chkMobile(mobile) 
{ 
	 var reg0 = /^13\d{9}$/; 
	 var reg1 = /^15\d{9}$/; 
	 var reg2 = /^18\d{9}$/; 
	 var reg3 = /^0\d{10,11}$/; 
	 var my = false; 
	 if (reg0.test(mobile))my=true; 
	 if (reg1.test(mobile))my=true; 
	 if (reg2.test(mobile))my=true; 
	 if (reg3.test(mobile))my=true; 
	 if (!my){ 
		 return false; 
	 } 
	 return true;
} 


function fixContentLen(id,intMax)
{
	var txt = document.getElementById(id);
	var tips = document.getElementById(id + '_tips');
	var str  = txt.value;
	var len = intMax - str.length;
	
	if(len <= 0)
	{
		//alert("内容太长了，最多" + intMax + "个字！");
		txt.value = str.substring(0,intMax);
		tips.innerHTML = '<span class=o>你还可以输入<b>0</b>个字!</span>';		
		return false;
	}
	else
	{
		tips.innerHTML = '你还可以输入<b>' + len + '</b>个字!';		
	}
	return true;
}