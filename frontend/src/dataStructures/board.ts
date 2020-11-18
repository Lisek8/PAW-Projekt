import { List } from './list';

export interface Board {
  title: string;
  image: string;
  id: string;
  lists?: Array<List>;
};
