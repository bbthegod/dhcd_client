/*
 *
 * Asynchronously loads the component for FilePage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
