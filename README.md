# node-vagalume
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Code Climate][climate-image]][climate-url] [![Test Coverage][coverage-image]][coverage-url]

No Vagalume temos a **performance** como um dos itens mais importantes no desenvolvimento do sistema. Devido a grande quantidade de acessos no site, temos como prioridade o carregamento rápido e escalabilidade da aplicação. Utilizar as funções encontradas na API não devem deixar o seu site mais lento ou gerar problemas de estabilidade em nosso sistema. Nesta documentação devemos abordar as melhores práticas de como fazer requisições de forma assíncrona.

**IMPORTANTE**: ~~O uso da API é totalmente gratuito, mas é muito importante que o [logo](http://api.vagalume.com.br/terms/) e link para a página correspondente no Vagalume estejam presentes. Leia os [termos de uso](http://api.vagalume.com.br/terms/), e verifique se o seu site ou aplicação estão de acordo.~~

**IMPORTANTE**: Para usar Vagalume API, é necessário que seu aplicativo tenha [credenciais de autorização](https://auth.vagalume.com.br/). Cadastre-se no Vagalume e crie sua chave de API. Esta credencial será requerida a partir do dia **23/11/2015**.

## Instalação

```sh
$ npm install --save vagalume
```

## Como usar
> **ATENÇÃO**: Todos os métodos retornam um Promise.

```js
var Vagalume = require('vagalume');
var api = new Vagalume();

api.getNoticias().then(function (data) {
  // faça o que quiser com o retorno  
});
```

```sh
# creates a browser.js
$ npm run browser
```

## Documentação

#### getArtista(nome)
> Além das letras existem várias informações disponíveis sobre o artista. Dados como quantidade de acessos, posição no ranking, gênero musical, músicas mais acessadas do artista, discografia e muito mais. ([ver mais](http://api.vagalume.com.br/docs/artistas/))

#### getByTrecho(trecho, [limite])
> Um dos recursos mais interessantes para buscar letras de músicas é a possibilidade de consultar por trecho. Muitas vezes o usuário não lembra do título da música, por isso, este segmento da API pode retornar as músicas que possúem tal trecho buscado. ([ver mais](http://api.vagalume.com.br/docs/search/#mus))

#### getDiscografia(nome)
> O Vagalume possui também um banco de dados organizando as discografias (álbuns) de cada artista. Como todas as outras chamadas da API, o retorno é feito por JSON e pode e deve ser feito direto pelo navegador do usuário. ([ver mais](http://api.vagalume.com.br/docs/discografia/))

#### getHotspots()
> O Hot Spot é o nome da seção do Vagalume que é atualizada diariamente na home com novidades de clipes, músicas e conteúdo relevante para os usuários site. Milhões de usuários entram no Vagalume diariamente para saber o que há de novo no mundo da música. ([ver mais](http://api.vagalume.com.br/docs/hotspot/))

#### getNoticias()
> Você pode integrar as chamadas das notícias do Vagalume em seu site. Assim, você poderá oferecer um conteúdo bastante atualizados sobre o que acontece no mundo da música. No código abaixo, mostramos as últimas 20 notícias publicadas com informações para link e imagem. ([ver mais](http://api.vagalume.com.br/docs/news/))

#### getImagens()
> O Vagalume possui também um banco de imagens organizadas por galerias. Disponibilizadas pelo próprio artista no caso como (Divulgação) ou as que os prórpios usuários enviam (Enviadas pelos usuários). ([ver mais](http://api.vagalume.com.br/docs/image/))

#### getRanks()
> As informações de ranking no Vagalume são constantemente atualizadas e representam a tendência musical conforme milhões de acessos diários a páginas de letras, artistas, álbuns dentre outros. As informações são bem seccionadas, permitindo uso variado e fornecendo inúmeras possibilidades de aplicação em seu projeto.. ([ver mais](http://api.vagalume.com.br/docs/rank/))

## License

MIT © [Gabriel Pedro](https://gpedro.net)


[npm-image]: https://badge.fury.io/js/vagalume.svg
[npm-url]: https://npmjs.org/package/vagalume
[travis-image]: https://travis-ci.org/gpedro/node-vagalume.svg?branch=master
[travis-url]: https://travis-ci.org/gpedro/node-vagalume
[daviddm-image]: https://david-dm.org/gpedro/node-vagalume.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gpedro/node-vagalume
[coverage-image]: https://codeclimate.com/github/gpedro/node-vagalume/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/gpedro/node-vagalume/coverage
[climate-image]: https://codeclimate.com/github/gpedro/node-vagalume/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/gpedro/node-vagalume
