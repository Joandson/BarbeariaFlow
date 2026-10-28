# Barbearia Flow

MVP responsivo para solicitação e administração de agendamentos de uma barbearia.

## Executar localmente

Como a primeira versão não possui dependências, basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 4173
```

Depois, acesse `http://localhost:4173`.

## Funcionalidades entregues

- Landing page responsiva com serviços e chamada para agendamento.
- Fluxo de reserva com serviço, data, horário, dados do cliente e observações.
- Bloqueio de domingos e segundas, além de horários já reservados.
- Persistência dos agendamentos no `localStorage` do navegador.
- Painel administrativo com login demonstrativo, indicadores, filtro de status e conclusão/reabertura de atendimentos.
- Link de confirmação pré-preenchido para WhatsApp.

### Acesso demonstrativo

Na **Área do barbeiro**, use a senha `1234`. Essa senha existe apenas para demonstrar o fluxo e não deve ser usada em produção.

## Arquitetura e próximos passos

O MVP usa HTML, CSS e JavaScript sem framework para facilitar avaliação e publicação em hospedagem estática. Para publicação real, substitua o `localStorage` por uma API e banco de dados (por exemplo, PostgreSQL), implemente autenticação com sessão/token no servidor, valide os dados no backend e configure o número oficial do WhatsApp. Também devem ser adicionados HTTPS, variáveis de ambiente, backups, controle de permissões e testes automatizados.