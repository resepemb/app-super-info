importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"b2212e73c10976d8f0869a7147fda55a","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"4a64fa8173c5c5838418eaeccb6aee53","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"f8868e07c3f7dc62b1f1716021c0460f","url":"conteudo/atividades/index.html"},{"revision":"4660ad10ccf53ef9a2033154776f1ebb","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"3cbfbcdedeef8f07b38ce996482078eb","url":"conteudo/atividades/monitoria.html"},{"revision":"a25586a115db6ad866a9269c80c99361","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"4dc7f23b90b3259a5889637432480a1d","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"b4282088aef41fff3e494b05f5f063c5","url":"conteudo/direitos/index.html"},{"revision":"4fe7e00bc0c98a6a35be546f49dd38d0","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"68dd252ae307b3ec7699bab2485dcddf","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"b981cd51fdcd6a49c3ac04e1f21f6ecb","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"8e74ef171974fc838c7669b1117b1e6c","url":"conteudo/direitos/quais_sao.html"},{"revision":"14d273d13ba71e6e200dea85152b4017","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"f2ac6aa02f00da9c6dcc0f42da4353ce","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"2c2946aa06e3ebe7e3af524dd9e989b5","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"1d2908e6cbe28a1e28468c3c2f03f2f6","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"9445f406983e8445bb4db901f8ae7ef2","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"8efdf3c447346ae57ba19ad7faf954cc","url":"conteudo/enem/index.html"},{"revision":"200849ace255669eda5cbcf16f9b2ee7","url":"conteudo/enem/inscricao.html"},{"revision":"6ce73d8b4abaf51010b22b6d009e4df4","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"9738a43b03d78299945e6c35bb254758","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"39ea36f61b272e211c59dd246a952d9b","url":"conteudo/enem/sobre.html"},{"revision":"0fde4f06128bd0cded6eb036e1122ffc","url":"conteudo/instituicoes/IFBA.html"},{"revision":"432acd822592c128bc21c02c8d142d80","url":"conteudo/instituicoes/index.html"},{"revision":"25a8125459048493162bb27b120bdf7f","url":"conteudo/sisu/index.html"},{"revision":"61c06ac9915c64bfca0de158d90fc05f","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"a6949f993acb287a93fc6df578095061","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"b30d65bf3b077eb962afb9617ebcd10d","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"cf959e983c39acf2e0fb9e1c2b4d2c5f","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"5327ada790e871d79486e37c56affb45","url":"conteudo/sisu/sobre.html"},{"revision":"638a3436f6fc6fb85189ee945a96aefb","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"276fe8b5ab8325621180a1422886cdd0","url":"index.html"},{"revision":"59dafbca0659df198bd3614d6187af8c","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"59cc2e041106292c5264656510023034","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"dda42eaa2f0b4cfc7542271959225502","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"df008d556d30a58784f086e4b3eec307","url":"site_libs/quarto-listing/list.min.js"},{"revision":"77cf2d966f525295f151063bfdc627a7","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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