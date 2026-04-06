<div align="center">

🛒 Bento E-Commerce Pokémon

Uma loja virtual fullstack responsiva, desenvolvida do zero para consolidar boas práticas de engenharia de software e desenvolvimento web moderno.

</div>

🚀 Sobre o Projeto

O Bento E-Commerce é uma aplicação web fullstack com arquitetura baseada em API (SPA-like). O front-end em JavaScript puro e Vanilla CSS comunica-se com o back-end em PHP exclusivamente via fetch e JSON, garantindo uma navegação fluida, segura e sem recarregamentos de página.

Este projeto atua como portfólio para demonstrar habilidades tangíveis de desenvolvimento backend (segurança, modelagem de banco de dados e transações) e frontend (manipulação do DOM, performance e responsividade).

🌐 Acesso Online

Você pode visualizar e testar a aplicação em produção aqui: bentocommerce.infinityfreeapp.com

✨ Destaques de Arquitetura e Engenharia

Para ir além do básico e resolver problemas reais de plataformas de vendas, implementei as seguintes soluções:

🛍️ Carrinho de Compras Inteligente e Híbrido

Carrinho de Visitante (Guest Cart): Geração de UUID no frontend (crypto.randomUUID()) associado ao localStorage para rastrear itens de usuários ainda não autenticados.

Migração Dinâmica (Merge): No momento do login ou cadastro, os produtos adicionados como visitante recebem um UPDATE massivo no banco e são integrados de forma transparente à conta definitiva do usuário.

Persistência Total: Carrinhos não são perdidos ao fechar a aba; tudo trafega e é salvo na base de dados em tempo real.

📦 Gestão de Pedidos e Transações ACID

O processo de finalização de compra utiliza SQL Transacional direto do PDO (beginTransaction(), commit(), rollback()).

Isso garante de forma blindada que o desconto de estoque, a limpeza do carrinho e a geração do pedido operem isoladamente e com 100% de integridade – em caso de qualquer falha no fluxo, toda a operação é revertida automaticamente.

🔐 Segurança e Autenticação (Auth Flow)

Criptografia Forte: Senhas não trafegam transparentes e são criptografadas com BCRYPT usando a função nativa password_hash().

Sessões Isoladas: O acesso à área de usuário (pedidos, dados) é estritamente protegido pela superglobal $_SESSION.

Painel Administrativo VIP: Rotas protegidas por checagem rigorosa de privilégios (is_admin === 1), bloqueando acesso não autorizado ao dashboard de métricas e estoque.

⚡ Performance no Front-end (Vanilla JS)

Lógica focada em responsabilidades restritas utilizando ES6 Modules.

Implementação de um manipulador de tempo (Debounce) atrelado à barra de busca do catálogo. Ele absorve e previne dezenas de requisições fetch indesejadas enquanto o usuário digita o nome de um Pokémon – excelente prática para poupar carga do servidor.

🛠️ Stack Tecnológica

Camada

Tecnologia

Aplicação

Front-end

HTML5 + CSS3

Layout dinâmico da loja, flexbox, grid e interface de alto contraste.

Front-end

JS (ES6)

Roteamento condicional, tratamento de API, carrinho em tempo real e modularidade.

Back-end

PHP 8+

Intersecção lógica, endpoints REST-like robustos e gestão segura de estado.

Banco de Dados

MySQL (PDO)

Persistência segura em nuvem via queries parametrizadas (anti-SQL Injection).

Deploy

InfinityFree

Hospedagem de produção em ambiente Linux com configuração de CORS e credenciais.

<details>
<summary>📂 <b>Clique aqui para visualizar a estrutura de pastas do projeto</b></summary>




E-Commerce/
├── api/                    # Endpoints consumidos pelo Fetch API
│   ├── processar_login.php # Autenticação e migração de carrinho
│   ├── adicionar_carrinho.php
│   ├── finalizar_compra.php# Transação SQL (Pedido + Estoque)
│   ├── registro.php
│   ├── api_admin.php       # Protegido por is_admin
│   └── db_config.php       # Conexão PDO com MySQL
│
├── modules/                # JavaScript modular (ES6)
│   ├── auth.js             # Montagem dinâmica do header e sessão
│   ├── paginacao.js        # Renderização, filtros e debounce
│   ├── perfil.js           # Histórico de pedidos do usuário
│   └── pokemon.js          # Ações do carrinho e controle de UUID
│
├── css/                    # Estilo nativo do sistema
├── index.html              # Alojamento Single-Page (Catálogo)
├── admin.html              # Dashboard Administrativo
└── ...


</details>

💻 Como Rodar o Projeto Localmente

Se desejar testar a aplicação no seu próprio ambiente de desenvolvimento, siga o passo a passo:

Pré-Requisitos

Você precisará ter instalado:

Servidor local como XAMPP ou Laragon.

Git

Configuração

1. Abra o seu terminal na pasta do servidor web (ex: htdocs no XAMPP):

cd C:\xampp\htdocs
git clone [https://github.com/feliperjj/E-Commerce.git](https://github.com/feliperjj/E-Commerce.git)


2. Ligue os serviços Apache e MySQL através do painel de controle do XAMPP.

3. Suba a base de dados:
Acesse o seu gerenciador de banco de dados (ex: http://localhost/phpmyadmin), crie um banco chamado ecommerce e importe o arquivo .sql do projeto (se disponível). Ajuste o arquivo api/db_config.php com suas credenciais locais (usuário root, sem senha).

4. Acesse a aplicação:
Nunca use aberturas diretas (como duplo-clique abrindo file:///) para não quebrar a arquitetura de Módulos ES6. Use sempre o servidor local:

http://localhost/E-Commerce/index.html


👨‍💻 Autor

Criado e mantido por Felipe Bento 🚀
Desenvolvedor Full-Stack focado na criação de soluções eficientes e escaláveis.

<p align="left">
<a href="https://linkedin.com/in/felipe-bento-000984108" target="_blank">
<img src="https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" alt="LinkedIn">
</a>
<a href="https://github.com/feliperjj" target="_blank">
<img src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" target="_blank" alt="GitHub">
</a>
</p>
