export default interface PasskeyDbModel {
  id: string;
  label: string;
  user_id: string;
  user_code: string;
  display_name: string;
  challenge_buffer: string;
  challenge: string;
  active: boolean;
}
