<template>
  <div>
    <b-row v-if="!isAuthenticated">
      <b-col md="6" class="mx-auto mt-3">
        <b-card>
          <b-card-header><h3 class="text-center">Register</h3></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="submit" @reset="onReset">
              <b-form-group
                  id="input-group-1"
                  label="Name:"
                  label-for="input-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter Name"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="input-1"
              >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    type="password"
                    v-model="form.password"
                    placeholder="Password"
                    required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary" block>Register</b-button>
            </b-form>
            <!--
            <b-card class="mt-3" header="Form Data Result">
              <pre class="m-0">{{ form }}</pre>
            </b-card>
            <p v-if="showError" id="error">Username already exists</p>
            -->
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="isAuthenticated" class="mt-3">
      <b-col>
        <b-alert variant="success" show>
          <h3>Logged In Successfully</h3>
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Register',
  computed:{
    isAuthenticated:function (){
      return this.$store.getters.isAuthenticated
    }
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password:'',
      },
      showError: false
    }
  },
  methods: {
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
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  }
}
</script>