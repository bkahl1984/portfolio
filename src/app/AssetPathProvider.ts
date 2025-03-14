export function getPathProvider(): string {
    const isProd = process.env.NODE_ENV === 'production'
    console.log("isProd",isProd)
    return (isProd) ? '/portfolio' : ''
}