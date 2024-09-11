importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"a911fd507d0f27ff689d9541d9c51766","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"da7a9f7886955741ae3e4903af38e7b6","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"63f56c94ab5933c0c313d86d66c64a2f","url":"conteudo/atividades/index.html"},{"revision":"3718d752e245b158350611968f390337","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"3eef5f6505e4adee511a618c6d5ca304","url":"conteudo/atividades/monitoria.html"},{"revision":"fd3e63d05b93c08e43ce5a5cfafcf08f","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"2fff6a0be54fcb30a534c90422036ce8","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"41dffe8de48678ec90197688def620e5","url":"conteudo/direitos/index.html"},{"revision":"0eb18c11586b195b5b9af20c18e4222d","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"458ad85b34459f7763389ccf85cce7cc","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"9b514e66eaace57720887637b5ba88c8","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"cf8411de44094086ca73986dff0dee26","url":"conteudo/direitos/quais_sao.html"},{"revision":"9f0a870365748b8b1cc53f7160b31787","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"7010ab74d052840178cdef77a593df60","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"5cafd3dbac6cd53611395b619b98e7ed","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"34abf4d55242da59c0bf492a5517e1bf","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"8761a3e5c3cfde803eb507651aa0c2d2","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"646b23fb764c702d351139f2088f4998","url":"conteudo/enem/index.html"},{"revision":"60f97a1eee32da5dff5911ccebca9095","url":"conteudo/enem/inscricao.html"},{"revision":"4e91f2b9eba191051a29787ae2e04166","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"d98cb1b607713648a72db1c968927cc4","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"9a2e8a0822670beaeef898da4ca59425","url":"conteudo/enem/sobre.html"},{"revision":"fb4dc13d5101c8ffd0e19b3bbcbcf08f","url":"conteudo/home.html"},{"revision":"c0a552e1ce8248a6ddeb9130d1e5ebe7","url":"conteudo/instituicoes/IFBA.html"},{"revision":"da8ed88230f8da3819a8909755854da3","url":"conteudo/instituicoes/index.html"},{"revision":"e95c043cc766f6de46fffb5cc0f94980","url":"conteudo/sisu/index.html"},{"revision":"f18569b81944259ff70d1ddeb7779760","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"cfb6b160534fcbd3a993f062b9a1d883","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"edcfcfbf874ded23385cf2b3d1999d34","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"49a309836467d18b3e08dacc890fd257","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"d887375c8a96f95a7e44febece848096","url":"conteudo/sisu/sobre.html"},{"revision":"30ae30744228e581c431705d0e67b916","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"b581441dc4e95375c4be39533204d631","url":"index.html"},{"revision":"3d2ccc102529cb827c3e548b0a13d886","url":"listings.json"},{"revision":"58a65b0e6c8ae2262cb703f2680818cf","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"21ed753f9f5dde94d6476641ee9de671","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"df008d556d30a58784f086e4b3eec307","url":"site_libs/quarto-listing/list.min.js"},{"revision":"77cf2d966f525295f151063bfdc627a7","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

const precacheController = new PrecacheController();

precacheController.strategy.matchOptions = {
  ignoreVary: true,
};

// Files with revision Null
precacheController.addToCacheList([
  {"revision": null, "url":"site_libs/bootstrap/bootstrap-icons.woff"},
  {"revision": null, "url":"https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"},
  {"revision": null, "url":" https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"},
]);

precacheController.addToCacheList(manifestList);

self.addEventListener('install', (event) => {
  self.skipWaiting();
  precacheController.install(event);
});

self.addEventListener('activate', (event) => {
  precacheController.activate(event);
});


// INTERNAL REQUESTS
registerRoute(({url}) => url.href.includes(scope),async({url ,event}) => {
  try {
      let cacheResponse = await precacheController.matchPrecache(url.pathname);

      const isRootPath = url.pathname === '/' || url.pathname === basePath || url.pathname === `${basePath}/`;

      if (cacheResponse == undefined && isRootPath) {
        cacheResponse = await precacheController.matchPrecache(`${basePath}index.html`);
      }

      if(cacheResponse == undefined){
        console.debug(`No custom cached response found in ${url.pathname} Redirecting...`);
      }
      
      return cacheResponse || fetch(event.request);
  } catch (error) {
      return new Response('Error loading internal content', { status: 500 });
  }
}); 

// EXTERNAL REQUESTS
registerRoute(({url}) => !url.href.includes(scope),async({url ,event}) => {
  try {
      let cacheResponse = await precacheController.matchPrecache(url);


      if(cacheResponse == undefined){
        console.debug(`No custom cached response found in ${url.pathname} Redirecting...`);
      }
      
      return cacheResponse || fetch(event.request);
  } catch (error) {
      return new Response('Error loading external content', { status: 500 });
  }
}); 


const strategy = new CacheFirst();

strategy.matchOptions = {
  ignoreVary: true,
};
 
setDefaultHandler(strategy);

clientsClaim();