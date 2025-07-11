importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"2756c705aa0fff832e4f3f8f7fff2407","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"794a087fe37dfbe64ccd4431f3fac818","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"fcaa2d9c7d076cd1ca18375190d1d647","url":"conteudo/atividades/index.html"},{"revision":"d083ee1a01e45070b31353a0ea6fc16c","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"37f55f8e1d768bc6901ff53ac5c8c70a","url":"conteudo/atividades/monitoria.html"},{"revision":"9d493bf2941c463d7253fc37d07cebee","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"3b290132c91619677f324f74d06832fb","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"983a1a111fbe3ad145ace4ded16debfc","url":"conteudo/direitos/index.html"},{"revision":"b4a7189f4dc447e738dd25dde45c81df","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"3880d12af31431d8215a785b2366849c","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"446353a23fa0743a85b8bfdbc8a606fe","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"19dbb9c5564ac43d7dff8f6d97080806","url":"conteudo/direitos/quais_sao.html"},{"revision":"899a412c0cd892a59d1a15231fd23873","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"312c8bcd93388735f5bd82bec93dd5e3","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"38a7132c4821321a2ef8e89d545b6b2f","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"84edfcb8c2b4e8b0ff77a475f73feca9","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"46dece5bb794a1d80df528595bd7cac5","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"11c521f4d0da3cd7ab7f6bf544458a54","url":"conteudo/enem/index.html"},{"revision":"fa679fae6561a0ee86b23ffc55ab9d60","url":"conteudo/enem/inscricao.html"},{"revision":"669c81b5e19a718a31441ee1e0b949f5","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"5bc124f5167e78a4d70f147a9575281e","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"b7dc7400211890a0f442b104bd5c6645","url":"conteudo/enem/sobre.html"},{"revision":"51ea787e9274bd5729569ee371b14188","url":"conteudo/instituicoes/IFBA.html"},{"revision":"0df56476119fb8287b89c3a4dd275d2c","url":"conteudo/instituicoes/index.html"},{"revision":"be02901d5511faa1aacea7780c3cbbee","url":"conteudo/instituicoes/UEFS.html"},{"revision":"dce0da5d95fe771396fe9dfbf0ff06b5","url":"conteudo/instituicoes/UESB.html"},{"revision":"5d999583a76d33c90f131d0dbf5e0f30","url":"conteudo/instituicoes/UESC.html"},{"revision":"4bcb0b629484e16b21f490665e43d89a","url":"conteudo/instituicoes/UFBA.html"},{"revision":"5f6abcb7b7b8ec8eb55484d51e3f53c8","url":"conteudo/instituicoes/UFOB.html"},{"revision":"532ed96fcd1eba80ea1b78c5eccce83a","url":"conteudo/instituicoes/UFRB.html"},{"revision":"33ef879e2d624212c2f69b072bcacfaf","url":"conteudo/instituicoes/UFSB.html"},{"revision":"76f164132137ca9734c08fc1e3362de9","url":"conteudo/instituicoes/UNEB.html"},{"revision":"007efd800cbe7b718cfea2cad7192f6e","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"3088b00930c86ac01ae5d582157d69e0","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"d901bd6da27796e3d1150d90cfb1c814","url":"conteudo/sisu/index.html"},{"revision":"16815b3c988b62c91dfb2d0b01225b7b","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"7b478a1c3e1d168c9332931581004ce0","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"b8a374f85863b10498e364b684d6f58e","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"2eba42109306be5d88e71854b6311394","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"90b7147bb04c191f2279333f02254b24","url":"conteudo/sisu/sobre.html"},{"revision":"b1a06c8cf3be6b32ffd5956e7dd8f1e3","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"456e4db3b6760604f7930cd64fe5c389","url":"index.html"},{"revision":"89f716662068a49f64d3c709bd0c57d0","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"48924d434aaa4968764edc3197baf1e8","url":"search.json"},{"revision":"9b2844aa64f89b9d54509e86649d0173","url":"site_libs/bootstrap/bootstrap-9b2844aa64f89b9d54509e86649d0173.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"37eea08aefeeee20ff55810ff984fec1","url":"site_libs/quarto-html/quarto-syntax-highlighting-37eea08aefeeee20ff55810ff984fec1.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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