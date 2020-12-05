export interface Card {
  title: string;
  description: string;
  id: number;
  labels: Array<Label>;
  dueDate?: Date;
  dueDateComplete: boolean;
};

export interface Label {
  id: number;
  name: string;
  color: string;
}
