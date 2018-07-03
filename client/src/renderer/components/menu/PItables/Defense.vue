<template>
    <v-data-table
      :headers="headers"
      :items="defense"
      hide-actions
      class="elevation-2"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.position }}</td>
        <td class="text-xs">{{ props.item.number }}</td>
        <td class="text-xs">{{ props.item.name }}</td>
      </template>
    </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      trackingData: 'trackingData',
      currentPage: 'currentPage'
    })
  },
  data () {
    return {
      headers: [
        {
          text: 'Pos',
          align: 'center',
          value: 'position'
        },
        { text: '#', value: 'number', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' }
      ],
      defense: []
    }
  },
  methods: {
    setPlayers () {
      for (let i = 0; i < this.trackingData.mPlayerRoles.defense.length; i++) {
        this.defense.push({
          value: false,
          position: this.trackingData.mPlayerRoles.defense[i].playPos,
          number: 0,
          // number: this.trackingData.mTeamRoster.defense[i].jersey,
          name: 'Default Player ' + (100 + i).toString()
          // name: this.trackingData.mTeamRoster.defense[i].firstName + ' ' + this.trackingData.mTeamRoster.defense[i].lastName
        })
      }
    }
  },
  mounted () {
    this.setPlayers()
  }
}
</script>
