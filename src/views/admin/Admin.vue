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
    this.fillData()
    this.GetChartDataSet()
  },
  computed:{
    dataset:function(){
      return this.$store.getters.getDataSet
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.dataset.labels, //Dates X
        datasets: [
            {
            label: 'Deposit Count',
            data: this.dataset.data
          },
        ]
      }
    },
    ...mapActions(['GetChartDataSet']),
    async GetDataSet(){
      await this.GetChartDataSet()
    }
  }
}
</script>