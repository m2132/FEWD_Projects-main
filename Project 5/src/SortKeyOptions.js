export const OPTIONS = {
    Serial: (task1, task2) => task1.id - task2.id,
    Completed: (task1, task2) => task2.completed - task1.completed,
    Alphabet: (task1, task2) => task1.title.localeCompare(task2.title),
    Random: () => Math.random() - 0.5,
}