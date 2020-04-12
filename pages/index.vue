<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title>Express Notes</v-card-title>
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">Body</th>
                  <th class="text-left">Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in notes" :key="item.title">
                  <td>{{ item.title }}</td>
                  <td>{{ item.body }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>
                      <v-btn class="mx-2" fab dark small color="primary" to="/notes/form" nuxt>
                          <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab dark small color="red" @click="onButtonDelete(item.id)">
                          <v-icon dark>mdi-trash-can-outline</v-icon>
                      </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>      
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async asyncData({store}) {
    await Promise.all([
      store.dispatch('notes/getAllNotes')
    ])

    return
  },
  computed: {
    ...mapState('notes', {
      notes: state => state.notes
    })
  },
  methods: {
    ...mapActions('notes', ['getAllNotes']),
    onButtonEdit(id){
      this.$routes.push('/notes/form')
    }
  }
}
</script>
