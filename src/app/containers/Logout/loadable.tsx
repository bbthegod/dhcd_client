/*
 *
 * Asynchronously loads the component for Logout
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
