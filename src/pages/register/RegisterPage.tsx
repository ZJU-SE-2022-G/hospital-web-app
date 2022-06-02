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
    marginLeft: "5px"
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
class Page extends React.Component {
    state = {
        name: '',
        id: '',
        phone: '',
        password1: '',
        password2: '',
        agree: false
    }
    nameChange = (e: { target: { value: any; }; }) => {
        this.setState({
            name: e.target.value
        })
    }
    idChange = (e: { target: { value: any; }; }) => {
        this.setState({
            id: e.target.value
        })
    }
    phoneChange = (e: { target: { value: any; }; }) => {
        this.setState({
            phone: e.target.value
        })
    }
    key1Change = (e: { target: { value: any; }; }) => {
        this.setState({
            password1: e.target.value
        })
    }
    key2Change = (e: { target: { value: any; }; }) => {
        this.setState({
            password2: e.target.value
        })
    }
    agreeChange = (e: { target: { checked: any; }; }) => {
        this.setState({
            agree: e.target.checked
        })
    }
    clickSubmit = () => {
        if (this.state.agree) {
            if (this.state.password1 != this.state.password2) {
                alert("两次输入的密码不一致，请检查！");
            }
            else if (this.state.name == '') {
                alert("请输入名字！")
            }
            else if (this.state.password1 == '') {
                alert("请输入密码！")
            }
            else if (this.state.id == '') {
                alert("请输入身份证！")
            }
            else if (this.state.phone == '') {
                alert("请输入手机号！")
            }
            else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var ret = JSON.parse(xmlhttp.responseText);
                        console.log(ret)
                        if (ret.state == 200) {
                            window.open('/login', '_self')
                        }
                        else {
                            alert("注册失败，请重新尝试");
                        }
                    }
                }
                xmlhttp.open("POST", "http://localhost:8080/users/reg?" +
                    "id=" + this.state.id +
                    "&phone=" + this.state.phone +
                    "&name=" + this.state.name +
                    "&password=" + this.state.password1, true)
                xmlhttp.send()
            }
        }
        else {
            alert("请同意条款和隐私政策！")
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
                                创建个人账号
                            </div>
                            <div style={textStyle3}>
                                此账号仅为私人使用，禁止进行售卖，外借使用.
                            </div>
                            <form>
                                <div style={textStyle4}>
                                    姓名
                                </div>
                                <input type="text" style={formInputStyle} id="register_name" onChange={this.nameChange} />
                                <div style={textStyle4}>
                                    身份证号
                                </div>
                                <input type="text" style={formInputStyle} id="register_id" onChange={this.idChange} />
                                <div style={textStyle4}>
                                    手机号
                                </div>
                                <input type="text" style={formInputStyle} id="register_phone" onChange={this.phoneChange} />
                                <div style={textStyle4}>
                                    密码
                                </div>
                                <input type="password" style={formInputStyle} id="register_password" onChange={this.key1Change} />
                                <div style={textStyle4}>
                                    确认密码
                                </div>
                                <input type="password" style={formInputStyle} id="register_passConfirm" onChange={this.key2Change} />
                                <div>
                                    <input type="checkbox" id="register_agree" onChange={this.agreeChange} />
                                    <span style={textStyle5}>我接受所有的<span style={{ color: "#6E3CBC" }}> 条款 </span>and<span style={{ color: "#6E3CBC" }}> 隐私政策</span></span>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <input type="button" id="register_submit" value="创建账号" style={submitStyle} onClick={this.clickSubmit} />
                                </div>
                            </form>
                            <div style={textStyle5}>
                                已有帐户？
                                <a href='login' style={{ color: "#6E3CBC" }}>登录</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function getRegister() {
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
                            创建个人账号
                        </div>
                        <div style={textStyle3}>
                            此账号仅为私人使用，禁止进行售卖，外借使用.
                        </div>
                        <form>
                            <div style={textStyle4}>
                                姓名
                            </div>
                            <input type="text" style={formInputStyle} id="register_name" />
                            <div style={textStyle4}>
                                身份证号
                            </div>
                            <input type="text" style={formInputStyle} id="register_id" />
                            <div style={textStyle4}>
                                手机号
                            </div>
                            <input type="text" style={formInputStyle} id="register_phone" />
                            <div style={textStyle4}>
                                密码
                            </div>
                            <input type="password" style={formInputStyle} id="register_password" />
                            <div style={textStyle4}>
                                确认密码
                            </div>
                            <input type="password" style={formInputStyle} id="register_passConfirm" />
                            <div>
                                <input type="checkbox" id="register_agree" />
                                <span style={textStyle5}>我接受所有的<span style={{ color: "#6E3CBC" }}> 条款 </span>and<span style={{ color: "#6E3CBC" }}> 隐私政策</span></span>
                            </div>
                            <div style={{ width: "100%" }}>
                                <input type="button" id="register_submit" value="创建账号" style={submitStyle} />
                            </div>
                        </form>
                        <div style={textStyle5}>
                            已有帐户？
                            <a href='login' style={{ color: "#6E3CBC" }}>登录</a>
                        </div>
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

const RegisterPage: React.FC = () => {
    return (
        <div style={loginStyle}>
            <Page />
        </div>
    )
}

export default RegisterPage;