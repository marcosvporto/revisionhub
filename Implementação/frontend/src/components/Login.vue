<template>
    <card :height="(action==='login')?'425px':'530px'" @close="$emit('close')">
        <template v-if="action==='login'">
            <template slot="title">Login</template>
            <template slot="body">
                <div class="flex-column login-body">
                    <span>Login</span>
                    <input required>
                    <span>Senha</span>
                    <input required>
                    <button>Login</button>
                    <span style="cursor: pointer" @click="action='cadastro'">Não possui uma conta? Cadastre-se</span>
                </div>
            </template>
        </template>
        <template v-else-if="action==='cadastro'">
            <template slot="title">Cadastro</template>
            <template slot="body">
                <div class="flex-column login-body">
                    <span>Login</span>
                    <input required>
                    <span>Senha</span>
                    <input required>
                    <span>Confirme a senha</span>
                    <input required>
                    <button>Cadastrar</button>
                    <span style="cursor: pointer" @click="action='login'">Já possui uma conta? Login</span>
                </div>
            </template>
        </template>
    </card>
</template>

<script>
    import Card from "@/components/Card";
    export default {
        name: "Login",
        components:
        {
            'card':Card
        },
        data:
            function() {
                return {
                    action: 'login'
                };
        }
    }
</script>

<style scoped>
    .login-body
    {
        height: 100%;
        padding: 0;
    }
    .login-body > input
    {
        padding: 15px 10px;
        border: var(--blue) 4px solid;
        background-color: transparent;
        margin-bottom: 30px;
    }
    .login-body > span
    {
        color:black;
        text-align: left;
        font-weight: bolder;
        margin-top: 10px;
    }
    .login-body > button
    {
        padding: 10px 15px;
        border: var(--light-green) 3px solid;
        border-radius: 5px;
        color: var(--light-green);
        width: 90px;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
    }
</style>