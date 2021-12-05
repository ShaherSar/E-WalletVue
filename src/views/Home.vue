<template>
<div>
  <b-row v-if="isAuthenticated">
    <b-col md="6" class="mt-3">
      <b-card>
        <b-card-header><h3 class="text-center">Add Transaction</h3></b-card-header>
        <b-card-body>
          <b-form @submit.prevent="submit">
            <b-form-select v-model="form.payment_method_id" :options="PaymentMethods" text-field="name" value-field="id" class="mb-3" @change="onChangeMethod($event)" required>
              <template #first>
                <b-form-select-option :value="null" disabled>-- Payment Method --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-select v-model="form.currency_id" class="mb-3" :options="currencies_to_show" text-field="name" value-field="id" required>
              <template #first>
                <b-form-select-option :value="null" disabled>-- Currency --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-select v-model="form.type" class="mb-3" required>
              <template #first>
                <b-form-select-option :value="null" disabled>-- Action --</b-form-select-option>
              </template>
              <b-form-select-option value="Deposit">Deposit</b-form-select-option>
              <b-form-select-option value="Withdraw">Withdraw</b-form-select-option>
            </b-form-select>
            <b-form-group
                id="input-group-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.amount"
                  type="text"
                  placeholder="Amount"
                  required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>Request</b-button>
          </b-form>
          <!--
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
            <pre class="m-0">{{ currencies_to_show }}</pre>
          </b-card>
          -->
        </b-card-body>
      </b-card>
    </b-col>
  </b-row >
  <b-row class="mt-3" v-if="isAuthenticated">
    <b-col>
      <b-card>
        <b-card-header>
          <h3>My Transactions</h3>
        </b-card-header>
        <b-card-body>
          <b-table-simple bordered hover>
            <b-thead>
              <b-th>ID</b-th>
              <b-th>Date</b-th>
              <b-th>Type</b-th>
              <b-th>Status</b-th>
              <b-th>Currency</b-th>
              <b-th>Amount</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(el) in Transactions" v-bind:key="el.id">
                <b-td>{{el.id}}</b-td>
                <b-td>{{el.created_at}}</b-td>
                <b-td>{{ el.type }}</b-td>
                <b-td>{{ el.status }}</b-td>
                <b-td>{{ el.currency.name }}</b-td>
                <b-td>{{ el.amount }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row v-if="!isAuthenticated" class="mt-3">
    <b-col>
      <b-alert variant="danger" show><h3>You are not logged in</h3></b-alert>
    </b-col>
  </b-row>
</div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'Home',
  computed:{
    isAuthenticated:function (){
      return this.$store.getters.isAuthenticated
    },
    UserData:function (){
      return this.$store.getters.getUser;
    },
    Transactions:function (){
      //console.log(this.$store.getters.getTransactions);
      return this.$store.getters.getTransactions;
    },
    PaymentMethods:function (){
      //console.log(this.$store.getters.getTransactions);
      return this.$store.getters.getPaymentMethods;
    },
  },
  data() {
    return {
      currencies_to_show:null,
      form:{
        payment_method_id:null,
        currency_id:null,
        amount:null,
        type:null,
      },
      show: true
    }
  },
  methods: {
    onChangeMethod(event) {
      for (let i = 0; i < this.PaymentMethods.length; i++) {
        if(this.PaymentMethods[i].id == event){
          this.currencies_to_show = this.PaymentMethods[i].currencies
        }
      }
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    ...mapActions(["CreateTransaction",'UpdateUserInfo','GetPaymentMethods']),
    async submit() {
      try {
        await this.CreateTransaction(this.form);
      } catch (error) {
        console.log(error)
      }
    },
    async UpdatePageData(){
      await this.UpdateUserInfo();
      await this.GetPaymentMethods();
    }
  },
  created() {
    this.UpdatePageData()
  }
}
</script>