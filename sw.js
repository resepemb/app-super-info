importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"e40c56f95fbe5c3682dafb535cb8bed3","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"6c005fd551d20f6efa94602982a69f45","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"6c217a0866c0f949f0c9194d0458d1f5","url":"conteudo/atividades/index.html"},{"revision":"1ef470fbf52728f5981a1cf97a6ae12a","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"33f6c59cfdcafbfb0dc4464ddff14d26","url":"conteudo/atividades/monitoria.html"},{"revision":"5314c53c93589b1f1358daf76d714312","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"aa0ffc43f44c64f73b9974c4683a7467","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"cced6779f3792f9574e4d5f79e18cc63","url":"conteudo/direitos/index.html"},{"revision":"b113c460ee913498b10d6d61512f60f1","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"00d991b6ef5af6831132b12339dfbb57","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"8527c529f9e40a0a21d3aae9aee85e6d","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"df9f24bea0b7b57d98ebc63993997437","url":"conteudo/direitos/quais_sao.html"},{"revision":"d62a1b1e2b489e017fa389f5e88f03ed","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"925adc0f040c4fa1de71cffa88ae3ade","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"267364e8441a3745ea7d4b9f5b8109d6","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"8b998ca8554f8e6d52460a9dae3ac491","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"8c85e67bab9b4f4e019e789248431d00","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"fdd68e07417a688656e67acd87f459e2","url":"conteudo/enem/index.html"},{"revision":"f81f5033d127e2abd07d5ae69acbd2da","url":"conteudo/enem/inscricao.html"},{"revision":"ba5605524ade7705fc0bca9fe28fd572","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"b22cbbe3c6cea356ff0a8e75a4c1b4b9","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"e7e7430240227c4bd30a1265d453bf66","url":"conteudo/enem/sobre.html"},{"revision":"f7aec90fd9dbfbba76b122104bd6d059","url":"conteudo/instituicoes/IFBA.html"},{"revision":"437f8b6094032355e921e1796432500a","url":"conteudo/instituicoes/index.html"},{"revision":"8aed6df30f8adca144a64d68e739891d","url":"conteudo/instituicoes/UEFS.html"},{"revision":"bc5c68d50f7ef12478592ee2ea972bd2","url":"conteudo/instituicoes/UESB.html"},{"revision":"067b87512bd02c04febfb023f63de9d7","url":"conteudo/instituicoes/UESC.html"},{"revision":"b8453963023bbc805c911f3632ef221f","url":"conteudo/instituicoes/UFBA.html"},{"revision":"3dedaaa001934af728859dd59c137f78","url":"conteudo/instituicoes/UFOB.html"},{"revision":"e9946f98e37b146d4df81de679fa996d","url":"conteudo/instituicoes/UFRB.html"},{"revision":"5e86dad0b3bfe72ecfd9eb2c6fb75f01","url":"conteudo/instituicoes/UFSB.html"},{"revision":"c7ee4dd59d44718a2b7da9d71647799c","url":"conteudo/instituicoes/UNEB.html"},{"revision":"b81f1d6261707a0f5cb3b39fce02ce56","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"a3f563593a318cd014d3ddf0502eba85","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"a53e7258e6529d85c5b7f7c791130c2e","url":"conteudo/sisu/index.html"},{"revision":"134e7a3a1ff3a70d6c5013bd3b4ce6ad","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"6a7ffad80a9f9e1d24f303eefb57c975","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"72789088c0bb4a9a9422e96e595de463","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"6ef1103701defb4227c4b883621ab133","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"f30d155440f210cac698a183145519a6","url":"conteudo/sisu/sobre.html"},{"revision":"65c30683b755a8efcda0064603506b62","url":"conteudo/sobre.html"},{"revision":"536d34d9c8557396284a69dc44432cd2","url":"conteudo/vocacao/conectando_interesses_e_carreiras.html"},{"revision":"11c3be0522df3d00ac4c2c58951e177e","url":"conteudo/vocacao/index.html"},{"revision":"888bb94f7305b32911ee60ecc13a49c2","url":"conteudo/vocacao/testes_vocacionais.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"41e3ed32e00afc593b88584baefaa291","url":"index.html"},{"revision":"e6e5e2c312799b3d0b072573a29981f7","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"53b1066c3afff7df747dfbe7f2cba98c","url":"search.json"},{"revision":"d37546d951bcc545e13c55dedb9160cb","url":"site_libs/bootstrap/bootstrap-d37546d951bcc545e13c55dedb9160cb.min.css"},{"revision":"886da841d7421705f715f600c5ff11bb","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"b4f6a44157bfe20b68b69aabf2f8125d","url":"site_libs/quarto-html/axe/axe-check.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ed96de9b727972fe78a7b5d16c58bf87","url":"site_libs/quarto-html/quarto-syntax-highlighting-ed96de9b727972fe78a7b5d16c58bf87.css"},{"revision":"a65a7780c10232b6515cdfb8beaaa221","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"b514204f2ef1ca7a8e2ad4579d263504","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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