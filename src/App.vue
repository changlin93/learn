<template>
    <div id="app">
        <div class="layui-container">
            <form class="layui-form layui-form-pane" action>
                <div class="layui-form-item">
                    <validation-provider name="用户名" rules="required|email" v-slot="{ errors }">
                        <label class="layui-form-label">用户名/邮箱</label>
                        <div class="layui-input-inline">
                            <input
                                type="text"
                                name="title"
                                required
                                lay-verify="required"
                                placeholder="请输入用户名/邮箱"
                                autocomplete="off"
                                class="layui-input"
                                v-model.trim="name"
                            />
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                    </validation-provider>
                </div>
                <div class="layui-form-item">
                    <validation-provider
                        name="密码"
                        v-slot="{ errors }"
                        rules="required|min:6|max:16"
                    >
                        <label class="layui-form-label">密码框</label>
                        <div class="layui-input-inline">
                            <input
                                v-model.trim="password"
                                required
                                lay-verify="required"
                                placeholder="请输入密码"
                                autocomplete="off"
                                class="layui-input"
                            />
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                    </validation-provider>
                </div>
                <div class="layui-form-item">
                    <validation-provider 
                        v-slot="{errors}" 
                        name="验证码" 
                        rules="required|min:4|max:4"
                    >
                        <label class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                            <input
                                type
                                name
                                required
                                lay-verify="required"
                                placeholder="请输入验证码"
                                autocomplete="off"
                                class="layui-input"
                                v-model.trim="code"
                            />
                        </div>
                        <div
                            class="layui-form-mid layui-word-aux svg"
                            @click="hanleClickGetCaptcha"
                            v-html="captcha"
                        ></div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                    </validation-provider>
                </div>

                <button type="button" class="layui-btn">点击登录</button>
                <a class="link" href="http://www.layui.com">忘记密码？</a>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { 
    ValidationProvider, 
    ValidationObserver ,
    extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zh from 'vee-validate/dist/locale/zh_CN';

for (const rule in rules) {
    extend(rule, {
        ...rules[rule],
        message: zh.messages[rule]
    })    
}


export default {
    name: 'app',
    data(){
        return {
            captcha: '', // 图形验证码
            name: '',
            password: '', 
            code: '',
        }
    },
    components: {
        ValidationProvider,
        ValidationObserver
    },
    mounted(){
        // 获取验证码
        this.hanleClickGetCaptcha();
    }, 
    methods: {
        async hanleClickGetCaptcha(){
            const res = await axios.get('http://localhost:3000/getCaptcha');
            console.log(res)
            if(res.status===200){
                const { code, data } = res.data;
                if(code === 200) this.captcha = data;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
	#app{
		background-color: #f7f7f7;
		.layui-container{
			background-color: #fff;
            
            .svg{
                position: relative;
                top: -15px;
                cursor: pointer;
            }
            input{
                width: 200px;
            }
            .link{
                margin-left: 10px;
                user-select: none;
                &:hover{
                    color: #009688;
                }
            }
            .error{
                color: red;
                margin-left: 15px;
            }
		}

	}
</style>
