<template>
  <div>
    <!--  -->
    <b-container fluid="xl" class="mt-4">
      <b-row>
        <b-col class="flex-grow-1"><h2>Account list</h2></b-col>
        <b-col class="flex-grow-0 flex-shrink-0">
          <b-button
            :to="{query: {createAccount: null}}"
            class="ml-2 text-nowrap"
            variant="primary"
          >
            Create account
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <!--    -->
    <b-container fluid="xl" class="mt-4">
      <b-alert class="p-4" show variant="primary">
        <b-skeleton-wrapper :loading="!firstLoaded">
          <template #loading>
            <b-skeleton width="10%"/>
          </template>
          Total: {{ accounts.length }}
        </b-skeleton-wrapper>
      </b-alert>
    </b-container>
    <!--    -->
    <b-container fluid="xl" class="mt-2">
      <b-table-simple responsive fixed class="$styles.table">
        <b-thead>
          <b-tr>
            <b-th width="10%">Name</b-th>
            <b-th>Account name</b-th>
            <b-th>E-mail</b-th>
            <b-th width="80px">Status</b-th>
            <b-th width="13%">Start date</b-th>
            <b-th width="13%">Expiration date</b-th>
            <b-th width="140px"></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <!--          -->
          <b-tr
            v-for="(account, index) in accounts"
            :key="account ? '' + index + account.id : index"
          >
            <template v-if="!firstLoaded">
              <b-td v-for="(_, i) in [...Array(7)]" :key="i">
                <b-skeleton />
              </b-td>
            </template>
            <template v-else>
              <b-td class="align-middle" data-ceil="name">
                <b-link :href="'/profile/' + account.id">{{ account.name }}</b-link>
              </b-td>
              <b-td class="align-middle" data-ceil="account_name">{{ account.account_name }}</b-td>
              <b-td class="align-middle" data-ceil="email">{{ account.email }}</b-td>
              <b-td class="align-middle" data-ceil="status">
                <b-badge v-if="account.status === 'Active'" variant="primary">{{ account.status }}</b-badge>
                <b-badge v-else-if="account.status === 'Pending'" variant="danger">{{ account.status }}</b-badge>
                <b-badge v-else-if="account.status === 'Disable'" variant="warning">{{ account.status }}</b-badge>
                <b-badge v-else variant="secondary">{{ account.status }}</b-badge>
              </b-td>
              <b-td class="align-middle" data-ceil="start_date">
                {{ $moment.unix(account.start_date).format("DD MMM YYYY") }}
              </b-td>
              <b-td class="align-middle" data-ceil="expiration_date">
                {{ $moment.unix(account.expiration_date).format("DD MMM YYYY") }}
              </b-td>
              <b-td class="align-middle" data-ceil="actions">
                <b-button
                  :to="{query: {editAccount: account.id}}"
                  replace
                  size="sm"
                  variant="info"
                  :disabled="deletePendings[account.id]"
                  @c1lick="() => {
                  editingAccountData = {
                    ...account,
                    start_date:   $moment.unix(account.expiration_date).format('YYYY-MM-DD'),
                    expiration_date: $moment.unix(account.expiration_date).format('YYYY-MM-DD'),
                     };
                }"
                >
                  Edit
                </b-button>
                <!--              -->
                <b-button
                  class="ml-xl-1 mt-1 mt-lg-0 text-center position-relative"
                  size="sm"
                  variant="secondary"
                  @click="deleteAccount(account.id)"
                  :disabled="deletePendings[account.id]"
                >
                  <div
                    class="position-absolute fade"
                    style="top: 50%; left: 50%; transform: translate(-50%, -50%)">
                    <b-spinner small v-show="deletePendings[account.id]"/>
                  </div>
                  <span :class="{'show': !deletePendings[account.id]}" class="fade"> Delete </span>
                </b-button>

              </b-td>
            </template>
          </b-tr>
          <!--          -->
        </b-tbody>
      </b-table-simple>
    </b-container>

    <!--     edit account modal     -->
    <b-modal
      :visible="$route.query.createAccount !== undefined || $route.query.editAccount !== undefined"
      :title="
        $route.query.createAccount !== undefined ? 'Create account' :
        $route.query.editAccount !== undefined ? 'Edit account' :
        'Unknown action'
      "
      :ok-title="
        $route.query.createAccount !== undefined ? 'Create' :
        $route.query.editAccount !== undefined ? 'Save' :
        'Unknown action'
      "
      @ok="saveAccount"
      size="lg"
      @show="()=>{
        resetForm();
        if($route.query.editAccount !== undefined) {
          loadAccountFormData($route.query.editAccount);
        }
      }"
      @hide="$router.replace({query: {createAccount: undefined, editAccount: undefined}})"
    >
      <b-form-group label="Name: *" label-for="edit-account-name">
        <b-form-input
          id="edit-account-name"
          v-model="form.name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Account: *" label-for="edit-account-account-name">
        <b-form-input
          id="edit-account-account-name"
          v-model="form.account_name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Status: *" label-for="edit-account-status">
        <b-form-select
          id="edit-account-status"
          v-model="form.status"
          :options="statusVariants"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Email: *" label-for="edit-account-email">
        <b-form-input
          id="edit-account-email"
          v-model="form.email"
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex flex-sm-wrap flex-md-nowrap">
        <b-col class="p-0">
          <b-form-group
            class="flex-grow-1"
            label="Start date"
            label-for="edit-account-start-date"
          >
            <b-form-datepicker
              id="edit-account-start-date"
              v-model="form.start_date"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <!--                -->
        <b-col class="p-0">
          <b-form-group
            class="flex-grow-1 ml-md-3 ml-2"
            label="Expiration date"
            label-for="edit-account-expiration-date"
          >
            <b-form-datepicker
              id="edit-account-expiration-date"
              v-model="form.expiration_date"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </div>
    </b-modal>
  </div>

</template>

<script>
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
import sleep from 'sleep-promise';

// TODO: form validation

export default {
  name: 'IndexPage',
  data() {
    return {
      firstLoaded: false,
      accounts: [...Array(20)],
      form: {
        id: undefined,
        name: undefined,
        account_name: undefined,
        status: undefined,
        email: undefined,
        start_date: undefined,
        expiration_date: undefined,
      },
      deletePendings: {},
      savePendings: {},
      statusVariants: ["Disable", "Active", "Pending"],
    };
  },
  async fetch() {
    // await sleep(1000);
    this.accounts = await this.$axios.$get(`${this.$config.API_URL}/accounts`);
    this.firstLoaded = true;
  },
  // $route.query.editAccount
  methods: {
    async createNewAccount() {
      await this.$axios.post(`${this.$config.API_URL}/accounts`, {
        ...this.form,
        id: last(sortBy(this.accounts, 'id')).id + 1,
        start_date: this.$moment(this.form.start_date).unix(),
        expiration_date: this.$moment(this.form.expiration_date).unix(),
      });
      this.clearForm();
      await this.$fetch();
    },
    resetForm() {
      Object.keys(this.form).forEach(key => this.form[key] = undefined);
    },
    async deleteAccount(id) {
      this.$set(this.deletePendings, id, true);
      await this.$axios.$delete(`${this.$config.API_URL}/accounts/${id}`);
      await this.$fetch();
      this.$delete(this.deletePendings, id);
    },
    async loadAccountFormData(id) {
      const data = await this.$axios.$patch(`${this.$config.API_URL}/accounts/${id}`);
      this.$set(this, 'form', {
        ...data,
        start_date: this.$moment.unix(data.expiration_date).format('YYYY-MM-DD'),
        expiration_date: this.$moment.unix(data.expiration_date).format('YYYY-MM-DD'),
      });
    },
    async saveAccount() {
      const data = {
        ...this.form,
        start_date: this.$moment(this.form.start_date).unix(),
        expiration_date: this.$moment(this.form.expiration_date).unix(),
      };
      if (this.form.id !== undefined) {
        await this.$axios.$patch(`${this.$config.API_URL}/accounts/${this.form.id}`, data);
      } else {
        await this.$axios.$post(`${this.$config.API_URL}/accounts`, data);
      }
      await this.$fetch();
    },
  },
}
</script>

<style lang="scss" module>
.table {
  [data-ceil] {

  }
}
</style>
