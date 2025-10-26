# 🚨 Deploy Troubleshooting

## Deploy Travou? Use este guia!

### 🔍 Diagnóstico Rápido

```bash
# 1. Execute o debug automático
npm run debug

# 2. Verifique o status
npm run monitor:status

# 3. Veja os logs
npm run pm2:logs
```

## 🐛 Problemas Comuns

### 1. "Creating backup of current build..." (Travou)

**Causa**: Backup do `node_modules` muito grande ou lento

**Solução**:
```bash
# Interrompa o processo (Ctrl+C)
# Use deploy rápido sem backup
npm run deploy:fast
```

### 2. "Installing dependencies..." (Travou)

**Causa**: NPM cache corrompido ou internet lenta

**Solução**:
```bash
# Limpar cache NPM
npm cache clean --force

# Tentar novamente
npm run deploy:fast

# Ou manualmente:
rm -rf node_modules
npm ci --only=production
```

### 3. "Building application..." (Travou)

**Causa**: Build do Next.js travado ou sem memória

**Solução**:
```bash
# Verificar espaço em disco
df -h

# Limpar builds anteriores
rm -rf .next

# Build manual
NODE_ENV=production npm run build
```

### 4. PM2 não responde

**Causa**: PM2 travado ou processos órfãos

**Solução**:
```bash
# Matar todos os processos PM2
pm2 kill

# Iniciar novamente
npm run pm2:start

# Ou reinstalar PM2
npm install -g pm2
```

## ⚡ Soluções Rápidas

### Deploy Rápido (Sem Backup)
```bash
npm run deploy:fast
```
- ⚡ Mais rápido
- ❌ Sem backup/rollback
- ✅ Bom para desenvolvimento

### Deploy Completo (Com Backup)
```bash
npm run deploy
```
- 🛡️ Com backup e rollback
- ⏱️ Mais lento
- ✅ Bom para produção

### Reset Completo
```bash
# Parar tudo
pm2 delete portal-front

# Limpar tudo
rm -rf .next node_modules

# Reconstruir
npm ci
npm run build
npm run pm2:start
```

## 🔧 Debug Avançado

### Verificar Processos
```bash
# Processos Node.js
ps aux | grep node

# Processos PM2
pm2 list
pm2 show portal-front

# Portas em uso
netstat -tlnp | grep :3000
```

### Verificar Logs
```bash
# Logs da aplicação
tail -f logs/combined.log

# Logs do PM2
pm2 logs portal-front --lines 50

# Logs do sistema
dmesg | tail -20
```

### Verificar Recursos
```bash
# Memória
free -h

# Disco
df -h

# CPU
top -n 1
```

## 🚑 Soluções Emergenciais

### 1. Aplicação Offline
```bash
# Verificar se PM2 está rodando
pm2 status

# Se não estiver, iniciar
pm2 start ecosystem.config.js

# Se estiver com erro, reiniciar
pm2 restart portal-front
```

### 2. Erro 502/503 (Nginx)
```bash
# Verificar se app está na porta 3000
curl http://localhost:3000

# Se não estiver, verificar PM2
pm2 status
pm2 logs portal-front
```

### 3. Deploy Travado Há Muito Tempo
```bash
# 1. Interromper processo
Ctrl+C ou kill -9 <pid>

# 2. Verificar se app ainda está rodando
curl http://localhost:3000

# 3. Se estiver OK, não fazer nada
# 4. Se não estiver, usar deploy rápido
npm run deploy:fast
```

## 📋 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Espaço em disco suficiente (`df -h`)
- [ ] Node.js funcionando (`node --version`)
- [ ] NPM funcionando (`npm --version`)
- [ ] PM2 funcionando (`pm2 list`)
- [ ] Porta 3000 livre ou em uso pela app (`netstat -tlnp | grep :3000`)

## 🎯 Estratégias por Situação

### Desenvolvimento
```bash
npm run deploy:fast  # Rápido, sem backup
```

### Staging
```bash
npm run deploy       # Com backup e rollback
```

### Produção
```bash
npm run deploy       # Sempre com backup
npm run health-check # Verificar depois
```

### Emergência
```bash
pm2 restart portal-front  # Restart rápido
```

## 📞 Comandos de Emergência

```bash
# App não responde?
pm2 restart portal-front

# PM2 travado?
pm2 kill && pm2 start ecosystem.config.js

# Tudo travado?
sudo systemctl restart pm2-root

# Último recurso?
sudo reboot
```

## ✅ Como Evitar Problemas

1. **Monitore recursos**: `npm run monitor:status`
2. **Limpe regularmente**: `npm run monitor:cleanup`
3. **Use deploy rápido em dev**: `npm run deploy:fast`
4. **Mantenha backups**: O deploy normal já faz isso
5. **Verifique logs**: `npm run pm2:logs`

## 🆘 Ainda com Problemas?

1. Execute: `npm run debug`
2. Copie a saída completa
3. Verifique os logs: `npm run pm2:logs`
4. Use deploy rápido: `npm run deploy:fast`

Se mesmo assim não funcionar, pode ser problema de:
- Falta de memória RAM
- Disco cheio
- Problemas de rede
- Corrupção de arquivos