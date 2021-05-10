const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass({
    webpack(config) {
        return config;
    },
    distDir: '../build',
    publicRuntimeConfig: {
        apiHost: process.env.NODE_ENV === 'production' ? 'http://allseasoninventor/api' : 'http://127.0.0.1:7001'
    }
}));
