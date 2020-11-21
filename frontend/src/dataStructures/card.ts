export interface Card {
  title: string;
  description: string;
  id: number;
  labels: Array<Label>;
};

export interface Label {
  id: number;
  name: string;
  color: string;
}
