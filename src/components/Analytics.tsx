import { Helmet } from 'react-helmet';
import { analytics } from '../config/site';

/**
 * Conditionally injects analytics script (Plausible) when enabled in config.
 * No third-party is loaded unless analytics.enabled is true.
 */
const Analytics = () => {
    if (!analytics.enabled) return null;

    return (
        <Helmet>
            <script
                defer
                data-domain={analytics.plausibleDomain}
                src={analytics.scriptSrc}
            />
        </Helmet>
    );
};

export default Analytics;
