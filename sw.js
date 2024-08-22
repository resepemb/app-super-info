importScripts('files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"92ae2b5a96ab4f546a6d6433d305b125","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"6ccc1ef61664e6048546f2c6eedd0e25","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"6cc666433e66061a8732c86a589ec422","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"83339ea713357f0ee4928f47774ffa1c","url":"conteudo/atividades/monitoria.html"},{"revision":"251d4a19ff3fc0e9d3066343a00abee3","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"89e6ac82deee2d9ab9767112461cf1d5","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"5aa67984f34837f78ac0506acd870d72","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"7baf0150dbfa8924af31576627d10346","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"43fa11152311b6128e618753b47042f0","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"91b133eeb7edc3dacf48d34ffdc0d4e7","url":"conteudo/direitos/quais_sao.html"},{"revision":"f49401f854de70d27116578757685f5c","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"9e737362ad5690fcf39a2a0e87820435","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"0505db226202566822598e64ace2db99","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"fb3fb680644b6ae2c7394512bcc71973","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"6f6804a8040fa2d60dffb23442fc2125","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"2f4510c1891e932a39789f6aa295e8b6","url":"conteudo/enem/inscricao.html"},{"revision":"fcb169dd37dad18aa4d5c3239af7cac5","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"556ebd9d1b2ca9d9ec1b741e54177995","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"c0b46fc2b45587a019418404fdefccd5","url":"conteudo/enem/sobre.html"},{"revision":"4ce3a696ade57b935408b5e7cd136075","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"485bb2fb35e99716d36f6ab5a90162d0","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"21b287624bf98fc02a202bf4da0e0c9b","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"99f2ea935cd0a6fec7d08a8137d48b94","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"0a888b97b48dc8b83a3a45feae722908","url":"conteudo/sisu/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"files/scripts/loadserviceworker.js"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"88af8248c6562f7b0a7bd07f62abd626","url":"index.html"},{"revision":"7fb6d8a6a8d487dbf4ef7d8db17fe340","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"93c6d1dcc1f0fb99d6c3c18027f87cca","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"},{"revision":"7e7459dc05107130d6b999f2b0245c13","url":"sobre.html"},{"revision":"69724c0f1b005b641aa5b664462dc161","url":"styles.css"}];

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