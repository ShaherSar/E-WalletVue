<template>
  <div>
    <b-row>
      <b-col md="6" class="mt-3">
        <b-card>
          <b-card-header><h3 class="text-center">Add Payment Method</h3></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="submit">
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    placeholder="Name"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.image"
                    type="text"
                    placeholder="Image Link"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.minimum_deposit"
                    type="text"
                    placeholder="Minimum Deposit"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.maximum_deposit"
                    type="text"
                    placeholder="Maximum Deposit"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.minimum_withdrawal"
                    type="text"
                    placeholder="Minimum Withdrawal"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.maximum_withdrawal"
                    type="text"
                    placeholder="Maximum Withdrawal"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-select v-model="form.allowed_currencies" :options="Currencies" text-field="name" value-field="id" class="mb-3" multiple :select-size="4">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Allowed Currencies --</b-form-select-option>
                </template>
              </b-form-select>
              <b-button type="submit" variant="primary" block>Submit</b-button>
            </b-form>
            <!--
            <b-card class="mt-3" header="Form Data Result">
              <pre class="m-0">{{ form }}</pre>
            </b-card>-->
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  computed:{
    Currencies:function (){
      return this.$store.getters.getCurrencies;
    }
  },
  data:()=>({
    form:{
      name:null,
      image:null,
      minimum_deposit:null,
      minimum_withdrawal:null,
      maximum_deposit:null,
      maximum_withdrawal:null,
      allowed_currencies:[] // [] array of ids
    },
  }),
  methods:{
    ...mapActions(["CreatePaymentMethod"]),
    async submit() {
      try {
        await this.CreatePaymentMethod(this.form);
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>