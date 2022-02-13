/*
 *
 * Asynchronously loads the component for SurveyPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
