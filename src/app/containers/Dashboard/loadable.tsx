/*
 *
 * Asynchronously loads the component for Dashboard
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
