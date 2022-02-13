/*
 *
 * QuizPage State
 *
 */
export interface QuizPageState {
  playData: PlayData | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
