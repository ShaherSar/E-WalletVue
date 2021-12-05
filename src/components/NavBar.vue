<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand><router-link to="/">E-Wallet</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <b-nav-item><router-link to="/admin">Dashboard</router-link></b-nav-item>
        <b-nav-item><router-link to="/admin/payment-methods">PaymentMethods</router-link></b-nav-item>
        <b-nav-item><router-link to="/admin/users">Users</router-link></b-nav-item>
        <b-nav-item><router-link to="/admin/transactions">Transactions</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="!isLoggedIn">
        <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item><router-link to="/register">Register</router-link></b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="isLoggedIn">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{UserData.email}}</em>
          </template>
          <b-dropdown-item>Balance : {{UserData.wallet.balance}} JOD</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: 'NavBar',
  computed : {
    isAdmin:function (){
      return this.$store.getters.isAdmin;
    },
    isLoggedIn : function(){
      return this.$store.getters.isAuthenticated
    },
    UserData : function (){
      return this.$store.getters.getUser
    },
  },
  methods: {
    ...mapActions(["LogOut"]),
    async logout (){
      await this.LogOut();
      this.$router.push('/login')
    }
  },
}
</script>