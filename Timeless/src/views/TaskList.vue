<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Task list</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <task-item v-for="task in tasks" :task="task"></task-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import TaskItem from '@/components/TaskItem.vue';
import { defineComponent } from 'vue';
import { getAllTasks, Task } from '@/scripts/model';

export default defineComponent({
  data: () => ({
    tasks: new Array<Task>
  }),
  created() {
    this.fetchTasks();
  },
  watch: {
    tasks: 'fetchTasks'
  },
  methods: {
    async fetchTasks() {
      this.tasks = await getAllTasks();
    },
  },
  components: {
    ExploreContainer,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    TaskItem
  }
})
</script>
