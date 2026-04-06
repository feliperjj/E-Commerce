<div align="center">

# 🛒 E-Commerce Pokémon

**Uma loja virtual fullstack responsiva, desenvolvida do zero para consolidar boas práticas de desenvolvimento web moderno.**

[![Deploy](https://img.shields.io/badge/Acessar%20Projeto%20Online-00A98F?style=for-the-badge&logoColor=white)](https://bentocommerce.infinityfreeapp.com/)
[![GitHub repo](https://img.shields.io/badge/Ver%20Repositório-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/feliperjj/E-Commerce)

<br/>

![PHP](https://img.shields.io/badge/PHP_8+-777BB4?style=flat-square&logo=php&logoColor=white)
![JavaScript ES6](https://img.shields.io/badge/JavaScript_ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

</div>

---

## 🚀 Sobre o Projeto

O E-Commerce Pokémon é uma aplicação web fullstack com arquitetura baseada em API (SPA-like). O front-end em JavaScript puro e Vanilla CSS comunica-se com o back-end em PHP exclusivamente via `fetch` e JSON, garantindo uma navegação fluida, segura e sem recarregamentos de página. 

Este projeto atua como portfólio para demonstrar habilidades tangíveis de desenvolvimento backend (segurança, modelagem de banco de dados e transações) e frontend (manipulação do DOM, performance e responsividade).

### 🌐 Acesso Online
Você pode visualizar e testar a aplicação em produção aqui: **[bentocommerce.infinityfreeapp.com](https://bentocommerce.infinityfreeapp.com/)**

---

## ✨ Destaques de Arquitetura e Engenharia

### 🛍️ Carrinho de Compras Inteligente e Híbrido
- **Carrinho de Visitante (Guest Cart):** Geração de UUID no frontend (`crypto.randomUUID()`) associado ao `localStorage` para rastrear itens de usuários ainda não autenticados.
- **Migração Dinâmica (Merge):** No momento do login, os produtos adicionados como visitante recebem um `UPDATE` e são integrados de forma transparente à conta definitiva do usuário no banco.
- **Persistência Total:** Carrinhos não são perdidos ao fechar a aba; tudo trafega e é salvo via banco de dados.

### 📦 Gestão de Pedidos e Transações ACID
- O processo de finalização de compra utiliza SQL Transacional direto do `PDO` (`beginTransaction()`, `commit()`, `rollback()`). 
- Isso garante de forma blindada que o **desconto de estoque**, a **limpeza do carrinho** e a **geração do pedido** operem isoladamente e com 100% de integridade – em caso de qualquer falha no fluxo, toda a operação é revertida.

### 🔐 Segurança e Autenticação (Auth Flow)
- **Criptografia Forte:** Senhas não trafegam transparentes e são criptografadas com BCRYPT usando `password_hash()`.
- **Sessões Isoladas:** O acesso à área de usuário (pedidos, dados) é estritamente protegido pela superglobal `$_SESSION`.
- **Recuperação de Senha:** Funcionalidade que gera tokens seguros, atrelados ao usuário, permitindo o reuso único e controlando tempo máximo para expiração do token.
- **Painel Administrativo VIP:** Rotas protegidas por checagem dupla de tipo do usuário (`is_admin === verdadeiro`).

### ⚡ Performance no Front-end (Vanilla JS)
- Lógica focada em responsabilidades restritas utilizando **ES6 Modules**.
- Implementação de um manipulador de tempo **(Debounce)** atrelado à barra de busca do catálogo. Ele engole e previne dezenas de `fetch` indesejados caso o usuário esteja rapidamente teclando o nome de um Pokémon – excelente para poupar carga de servidor.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Aplicação |
|---|---|---|
| **Front-end** | `HTML5` + `CSS3` | Layout dinâmico da loja, flexbox, grid e interações responsivas. |
| **Front-end** | `JS (ES6)` | Roteamento condicional no index, tratamento de API, carrinho na tela em tempo real. |
| **Back-end** | `PHP 8+` | Intersecção lógica, endpoints robustos e verificação severa de estado. |
| **Banco de Dados** | `MYSQL` | Persistência local segura via queries parametrizadas (anti-SQL Injection). |
| **Deploy** | `InfinityFree` | Hospedagem para portfólio live, rotulando os protocolos CORS. |

<details>
<summary>📂 <b>Clique aqui para visualizar a estrutura de pastas</b></summary>
<br>

```text
E-Commerce/
├── api/ ou root/           # Endpoints consumidos
│   ├── adicionar_carrinho.php
│   ├── finalizar_compra.php 
│   ├── registro.php
│   └── api_admin.php
├── modules/                # JavaScript modular
│   ├── auth.js             # Montagem dinâmica do header
│   ├── paginacao.js        # Filtros, debounce e listagem
│   └── pokemon.js          # Cartão com injeção UUID
├── css/                    # Estilo nativo do sistema
├── db_config.php           # Setup do MYSQL
├── criar_banco.php         # Script inicial de criação de tabelas/seed
├── index.html              # Alojamento Single-Page
└── ...
```
</details>

---

## 💻 Como Rodar o Projeto Localmente

Se desejar testar a aplicação no seu próprio ambiente, siga o passo a passo:

### Pré-Requisitos
Você precisará ter instalado:
* **[XAMPP](https://www.apachefriends.org/pt_br/index.html)**
* **[Git](https://git-scm.com/)**

### Configuração
**1.** Abra o seu terminal na pasta do servidor do XAMPP (`htdocs`):
```bash
cd C:\xampp\htdocs
git clone https://github.com/feliperjj/E-Commerce.git
```

**2.** Ligue o servidor web Apache através do painel de controle do XAMPP.

**3.** Suba a base de dados em seu navegador:
```text
http://localhost/E-Commerce/criar_banco.php
```

**4.** Feito isso, navegue no ambiente acessando o index. Nunca use aberturas diretas (como duplo-clique abrindo `file:///`) para não quebrar a arquitetura de Módulos ES6. Use sempre o servidor local:
```text
http://localhost/E-Commerce/index.html
```

---

## 👨‍💻 Autor

Criado e mantido por **Felipe Bento** 🚀

<p align="left">
  <a href="https://linkedin.com/in/felipe-bento-000984108" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
  </a>
  <a href="https://github.com/feliperjj" target="_blank">
    <img src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" target="_blank">
  </a>
</p>

