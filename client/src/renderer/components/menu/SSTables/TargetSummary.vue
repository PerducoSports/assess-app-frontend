<template>
    <div id="targetSummary"></div>
</template>

<script>
import {mapGetters} from 'vuex'
import Plotly from 'plotly.js'

export default {
  data () {
    return {
      data: [],
      routes: [],
      currentColor: null

    }
  },
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      sessionStats: 'sessionStats',
      clickedRoutes: 'clickedRoutes'
    })
  },
  watch: {
    // watch clicked Routes and init function on change
    clickedRoutes: {
      handler (val) {
        if (this.data !== []) {
          // init dat
          this.data = []

          // run fill function
          this.fill()

          // replot when routes are changed
          Plotly.react('targetSummary', this.data, this.layout)
        }
      },
      deep: true
    }
  },
  methods: {
    fill () {
      // set up routes arr
      for (let route of this.sessionStats['Route Data']) {
        this.routes.push(route[0])
      }

      // delete first route value since its just the word route
      this.routes.shift()

      // create plots
      for (let i of this.sessionStats.targetimage) {
        // set inactive and active colors
        let activeColor = 'rgb(44, 62, 80)'
        let inactiveColor = 'rgba(44, 62, 80, 0.4)'

        // check if route is in clickedRoutes array
        if (this.clickedRoutes !== null) {
          if (this.clickedRoutes.includes(i.route)) {
            this.currentColor = activeColor

          // if not leave color default
          } else {
            this.currentColor = inactiveColor
          }
        }

        // push each circle to this.data array
        this.data.push({
          x: [i.x],
          y: [i.y],
          mode: 'markers',
          type: 'scatter',
          layer: 'above',
          name: this.sessionStats.targetimage.route,
          marker: {
            size: 10,
            symbol: 'circle',
            color: this.currentColor
          },
          hovertext: [this.sessionStats.targetimage.route]
        })
      }
    }
  },
  mounted () {
    this.fill()
    // set layout
    var layout = {
      showlegend: false,
      xaxis: {
        range: [-4, 4],
        fixedrange: true,
        showgrid: true,
        zeroline: false,
        showline: false
      },
      yaxis: {
        range: [-4, 4],
        fixedrange: true,
        showgrid: true,
        zeroline: false,
        showline: false
      },
      hovermode: 'closest',
      width: 600,
      height: 600,
      layer: 'below',
      shapes: [{
        // Green inner ring
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -0.5,
        layer: 'below',
        y0: -0.5,
        x1: 0.5,
        y1: 0.5,
        line: {color: 'green'}
      },
      {
        // Yellow mid ring
        type: 'circle',
        layer: 'below',
        xref: 'x',
        yref: 'y',
        x0: -1.0,
        y0: -1.0,
        x1: 1.0,
        y1: 1.0,
        line: {color: 'yellow'}
      },
      {
        // Red outer ring
        type: 'circle',
        layer: 'below',
        xref: 'x',
        yref: 'y',
        x0: -1.5,
        y0: -1.5,
        x1: 1.5,
        y1: 1.5,
        line: {color: 'red'}
      }]
    }

    // set layout to be a data prop
    this.layout = layout

    // init plot
    Plotly.newPlot('targetSummary', this.data, this.layout)
  }
}
</script>
<style scoped>
#targetSummary{
  width: 100%;
  height: 100vh;
}
</style>
