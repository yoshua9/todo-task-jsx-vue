describe("template spec", () => {
  beforeEach(() => {
    /* Visit app */
    cy.visit("http://localhost:3000");
  });

  it("Check recaptcha presence", () => {
    /* Check if recaptcha wrapper is working */
    cy.get('[data-test="recaptcha-wrapper"]').within(() => {
      cy.contains("Protected by Google's Recaptcha V3").should("be.visible"); // Check if text is visible
    });
  });

  it("Check that todo tasks lists are empty", () => {
    // Check that "TO DO" button is active
    cy.get('[data-test="todo-source-button"]').should("have.class", "bg-info");
    // Check that to do tasks list es empty
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item")
        .contains("No added tasks yet")
        .should("be.visible");
    });

    /* Completed tasks state */
    // List completed to dos
    cy.get('[data-test="completed-source-button"]').click();
    // Check that "COMPLETED" button is active
    cy.get('[data-test="completed-source-button"]').should(
      "have.class",
      "bg-info"
    );
    // Check that to do tasks list es empty
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item")
        .contains("No completed tasks yet")
        .should("be.visible");
    });
  });

  it("Create, complete and uncomplete tasks", () => {
    /* Create tasks */
    // Type task #1
    cy.get('[data-test="task-input"]').within(() => {
      cy.get("input").should("have.value", ""); // Check if input value is empty at first.
      cy.get("input").type("Go to the gym"); // Type the first task
    });

    // Create task #1
    cy.get('[data-test="create-task-button"]').click();

    // Type task #2
    cy.get('[data-test="task-input"]').within(() => {
      cy.get("input").should("have.value", ""); // Check if input value is empty at first.
      cy.get("input").type("Walk Tyrion (My dog)"); // Type the second task
    });

    // Create task #2
    cy.get('[data-test="create-task-button"]').click();

    // Type task #3
    cy.get('[data-test="task-input"]').within(() => {
      cy.get("input").should("have.value", ""); // Check if input value is empty at first.
      cy.get("input").type("Go to work"); // Type the third task
    });

    // Create task #3
    cy.get('[data-test="create-task-button"]').click();

    // Check created tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 3);
      cy.get(".v-list-item").contains("No added tasks yet").should("not.exist");
    });

    /* Complete tasks */
    // Complete task #1
    cy.get('[data-test="complete-task-0"]').within(() => {
      cy.get("input").click();
    });

    // Complete task #2
    cy.get('[data-test="complete-task-1"]').within(() => {
      cy.get("input").click();
    });

    // Check to do tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item").contains("No added tasks yet").should("not.exist");
    });

    // Change to completed list
    cy.get('[data-test="completed-source-button"]').click();

    // Check that "COMPLETED" button is active
    cy.get('[data-test="completed-source-button"]').should(
      "have.class",
      "bg-info"
    );

    // Check completed tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 2);
      cy.get(".v-list-item")
        .contains("No completed tasks yet")
        .should("not.exist");
    });

    /* Uncomplete tasks */
    // Uncomplete task #2
    cy.get('[data-test="complete-task-1"]').within(() => {
      cy.get("input").click();
    });

    // Check completed tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item")
        .contains("No completed tasks yet")
        .should("not.exist");
    });

    // Change to todo list
    cy.get('[data-test="todo-source-button"]').click();

    // Check todo tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 2);
      cy.get(".v-list-item").contains("No added tasks yet").should("not.exist");
    });
  });

  it.only("delete tasks", () => {
    /* Create task */
    // Type task
    cy.get('[data-test="task-input"]').within(() => {
      cy.get("input").should("have.value", ""); // Check if input value is empty at first.
      cy.get("input").type("Wash the dishes"); // Type the task
    });

    // Save task
    cy.get('[data-test="create-task-button"]').click();

    // Check todo tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item").contains("No added tasks yet").should("not.exist");
    });

    // Delete task
    cy.get('[data-test="delete-task-0"]').click();

    // Check todo tasks
    cy.get('[data-test="tasks-wrapper"]').within(() => {
      cy.get(".v-list-item").should("have.length", 1);
      cy.get(".v-list-item")
        .contains("No added tasks yet")
        .should("be.visible");
    });
  });
});
