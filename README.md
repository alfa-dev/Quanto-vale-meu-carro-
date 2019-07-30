# Quanto vale meu carro?
Descubra o valor do seu carro na tabela FIPE de forma fácil e simples.

Este projeto, usa como base a API [API de Consulta Tabela FIPE](http://fipeapi.appspot.com/), para descobrir o valor do seu carro baseado em informações simples.

## Rodando o projeto
Para instalar as dependências execute:
```
bundle
```

Para rodar o projeto execute:
```
rackup
```
O servidor ira rodar na porta 9292 por padrão.
acesse `http://localhost:9292`

---
Caso queira vizualizar o projeto em outro device (um celular por exemplo), você precisa rodar o projeto da seguinte forma:
```
rackup -o 0.0.0.0
```
E em seguida acessar `http://[IP_DA_MAQUINA_QUES_ESTÁ_RODANDO_O_SERVIDOR]:9292`, de qualquer aparelho que estiver na mesma rede.
