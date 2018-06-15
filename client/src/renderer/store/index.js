import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    currentPage: 'Splash',
    playChanger: false,
    jsonData: null,
    trackingData: false,
    sliderTime: 0,
    btnState: false,
    maxTime: 0,
    sessionStats: null,
    routeData: null,
    releaseData: null,
    displayOptions: null,
    clickedRoutes: null
  },

  getters: {
    sliderTime (state) {
      return state.sliderTime
    },
    btnState (state) {
      return state.btnState
    },
    trackingData (state) {
      return state.trackingData
    },
    jsonData (state) {
      return state.jsonData
    },
    maxTime (state) {
      return state.maxTime
    },
    currentPage (state) {
      return state.currentPage
    },
    playChanger (state) {
      return state.playChanger
    },
    sessionStats (state) {
      return state.sessionStats
    },
    routeData (state) {
      return state.routeData
    },
    releaseData (state) {
      return state.releaseData
    },
    displayOptions (state) {
      return state.displayOptions
    },
    clickedRoutes (state) {
      return state.clickedRoutes
    }

  },
  mutations: {
    // From Timeline
    clickHandler (state) {
      state.btnState = !state.btnState
    },
    sliderValFromInput (state, input) {
      state.sliderTime = input
    },
    // From Menu
    settingJson (state, data) {
      state.jsonData = data
    },
    setMaxTime (state, framesLength) {
      state.maxTime = framesLength
    },
    setSessionStats (state, stats) {
      state.sessionStats = stats
    },
    setRouteData (state, val) {
      state.routeData = val
    },
    setReleaseData (state, val) {
      state.releaseData = val
    },
    // From Field
    fieldStart (state) {
      state.btnState = false
    },
    endPlay (state) {
      state.btnState = false
    },
    playFunc (state, Timer) {
      state.sliderTime++
    },
    resetTime (state) {
      state.sliderTime = 0
    },
    adjustSlider (state, adjusted) {
      state.sliderTime = adjusted
    },
    updatePlay (state, val) {
      state.trackingData = val
    },
    changeCurrentPage (state, val) {
      state.currentPage = val
    },
    setDisplayOptions (state, val) {
      state.displayOptions = val
    },
    allPlayersOff (state) {
      state.displayOptions.player.off = false
      state.displayOptions.player.def = false
    },
    allPlayersOn (state) {
      state.displayOptions.player.off = true
      state.displayOptions.player.def = true
    },
    setJerseyDefault (state) {
      state.displayOptions.player.jersOrPos = 'jersey'
    },
    setClickedRoutes (state, routes) {
      state.clickedRoutes = routes
    },
    // // TESTING
    testSessionStats (state, val) {
      state.sessionStats = {
        'sacks': 46,
        'intentionalgrounding': 4,
        'thrownaway': 4,
        'completions': 0,
        'attempts': 42,
        'int': 0,
        'passyds': 0,
        'passtd': 0,
        'avgairyards': 4.785714285714286,
        'avgairdistance': 8.134118783525949,
        'avgtimetothrow': 2.4576254318181805,
        'completionpct': 0,
        'yardsperattempt': 0,
        'passerrating': 39.583333333333336,
        'Route Data': [
          [
            'Route',
            'Run',
            'Targets',
            'Completions',
            'Touchdowns',
            'Yards'
          ],
          [
            'Dig',
            134,
            29,
            0,
            0,
            0
          ],
          [
            'Corner',
            49,
            1,
            0,
            0,
            0
          ],
          [
            'Go',
            139,
            3,
            0,
            0,
            0
          ],
          [
            'Post',
            108,
            5,
            0,
            0,
            0
          ],
          [
            'Out',
            5,
            0,
            0,
            0,
            0
          ],
          [
            'Hitch',
            5,
            0,
            0,
            0,
            0
          ]
        ],
        'targetimage': [
          {
            'x': 2.1993120406340267,
            'y': -0.2204668143044619,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 0.33751771676752196,
            'y': -0.03696784776902895,
            'route': 'Corner',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Incomplete'
          },
          {
            'x': 2.9583322042300066,
            'y': 0.5660107939632544,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.8961188074873343,
            'y': 1.1973585465879268,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.4719690556239535,
            'y': 0.29596451771653554,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 0.03257655363690046,
            'y': -0.3279352252843397,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.5898909544615756,
            'y': 0.077244531933508,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.282727723451225,
            'y': 0.6865484689413823,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.4904920252255499,
            'y': 0.2637254921259842,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 0.020259702322679346,
            'y': -0.2744361767279091,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.23053820632623645,
            'y': -0.052656665573053374,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.008388549275406599,
            'y': -0.4713460575240591,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.6032564696575079,
            'y': -0.14291907261592307,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.5803275606554302,
            'y': 0.24654575131233614,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.19942543849250072,
            'y': -0.45813813429571315,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.12487913382376696,
            'y': 0.7679376093613304,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.6710434990248375,
            'y': 0.3080988845144357,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -1.0244983250090307,
            'y': -0.667535307305337,
            'route': 'Go',
            'receiver': 'James White',
            'direction': 'L',
            'result': 'Sack'
          },
          {
            'x': -1.3960502307873468,
            'y': -0.5251166940069991,
            'route': 'Go',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Sack'
          },
          {
            'x': 0.42595414397599474,
            'y': -0.16934135498687675,
            'route': 'Go',
            'receiver': 'James White',
            'direction': 'L',
            'result': 'Sack'
          },
          {
            'x': -0.12485187244668615,
            'y': 1.514189014654418,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -2.0824112220499957,
            'y': -0.7535709973753282,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.3128669831099147,
            'y': 0.8756086887576555,
            'route': 'Post',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Incomplete'
          },
          {
            'x': 1.6143727745290113,
            'y': 1.2303101159230097,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.5959572343656101,
            'y': 0.2587592957130356,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -4.168006760349437,
            'y': 1.2421753937007876,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -4.122651904508997,
            'y': 1.8039043744531933,
            'route': 'Post',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Incomplete'
          },
          {
            'x': -0.4376470792655506,
            'y': 0.14531076662292186,
            'route': 'Dig',
            'receiver': 'Chris Hogan',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -2.552111281058933,
            'y': 1.5962139326334215,
            'route': 'Post',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Incomplete'
          },
          {
            'x': 0.5374867222920836,
            'y': -0.6512669838145232,
            'route': 'Post',
            'receiver': 'James White',
            'direction': 'R',
            'result': 'Incomplete'
          },
          {
            'x': -1.1271605401038616,
            'y': 1.3920439413823273,
            'route': 'Dig',
            'receiver': 'Julian Edelman',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -1.3436599292862965,
            'y': -0.20089754483814515,
            'route': 'Dig',
            'receiver': 'Julian Edelman',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 2.5082257634628906,
            'y': 1.3029484033245842,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -3.4958360667425135,
            'y': 0.610388145231846,
            'route': 'Dig',
            'receiver': 'Julian Edelman',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 0.3233217863217282,
            'y': -1.3397988134295713,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -0.785155089167225,
            'y': 0.13068341535433103,
            'route': 'Dig',
            'receiver': 'Rob Gronkowski',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': -4.2112343221638495,
            'y': 2.216419455380578,
            'route': 'Dig',
            'receiver': 'Julian Edelman',
            'direction': 'L',
            'result': 'Incomplete'
          },
          {
            'x': 0.1950656612113121,
            'y': -0.8766202701224847,
            'route': 'Post',
            'receiver': 'Chris Hogan',
            'direction': 'R',
            'result': 'Incomplete'
          }
        ],
        'zoneimage': {
          'Deep Left': {
            'rating': null,
            'ystr': '',
            'tdintstr': ''
          },
          'Deep Middle': {
            'rating': null,
            'ystr': '',
            'tdintstr': ''
          },
          'Deep Right': {
            'rating': null,
            'ystr': '',
            'tdintstr': ''
          },
          'Short Left': {
            'rating': 39.583333333333336,
            'ystr': '0/1 0 yds',
            'tdintstr': ''
          },
          'Short Middle': {
            'rating': 39.583333333333336,
            'ystr': '0/35 0 yds',
            'tdintstr': ''
          },
          'Short Right': {
            'rating': 39.583333333333336,
            'ystr': '0/2 0 yds',
            'tdintstr': ''
          }
        }
      }
    }
  }
})
