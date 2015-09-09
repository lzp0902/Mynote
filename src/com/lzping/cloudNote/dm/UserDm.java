package com.lzping.cloudNote.dm;


import com.lzping.cloudNote.vo.UserVO;

public interface UserDm {
	
	public UserVO Finduserbyname (String username) throws Exception;

}
