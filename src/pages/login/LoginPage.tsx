import React from 'react';
import { CSSProperties } from 'react';

const leftStyle: CSSProperties = {
    height: "100%",
    float: "left"
}

const rightStyle: CSSProperties = {
    height: "100%"
}

const headerStyle: CSSProperties = {
    position: "relative",
    left: "15%",
    top: "2%"
}

const iconStyle: CSSProperties = {

}
const textStyle1: CSSProperties = {
    fontWeight: "bolder",
    fontSize: "13px",
    marginLeft: "10px"
}
const textStyle2: CSSProperties = {
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "5%"
}
const textStyle3: CSSProperties = {
    fontSize: "10px",
}
const textStyle4: CSSProperties = {
    fontSize: "10px",
    marginTop: "2%"
}
const textStyle5: CSSProperties = {
    fontSize: "10px",
    marginLeft: "5px"
}
const textStyle6: CSSProperties = {
    fontSize: "10px",
    textAlign: "center",
    fontWeight: "bolder",
    width: "100%",
}
const formInputStyle: CSSProperties = {
    width: "20%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    display: "inline-block"
}
const submitStyle: CSSProperties = {
    fontWeight: "bolder",
    width: "20%",
    height: "34px",
    color: "white",
    background: "#6E3CBC",
    border: "none",
    borderRadius: "4px",
    marginTop: "2%",
    fontSize: "10px"
}
const registerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    width: "20%",
    height: "34px",
    color: "white",
    background: "grey",
    border: "none",
    borderRadius: "4px",
    marginTop: "2%",
    marginLeft: "4px",
    fontSize: "10px",
    textAlign: "center"
}
class Page extends React.Component {
    state = {
        phone: '',
        keyword: '',
        agree: false
    }
    phoneChange = (e: { target: { value: any; }; }) => {
        this.setState({
            phone: e.target.value
        })
    }
    keyChange = (e: { target: { value: any; }; }) => {
        this.setState({
            keyword: e.target.value
        })
    }
    agreeChange = (e: { target: { checked: any; }; }) => {
        this.setState({
            agree: e.target.checked
        })
    }


    clickLogin = () => {
        if (this.state.agree) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var ret = JSON.parse(xmlhttp.responseText);
                    console.log(ret)
                    if (ret.state == 200) {
                        window.open('/', '_self')
                    }
                    else {
                        alert("登陆失败，请重新尝试");
                    }
                }
            }
            xmlhttp.open("POST", "http://localhost:8080/users/loginByPhone?" + "phone=" + this.state.phone + "&password=" + this.state.keyword, true)
            xmlhttp.send()
        }
        else {
            alert("请同意条款和隐私政策！");
        }
    }
    render(): React.ReactNode {
        return (
            <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                    <img src='/src/assets/loginBackgraound.png' style={leftStyle} />
                    <div style={rightStyle}>
                        <div style={headerStyle}>
                            <img src='/src/assets/loginIcon.png' style={iconStyle} />
                            <span style={textStyle1}>
                                SE-医疗管理系统
                            </span>
                            <div style={textStyle2}>
                                登陆个人账户
                            </div>
                            <div style={textStyle3}>
                                此账号仅为私人使用，禁止进行售卖，外借使用.
                            </div>
                            <form>
                                <div style={textStyle4}>
                                    手机号
                                </div>
                                <input type="text" style={formInputStyle} id="login_phone" value={this.state.phone} onChange={this.phoneChange} />
                                <div style={textStyle4}>
                                    密码
                                </div>
                                <input type="password" style={formInputStyle} id="login_password" value={this.state.keyword} onChange={this.keyChange} />
                                <div>
                                    <input type="checkbox" id="register_agree" onChange={this.agreeChange} />
                                    <span style={textStyle5}>我接受所有的<span style={{ color: "#6E3CBC" }}> 条款 </span>and<span style={{ color: "#6E3CBC" }}> 隐私政策</span></span>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <input type="button" id="register_submit" value="登陆" style={submitStyle} onClick={this.clickLogin} />
                                    <div id="register_submit" style={registerStyle}>
                                        <div style={textStyle6}>
                                            没有账号？<a href='register' style={{ color: "#6E3CBC" }}>注册</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function getRegister() {
    const clickLogin = () => {
        console.log("LOGGING")
    }
    return (
        <div style={{ height: "100%" }}>
            <div style={{ height: "100%" }}>
                <img src='/src/assets/loginBackgraound.png' style={leftStyle} />
                <div style={rightStyle}>
                    <div style={headerStyle}>
                        <img src='/src/assets/loginIcon.png' style={iconStyle} />
                        <span style={textStyle1}>
                            SE-医疗管理系统
                        </span>
                        <div style={textStyle2}>
                            登陆个人账户
                        </div>
                        <div style={textStyle3}>
                            此账号仅为私人使用，禁止进行售卖，外借使用.
                        </div>
                        <form>
                            <div style={textStyle4}>
                                手机号
                            </div>
                            <input type="text" style={formInputStyle} id="login_phone" />
                            <div style={textStyle4}>
                                密码
                            </div>
                            <input type="text" style={formInputStyle} id="login_password" />
                            <div>
                                <input type="checkbox" id="register_agree" />
                                <span style={textStyle5}>我接受所有的<span style={{ color: "#6E3CBC" }}> 条款 </span>and<span style={{ color: "#6E3CBC" }}> 隐私政策</span></span>
                            </div>
                            <div style={{ width: "100%" }}>
                                <input type="button" id="register_submit" value="登陆" style={submitStyle} onClick={clickLogin} />
                                <div id="register_submit" style={registerStyle}>
                                    <div style={textStyle6}>
                                        没有账号？<a href='register' style={{ color: "#6E3CBC" }}>注册</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
const loginStyle: CSSProperties = {
    width: "80%",
    height: "90%",
    marginLeft: "10%",
    marginTop: "2%",
    borderRadius: "20px",
    boxShadow: "6px 6px 3px #888888"
}

const LoginPage: React.FC = () => {
    return (
        <div style={loginStyle}>
            <Page />
        </div>
    )
}

export default LoginPage;