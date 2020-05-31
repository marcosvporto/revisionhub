<template>
    <card :height="(action==='login')?(425+40*this.errors.length)+'px':(655+40*this.errors.length)+'px'"
          @close="$emit('close')">
        <template v-if="action==='login'">
            <template slot="title">Login</template>
            <template slot="body">
                <form class="flex-column login-body" @submit.prevent="loginUser" action="none">
                    <label for="email-l">Email</label>
                    <input required type="email" v-model="email" id="email-l" autocomplete="username">
                    <label for="password-l">Senha</label>
                    <input required type="password" v-model="password" id="password-l" autocomplete="current-password">
                    <button type="submit">Login</button>
                    <span style="cursor: pointer" @click="action='cadastro'">Não possui uma conta? Cadastre-se</span>
                    <div class="error-container">
                        <p v-for="(error,index) in errors" :key="index">
                            {{error}}
                        </p>
                    </div>
                </form>
            </template>
        </template>
        <template v-else-if="action==='cadastro'">
            <template slot="title">Cadastro</template>
            <template slot="body">
                <form class="flex-column login-body" @submit.prevent="createUser">
                    <label for="name-c">Nome</label>
                    <input required type="text" v-model="name" id="name-c">
                    <label for="email-c">Email</label>
                    <input required type="email" v-model="email" id="email-c" autocomplete="username">
                    <label for="password-c">Senha</label>
                    <input required type="password" v-model="password" id="password-c" autocomplete="new-password">
                    <label for="confirmedPassword-c">Confirme a senha</label>
                    <input required type="password" v-model="confirmedPassword" id="confirmedPassword-c"
                           autocomplete="new-password">
                    <button type="submit">Cadastrar</button>
                    <span style="cursor: pointer" @click="action='login'">Já possui uma conta? Login</span>
                    <div class="error-container">
                        <p v-for="(error,index) in errors" :key="index">
                            {{error}}
                        </p>
                    </div>
                </form>
            </template>
        </template>
    </card>
</template>

<script>
    import Card from "@/components/Card";
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    export default {
        name: "Login",
        mixins: [ConnectionMixin],
        components:
            {
                'card': Card
            },
        data:
            function () {
                return {
                    action: 'login',
                    name: '',
                    email: '',
                    password: '',
                    confirmedPassword: '',
                    errors: []
                };
            },
        methods:
            {
                async loginUser() {
                    this.errors = []
                    if (this.email.length > 0 && this.password.length > 0) {
                        let connection
                        let response
                        try {
                            connection = this.getUnauthenticatedRoute()
                            response = await connection.post('/sessions', {
                                email: this.email,
                                password: this.password
                            })
                        } catch (e) {
                            if(e.response)
                            {
                                this.errors.push(e.response.data.message)
                            }
                            else
                            {
                                this.errors.push(e)
                            }
                            return
                        }

                        if (response.status === 200) {
                            this.connect(response.data.token,response.data.user.id)
                            await this.$alert('Login efetuado com sucesso')
                            this.$emit('close')
                        } else {
                            this.errors.push('Usuário ou senha inválido')
                        }
                    } else {
                        if (this.email.length === 0) this.errors.push('Preencher o e-mail é obrigatório')
                        if (this.password.length === 0) this.errors.push('Preencher a senha é obrigatório')
                    }
                },
                async createUser() {
                    this.errors = []
                    if (this.email.length > 0
                        && this.name.length > 0
                        && this.password.length > 0
                        && this.confirmedPassword.length > 0)
                    {
                        if(this.password !== this.confirmedPassword)
                        {
                            this.errors.push('Senha e confirmação não são iguais.')
                            return
                        }
                        let connection
                        let response
                        try {
                            connection = this.getUnauthenticatedRoute()
                            console.log(this.name)
                            response = await connection.post('/users', {
                                name: this.name,
                                email: this.email,
                                password: this.password
                            })
                        } catch (e) {
                            if(e.response)
                            {
                                this.errors.push(e.response.data.message)
                            }
                            else
                            {
                                this.errors.push(e)
                            }
                            return
                        }
                        if (response.status === 200) {
                            this.connect(response.data.token,response.data.user.id)
                            await this.$alert('Cadastro feito com sucesso.')
                            this.action = 'login'
                        } else {
                            this.errors.push('Erro ao criar a conta')
                        }
                    } else {
                        if (this.email.length === 0) this.errors.push('Preencher o e-mail é obrigatório')
                        if (this.password.length === 0) this.errors.push('Preencher a senha é obrigatório')
                    }
                }
            }
    }
</script>

<style scoped>
    .login-body {
        height: 100%;
        padding: 0;
    }

    .login-body > input {
        padding: 15px 10px;
        border: var(--blue) 4px solid;
        background-color: transparent;
        margin-bottom: 30px;
    }

    .login-body > label, .login-body > span {
        color: black;
        text-align: left;
        font-weight: bolder;
        margin-top: 10px;
    }

    .login-body > button {
        padding: 10px 15px;
        border: var(--light-green) 3px solid;
        border-radius: 5px;
        color: var(--light-green);
        width: 90px;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
    }

    .error-container {
        color: var(--red)
    }

</style>