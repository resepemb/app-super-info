importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"42c51a783ff90b8b81ea181dede54d54","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"88ba3b648f8c5fa463a24117ab04fa5d","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"38b4c0f5d302709a7f8d7d648dc842a1","url":"conteudo/atividades/index.html"},{"revision":"4d9f100da337ec10c8a390eee8c6a8ad","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"c4c96aaf4302671de46088623a57e243","url":"conteudo/atividades/monitoria.html"},{"revision":"a96ede06f90a2ced37547fc95cb6a810","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"19344c3f67aadbc82539edceae4bbe59","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"ead9e18c35d558dd546999d69a3c9edd","url":"conteudo/direitos/index.html"},{"revision":"0ad2553b483b79474f060f56a76b7d1a","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"ba704eca6cf899b942b221e5f059665d","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"cf9d54b04213d50a229a46f24c6d8921","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"f297ee55430af5cfd2b52d1e16a68b84","url":"conteudo/direitos/quais_sao.html"},{"revision":"07c1694a9695e859a2fbcf65871d631b","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"70d5842373438cd0abf0b204b2c30394","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"476a487f0e4fbddbf99b46226a9ecb73","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"ccb643a57d27ea73d9b545a182abe385","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"ef1c0a4d878f36d99155c72dab4a33a8","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"16b864004306b151bb20e2af1fd86efa","url":"conteudo/enem/index.html"},{"revision":"d3bfe2c1fbe204c6b0fdfccec8830b15","url":"conteudo/enem/inscricao.html"},{"revision":"9f0fb5e423f46aeaa492d424bf91f9ce","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"512256aff20269c92507d7bee7e06871","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"148412ef8eb0d089b6399d378ee6f4eb","url":"conteudo/enem/sobre.html"},{"revision":"d5df071d78c98687235a66e47faac91a","url":"conteudo/home.html"},{"revision":"eb0e85ddd2151343697446069604073b","url":"conteudo/instituicoes/IFBA.html"},{"revision":"b3bb17444e244320e6daa1c6decb10bc","url":"conteudo/instituicoes/index.html"},{"revision":"65606bdf4f5168ad27180967bb68afa9","url":"conteudo/sisu/index.html"},{"revision":"dd650fef4507449a577428c03828ed0b","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"a60b686b9f1bbe765aba1741daab8125","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"f11b0a4a6557ca15abc8b1f1f0ab6135","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"2a3ec00ad3004bccaddac27aa7c32252","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"2ed55592f12cc95863e5b456e61cb991","url":"conteudo/sisu/sobre.html"},{"revision":"b14b4e725e0c7403751d6359259cd5d3","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"a2f98d97fa771b1651bfd3f59896bcb3","url":"index.html"},{"revision":"3d2ccc102529cb827c3e548b0a13d886","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"1b19953e5ed90a85f90fe1f611ae8cf6","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"814fb63bdfbae42365d2c1d18ca47577","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"df008d556d30a58784f086e4b3eec307","url":"site_libs/quarto-listing/list.min.js"},{"revision":"77cf2d966f525295f151063bfdc627a7","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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