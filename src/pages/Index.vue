<template>
  <q-page>
    <q-linear-progress indeterminate v-show="loading" color="primary" />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="search" class="flex flex-center">
        <div class="q-px-lg">
          <div class="text-h6 text-primary">COVID-19 Statistics Tracker</div>
          <q-icon class="icon-virus" name="fas fa-head-side-mask"></q-icon>
          <q-form @submit="getStatistics">
            <div class="row q-gutter-md">
              <q-select
                label="Select a Country on the list"
                v-model="country"
                :options="countries"
                style="width: 300px;"
                outlined
                color="primary"
                label-color="primary"
                dark
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      No options slot
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-btn
                rounded
                unelevated
                color="primary"
                :label="loading ? 'Searching...' : 'Seach'"
                style="padding: 0 20px;"
                no-caps
                type="submit"
                icon="fas fa-viruses"
                :disable="loading || country === ''"
              />
            </div>
            <div></div>
          </q-form>
        </div>
      </q-tab-panel>
      <q-tab-panel name="result" v-if="stats">
        <div class="flex justify-between">
          <div class="text-h6 text-white">COVID-19 Statistics</div>
          <q-btn
            flat
            icon="chevron_left"
            color="white"
            label="Search again"
            @click="tab = 'search'"
          />
        </div>
        <div class="q-mb-md">
          <q-chip :label="stats.country" outline color="white" />
        </div>
        <hr />
        <div class="text-h6 text-white">Cases</div>
        <div class="row flex-wrap q-gutter-md q-mt-md">
          <div
            class="card"
            v-for="(title, index) in Object.keys(stats.cases)"
            :key="index"
          >
            <q-icon name="local_hospital"></q-icon>
            <div class="text-h6">
              <div class="text-capitalize">{{ title }}</div>
              Cases
            </div>
            <p>{{ stats.cases[`${title}`] }}</p>
          </div>
        </div>
        <div class="col-12 q-my-md">
          <hr>
        </div>
        <div class="text-h6 text-white">Deaths</div>
        <div class="row flex-wrap q-gutter-md q-mt-md">
          <div
            class="card"
            v-for="(death, index) in Object.keys(stats.deaths)"
            :key="index"
          >
            <q-icon name="highlight_off"></q-icon>
            <div class="text-h6">
              <div class="text-capitalize">{{death}}</div>
              Deaths
            </div>
            <p>{{ stats.deaths[`${death}`] === null ? 'none' : stats.deaths[`${death}`] }}</p>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      country: '',
      loading: false,
      tab: 'search'
    }
  },
  computed: {
    countries () {
      return this.$store.getters['countries/getCountries']
    },
    stats () {
      return this.$store.getters['countries/getStatistics']
        ? this.$store.getters['countries/getStatistics']
        : null
    }
  },
  methods: {
    getStatistics () {
      this.loading = true
      this.$store.commit('countries/setCountry', this.country)
      this.$store
        .dispatch('countries/dataCall')
        .then(() => {
          this.loading = false
          this.tab = 'result'
          console.log(this.$store.getters['countries/getStatistics'])
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.q-page {
  background: $dark;
  position: relative;
  & .icon-virus {
    font-size: 200px;
    bottom: 0;
    top: 50%;
    left: 50%;
    margin-top: -10%;
    transform: translate(-50%, -50%);
    position: absolute;
    color: rgba($primary, 0.2);
  }
  hr {
    border: none;
    border-top: 1px solid rgba(white, 0.1);
  }
  .q-tab-panels {
    width: 100%;
    height: 100vh;
  }

  .q-tab-panel {
    width: 100%;
    margin: 0;
    padding: 20px;
    height: 100%;
    background: $dark;
    position: relative;
  }

  .card {
    width: 270px;
    border-radius: 15px;
    background-color: #f4eeff;
    color: $dark;
    padding: 15px;
    overflow: hidden;
    position: relative;
    & .text-h6 {
      margin: 0;
      font-size: 20px;
      line-height: 20px;
    }
    & p {
      font-size: 24px;
      font-weight: bold;
      color: $primary;
    }
    & .q-icon {
      font-size: 120px;
      font-weight: 900;
      color: rgba($dark, 0.3);
      position: absolute;
      right: -20px;
      bottom: -10px;
    }
  }
}
</style>
