/*
 *
 * Asynchronously loads the component for QuizPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
