module.exports = {
  apps: [
    {
      name: 'apisrv',
      script: 'main.js',
      cwd: '/srv/apisrv',
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
  ],
};
