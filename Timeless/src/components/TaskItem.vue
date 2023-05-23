<template>
  <ion-item>
    {{ task.title }}
    <ion-checkbox slot="end" :checked="task.done" @ionChange="update">
    </ion-checkbox>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonCheckbox } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Task } from '@/scripts/model';

export default defineComponent({
  props: {
    task: {
      type: Task,
      default: new Task(0, "empty", false)
    }
  },
  methods: {
    update() {
      console.log('on update');
      console.log("update task id: " + this.task.id);
    }
  },
  components: {
    IonItem,
    IonCheckbox,
  }
})
</script>
