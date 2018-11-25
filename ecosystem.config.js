module.exports = {
    apps: [
        {
            name: 'slacktime',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                SLACK_SERVER_URL: 'http://18.224.1.150:3000',
            },
        },
    ],
    deploy: {
        production: {
            user: 'node',
            host: '18.224.1.150',
            ref: 'origin/master',
            repo: 'https://github.com/rakitha737/slacktime.git',
            path: '/srv/production',
            'post-deploy':
        'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
        },
    },
}
