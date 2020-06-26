<script>
    import axios from 'axios'

    let API_URL = 'https://desolate-beach-96822.herokuapp.com/'
    export default {
        name: "ConnectionMixin",
        data: function() {
            return {
                token:null
            }
        },
        methods:
        {
            getToken()
            {
                return this.$store.state.tokenStore.token
            },
            getUserId()
            {
                return this.$store.state.tokenStore.userId
            },
            connect(connectionToken, userId)
            {
                this.$store.commit('connect',{connectionToken,userId})
            },
            disconnect()
            {
                this.$store.commit('disconnect')
            },
            getAuthenticatedRoute()
            {
                if(this.isConnected)
                {
                    let axiosInstance = axios.create({
                        baseURL: API_URL,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.getToken()
                        }
                    })

                    return axiosInstance
                }
                else
                {
                    throw Error('Erro: Usuário não autenticado')
                }
            },
            getUnauthenticatedRoute()
            {
                let axiosInstance = axios.create({
                    baseURL: API_URL,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                return axiosInstance
            },
            //Função dedicada para lidar com erros na comunicação com o BackEnd
            //Entrada: Erro detalhado encontrado na requisição
            //Tarefa: Tomar medidas necessárias para impedir que esse erro interrompa o funcionamento do site e alertar
            //o usuário sobre o erro.
            //V&V: Identificação da origem do erro, erro interno do servidor ou falha na comunicação. Em caso de erro
            // interno identificação do código do erro. O código 401 significa uma falha de autenticação, nesse caso o
            // usuário é desconectado, alertado e redirecionado para a página principal. Caso seja outro código o usuário
            // é alertado da mensagem do erro. Caso seja um erro na comunicação o usuário é alertado da falha.
            //Pós Condições: Funcionamento do site sem interrupção, em caso de erro de autenticação a desconexão e redire-
            //cionamento para a página principal devem ser feitos. O usuário sempre deve ser alertado quanto ao erro.
            async handleResponseError(error)
            {
                if(error.response)
                {
                    if(error.response.status === 401)
                    {
                        this.disconnect()
                        await this.$alert('Conexão expirada. Faça login novamente.')
                        await this.$router.push('/')
                        return
                    }
                    await this.$alert(error.response.data.message)
                } else {
                    await this.$alert(error)
                }

            }
        },
        computed:
        {
            isConnected()
            {
                return this.$store.getters.isConnected
            }
        }
    }
</script>
