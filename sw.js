importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"b44240627b12982ecea8ac502d54404d","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"a29c78ef4b212bad51543d09a338a323","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"a4aa2b8f7c36fff4008f8c569dfd261a","url":"conteudo/atividades/index.html"},{"revision":"73f81234405fda43549e84fc08101b05","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"2b32481b650de566e4f65833e4bcdf5a","url":"conteudo/atividades/monitoria.html"},{"revision":"d760591a0b3b25305c4b2cbada512925","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"4e346298c2dfdd1cd7f2f32bc9038bc5","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"4fa93ba58f414a1b97aba22b59e1a3fe","url":"conteudo/direitos/index.html"},{"revision":"5aa2b5b93e4e2cdf0371df11a52ce28f","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"6919d9a7a85abbf08a4d24112b5b5eed","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"e40c88dc85246e36ca609006c86be94c","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"e02bad550e4997f282f2059040f96134","url":"conteudo/direitos/quais_sao.html"},{"revision":"ee82ef24c3c475172e06695044e788a1","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"8af1082c6044cffb60108df4e705be80","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"6b30e82eaede61b90fc3f561f68b40ad","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"3cb8de310db94142c188564f02d1acab","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"299a238911bb3a4274fb88a41f7f8ebf","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"43ba8f02024be840d30c0f24b1f06dee","url":"conteudo/enem/index.html"},{"revision":"7b826a1b997aa2b1c324f830c83d9038","url":"conteudo/enem/inscricao.html"},{"revision":"06868981ba97b79c10e8a1558b91c2f7","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"b37aedc35401e214a18297e80ff56a42","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"8a4dc6abdf3cdfdb40ae791531dc688b","url":"conteudo/enem/sobre.html"},{"revision":"bb79fc5876a15fa5599b4277e7ec7fba","url":"conteudo/instituicoes/IFBA.html"},{"revision":"ab0abddd89164cf2667611af3ecb1f1d","url":"conteudo/instituicoes/index.html"},{"revision":"e824e79294ab22aa9c6ac50eb06c8cd8","url":"conteudo/instituicoes/UEFS.html"},{"revision":"37272bee80072eae07baf37fcea8ee94","url":"conteudo/instituicoes/UESB.html"},{"revision":"559ff97009dddf582d1ebc8f04ed4a5a","url":"conteudo/instituicoes/UESC.html"},{"revision":"ad5dc4cce06744cbe2851972157a74d1","url":"conteudo/instituicoes/UFBA.html"},{"revision":"dd4ef1217b4dadffba6178c1303236a9","url":"conteudo/instituicoes/UFOB.html"},{"revision":"7f2debaedb5663416e33a14d4a766e05","url":"conteudo/instituicoes/UFRB.html"},{"revision":"f6dd110ac5721d82e60c5c8d383e471f","url":"conteudo/instituicoes/UFSB.html"},{"revision":"614a9e0386baf70fc1d34a53e4c05c94","url":"conteudo/instituicoes/UNEB.html"},{"revision":"3b79c414c6367987bf1f9366a694ebd3","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"bb7209a18ffa69a8efbb58fd0b66efdf","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"9ebe891978d303c4de9e116e346cc5da","url":"conteudo/sisu/index.html"},{"revision":"6a2fd4cb8e1d904d212abb92a2845715","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"132cd0e07d6a35bc8a2a4b65eae05317","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"69b9ee04bca00ed60c96c9528bbdf821","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"236b66d69a8f70d4da6b620ace544019","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"78a4c99c8b0f77509cca6c313a4833a0","url":"conteudo/sisu/sobre.html"},{"revision":"9f8e3efd88f488ad3868156e8897b0f9","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"773bf16bb0a78e170151bed92a8ef7f2","url":"index.html"},{"revision":"89f716662068a49f64d3c709bd0c57d0","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"48924d434aaa4968764edc3197baf1e8","url":"search.json"},{"revision":"9b2844aa64f89b9d54509e86649d0173","url":"site_libs/bootstrap/bootstrap-9b2844aa64f89b9d54509e86649d0173.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"37eea08aefeeee20ff55810ff984fec1","url":"site_libs/quarto-html/quarto-syntax-highlighting-37eea08aefeeee20ff55810ff984fec1.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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