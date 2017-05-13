insert into messages (sender, recipient, messages)
values ($1, $2, $3) returning mid, recipient, messages
