import { GoogleAnalytics } from '@next/third-parties/google'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/** GA4 tag, rendered only when NEXT_PUBLIC_GA_ID is set. Not mounted yet. */
const Analytics = () => (GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null)

export { Analytics }
