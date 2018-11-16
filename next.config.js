const withSass = require('@zeit/next-sass');

module.exports = withSass({
    webpack(config) {
        return config;
    },
    distDir: '../build',
    publicRuntimeConfig: {
        apiHost: process.env.NODE_ENV === 'production' ? 'http://allseasoninventor/api' : 'http://127.0.0.1:8000/api'
    }
});
