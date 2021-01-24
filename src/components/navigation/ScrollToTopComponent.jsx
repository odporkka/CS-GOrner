import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


/**
 * Util component that scrolls to top of page if present.
 *
 * @return {null}
 * @constructor
 */
const ScrollToTopComponent = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTopComponent