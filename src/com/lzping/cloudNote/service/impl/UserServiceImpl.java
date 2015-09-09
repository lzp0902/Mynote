package com.lzping.cloudNote.service.impl;

import javax.annotation.Resource;

import com.lzping.cloudNote.dm.UserDm;
import com.lzping.cloudNote.service.UserService;
import com.lzping.cloudNote.vo.UserVO;

public class UserServiceImpl implements UserService{

	@Resource
	UserDm userdm;
	
	public UserVO getLoginUser(String username) throws Exception {
		UserVO user = userdm.Finduserbyname(username);
		return user;
	}
}
