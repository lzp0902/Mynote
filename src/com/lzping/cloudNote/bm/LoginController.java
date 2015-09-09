package com.lzping.cloudNote.bm;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ResponseBody;

public class LoginController {

	public @ResponseBody String UserLogin(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		
		return "";
	}
}
