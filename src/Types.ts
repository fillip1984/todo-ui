export interface Base {
  id: number;
}
export interface Todo extends Base {
  name: string;
  complete: boolean;
}

export const generateId = () => {
  return Math.floor(Math.random() * 100) * new Date().getTime();
};
