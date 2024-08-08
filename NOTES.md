## Decisões de Nomenclatura

### Linguagem e Nomenclatura

Embora toda a estrutura, frases e demais arquivos e/ou textos estejam em inglês (padrão seguido no projeto), os nomes das entidades e, consequentemente, tudo que se refere a elas (controllers, services e routes), estão em português. Essa decisão foi tomada para atender a um requisito da matéria da faculdade.

**Elementos afetados:**

- **Controllers:** Os nomes dos controllers são baseados nos nomes das entidades em português.
- **Services:** Os nomes dos serviços seguem a mesma lógica, utilizando nomenclatura em português.
- **Routes:** As rotas também foram nomeadas em português para manter a consistência com os nomes das entidades.

## Decisões de Implementação

### Comparação de Strings

Atualmente, estamos usando o operador `iLike` do Sequelize para comparações de strings. No PostgreSQL, o operador `iLike` realiza comparações case-insensitive, o que é adequado para o ambiente de produção em que estamos trabalhando.

**Operador atual:**

- **iLike:** Comparação case-insensitive no PostgreSQL.

**Considerações para SQLite:**

No SQLite, o operador `iLike` não é suportado e o operador `like` realiza comparações case-insensitive por padrão. Portanto, para garantir comparações case-insensitive no SQLite, será necessário usar o operador `like`.

**Operador recomendado para SQLite:**

- **like:** Comparação case-insensitive.

Caso decidamos utilizar um ambiente de desenvolvimento com SQLite, lembre-se de ajustar a lógica de comparação para usar o operador `like`.
