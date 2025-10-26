module.exports = {
  apps: [
    {
      name: 'portal-front',
      script: 'npm',
      args: 'start',
      cwd: '/root/portal-da-classe-politica',
      instances: 'max', // Usa todos os cores disponíveis
      exec_mode: 'cluster', // Modo cluster para zero-downtime
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s', // Tempo mínimo antes de considerar como iniciado
      max_restarts: 10, // Máximo de restarts em caso de falha
      kill_timeout: 5000, // Tempo para kill graceful
      wait_ready: true, // Espera o app sinalizar que está pronto
      listen_timeout: 10000, // Timeout para listen
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
