importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"aacb72509e01d2bb84de6e49b92efd8d","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"8a0bdcf002da413c1877a825c10be2c6","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"6bf814151a6e951207540ef2c67eb2e2","url":"conteudo/atividades/index.html"},{"revision":"4c3c742ca8d1ce88e700e5c5e1c44560","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"df41a17fad081acf376f3481be603142","url":"conteudo/atividades/monitoria.html"},{"revision":"f45bf2c385e6b9bdae62f31a70bdbf24","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"05a76afc906b3b548a6c0143c0213abf","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"10fedde7bd851eb23c2740e87e1a36fd","url":"conteudo/direitos/index.html"},{"revision":"e94cb13b0cd8f93f04cffa5229abd538","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"cd0a8ebbbad8482f988e0d532275bbfe","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"9cbbbbd66ac1f569ecc5590951af47ec","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"fc8dca0e3f539037c21328a83b87548b","url":"conteudo/direitos/quais_sao.html"},{"revision":"4fde4484f0a90ffcd879b0a0dc28f1b1","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"d844a1ca2b38639a2c2b00f6d83088e9","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"0565fdd60fff2dc7b7e37df74c61ad97","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"9887f90666693aeac6f08e43fe981537","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"a05cf585f3b0e9db6f2957ca7ed7328a","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"acc8b255c1e9205e7b8400597f09dceb","url":"conteudo/enem/index.html"},{"revision":"3c6f023a407995058f28ae41649051e6","url":"conteudo/enem/inscricao.html"},{"revision":"bf201cb483da010f112dcb4e2dedf1d7","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"97c4f0e9aeff296402c276a624bbd668","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"468efaf083a67e4728323bdf39b178da","url":"conteudo/enem/sobre.html"},{"revision":"9c1cdaf8989cf971b590b2880572dbc0","url":"conteudo/instituicoes/IFBA.html"},{"revision":"62d948437bef957a23b47eeefd3b63e4","url":"conteudo/instituicoes/index.html"},{"revision":"9ebecb533714a1e898f12486123c7bbe","url":"conteudo/instituicoes/UEFS.html"},{"revision":"9eb6ad47dee744b783660cc877ceeb32","url":"conteudo/instituicoes/UESB.html"},{"revision":"4f4009ebf592ef0447f62fd7ee4c1c3d","url":"conteudo/instituicoes/UESC.html"},{"revision":"afb560b8fbba22c811ddc9113d4ed650","url":"conteudo/instituicoes/UFBA.html"},{"revision":"413907a268a5296ef7046d6148a6459d","url":"conteudo/instituicoes/UFOB.html"},{"revision":"1ace767c3ce6f34508688aa953345830","url":"conteudo/instituicoes/UFRB.html"},{"revision":"6d305c1830467d0544732d7130893cc9","url":"conteudo/instituicoes/UFSB.html"},{"revision":"f2c904b01a0d51c38497e7b934ef5ca2","url":"conteudo/instituicoes/UNEB.html"},{"revision":"6d446dc00c2ecae1449d3c2ed802813d","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"45eb32f98d1173f06edb3a58bf5c873e","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"b16a8ba6da968dfdd4943a1ad0da301e","url":"conteudo/sisu/index.html"},{"revision":"1239607bfbf518a18700f6203cd8070e","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"623a02c7371ddddaa0a7936c70d10748","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"681420a1d2aea8e26f8d0bc04984b69b","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"a6f526c60170363970a107d056c8b4aa","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"6f7891476c5b9d98260e1f2caf5aa7b6","url":"conteudo/sisu/sobre.html"},{"revision":"d8e7e67fde96024a1d910d5d09cc2f07","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"3085ff68d6b157f0743cf0b12243e46f","url":"index.html"},{"revision":"5e5ab89e128eebf55dc53525efbb31c3","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"1c916171f2d4c8c92344c36f93d32ac5","url":"search.json"},{"revision":"355b724007486f3360d76b6e95d8b02e","url":"site_libs/bootstrap/bootstrap-355b724007486f3360d76b6e95d8b02e.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"e1a5c8363afafaef2c763b6775fbf3ca","url":"site_libs/quarto-html/quarto-syntax-highlighting-e1a5c8363afafaef2c763b6775fbf3ca.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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