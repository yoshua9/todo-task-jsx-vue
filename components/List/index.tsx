enum Source {
  ToDo = 'to-do',
  Completed = 'completed',
}

export default defineComponent({
  setup() {
    // Store
    const taskStore = useTaskStore();

    // Reactive props
    const source = ref<string>('to-do');
    
    // Computed props
    const list = computed<Task[]>(() => {
      return taskStore.list.filter((task: Task) => source.value === Source.ToDo ? !task.completed : task.completed)
    });

    // Methods
    const setSource = (s: Source) => {
      source.value = s;
    }
    const deleteTask = (id: string) => {
      taskStore.deleteTask(id);
    }

    return () => (
      <v-card
        class="mx-auto bg-list"
      >
        <v-card-title>
          <h3 class="text-center text-white py-3 mb-3">Tasks</h3>
          <v-row>
            <v-col>
              <v-btn data-test="todo-source-button" block color={ source.value === Source.ToDo ? 'info' : '' } onClick={ () => setSource(Source.ToDo) }>To Do</v-btn>
            </v-col>
            <v-col>
              <v-btn data-test="completed-source-button" block color={ source.value === Source.Completed ? 'info' : '' } onClick={ () => setSource(Source.Completed) }>Completed</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pt-3 pb-8">
          <v-list data-test="tasks-wrapper" class="rounded-sm">
            {
              list.value.length === 0 ? (
                <v-list-item>No { source.value === Source.ToDo ? 'added' : 'completed' } tasks yet</v-list-item>
              ) : (
                list.value.map((task: Task, index: number) => (
                  <v-list-item
                    key={ task.id }
                    color="primary"
                  >
                    {{
                      prepend: () => (
                        <v-icon>mdi-pound</v-icon>
                      ),
                      title: () => (
                        <p>{ task.text }</p>
                      ),
                      subtitle: () => (
                        <p>{ task.id }</p>
                      ),
                      append: () => (
                        <>
                          <v-checkbox
                            data-test={`complete-task-${index}`}
                            v-model={ task.completed }
                            hide-details
                            onClick={ () => taskStore.updateTaskState(task.id, task.completed) }
                          ></v-checkbox>
                          <v-btn data-test={`delete-task-${index}`} icon variant="text" onClick={ () => deleteTask(task.id) }>
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </>
                      )
                    }}
                  </v-list-item>
                ))
              )
            }
          </v-list>
        </v-card-text>
      </v-card>
    )
  }
});