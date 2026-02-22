// lib/utils/network.ts
/**
 * Detects the current network type and provides hints for optimization.
 * Tailored for Cape Verde (4G/3G fallbacks).
 */
export const getNetworkType = (): '4g' | '3g' | 'slow-2g' | 'offline' => {
    if (typeof window === 'undefined') return '4g'

    if (!window.navigator.onLine) return 'offline'

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (!connection) return '4g'

    const effectiveType = connection.effectiveType || '4g'

    if (effectiveType === '4g') return '4g'
    if (effectiveType === '3g') return '3g'
    return 'slow-2g'
}

/**
 * Returns optimization hints based on network state.
 */
export const getOptimizationHints = () => {
    const type = getNetworkType()

    switch (type) {
        case 'slow-2g':
            return {
                imageQuality: 40,
                prefetchStrategy: 'none' as const,
                resultsPerPage: 10,
                enableAnimations: false
            }
        case '3g':
            return {
                imageQuality: 60,
                prefetchStrategy: 'none' as const,
                resultsPerPage: 15,
                enableAnimations: true
            }
        case '4g':
        default:
            return {
                imageQuality: 75,
                prefetchStrategy: 'viewport' as const,
                resultsPerPage: 20,
                enableAnimations: true
            }
    }
}
