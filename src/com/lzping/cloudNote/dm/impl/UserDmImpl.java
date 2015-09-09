package com.lzping.cloudNote.dm.impl;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.lzping.cloudNote.dm.UserDm;
import com.lzping.cloudNote.vo.UserVO;


public class UserDmImpl extends HibernateDaoSupport implements UserDm,BeanFactoryAware{

	private SessionFactory sessionFacotry;
	@SuppressWarnings("unused")
	private HibernateTemplate hibernateTemplate;
	
    @Resource
    public void setMySessionFacotry(SessionFactory sessionFacotry) {
        this.sessionFacotry = sessionFacotry;   
        this.hibernateTemplate=createHibernateTemplate(sessionFacotry);
    }
    protected HibernateTemplate createHibernateTemplate(  
    		 SessionFactory sessionFactory) {  
    	return new HibernateTemplate(sessionFactory);  
	}
    @PostConstruct
    public void injectSessionFactory() {
        super.setSessionFactory(sessionFacotry);
    }
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
	}
	public UserVO Finduserbyname(String username) throws Exception {
		String sql = "from UserVO where UserName='"+username+"'";
		UserVO result = (UserVO) this.getHibernateTemplate().find(sql);
		return result;
	}
}
