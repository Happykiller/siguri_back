export default interface UpdateChestUsecaseDto {
  chest_id: string;
  label: string;
  description?: string;
  user_id: string;
}