


# RevisionHub
RevisionHub é um hub de Checklists que atendem a processos de inspeção (Fagan, 1976).

## Descrição

No RevisionHub atenderá inspetores com pouca experiência na etapa de inspeção de Fagan, que pretendem validar documentos, mas que precisam de um mockup de checklist para tal. As checklist serão adicionadas a plataforma por revisores (usuários cadastrados), devidamente logados, e poderão ser acessadas por transeuntes (qualquer usuário, sem a necessidade de cadastro ou login). O transeunte que acessa a página terá a possibilidade de buscar uma checklist, fazer upload de um documento, gerar um relatório com base no preenchimento dessa checklist e ,ao final do processo, dar um like na checklist. As checklists, portanto, contarão com uma quantidade de likes que será importante para se destacar entre as demais checklists, na página de busca.    

## Inspeção de Fagan

A inspeção de Fagan consiste na validação de documentos, tendo como base uma Checklist, ou seja, uma lista de items aos quais o documento deve estar em conformidade. A inspeção deve ser realizadas por revisores que, ao ler o documento, preencherão a checklist conforme seu julgamento. Os revisores podem tecer comentários sobre o documento e apontar a necessidade de alterações no mesmo.  

## Sumário da Arquitetura

Nós do grupo Grupo 1, deliberamos que para a consecução de tal projeto, o framework Node.js seria o mais indicado para a parte do backend do site, utilizando Express.js para auxiliar na criação e obtenção de dados do servidor. Para utilizar tipagem no código, será utilizado o TypeScript . Ao mesmo tempo, elegemos o framework Vue.js para o desenvolvimento do frontend. Para a persistência dos dados utilizamos o SGBD PostgreSQL. Como utilizaremos o TypeScript e uma base de dados relacional, utilizaremos um mapeamento objeto-relacional da TypeORM.

## Requisitos para Revisores

- O revisor deve ser capaz de logar no sistema
- O revisor logado deve ser capaz de criar e gerenciar (C.R.U.D) suas listas de inspeção.
- Haverá um editor de listas de inspeção.
- Haverá um sistema de likes/estrelas de listas de inspeção.



## Requisitos para transeuntes

- Qualquer transeunte, sem precisar estar logado, poderá acessar listas públicas de inspeção
- O transeunte deve ser capaz de buscar listas de inspeção pelo nome, data de criação e data da ultima modificação.
- O transeunte poderá selecionar uma checklist para realizar a inspeção de um documento.
- O transeunte será capaz de fazer upload de um documento para realizar sua inspeção.
- O transeunte deve ser capaz de preencher uma checklist durante a inspeção.
- Será permitido ao transeunte gerar um relatório baseado no preenchimento de uma checklist.
- Qualquer transeunte poderá dar um like em qualquer lista de inspeção pública.
- Nenhum internauta poderá editar ou excluir alguma lista de inspeção.

## Requisitos de Projeto

- O código do projeto deve estar versionado do github.



## Timeline

- [X] 14/05: Terminar primeiro documento de requisitos e timeline
- [X] 14/05: Fazer Gantt Chart para timeline
- [X] 14/05: Dividir Tarefas
- [X] 14/05: Realizar primeira inspeção de Requisitos
- [X] 26/05: Terminar documento de projeto e Arquitetura
- [X] 26/05: Terminar inspeção de documento de projeto
- [ ] 26/05: Fazer sistema e página de login
- [ ] 26/05: Fazer uma de todos os artefatos
- [ ] 04/06: Terminar documentos de planejamento de testes
- [ ] 04/06: Implementar C.R.U.D. e busca de listas de inspeção no backend
- [ ] 23/06: Terminar listagem dos casos de teste
- [ ] 23/06: Fazer sistema de gerenciamento de inspeções
- [ ] 23/06: Fazer sistema de gerenciamento de transeuntes
- [ ] 23/06: Inspecionar e testar a implementação até o momento
- [ ] 02/07: Fazer slideshow de apresentação
- [ ] 02/07: Finalizar pendências de outras fases
- [ ] 02/07: Testes finais


## Contribuições

Merges na branch principal são possíveis somente após a revisão de um code owner a uma Pull Request.
Uma Pull Request pode ser usada para que um contribuidor solicite ajuda no desenvolvimento de uma feature.

## Gerenciamento de Projeto
Na aba Projects encontra-se uma ferramenta que auxilia a visualização de tarefas a fazer, em andamento ou concluidas.



