<template>
  <v-card :to="{ name: 'ProposalPage', params: { id: value.id }}">
    <v-img
      :src="value.img"
      class="white--text align-start"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <v-card-title>{{value.title}}</v-card-title>
      <v-card-subtitle>{{value.subtitle}}</v-card-subtitle>
      <v-card-text>{{value.text}}</v-card-text>
      <div style="bottom: 0px; position: absolute; right: 0px; width: 100%; padding: 10px 10px 10px 10px;">
        <v-row v-if="!value.is_draft">
          <v-col cols="12" md="6">{{value.answers}} ответ(а,ов)</v-col>
          <v-col cols="12" md="2">
            <v-icon color="white">mdi-message-reply</v-icon>
            {{value.comments}}
          </v-col>
          <v-col cols="12" md="2">
            <v-icon color="red">mdi-thumb-down-outline</v-icon>
            {{ value.dislikes }}
          </v-col>
          <v-col cols="12" md="2">
            <v-icon color="green">mdi-thumb-up-outline</v-icon>
            {{ value.likes }}
          </v-col>
        </v-row>
        <span style="padding: 4px; border-radius: 6px; float: right; color: #000; background-color: rgb(215, 222, 233);" v-if="value.is_draft">Не опубликована</span>
      </div>
    </v-img>
    <v-card-text v-if="value.status">
      <v-row>
        <v-col cols="12" md="6">{{ value.status.create }}</v-col>
        <v-col cols="12" md="6">
          <span style="float: right">{{ value.status.title }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ProposalItemCard",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  methods: {}
};
</script>>