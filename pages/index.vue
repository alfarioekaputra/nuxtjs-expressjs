<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-data-table
        :headers="headerTable"
        :items="notes"
        sort-by="title"
        class="elevation-1"
        :loading="loadingTable"
        loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Notes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Note</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      lazy-validation
                    >
                      <v-text-field v-model="form.title" label="Title"></v-text-field>
                      <Editor />
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Editor from '~/components/Editor'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Logo,
    VuetifyLogo,
    Editor
  },
  data() {
    return {
      dialog: false,
      form: {
        'title': null,
        'body': null
      },
      editedIndex: -1,
    }
  },
  async asyncData({store}) {
    await Promise.all([
      store.dispatch('notes/getAllNotes')
    ])

    return
  },
  computed: {
    ...mapState('notes', {
      notes: state => state.notes,
      loadingTable: state => state.loadingTable,
      headerTable: state => state.headerTable
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
    }, 
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    ...mapActions('notes', ['getAllNotes']),
    onButtonEdit(id){
      this.$routes.push('/notes/form')
    },
    close () {
      this.dialog = false
    },
    save () {
      this.dialog = false
    }
  }
}
</script>
