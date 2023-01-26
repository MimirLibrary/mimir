module.exports = {
  apps: [
    {
      name: 'apiserver',
      script: 'main.js',
      cwd: '/srv/apiserver',
      min_uptime: 3000,
      max_restarts: 3,
    },
    {
      name: 'metadata',
      script: 'main.js',
      cwd: '/srv/metadata',
      min_uptime: 3000,
      max_restarts: 3,
    },
    {
      name: 'email',
      script: 'main.js',
      cwd: '/srv/email-service',
      min_uptime: 3000,
      max_restarts: 3,
    },
  ],
};
