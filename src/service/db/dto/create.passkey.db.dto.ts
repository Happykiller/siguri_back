export default interface CreatePasskeyDbDto {
  label: string;
  user_id: string;
  user_code: string;
  display_name: string;
  challenge_buffer: string;
  challenge: string;
}
