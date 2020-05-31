<script>
    import axios from 'axios'

    let API_URL = 'http://localhost:3333/'

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
