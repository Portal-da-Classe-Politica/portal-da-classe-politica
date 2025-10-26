# 🚀 Zero-Downtime Deployment

Este projeto implementa **deploy sem interrupção de serviço** usando PM2 em modo cluster.

## ✨ Características

- **Zero Downtime**: Usuários não experimentam interrupção durante deploys
- **Rollback Automático**: Se algo der errado, volta automaticamente para a versão anterior
- **Health Checks**: Verifica se a aplicação está funcionando antes de finalizar o deploy
- **Backup Automático**: Cria backup da versão atual antes do deploy
- **Modo Cluster**: Múltiplos workers para alta disponibilidade

## 🔧 Como Funciona

### 1. Backup
```bash
# Cria backup com timestamp
backup_20251026_143022/
├── .next/          # Build anterior
└── node_modules/   # Dependências
```

### 2. Build Nova Versão
```bash
npm ci              # Instala dependências
npm run build       # Gera novo build
```

### 3. Health Check
```bash
curl -f http://localhost:3000  # Verifica se está respondendo
```

### 4. Reload Zero-Downtime
```bash
pm2 reload portal-front  # Substitui workers gradualmente
```

### 5. Verificação Final
- Testa se aplicação está respondendo
- Se falhar, executa rollback automático
- Limpa backups antigos

## 🎯 Comandos Principais

### Deploy
```bash
# Deploy zero-downtime (recomendado)
npm run deploy

# Deploy tradicional (com parada)
npm run pm2:stop && npm run build && npm run pm2:start
```

### Monitoramento
```bash
# Status da aplicação
npm run monitor:status

# Health check
npm run health-check

# Logs em tempo real
npm run pm2:logs

# Monitor interativo
npm run pm2:monit
```

### Manutenção
```bash
# Limpeza de logs e backups antigos
npm run monitor:cleanup

# Todas as opções de monitoramento
npm run monitor help
```

## 🛡️ Segurança do Deploy

### Rollback Automático
Se qualquer etapa falhar:
1. Para o processo de deploy
2. Restaura o backup anterior
3. Reinicia a aplicação
4. Verifica se está funcionando

### Health Checks
- **Durante build**: Verifica se `.next` foi criado
- **Após deploy**: Testa HTTP response
- **Timeout**: 30 segundos máximo para resposta
- **Retry**: Múltiplas tentativas antes de falhar

### Logs de Deploy
Todos os deploys são logados:
```bash
# Ver logs do deploy
tail -f logs/combined.log

# Logs específicos de erro
tail -f logs/err.log
```

## 📊 Monitoramento

### Status da Aplicação
```bash
./monitor.sh status
```
Mostra:
- Status dos processos PM2
- Uso de rede (porta 3000)
- Uso de disco

### Métricas em Tempo Real
```bash
./monitor.sh monitor
```
Interface interativa com:
- CPU usage por worker
- Memory usage
- Request count
- Error rate

## 🔧 Configuração PM2

```javascript
// ecosystem.config.js
{
  instances: 'max',        // Usa todos os cores
  exec_mode: 'cluster',    // Modo cluster
  kill_timeout: 5000,      // 5s para shutdown graceful
  wait_ready: true,        // Espera app estar pronto
  max_restarts: 10,        // Máx 10 restarts automáticos
  min_uptime: '10s'        // Mín 10s uptime para ser válido
}
```

## 🚨 Troubleshooting

### Deploy Falhou
```bash
# 1. Verificar logs
npm run pm2:logs

# 2. Status dos processos
npm run monitor:status

# 3. Health check manual
npm run health-check

# 4. Rollback manual (se necessário)
pm2 stop portal-front
cp -r backup_*/​.next .
npm run pm2:start
```

### Performance Issues
```bash
# Verificar uso de memória
npm run monitor memory

# Verificar todos os processos
npm run monitor processes

# Reiniciar workers gradualmente
npm run pm2:reload
```

### Logs Crescendo Muito
```bash
# Limpeza automática
npm run monitor:cleanup

# Limpeza manual
pm2 flush
find logs/ -name "*.log" -mtime +7 -delete
```

## 📈 Vantagens vs Deploy Tradicional

| Aspecto | Deploy Tradicional | Zero-Downtime |
|---------|-------------------|---------------|
| **Downtime** | 30-60 segundos | 0 segundos |
| **Rollback** | Manual | Automático |
| **Health Check** | Manual | Automático |
| **Backup** | Manual | Automático |
| **Workers** | 1 processo | N processos |
| **Falha Impact** | Todo serviço | Apenas 1 worker |

## 🎉 Resultado

Com este setup:
- ✅ Deploys sem interrupção de serviço
- ✅ Rollback automático em caso de erro
- ✅ Monitoramento completo
- ✅ Alta disponibilidade
- ✅ Logs organizados
- ✅ Fácil manutenção