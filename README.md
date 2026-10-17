# Ficha OSE

Ficha de personagem para jogos OSR no Owlbear Rodeo, com o layout inspirado na ficha OSE do Roll20.
Feita em Svelte, TypeScript e Vite. A configuração de build e a forma de salvar (navegador do jogador, ficha
enviada ao narrador pelos metadados do jogador) seguem o que o DummySheet faz.

## O que tem

- **Personagem:** imagem, identidade, atributos, salvaguardas, combate e encontros, armas, perícias de exploração,
  equipamento, armadura, escudo e acessórios, moedas, antecedentes e anotações.
- **Magias:** magias disponíveis e totais por nível, e a lista de magias.
- **Notas:** texto livre.
- **Configurações:** tipo de CA (ascendente ou descendente), tipo de carga e backup.
- **Visão do narrador:** o narrador escolhe a ficha de qualquer jogador conectado no menu "Ficha de". Todas as abas ficam em modo leitura.
- Sem rolagens, sem listas prontas de classes e sem tabelas de atributo: tudo é digitado.

## Como a ficha calcula

- **CA ascendente** = 10 (fixo) + modificador de DES + bônus de cada armadura, escudo ou acessório marcado como equipado.
  Digite em cada linha o bônus que a peça dá (couro +2, escudo +1, anel +1). **CA descendente** = 19 − CA ascendente.
- **Ataque total** (em Combate) = ataque base + a soma digitada no campo extra. Se o campo extra tiver dados (como 1d6), eles ficam só anotados.
  Com CA descendente, os campos viram THAC0 base e THAC0 total (THAC0 menos o extra).
- **Armas:** o +Ataque soma no acerto e no dano, e o +Dano soma só no dano. A tabela mostra o **Acerto**
  (ataque total mais o +Ataque da arma) e o **Dano total** (dado mais +Ataque mais +Dano, por exemplo 1d8+3).
- **Peso total** (carga detalhada) = moedas (1 cada) + armas + armaduras + equipamento (quantidade × peso).
- **Movimento** conforme o tipo de carga: básica, detalhada ou por itens (com ou sem modificador de FOR).
  Os números de movimento ficam em `src/lib/rules.ts` e podem ser editados.
- **Ajuste de reação** mostra o modificador de CAR digitado nos atributos.

## Publicar no GitHub e instalar no Owlbear

1. Crie um repositório **público** com o nome que quiser e envie todos os arquivos desta pasta, inclusive a pasta oculta `.github`.
   Se a pasta `.github` não subir, crie o arquivo à mão em **Add file → Create new file**, com o nome `.github/workflows/deploy.yml`,
   e copie o conteúdo do arquivo de mesmo nome deste projeto.
2. Em **Settings → Pages**, escolha **GitHub Actions** em **Source**.
3. Na aba **Actions**, rode **Deploy to GitHub Pages** (Run workflow) e espere terminar.
4. O endereço da extensão será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/manifest.json`.
5. No Owlbear Rodeo, use **Add custom extension**, cole esse endereço e ative a extensão na sala.

Durante o build, o fluxo ajusta os caminhos do `manifest.json` e do Vite ao nome do repositório.

## Rodar no computador

```
npm install
npm run dev
```

## Observações

- Em Settings, o backup exporta e importa a ficha em arquivo JSON.
- O narrador só vê jogadores conectados que já abriram a extensão. A ficha do narrador fica só no navegador dele.
- Os rótulos e a disposição das seções seguem a ficha OSE oficial do Roll20 (Necrotic Gnome). Ela não traz arquivo de licença,
  então vale pedir autorização ao autor antes de divulgar este projeto.
