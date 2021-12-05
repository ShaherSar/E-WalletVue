<template>
  <div>
    <b-row>
      <b-col>
        <line-chart :chart-data="datacollection"></line-chart>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import LineChart from '@/components/LineChart'
import {mapActions} from "vuex";

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: {}
    }
  },
  mounted () {
    this.GetDataSet()
  },
  computed:{
    dataset:function(){
      return this.$store.getters.getDataSet
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.dataset.labels,
        datasets: [
            {
            label: 'Transactions Count By Date',
            data: this.dataset.data
          },
        ]
      }
    },
    ...mapActions(['GetChartDataSet']),
    async GetDataSet(){
      await this.GetChartDataSet()
      await this.fillData()
    }
  }
}
</script>