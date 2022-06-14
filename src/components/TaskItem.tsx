import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import cancelIcon from "../assets/icons/x/x.png";
import { NewTask } from "../pages/Home";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (newTask: NewTask) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditingTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditingTask]);

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskTitle });
    setIsEditingTask(false);
  }

  function handleCancelEditing() {
    setIsEditingTask(false);
    setTaskTitle(task.title);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditingTask}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        {isEditingTask ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`pen-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => setIsEditingTask(true)}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: "rgba(196, 196, 196, 0.24) ",
          }}
        />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={[{ paddingHorizontal: 24 }, isEditingTask && { opacity: 0.2 }]}
          onPress={() => removeTask(task.id)}
          disabled={isEditingTask}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
