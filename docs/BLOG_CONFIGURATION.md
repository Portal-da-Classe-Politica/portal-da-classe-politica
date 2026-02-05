# Blog URL Configuration

Este projeto usa configuração baseada em ambiente para integração com WordPress, permitindo funcionamento em desenvolvimento local e produção.

## Configuração de Ambiente

### Padrão (Produção)
**Por padrão, o blog usa `/blog`** que é proxiado pelo nginx em produção. Não é necessário configurar nenhuma variável de ambiente para produção.

### Desenvolvimento Local (.env.local)
Para desenvolvimento local, crie um arquivo `.env.local` com a URL externa do WordPress:
```bash
NEXT_PUBLIC_BLOG_URL=https://redem.c3sl.ufpr.br/blog
```

**Importante:** O arquivo `.env.local` não deve ser commitado (já está no `.gitignore`).

## Como o Padrão Funciona

A função `getBlogUrl()` retorna:
- **Produção:** `/blog` (valor padrão quando `NEXT_PUBLIC_BLOG_URL` não está definida)
- **Local:** `https://redem.c3sl.ufpr.br/blog` (quando definida no `.env.local`)

## Nginx Configuration

The production server uses nginx to proxy blog requests to the local WordPress instance (port 8081):

```nginx
# Blog redirect
location = /blog {
    return 301 /blog/;
}

# REST API
location ~ ^/blog/wp-json/(.*)$ {
    proxy_pass http://127.0.0.1:8081/index.php?rest_route=/$1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Blog content
location /blog/ {
    proxy_pass http://127.0.0.1:8081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Prefix /blog;
    proxy_redirect off;
    client_max_body_size 64m;
    proxy_read_timeout 300;
}
```

## Utility Functions

The codebase provides utility functions in `src/utils/blogUrl.ts` to handle blog URL generation:

### `getBlogUrl()`
Returns the base blog URL based on the environment:
- Local: `https://redem.c3sl.ufpr.br/blog`
- Production: `/blog`

### `getBlogApiUrl()`
Returns the WordPress REST API URL:
- Local: `https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2`
- Production: `/blog/wp-json/wp/v2`

### `getBlogPostUrl(id: string | number)`
Returns the URL for a specific blog post:
```typescript
getBlogPostUrl('158') // Returns: /blog/?p=158 (prod) or https://redem.c3sl.ufpr.br/blog/?p=158 (local)
```

### `getBlogPageUrl(path: string)`
Returns the URL for a specific blog page:
```typescript
getBlogPageUrl('/index.php/publicacoes/') // Returns: /blog/index.php/publicacoes/
```

## Usage Examples

### In Components
```typescript
import { getBlogUrl, getBlogPostUrl } from '@utils/blogUrl';

// Link to blog home
<a href={getBlogUrl()}>Visit Blog</a>

// Link to specific post
<a href={getBlogPostUrl('158')}>Read Article</a>
```

### In Routes Configuration
```typescript
// src/routes/index.ts
export const routes = {
  blog: process.env.NEXT_PUBLIC_BLOG_URL || '/blog',
  blogPost: (id: string) => `${process.env.NEXT_PUBLIC_BLOG_URL || '/blog'}/?p=${id}`,
};
```

### In Services
```typescript
// src/services/blog/WordPressBlogService.ts
import { getBlogApiUrl } from '@utils/blogUrl';

const WORDPRESS_API_BASE = getBlogApiUrl();
```

## Como Funciona

1. **Produção (Padrão)**: O código usa `/blog` como padrão - nenhuma configuração necessária
2. **Desenvolvimento Local**: Desenvolvedores criam `.env.local` com a URL externa para testes
3. **Servidor em Produção**: Nginx intercepta requisições para `/blog/*` e faz proxy para WordPress em localhost:8081
4. **Integração Transparente**: Usuários veem o blog como parte do site principal

## Instruções de Configuração

### Para Desenvolvimento Local

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Descomente e configure a URL externa no `.env.local`:
   ```bash
   NEXT_PUBLIC_BLOG_URL=https://redem.c3sl.ufpr.br/blog
   ```

3. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Para Produção

**Não é necessário fazer nada!** O valor padrão `/blog` será usado automaticamente.

O nginx deve estar configurado para proxiar requisições ao WordPress local.

## Migration Notes

All references to `https://redem.c3sl.ufpr.br/blog` in the codebase have been replaced with environment-aware utility functions. This includes:

- ✅ Blog service API calls
- ✅ Route configurations
- ✅ Component links and redirects
- ✅ Carousel items
- ✅ Navigation menus

## Troubleshooting

### Blog não carrega em produção
- Verifique se a configuração do nginx está correta
- Confirme que WordPress está rodando em localhost:8081
- **Não defina** `NEXT_PUBLIC_BLOG_URL` em produção (use o padrão `/blog`)

### Chamadas de API falhando
- Verifique se `getBlogApiUrl()` está sendo usado para todas as chamadas de API
- Confirme a configuração do proxy nginx para `/blog/wp-json/*`

### Links apontando para URL errada
- Certifique-se de importar e usar as funções utilitárias de `@utils/blogUrl`
- Em desenvolvimento local, verifique se `NEXT_PUBLIC_BLOG_URL` está definida no `.env.local`
- Em produção, **não defina** `NEXT_PUBLIC_BLOG_URL` (deixe usar o padrão)
