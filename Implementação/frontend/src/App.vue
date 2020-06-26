<template>
    <div id="app" class="flex-column">
        <navbar>RevisionHub</navbar>
        <router-view id="router-view">
        </router-view>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css')

    export default {
        name: 'App',
        mixins: [ConnectionMixin],
        components: {
            'navbar': Navbar
        },
        watch:
            {
                $route:
                    {
                        //Função dedicada à proteger rotas que requerem login
                        //Entrada: Próxima rota, status de conexão (logado/deslogado), rota atual
                        //Tarefa: Redirecionar o usuário para a próxima rota, levando-o para a tela principal caso tente
                        //acessar uma rota protegida sem permissão.
                        //V&V: Confere se a rota seguinte está na lista de rotas protegidas. Confere o status de
                        //conexão do usuário no caso de ser protegida. Alerta o usuário deslogado caso a rota seja protegida.
                        //Pós Condições: Redirecionamento para uma rota adequada ao status de conexão do usuário.
                        handler: function (to) {

                            const protectedRoutes = ['MyChecklists', 'Create']
                            if (protectedRoutes.indexOf(to.name) >= 0 && !this.isConnected) {
                                this.$router.push('/')
                                this.$alert('Você deve estar logado para acessar essa rota')
                            }
                        },
                        immediate: true
                    }
            }

    }
</script>

<style>
    /* Stylesheet do projeto */
    @import url(assets/css/main.css);
    /* Fonte Roboto da google */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    #app {
        width: 100vw;
        min-width: 1000px;
        overflow: hidden;
        min-height: 100vh;
    }

    #router-view {
        flex: 1 1 auto;
        width: 100%;
    }
</style>
