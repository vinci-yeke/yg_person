<?php
header("Content-Type:text/html");
?>
<!--登录遮罩层-->
  <div class="panel">
    <div class="modelCon">
      <h3>欢迎进入优购网站 <span class="alertLog"></span><a href="#" class="register-close">&times;</a></h3>
      <br/>
      <hr/>
      <br/>
      <form action="" id="form-register" class="hide">
        <div class="form-group"><label for="uname">用户名:</label><input type="text" name="uname" id="uname" value=""
                />
          <span class="msg-defualt ">用户名在6到9位之间</span></div>
        <div class="form-group"><label for="upwd">密码:</label><input type="password" name="upwd" value="" id="upwd"/>
          <span class="msg-defualt hide">密码包含6到10位字母和数字</span></div>
        <div class="form-group"><label for="upwdCheck">确认密码:</label><input type="password" name="upwdCheck" value=""
                                                                           id="upwdCheck"/>
          <span class="msg-defualt hide">确认上次密码</span></div>
        <div class="form-group"><label for="uemail">邮箱:</label><input type="text" name="uemail" value="" id="uemail"/>
          <span class="msg-defualt hide">请输入可用邮箱(选填)</span></div>
        <div class="form-group"><label>电话:</label><input type="text" name="uphone" id="uphone" value=""/>
        <span
                class="msg-defualt hide">请输入电话号码(选填)</span></div>
        <div class="form-group"><label>验证码:</label><input type="text" name="ucheckCode" id="ucheckCode"/>
          <span class="checkCode"><canvas id="vcodeRe" width="90" height="26"></canvas></span></div>
        <div class="form-group">
          <hr/>
          <br/>
          <label></label><input type="button" name="usubmit" id="usubmit" value="提交用户信息"/></div>
      </form>

      <form action="" id="form-login" >
        <div class="form-group"><label for="uname">用户名:</label><input type="text" name="uname" id='myname'value="yeke"/>
          <span class="msg-defualt ">用户名在6到9位之间</span></div>
        <div class="form-group"><label for="upwd">密码:</label><input type="password" name="upwd" id="mypwd"value="123456"/>
          <span class="msg-defualt hide">密码包含6到10位字母和数字</span></div>

        <div class="form-group"><label>验证码:</label><input type="text" name="ucheckCode" id="uloginCode"/>
          <span class="checkCode"><canvas id="vcodeLog" width="90" height="26"></canvas></span></div>
        <div class="form-group">
          <hr/>
          <br/>
          <label></label><input type="button" name="usubmit" id="mylogin" value="提交用户信息"/></div>
      </form>

    </div>
  </div>

