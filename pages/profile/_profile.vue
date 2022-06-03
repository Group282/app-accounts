<template>
  <b-container>
    <b-row>
      <b-col>
        <h2 class="mt-3">{{ account.name }}</h2>

        <div class="d-flex mt-2" v-if="account.name">
          <div class="text-danger">
            <b-icon icon="person-fill"></b-icon>
            <span>Name:</span>
          </div>
          <div class="ml-1">{{ account.name }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account.account_name">
          <div class="text-danger">
            <b-icon icon="person-bounding-box"></b-icon>
            <span>Account name:</span>
          </div>
          <div class="ml-1">{{ account.account_name }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account.email">
          <div class="text-danger">
            <b-icon icon="envelope"></b-icon>
            <span>E-mail:</span>
          </div>
          <div class="ml-1">{{ account.email }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account.status">
          <div class="text-danger">
            <b-icon icon="star-fill"></b-icon>
            <span>Status:</span>
          </div>
          <div class="ml-1">
            <b-badge v-if="account.status === 'Active'" variant="primary">{{ account.status }}</b-badge>
            <b-badge v-else-if="account.status === 'Pending'" variant="danger">{{ account.status }}</b-badge>
            <b-badge v-else-if="account.status === 'Disable'" variant="warning">{{ account.status }}</b-badge>
            <b-badge v-else variant="secondary">{{ account.status }}</b-badge>
          </div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account.start_date">
          <div class="text-danger">
            <b-icon icon="alarm"></b-icon>
            <span>Start date:</span>
          </div>
          <div class="ml-1">{{ $moment.unix(account.start_date).format("DD MMM YYYY") }}</div>
        </div>
        <!---->
        <div class="d-flex mt-2" v-if="account.expiration_date">
          <div class="text-danger">
            <b-icon icon="alarm-fill"></b-icon>
            <span>Expiration date:</span>
          </div>
          <div class="ml-1">{{ $moment.unix(account.expiration_date).format("DD MMM YYYY") }}</div>
        </div>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
export default {
  name: "Profile",
  async asyncData(ctx) {
    const { params, $axios, $config } = ctx;

    const profile = params.profile;
    const account = await $axios.$get(`${$config.API_URL}/accounts/${profile}`)
    return { account };
  },
}
</script>

<style scoped>

</style>
