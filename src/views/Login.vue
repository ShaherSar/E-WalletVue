<template>
  <b-row>
    <b-col md="6" class="mx-auto mt-3">
      <b-card>
        <b-card-header><h3 class="text-center">Login</h3></b-card-header>
        <b-card-body>
          <b-form @submit.prevent="submit">
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

            <b-button type="submit" variant="primary" block>Login</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Home',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      showError: true
    }
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      try {
        await this.LogIn(this.form);
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  }
}
</script>