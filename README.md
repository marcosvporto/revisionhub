


# RevisionHub
RevisionHub é um hub de Checklists que atendem a processos de inspeção no modelo de projeto em cascata (Fagan, 1976).

## Descrição

No RevisionHub atenderá revisores iniciantes, ou com pouca experiência na etapa de inspeção no modelo de projeto em cascata, que pretendem validar documentos, mas que precisam de um mockup de checklist para tal. As checklist serão adicionadas a plataforma por usuários cadastrados, devidamente logados, e poderão ser acessadas por qualquer usuário, sem a necessidade de cadastro ou login. O usuário que acessa uma checklist terá a possibilidade de aprovar uma cheklist, com um like. As checklists, portanto, contarão com uma quantidade de likes que será importante para se destacar entre as demais checklists.    

## Inspeção de Fagan

Explicar a inspeção de Fagan

## Sumário da Arquitetura

Nós do grupo Grupo 1, deliberamos que para a consecução de tal projeto, o framework Node.js seria o mais indicado para a parte do backend do site, utilizando Express.js para auxiliar na criação e obtenção de dados do servidor. Para utilizar tipagem no código, será utilizado o TypeScript . Ao mesmo tempo, elegemos o framework Vue.js para o desenvolvimento do frontend. Para a persistência dos dados utilizamos o SGBD PostgreSQL. Como utilizaremos o TypeScript e uma base de dados relacional, utilizaremos um mapeamento objeto-relacional da TypeORM.

## Requisitos para Usuários

- O usuário deve ser capaz de logar no sistema
- O usuário logado deve ser capaz de criar e gerenciar (C.R.U.D) suas listas de inspeção.
- Haverá um editor de listas de inspeção.
- Haverão listas públicas de inspeção que qualquer internauta poderá acessar sem estar logado.
- Haverá um sistema de likes/estrelas de listas de inspeção.
- O usuário deve ser capaz de buscar listas de inspeção pelo nome, data de criação e data da ultima modificação.


## Requisitos para transeuntes

- Qualquer internauta, sem precisar estar logado, poderá acessar listas públicas de inspeção
- Qualquer internauta poderá dar um like em qualquer lista de inspeção pública
- Nenhum internauta poderá editar ou excluir alguma lista de inspeção

## Requisitos de Projeto

- O código do projeto deve estar versionado do github.



## Casos de uso

## Diagrama de Classes

![Diagrama de Classes](https://user-images.githubusercontent.com/39508000/81764412-e9babc80-94a7-11ea-8a11-b07a358dfa0d.jpeg)


## Timeline

- Terminar requisitos e timeline até dia 14/5


## Tarefas
## Conclusão

