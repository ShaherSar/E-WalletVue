import axios from 'axios';
const state = {
    user: null,
    paymentMethods: null,
    token:null,
    currencies:null,
    users:null,
    transactions:null,
    errors:null,
    dataset:{
        labels:[],
        data:[]
    }
};
const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin:state => (state.user.role == 'Admin'),
    getUser: state => state.user,
    getTransactions:state => (state.user != null)?state.user.wallet.transactions:null,
    getAllUsersForAdmin:state => state.users,
    getAllTransactionForAdmin:state =>state.transactions,
    getCurrencies:state => state.currencies,
    getPaymentMethods:state => state.paymentMethods,
    getDataSet:state => state.dataset
};
const actions = {
    async GetChartDataSet({ state,commit }){
        let response = (await axios.get('transactions/chart',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        }))
        commit('setDataSet', response.data)
    },
    async UpdateUserStatus({dispatch,state},form){
        let response = await axios.post('users/update', form,{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        console.log(response);
        if(response.data && response.status == 200){
            await dispatch('GetAllUsersForAdmin', form)
        }else{
            console.log(response)
        }
        await dispatch('UpdateUserInfo')
    },
    async UpdateTransactionStatus({dispatch,state},form){
        let response = await axios.post('transactions/update', form,{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        if(response.data && response.status == 200){
            await dispatch('GetAllTransactionsForAdmin', form)
        }else{
            console.log(response)
        }
        //await dispatch('UpdateUserInfo')
    },
    async Register({dispatch}, form) {
        let response = await axios.post('register', form)
        console.log(response);
        if(response.data && response.status == 200){
            form.device_name = 'VueJS'+Math.random(0,1000)
            await dispatch('LogInAction', form)
        }else{
            return response;
        }
    },
    async LogIn({dispatch}, form) {
        form.device_name = 'VueJS'+Math.random(0,1000)
        await dispatch('LogInAction', form)
    },
    async LogOut({commit}){
        commit('setUser',null)
        commit('setToken',null)
        commit('setPaymentMethods',null)
        commit('setTransactions',null)
        commit('setUsersForAdmin',null)
        commit('setCurrencies',null)
        commit('setDataSet',null)
    },
    async LogInAction({dispatch,commit}, User) {
        let response =  await axios.post('login', User)
        console.log(response)
        if(response.data) {
            if(response.data.errors == null){
                await commit('setUser', response.data.user)
                await commit('setToken', response.data.token)
                await dispatch('UpdateUserInfo')
                await dispatch('GetPaymentMethods')
                await dispatch('GetCurrencies')
            }
        }
    },
    async CreatePaymentMethod({state,dispatch},Form) {
        await axios.post('payment-methods/store', Form,{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        await dispatch('GetPaymentMethods')
        await dispatch('UpdateUserInfo')
    },
    async GetCurrencies({ state,commit }){
        let response = (await axios.get('currencies',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        }))
        commit('setCurrencies', response.data)
    },
    async GetPaymentMethods({state,commit }){
        let response = (await axios.get('payment-methods',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        }))
        commit('setPaymentMethods', response.data)
        //await dispatch('UpdateUserInfo')
    },
    async CreateTransaction({state,dispatch}, form) {
        await axios.post('transactions/store', form,{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        await dispatch('UpdateUserInfo')
    },
    async GetAllTransactionsForAdmin({ dispatch,commit,state }){
        let response = await axios.get('transactions',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        commit('setTransactions', response.data)
        await dispatch('UpdateUserInfo')
    },
    async GetAllUsersForAdmin({ dispatch,commit ,state}){
        let response = await axios.get('users',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        })
        commit('setUsersForAdmin', response.data)
        await dispatch('UpdateUserInfo')
    },
    async UpdateUserInfo({ state,commit }){
        let response = (await axios.get('/user',{
            headers: {
                'Authorization': "Bearer "+ state.token,
            }
        }))
        commit('setUser', response.data)
    },
};
const mutations = {
    setUser(state, user){
        state.user = user
    },
    setPaymentMethods(state, paymentMethods){
        state.paymentMethods = paymentMethods
    },
    setTransactions(state, transactions){
        state.transactions = transactions
    },
    setToken(state, token){
        state.token = token
    },
    setCurrencies(state,currencies){
        state.currencies = currencies
    },
    setUsersForAdmin(state,users){
        state.users = users
    },
    setDataSet(state,dataset){
        state.dataset = dataset
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};