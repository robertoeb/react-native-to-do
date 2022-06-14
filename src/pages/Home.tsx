import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      const newTasks = [...tasks];
      newTasks[taskIndex].done = !newTasks[taskIndex].done;
      setTasks(newTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex >= 0) {
      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);
      setTasks(newTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
