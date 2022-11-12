# language: pt
Funcionalidade: Simple BP

  @happy
  Cenario: Simple BP_1
    Dado que um usuario anonimo esta logado
    E que um processo de 'Simple BP' foi iniciado com os dados iniciais '{}'  
    Entao o processo passou pelo nó 'CHECK-ACTOR'
    Entao o processo passou pelo nó 'ORDER-PIZZA'
    Entao o processo passou pelo nó 'TAKE-ORDER'
    Entao o processo passou pelo nó 'PREPARE-PIZZA'
    Entao o processo passou pelo nó 'BRING-PIZZA'
    Entao o processo passou pelo nó 'RECEIVE-PIZZA'
    E o processo finaliza no nó 'END'

  @other
  Cenario: Simple BP_2
    Dado que um usuario anonimo esta logado
    E que um processo de 'Simple BP' foi iniciado com os dados iniciais '{}'
    Entao o processo passou pelo nó 'CHECK-ACTOR'
    Entao o processo passou pelo nó 'BAG-ACTOR'
    Entao o processo passou pelo nó 'ORDER-PIZZA'
    Entao o processo passou pelo nó 'TAKE-ORDER'
    Entao o processo passou pelo nó 'PREPARE-PIZZA'
    Entao o processo passou pelo nó 'BRING-PIZZA'
    Entao o processo passou pelo nó 'RECEIVE-PIZZA'
    E o processo finaliza no nó 'END'
