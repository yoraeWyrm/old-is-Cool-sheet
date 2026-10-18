# Histórico de versões

## 1.1.2 (2026-10-17)

- **Movimento em metros:** o campo passou a se chamar "Movimento base (encontro)" e mostra, por exemplo, 36 m (12 m).
  Na carga detalhada: até 400 de peso = 36 m (12 m), até 600 = 27 m (9 m), até 800 = 18 m (6 m), até 1600 = 9 m (3 m).
  As cargas básica e por itens também passaram para metros.
- **Ícone:** novo desenho do dolmen, mais parecido com a ilustração de referência (pilares mais largos na base, pedra de cima grossa e irregular),
  em uma cor só e com as linhas da pedra vazadas, para continuar legível em tamanho pequeno.
- **Correção:** a volta à ficha própria no `App.svelte` causava um ciclo reativo no Svelte. A condição agora usa a lista de jogadores, sem depender de `other`.
- README: removida a parte de publicação e instalação.

## 1.1.1 (2026-10-17)

- Novo ícone da extensão: três dolmens formando um portal (duas pedras em pé e uma deitada por cima), com "OSR" em blocos dentro.
  O ícone agora tem cor própria (azul) e não depende do tema do Owlbear.

## 1.1.0 (2026-10-17)

**Magias**
- Magias separadas por tipo, cada uma em um cartão: arcanas e divinas (níveis 1 a 6, com os espaços de magia de cada nível),
  glamour (pode ser usado sempre) e runas (lesser, greater e mighty). Glamour e runas são os addons para Dolmenwood.
- Fichas antigas: as magias e os espaços de magia que já existiam passam para as arcanas.

**Ficha**
- "Raça" passou a "Espécie".
- "Atributos de classe e raça" passou a "Particularidades Inatas". A seção Antecedentes foi removida.
- Equipamento: nova coluna **Total** em cada item (quantidade × peso).
- Armas: novas colunas **Acerto** e **Dano total**. O +Ataque soma no acerto e no dano, e o +Dano soma só no dano.
- CA: base 10 fixa, somada ao modificador de DES e aos bônus de armaduras, escudos e acessórios equipados.
  A seção passou a se chamar "Armadura, escudo e acessórios".

**Visual**
- Quadrado em volta dos nomes de atributos e salvaguardas, com mais espaço antes das descrições.
- Destaque em CA, Ataque total, Ajuste de reação e Peso total.
- Linhas de tabela e campos com bordas e espaço entre eles, para identificar melhor cada item.

## 1.0.0

Primeira versão: abas Personagem, Magias, Notas e Configurações; imagem do personagem; visão do narrador;
peso e movimento por tipo de carga (nenhuma, básica, detalhada e por itens); CA ascendente e descendente; backup em arquivo.
