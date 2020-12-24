export interface Card {
  title: string;
  description: string;
  id: number;
  labels: Array<Label>;
  dueDate?: Date | null;
  dueDateComplete: boolean;
  taskList?: TaskList;
};

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface TaskList {
  title: string;
  items: Array<Task>;
}

export interface Task {
  title: string;
  done: boolean;
}
