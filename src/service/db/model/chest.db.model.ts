export interface ChestDbModel {
  id: string;
  label: string;
  description?: string;
  author_id: string;
  secret: string;
  active: boolean;
  members: {
    user_id: string;
  }[];
}
