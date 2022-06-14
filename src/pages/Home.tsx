import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface NewTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function checkIfTaskWithSameTitleAlreadyExist(newTaskTitle: string) {
    const taskAlreadyExist = tasks.some((task) => {
      const regex = new RegExp(`${newTaskTitle}`, "gim");

      return regex.test(task.title);
    });

    if (taskAlreadyExist) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return true;
    }
  }

  function handleAddTask(newTaskTitle: string) {
    if (!checkIfTaskWithSameTitleAlreadyExist(newTaskTitle)) {
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks((oldState) => [...oldState, newTask]);
    }
  }

  function handleEditTask(newTask: NewTask) {
    if (!checkIfTaskWithSameTitleAlreadyExist(newTask.taskNewTitle)) {
      const taskIndex = tasks.findIndex((task) => task.id === newTask.taskId);

      if (taskIndex >= 0) {
        const newTasks = [...tasks];
        newTasks[taskIndex].title = newTask.taskNewTitle;
        setTasks(newTasks);
      }
    }
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
    return Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => null,
        },
        { text: "Sim", onPress: () => removeTask(id) },
      ]
    );
  }

  function removeTask(id: number) {
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
        editTask={handleEditTask}
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
