package com.lzping.cloudNote.service;

import com.lzping.cloudNote.vo.UserVO;

public interface UserService {
	
	public UserVO getLoginUser(String username) throws Exception;
}
