<template>
  <b-container>
    <b-row>
      <b-col>
        <h2 class="mt-3">{{ name }}</h2>

        <div class="d-flex mt-2" v-if="name">
          <div class="text-danger">
            <b-icon icon="person-fill"></b-icon>
            <span>Name:</span>
          </div>
          <div class="ml-1">{{ name }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account_name">
          <div class="text-danger">
            <b-icon icon="person-bounding-box"></b-icon>
            <span>Account name:</span>
          </div>
          <div class="ml-1">{{ account_name }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="email">
          <div class="text-danger">
            <b-icon icon="envelope"></b-icon>
            <span>E-mail:</span>
          </div>
          <div class="ml-1">{{ email }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="accountStatus">
          <div class="text-danger">
            <b-icon icon="star-fill"></b-icon>
            <span>Status:</span>
          </div>
          <div class="ml-1">
            <b-badge v-if="accountStatus === 'Active'" variant="primary">{{ accountStatus }}</b-badge>
            <b-badge v-else-if="accountStatus === 'Pending'" variant="danger">{{ accountStatus }}</b-badge>
            <b-badge v-else-if="accountStatus === 'Disable'" variant="warning">{{ accountStatus }}</b-badge>
            <b-badge v-else variant="secondary">{{ accountStatus }}</b-badge>
          </div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="start_date">
          <div class="text-danger">
            <b-icon icon="alarm"></b-icon>
            <span>Start date:</span>
          </div>
          <div class="ml-1">{{ getLocalizedDate(start_date) }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="expiration_date">
          <div class="text-danger">
            <b-icon icon="alarm-fill"></b-icon>
            <span>Expiration date:</span>
          </div>
          <div class="ml-1">{{ getLocalizedDate(expiration_date) }}</div>
        </div>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
const API_URL = 'http://localhost:3000';

export default {
  name: "Profile",
  async asyncData({ params, $axios }) {

    const profile = params.profile;
    const accountData = await $axios.$get(`${API_URL}/accounts/${profile}`)
    const { name, account_name, email, status: accountStatus, start_date, expiration_date } = accountData;
    return { name, account_name, email, accountStatus, start_date, expiration_date };
  },
  methods: {
    getLocalizedDate(utcSeconds) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const date = new Date(0);
      date.setUTCSeconds(utcSeconds);

      const year = date.getFullYear();
      const month = date.getMonth();
      const monthDate = date.getDate();

      return `${monthDate} ${months[month]} ${year}`;
    },
  },
}
</script>

<style scoped>

</style>
