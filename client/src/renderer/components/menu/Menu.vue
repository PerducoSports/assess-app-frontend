<template>
  <div
   id="main-menu">
    <v-layout>
      <v-flex xs-1>
        <v-menu
        :nudge-bottom="50"
        :nudge-width="100"
        v-model="menu"
        offsex-x
        color="grey darken-4">
          <v-btn slot="activator" color="blue-grey darken-3" dark><i class="material-icons">menu</i></v-btn>
          <v-card>
            <v-list @hover="hoverMachine">
              <v-list-tile  class="menu-item">
                <form enctype="multiple/form-data">
                      <input class="inputfile" type="file" multiple @change="loadFiles" id="selectFiles">
                      Choose Session
                </form>
                <br>
                <br>
              </v-list-tile>
              <v-list-tile v-if="filesLoaded === true" class="menu-item" >
                <v-select v-if="filesLoaded === true" label="Select Play" v-model="plays[0]" :items="plays" item-text="name" @change="changePlay"></v-select>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-if="filesLoaded === true" class="menu-item" @click="setPlayAnimation">
                Play Animation
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-if="filesLoaded === true" class="menu-item" @click="setPlayInformation">
                Play Information
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-if="filesLoaded === true" class="menu-item" @click="setQBPerformance">
                QB Performance
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-if="filesLoaded === true" class="menu-item" @click="setSessionStatistics">
                Session Statistics
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    // local data variables they are called with this
    return {
      files: [],
      filePaths: [],
      filesLoaded: false,
      items: [
        {title: 'Play Animation'},
        {title: 'Play Information'},
        {title: 'QB Performance'},
        {title: 'Session Statistics'}
      ],
      plays: [],
      cnt: 0
    }
  },
  computed: mapGetters({
    sliderTime: 'sliderTime',
    btnState: 'btnState',
    trackingData: 'trackingData',
    maxTime: 'maxTime',
    currentPage: 'currentPage',
    jsonData: 'jsonData'
  }),
  methods: {
    setPlayAnimation () {
      let val = 'playAnimation'
      this.$store.commit('changeCurrentPage', val)
    },
    setPlayInformation () {
      let val = 'playInformation'
      this.$store.commit('changeCurrentPage', val)
    },
    setQBPerformance () {
      let val = 'QBPerformance'
      this.$store.commit('changeCurrentPage', val)
    },
    setSessionStatistics () {
      let val = 'SessionStatistics'
      this.$store.commit('changeCurrentPage', val)
    },
    orientation (xl, yl, xr, yr) {
    // determine angle
      let angle = Math.atan2(yr - yl, xr - xl)
      // shift towards player face
      angle += Math.PI / 2
      // return value of interest
      return angle
    },
    XYDirection (raw, filename) {
      let parsed = JSON.parse(raw)
      if (parsed.mBallTrackingData[0].ballLocation.x !== undefined) {
        let times = []
        let plist = []
        // initialize min and max
        let miny = parsed.mPlaySituation.los - 50
        let maxy = parsed.mPlaySituation.los - 50
        // add sim times
        for (let i of parsed['mBallTrackingData']) {
          times.push(i['simTime'])
        }
        // calculate minimum sim time
        let mint = Math.min(times)
        // player tracking data
        for (let i of parsed['mPlayerTrackingData']) {
        // initialize players
          let player = {}
          player['playerId'] = i['playerId']
          // initialize tracking
          let tracking = []
          for (let m of i['playerTracking']) {
          // # initialize point
            let loc = {}
            // calculate locations
            loc['x'] = -(m['leftShoulderLocation'].x + m['rightShoulderLocation'].x + m['backLocation'].x) / 3 / 91.44
            loc['y'] = (m['leftShoulderLocation'].y + m['rightShoulderLocation'].y + m['backLocation'].y) / 3 / 91.44
            loc['dir'] = this.orientation(m['leftShoulderLocation'].x, m['leftShoulderLocation'].y,
              m['rightShoulderLocation'].x, m['rightShoulderLocation'].y)
            loc['time'] = m['simTime'] - mint
            tracking.push(loc)
            // check if min or max exceeded
            if (loc['y'] + 5 > maxy) {
              maxy = loc['y'] + 5
            } else if (loc['y'] - 5 < miny) {
              miny = loc['y'] - 5
            }
          }
          // add tracking data
          player['playerTracking'] = tracking
          plist.push(player)
        }

        // amend large data section
        parsed['mPlayerTrackingData'] = plist
        // initialize pff positions
        parsed['pffpos'] = {X: {}, Y: {}, Z: {}, F: {}, H: {}}

        // initialize receiver positions
        for (let i = 0; i < parsed.mPlayerRoles.offense.length; i++) {
          // get receiver locations for pff designations
          if (['X', 'Y', 'Z', 'F', 'H'].includes(parsed.mPlayerRoles.offense[i].playPos)) {
            for (let j = 0; j < parsed.mPlayerTrackingData.length; j++) {
              if (parsed.mPlayerRoles.offense[i].playerId === parsed.mPlayerTrackingData[j].playerId) {
                parsed['pffpos'][parsed.mPlayerRoles.offense[i].playPos].x = parsed.mPlayerTrackingData[j].playerTracking[0].x
                parsed['pffpos'][parsed.mPlayerRoles.offense[i].playPos].y = parsed.mPlayerTrackingData[j].playerTracking[0].y - parsed.mPlaySituation.los + 50
                parsed['pffpos'][parsed.mPlayerRoles.offense[i].playPos].pff = ''
              }
            }
          }
        }

        // determine pff receiver designations
        for (let i in parsed['pffpos']) {
          // determine "base" position
          if (parsed['pffpos'][i].y < -2.5) {
            parsed['pffpos'][i].pff = 'HB'
          } else if (parsed['pffpos'][i].x > 0) {
            // right tight ends and receivers
            if (parsed['pffpos'][i].x < 6.5) {
              parsed['pffpos'][i].pff = 'TE-R'
              for (let j in parsed['pffpos']) {
                if (j !== i) {
                  if (parsed['pffpos'][j].x > 0 && parsed['pffpos'][j].x < 9) {
                    parsed['pffpos'][i].pff = 'TE-iR'
                  }
                }
              }
            } else if (parsed['pffpos'][i].x < 9) {
              // look for inside TE
              let ite = false
              // count players outside
              let owr = 0
              for (let j in parsed['pffpos']) {
                if (parsed['pffpos'][j].x > 0 && parsed['pffpos'][j].x < 6.5) {
                  ite = true
                } else if (parsed['pffpos'][j].x > 0 && parsed['pffpos'][j].x > parsed['pffpos'][i].x) {
                  owr++
                }
              }
              if (ite) {
                parsed['pffpos'][i].pff = 'TE-oR'
              } else {
                if (owr === 0) {
                  parsed['pffpos'][i].pff = 'RWR'
                } else if (owr === 1) {
                  parsed['pffpos'][i].pff = 'SRWR'
                } else if (owr > 1) {
                  parsed['pffpos'][i].pff = 'SRiWR'
                }
              }
            } else {
              // count inside and outside receivers
              let iwr = 0
              let owr = 0
              for (let j in parsed['pffpos']) {
                if (parsed['pffpos'][j].x > 0 && parsed['pffpos'][j].x > parsed['pffpos'][i].x) {
                  owr++
                } else if (parsed['pffpos'][j].x > 6.5 && parsed['pffpos'][j].x < parsed['pffpos'][i].x) {
                  iwr++
                }
              }
              // determine designation
              if (owr === 0) {
                parsed['pffpos'][i].pff = 'RWR'
              } else if (owr === 1 && iwr === 0) {
                parsed['pffpos'][i].pff = 'SRWR'
              } else if (owr === 1 && iwr > 0) {
                parsed['pffpos'][i].pff = 'SRoWR'
              } else if (owr > 1 && iwr === 0) {
                parsed['pffpos'][i].pff = 'SRiWR'
              } else if (owr === 2 && iwr === 1) {
                parsed['pffpos'][i].pff = 'SRWR'
              }
            }
          } else {
            // right tight ends and receivers
            if (parsed['pffpos'][i].x > -6.5) {
              parsed['pffpos'][i].pff = 'TE-L'
              for (let j in parsed['pffpos']) {
                if (j !== i) {
                  if (parsed['pffpos'][j].x < 0 && parsed['pffpos'][j].x > -9) {
                    parsed['pffpos'][i].pff = 'TE-iL'
                  }
                }
              }
            } else if (parsed['pffpos'][i].x > -9) {
              // look for inside TE
              let ite = false
              // count players outside
              let owr = 0
              for (let j in parsed['pffpos']) {
                if (parsed['pffpos'][j].x < 0 && parsed['pffpos'][j].x > -6.5) {
                  ite = true
                } else if (parsed['pffpos'][j].x < 0 && parsed['pffpos'][j].x < parsed['pffpos'][i].x) {
                  owr++
                }
              }
              if (ite) {
                parsed['pffpos'][i].pff = 'TE-oL'
              } else {
                if (owr === 0) {
                  parsed['pffpos'][i].pff = 'LWR'
                } else if (owr === 1) {
                  parsed['pffpos'][i].pff = 'SLWR'
                } else if (owr > 1) {
                  parsed['pffpos'][i].pff = 'SLiWR'
                }
              }
            } else {
              // count inside and outside receivers
              let iwr = 0
              let owr = 0
              for (let j in parsed['pffpos']) {
                if (parsed['pffpos'][j].x < 0 && parsed['pffpos'][j].x < parsed['pffpos'][i].x) {
                  owr++
                } else if (parsed['pffpos'][j].x < -6.5 && parsed['pffpos'][j].x > parsed['pffpos'][i].x) {
                  iwr++
                }
              }
              // determine designation
              if (owr === 0) {
                parsed['pffpos'][i].pff = 'LWR'
              } else if (owr === 1 && iwr === 0) {
                parsed['pffpos'][i].pff = 'SLWR'
              } else if (owr === 1 && iwr > 0) {
                parsed['pffpos'][i].pff = 'SLoWR'
              } else if (owr > 1 && iwr === 0) {
                parsed['pffpos'][i].pff = 'SLiWR'
              } else if (owr === 2 && iwr === 1) {
                parsed['pffpos'][i].pff = 'SLWR'
              }
            }
          }
        }

        // ball tracking data
        let balltrack = []
        for (let j of parsed['mBallTrackingData']) {
          let ball = {}
          ball.simTime = j['simTime'] - mint
          ball.ballLocation = {}
          ball.ballLocation.x = -j.ballLocation.x / 91.44
          ball.ballLocation.y = j.ballLocation.y / 91.44
          ball.ballLocation.z = j.ballLocation.z / 91.44
          // add to time stamp
          balltrack.push(ball)
        }
        // amend data section
        parsed['mBallTrackingData'] = balltrack

        // qb tracking data
        let qbTrack = []
        for (let j of parsed['mQBTrackingData']) {
          let qb = {}
          qb['x'] = -j['hmdLocation'].x / 91.44
          qb['y'] = j['hmdLocation'].y / 91.44
          if (j['hmdDirection'].x < 0) {
            qb['dir'] = Math.PI + Math.atan(j['hmdDirection'].y / j['hmdDirection'].x)
          } else {
            qb['dir'] = Math.atan(j['hmdDirection'].y / j['hmdDirection'].x)
          }
          qbTrack.push(qb)
          // check if min or max exceeded
          if (qb['y'] + 5 > maxy) {
            maxy = qb['y'] + 5
          } else if (qb['y'] - 5 < miny) {
            miny = qb['y'] - 5
          }
        }
        parsed.mPlayResult.maxY = maxy
        parsed.mPlayResult.minY = miny
        parsed['mQBTrackingData'] = qbTrack
        parsed.name = filename
        this.$store.commit('updatePlay', parsed)
        // return jsons
      }
    },

    // function used to order files in case you guys want that feature again
    // orderFiles (files) {
    //   let fileHolder = []
    //   let orderedDates = []
    //   let orderedFiles = []
    //   let cnt = 0
    //   // loop through files
    //   for (let file of files) {
    //     // push files to array
    //     if (cnt !== files.length) {
    //       // make sure file is a json file
    //       if (file['name'].endsWith('.json')) {
    //         orderedDates.push(file['lastModified'])
    //         fileHolder.push(file)
    //       }
    //     }
    //     cnt++
    //   }
    //   // sort files by date modified
    //   orderedDates.sort(function (a, b) { return b - a })
    //   for (var i = 0; i < orderedDates.length; i++) {
    //     for (var j = 0; j < fileHolder.length; j++) {
    //       if (fileHolder[j]['lastModified'] === orderedDates[i]) {
    //         orderedFiles.push(fileHolder[j])
    //         this.dirtyFiles.push(fileHolder[j].name)
    //       }
    //     }
    //   }
    //   this.orderedFiles = orderedFiles
    //   return orderedFiles
    // },

    async jsonLoop (files, clickedPlay) {
      // loop through each file in files
      for (let file of files) {
        // fix scope issues
        let self = this
        // init file reader
        let fr = new FileReader()

        // if play === clicked play, load the animation for that play
        if (clickedPlay === file.name) {
          // once file is loaded
          fr.onload = (e) => {
            let jsonResult = e.target.result
            // set current json for play
            this.$store.commit('settingJson', JSON.parse(jsonResult))
            // run function to get tracking data
            self.XYDirection(jsonResult, file.name)
            // fetch route data
            self.getRouteDetail()
              .then(jsonData => {
                let routeData = jsonData
                self.$store.commit('setRouteData', routeData)
                // console.log(routeData, 'ROUTE')
              })
            // fetch release data
            self.getRelease()
              .then(jsonData => {
                let releaseData = jsonData
                self.$store.commit('setReleaseData', releaseData)
                // console.log(releaseData, 'RELEASE')
              })
          }
        }
        this.filePaths.push(file.path)
        this.plays.push(file.name)
        this.filesLoaded = true
        fr.readAsText(file)
      }
    },
    getSessionStats (files) {
      // set reset sessionStats in store
      this.$store.commit('setSessionStats', null)

      // set url for fetch
      let host = 'http://localhost:8080/totalstats'

      // put data into format needed
      let data = JSON.stringify({'files': this.filePaths})

      // fetch session stats
      return fetch(host, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data,
        async: true,
        mode: 'cors',
        crossDomain: true,
        dataType: 'json'
      })
        .catch(error => console.error('ERROR:', error))
        .then(res => res.json())
    },

    getRouteDetail () {
      // set url for fetch
      let routeDetail = 'http://localhost:8080/receivercalcs'

      // put data into format needed
      let data = JSON.stringify(this.jsonData)

      // fetch route data
      return fetch(routeDetail, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        url: routeDetail,
        body: data,
        dataType: 'json'
      })
        .catch(error => console.error('ERROR:', error))
        .then(res => res.json())
    },

    getRelease () {
      // set url for fetch
      let release = 'http://localhost:8080/release'

      // put data into format needed
      let data = JSON.stringify(this.jsonData)

      // fetch release data
      return fetch(release, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        url: release,
        body: data,
        dataType: 'json'
      })
        .catch(error => console.error('ERROR:', error))
        .then(res => res.json())
    },

    loadFiles (e) {
      // load file window
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // set this.files equal to files chosen
        this.files = Array.from(e.target.files)

        // reset plays
        this.plays = []

        // reset filePaths
        this.filePaths = []

        // load field animation
        this.jsonLoop(this.files, this.files[0].name)

        // set currentPage to play animation
        this.setPlayAnimation()

        // fetch sessionStats
        this.getSessionStats(this.files)
          .then(jsonData => {
            let sessionStats = jsonData
            this.$store.commit('setSessionStats', sessionStats)
            // console.log('SESSION STATS', sessionStats)
          })
      } else {
        // if fileAPI isnt supported, alert
        alert('The File APIs are not fully supported in this browser. Please use a different browser')
      }
    },

    changePlay (e) {
      // when play is changed, run jsonLoop with the name of the play as the second argument
      this.jsonLoop(this.files, e)
    }
  },
  drawer: null,
  mounted () {
    // TESTING PURPOSES ONLY
    // this.$store.commit('testSessionStats')
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.inputfile {
  opacity: 0;
  position: absolute;
}

.inputfile + label {
  cursor: pointer;
}
.menu-item {
  padding: 0;
}
.menu-item:hover {
  background-color: #57606f;
  color: white;
}

.navigation-drawer__border {
  width: 0px;
}

.play-btn {
    margin-left: 10px;
    font-family:  monospace
  }

</style>
