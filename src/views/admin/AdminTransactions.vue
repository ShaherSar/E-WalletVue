<template>
  <div>
    <b-row class="mt-3">
      <b-col>
        <b-table-simple bordered>
          <b-thead>
            <b-th>Transaction ID</b-th>
            <b-th>User</b-th>
            <b-th>Currency</b-th>
            <b-th>Type</b-th>
            <b-th>Amount</b-th>
            <b-th>Status</b-th>
            <b-th>Action</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(el) in getAllTransactions" v-bind:key="el.id">
              <b-td>{{ el.id }}</b-td>
              <b-td>{{el.wallet.user.email}}</b-td>
              <b-td>{{el.currency.name}}</b-td>
              <b-td>{{ el.type }}</b-td>
              <b-td>{{el.amount}}</b-td>
              <b-td>{{ el.status }}</b-td>
              <b-td><b-btn @click="ButtonClick(el.id,'Approved')">Approve</b-btn> <b-btn @click="ButtonClick(el.id,'Rejected')">Reject</b-btn> </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data:()=>({

  }),
  methods:{
    ...mapActions(["GetAllTransactionsForAdmin"]),
    async UpdateTransactionsTable() {
      await this.GetAllTransactionsForAdmin();
    },
    ...mapActions(["UpdateTransactionStatus"]),
    async ButtonClick(id,status) {
      await this.UpdateTransactionStatus({id,status});
    },
  },
  computed:{
    getAllTransactions:function (){
      return this.$store.getters.getAllTransactionForAdmin
    }
  },
  created() {
    this.UpdateTransactionsTable()
  }
};
</script>