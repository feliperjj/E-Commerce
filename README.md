<div align="center">

# 🛒 E-Commerce Pokémon

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Loja virtual fullstack construída do zero com PHP puro, JavaScript ES6 e SQLite.**

[Ver Repositório](https://github.com/feliperjj/E-Commerce) · [Reportar Bug](https://github.com/feliperjj/E-Commerce/issues)

</div>

---

## 📋 Sobre o Projeto

O E-Commerce Pokémon é uma aplicação web fullstack funcional, desenvolvida para demonstrar domínio de conceitos fundamentais do desenvolvimento web moderno: autenticação segura, persistência de dados, integração front-back via API JSON e controle de acesso por perfil de usuário.

O projeto segue uma arquitetura **SPA-like** onde o front-end em JavaScript puro se comunica com o back-end PHP exclusivamente via `fetch` e JSON, sem recarregamentos de página.

---

## ✅ Funcionalidades

### 🔐 Autenticação & Segurança
- Cadastro de usuários com senha armazenada via `password_hash` (bcrypt)
- Login seguro com `password_verify` e criação de sessão PHP
- Logout com destruição de sessão e limpeza do localStorage
- **Recuperação de senha** com geração de token único com expiração de 1 hora
- Proteção de rotas por sessão (redirecionamento de visitantes não autenticados)
- Painel administrativo protegido por verificação de `is_admin` no servidor

### 🛒 Carrinho de Compras Inteligente
- Carrinho **persistente no banco de dados** — não se perde ao fechar o navegador
- **Carrinho de visitante com UUID** — o usuário pode adicionar produtos antes de fazer login
- **Migração automática** do carrinho anônimo para a conta do usuário no momento do login
- Controle de quantidade: incremento, decremento e remoção de itens

### 📦 Gestão de Pedidos
- Finalização de compra com **transação SQL** (`beginTransaction` / `commit` / `rollback`)
- Atualização automática do estoque ao finalizar pedido
- Histórico completo de compras acessível na área do cliente

### 👤 Área do Cliente
- Visualização e edição de e-mail e senha
- Histórico de pedidos com data, produto, quantidade e valor

### ⚙️ Painel Administrativo
- KPIs em tempo real: total de usuários, faturamento e alertas de estoque
- Alertas automáticos para produtos com estoque abaixo de 5 unidades
- Tabela de gerenciamento de produtos (adicionar, editar, excluir)
- Últimos 10 pedidos realizados na plataforma

### 🔍 Catálogo de Produtos
- Busca em tempo real com **debounce** (evita requisições desnecessárias)
- Filtro por categoria
- Paginação dinâmica
- Cards com botão "Adicionar ao Carrinho" e "Comprar agora"

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Uso |
|---|---|---|
| **Front-end** | HTML5 + CSS3 | Estrutura e estilo das páginas |
| **Front-end** | JavaScript ES6 Modules | Lógica de interface, fetch, roteamento |
| **Back-end** | PHP 8+ | APIs REST-like, sessões, lógica de negócio |
| **Banco de dados** | SQLite (via PDO) | Persistência de usuários, carrinho, pedidos |
| **Servidor local** | XAMPP (Apache) | Ambiente de desenvolvimento |
| **Versionamento** | Git + GitHub | Controle de versão |

---

## 🏗️ Arquitetura

```
E-Commerce/
├── index.html              # Página principal (catálogo)
├── carrinho.html           # Página do carrinho
├── perfil.html             # Área do cliente
├── admin.html              # Painel administrativo
├── index.js                # Entry point — carrega módulos por rota
│
├── modules/                # JavaScript modularizado (ES6)
│   ├── auth.js             # Verificação de sessão e montagem do header
│   ├── login.js            # Lógica do formulário de login
│   ├── registrar.js        # Lógica do formulário de registro
│   ├── paginacao.js        # Catálogo com busca, filtro e paginação
│   ├── pokemon.js          # Função de adicionar ao carrinho + UUID visitante
│   └── perfil.js           # Área do cliente (dados + histórico)
│
├── processar_login.php     # Autenticação + migração do carrinho anônimo
├── registro.php            # Cadastro de novos usuários
├── verificar_sessao.php    # Endpoint de verificação de sessão (usado pelo JS)
├── adicionar_carrinho.php  # Adiciona/atualiza item no carrinho
├── remover_carrinho.php    # Decrementa/remove item do carrinho
├── finalizar_compra.php    # Transação SQL: pedido + estoque + limpeza
├── api_admin.php           # Dados do painel admin (protegido por is_admin)
├── api_perfil.php          # Dados do perfil + histórico do usuário
├── atualizar_perfil.php    # Atualização de e-mail e senha
├── solicitar_recuperacao.php # Gera token de recuperação de senha
├── processar_redefinicao.php # Valida token e redefine senha
│
├── db_config.php           # Conexão PDO com SQLite
├── criar_banco.php         # Criação de tabelas e seed inicial
├── ecommerce.db            # Banco de dados SQLite
│
└── css/                    # Estilos da aplicação
```

---

## 🔑 Destaques Técnicos

- **Transação SQL real:** O processo de finalização de compra usa `beginTransaction()`, `commit()` e `rollback()` para garantir que pedido, desconto de estoque e limpeza do carrinho aconteçam de forma atômica — ou tudo funciona, ou nada é alterado.

- **Carrinho anônimo com UUID:** Visitantes não logados recebem um identificador único (`crypto.randomUUID()`) armazenado no `localStorage`. No momento do login, todos os itens desse carrinho são migrados automaticamente para a conta do usuário via `UPDATE ... WHERE usuario = :visitor_id`.

- **Arquitetura modular no front-end:** Todo o JavaScript é dividido em módulos ES6 com responsabilidades únicas (auth, login, paginação, perfil...), carregados via `import/export` e roteados pelo `index.js` conforme a URL atual.

- **Senhas com hashing seguro:** O cadastro utiliza `password_hash($password, PASSWORD_DEFAULT)` para armazenar bcrypt, e o login usa `password_verify()` — nunca senha em texto puro.

---

## 🏁 Como Rodar Localmente

### Pré-requisitos
- [XAMPP](https://www.apachefriends.org/) (Apache + PHP)
- [Git](https://git-scm.com/)

### Passo a passo

**1. Clone o repositório dentro do htdocs do XAMPP:**
```bash
git clone https://github.com/feliperjj/E-Commerce.git
cd E-Commerce
```

**2. Inicie o Apache** no painel de controle do XAMPP.

**3. Crie o banco de dados:**

Acesse no navegador:
```
http://localhost/E-Commerce/criar_banco.php
```
Isso criará as tabelas e inserirá produtos de exemplo automaticamente.

**4. Acesse a aplicação:**
```
http://localhost/E-Commerce/index.html
```

> **Observação:** Use sempre `http://localhost/...` e não `file://...`, pois o JavaScript usa ES6 Modules que exigem um servidor HTTP.

---

## 👤 Autor

**Felipe Bento**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/felipe-bento-000984108)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/feliperjj)
