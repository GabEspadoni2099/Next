# Sistema de Reserva de Salas de Reunião (SGM) - Connect Coworking

## Briefing
O projeto consiste no desenvolvimento de um **Sistema de Reserva de Salas de Reunião (SGM)** no formato de uma aplicação web.  
O objetivo é centralizar e otimizar o controle das reservas de salas no espaço de coworking **Connect Coworking**, eliminando conflitos de horários e aumentando a eficiência na utilização das salas.

A plataforma permitirá o **cadastro de salas**, o **agendamento de reservas por data e horário**, e o **gerenciamento das reservas** por parte dos administradores e usuários.

---

## Objetivos do Projeto
- Gerenciar informações sobre as salas de reunião e suas características.  
- Permitir que usuários façam reservas em horários disponíveis.  
- Evitar conflitos de horário entre reservas.  
- Fornecer uma interface simples para visualizar as reservas diárias e semanais.  
- Possibilitar o gerenciamento completo por parte do administrador (CRUD de salas e reservas).

---

## Público-Alvo
- **Usuário Comum:** pode visualizar disponibilidade e realizar reservas.  
- **Administrador:** gerencia salas, reservas e usuários.  

---

## Levantamento de Requisitos do Projeto

### Requisitos Funcionais
- Gerenciamento de Salas (Criar, Atualizar, Listar, Deletar).  
- Gerenciamento de Reservas (Criar, Atualizar, Listar, Deletar).  
- Validação de Conflito de Horários (não permitir duas reservas no mesmo horário/sala).  
- Tela de Login e autenticação de usuários.  
- Visualização das reservas diárias e semanais.  
- Dashboard com resumo das reservas.

### Requisitos Não Funcionais
- Armazenamento das informações em um banco de dados MongoDB.  
- Criptografia das senhas dos usuários (Bcrypt).  
- Uso de JWT para autenticação e segurança das rotas.  
- Controle de acesso por níveis de permissão (Admin / Usuário).  
- Sistema desenvolvido em Next.js (App Router).  
- Interface responsiva e intuitiva.

---

## Recursos do Projeto (Tecnológicos)
- **Framework de Desenvolvimento:** Next.js  
- **Banco de Dados:** MongoDB  
- **Linguagem:** JavaScript  
- **Controle de Versão:** GitHub  
- **Editor de Código:** Visual Studio Code  
- **Design/UI:** Figma  

---

## Diagramas

### 1. Diagrama de Classes
Descreve o comportamento das principais entidades do sistema.

- **Usuário (User):** id, nome, email, senha, role (Admin, Usuário).  
- **Sala (Room):** id, nome, capacidade, recursos.  
- **Reserva (Reservation):** id, data, hora de início, hora de término, idSala, idUsuario.  

```mermaid
classDiagram
    class Usuario {
        +String id
        +String nome
        +String email
        +String senha
        +String role
        +create()
        +read()
        +update()
        +delete()
        +login()
        +logout()
    }

    class Sala {
        +String id
        +String nome
        +Number capacidade
        +String recursos
        +create()
        +read()
        +update()
        +delete()
    }

    class Reserva {
        +String id
        +Date data
        +String horaInicio
        +String horaFim
        +String idSala
        +String idUsuario
        +create()
        +read()
        +update()
        +delete()
    }

    Usuario "1" -- "0..*" Reserva : realiza >
    Sala "1" -- "0..*" Reserva : possui >

    ---

## Prototipagem

- Colocar o Link da Prototipagem