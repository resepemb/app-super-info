importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"b04fabd4dccc4e66708666a5b573b68f","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"d409afe1de0c156fb8002b458c70ee1b","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"9b4e0be581a393fc1ba17d0c9686e4fa","url":"conteudo/atividades/index.html"},{"revision":"3663d3c89fbc643fa1738fd578369112","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"18b7dc7ebe766152729e05cdf8a07086","url":"conteudo/atividades/monitoria.html"},{"revision":"a11308d4264d85e8a503d1336756cea3","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"68ac680253cc36f9fb641ba4bb5a4bf9","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"3075980a010e11daf4e7678b294a6170","url":"conteudo/direitos/index.html"},{"revision":"16295e0384d6c9511c49915da75899f6","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"e99c726f67f0a8bf5f775f4df59119c0","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"30cc64016e3de1678b9846df5db2e5e8","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"44b492d8970877a961dbde5b8996c586","url":"conteudo/direitos/quais_sao.html"},{"revision":"f387fde69019fd3af90f46b9f3e28dd1","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"6c2f87f3f4744d90124e05a9bb57493b","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"d210ef60a4e58ba57ebc2515472f2e3c","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"fa597f602c56d57209c4cc88dae2b572","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"f609360211daa5125ab723cf480fdbb5","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"2b96cf57589a9e87edca113927a5d9d1","url":"conteudo/enem/index.html"},{"revision":"f07acd5341e10323e8b4cbeca3dd7c7c","url":"conteudo/enem/inscricao.html"},{"revision":"e8f14c45d086b768fda4fa786e70a8f8","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"d663d056c707c277cea2a12dbbe64a5f","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"d0041d91a24f41d2620fd9d61257069e","url":"conteudo/enem/sobre.html"},{"revision":"450931a20c49c0d518ff8f58979c9ce1","url":"conteudo/instituicoes/IFBA.html"},{"revision":"a8a9afae7bee0ce29f8bc5763b78647d","url":"conteudo/instituicoes/index.html"},{"revision":"fcdf571dcd994a0dd6149730ba0329d4","url":"conteudo/instituicoes/UEFS.html"},{"revision":"d51c877e7a451ba047fc532799a188b1","url":"conteudo/instituicoes/UESB.html"},{"revision":"cc3ae1fae6f12e1115694121ecc68c90","url":"conteudo/instituicoes/UESC.html"},{"revision":"e7d88d45265e04852847d5efeb9c6fcb","url":"conteudo/instituicoes/UFBA.html"},{"revision":"db3c82a0a88c91ec142f363c41eaa0fd","url":"conteudo/instituicoes/UFOB.html"},{"revision":"339f35e8195e326cdf54f57998637cd8","url":"conteudo/instituicoes/UFRB.html"},{"revision":"bd9f07fc6e6a55624fef2eb702024324","url":"conteudo/instituicoes/UFSB.html"},{"revision":"e959c3c1026265ab85a64ebab0de1d9e","url":"conteudo/instituicoes/UNEB.html"},{"revision":"307e94970ba513ef13cd71ef2ffde6af","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"2020dd569ad87424d56d4997e8142f36","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"4f29b6dcd628c7e406de93b24715696f","url":"conteudo/sisu/index.html"},{"revision":"1a6a629f985d320e45fa8b9fe620c99c","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"0fa7a0045b495867da977a506f4f8f98","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"60b1567c8f7a222afa0b04c4cb6cedc6","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"97bbecd9395e025a53edf317768edd9a","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"697d36b94747b3bb29df323fcbeb1208","url":"conteudo/sisu/sobre.html"},{"revision":"faaf083a6535408e077c8878fbdf6ebc","url":"conteudo/sobre.html"},{"revision":"e37db80d3dec60b27b656d5e0db9dfc0","url":"conteudo/vocacao/conectando_interesses_e_carreiras.html"},{"revision":"378368a5407be68b574e2e04346626c6","url":"conteudo/vocacao/index.html"},{"revision":"de14e1884d53e1bbe6b2db61a451aadb","url":"conteudo/vocacao/testes_vocacionais.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"25093158c789152db02332ef8c898ccb","url":"index.html"},{"revision":"e6e5e2c312799b3d0b072573a29981f7","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"a0cd65415ba9aed4e7a3e3484f2e22f1","url":"search.json"},{"revision":"4ef6e6f2b11f35b44b7ab77145e4bf4d","url":"site_libs/bootstrap/bootstrap-4ef6e6f2b11f35b44b7ab77145e4bf4d.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"37eea08aefeeee20ff55810ff984fec1","url":"site_libs/quarto-html/quarto-syntax-highlighting-37eea08aefeeee20ff55810ff984fec1.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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