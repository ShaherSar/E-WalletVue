<template>
  <div>
    <b-row class="mt-3">
      <b-col>
        <b-table-simple bordered>
          <b-thead>
            <b-th>User ID</b-th>
            <b-th>User Email</b-th>
            <b-th>Role</b-th>
            <b-th>Balance</b-th>
            <b-th>Status</b-th>
            <b-th>Action</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(el) in getAllUsers" v-bind:key="el.id">
              <b-td>{{ el.id }}</b-td>
              <b-td>{{ el.email }}</b-td>
              <b-td>{{el.role}}</b-td>
              <b-td>{{el.wallet.balance}}</b-td>
              <b-td>{{ el.status }}</b-td>
              <b-td><b-btn @click="ButtonClick(el.id,'Active')" v-if="el.status != 'Active'">Active</b-btn> <b-btn @click="ButtonClick(el.id,'InActive')" v-if="el.status != 'InActive' && el.id != 1">InActive</b-btn> <b-btn @click="ButtonClick(el.id,'Blocked') && el.id != 1" v-if="el.status != 'Blocked' && el.id != 1">Block</b-btn></b-td>
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
    ...mapActions(["GetAllUsersForAdmin"]),
    async UpdateUsersTable() {
      await this.GetAllUsersForAdmin();
    },
    ...mapActions(["UpdateUserStatus"]),
    async ButtonClick(id,status) {
      await this.UpdateUserStatus({id,status});
    },
  },
  computed:{
    getAllUsers:function (){
      return this.$store.getters.getAllUsersForAdmin
    }
  },
  created() {
    this.UpdateUsersTable()
  }
};
</script>