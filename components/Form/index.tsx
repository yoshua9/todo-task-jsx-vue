/* Form Component */

// Imports
import { useTaskStore } from '~/stores/tasks';
import { useField } from 'vee-validate';
import { uuid } from 'vue3-uuid';
import { string } from 'yup';

export default defineComponent({
  setup() {
    // Store
    const taskStore = useTaskStore();

    // Reactive props
    const counter = ref<number>(60);
    const loading = ref<boolean>(false);
    const rules = string()
      .required('Task is required')
      .min(2, '2 letters min')
      .max(60, '60 letters max');

    // Composables
    const { value, errors, meta, validate, resetField } = useField<string>("task", rules);
    const { validateToken } = useRecaptcha();

    // Computed props
    const invalid = computed<boolean>(() => {
      return !meta.valid;
    });
    const disabled = computed<boolean>(() => {
      return invalid.value || loading.value;
    })
    const buttonColor = computed<string>(() => {
      if (invalid.value && !loading.value) return "gray";
      else if(!invalid.value && loading.value) return "info";
      else return "green";
    })

    // Methods
    // To disable some elements of the form while making changes in the store.
    const toggleLoading = () => { loading.value = !loading.value; }
    // Validates input value manually.
    const validateTask = async () => {
      await validate();
    };
    // Event handler for keyup
    const handleKeyUp = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        await save();
      }
    };
    // Save changes in store
    const save = async () => {

      // Check if form is not valid
      // This is in case the user removed disabled flags on frontend
      if (invalid.value) {
        await validateTask();
        return;
      }

      try {

        // Toggle loading
        toggleLoading();

        // Validate recaptcha token
        await validateToken();

        // Save new task
        const newTask: Task = {
          id: uuid.v4(),
          text: value.value,
          completed: false
        };

        // Save data to the Pinia store
        taskStore.addTask(newTask);
        
        resetField();
      } catch (error) {
        console.log(error);
      } finally {
        toggleLoading();
      }
    };


    return () => (
      <div class="d-flex flex-column flex-sm-row gap-1">
        <v-text-field
          label="New task"
          placeholder="Ex: Go to the gym"
          variant="outlined"
          color="green"
          v-model={ value.value }
          counter={ counter.value }
          disabled={ loading.value }
          error-messages={ errors.value }
          onkeypress={ (event: KeyboardEvent) => handleKeyUp(event) }
          data-test="task-input"
        ></v-text-field>
        <v-btn
          prepend-icon="mdi-check-bold"
          color={ buttonColor.value }
          variant="tonal"
          size="x-large"
          disabled={ disabled.value }
          onClick={ () => save() }
          loading={ loading.value }
          data-test="create-task-button"
          height={56}
        >
          Save
        </v-btn>
      </div>
    );
  },
});
