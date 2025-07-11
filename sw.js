importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"dae590f75070d1f1c1ff67e638ed962b","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"b4817036ff49e9af71fe801dde3f9a01","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"ea75c41da91fb500abcd13539158c6ca","url":"conteudo/atividades/index.html"},{"revision":"8e9bc0cfd3635695237eb86696d005b8","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"6a8cb10996d6cee9c5512a85aa8bb104","url":"conteudo/atividades/monitoria.html"},{"revision":"d128b46e6851c225fc84283040999015","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"088742ff25cbb4fa65e02db83d915f22","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"703f42126a6eb526fc805b0ed2bb055c","url":"conteudo/direitos/index.html"},{"revision":"93d4c454f5affc71686f06798a0a2716","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"072301be5b0181e90787ed74b18f8363","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"3d58d01c0e5f05506c76930d3f3737c9","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"2f64f345977ebe226b5c84a9f1daa116","url":"conteudo/direitos/quais_sao.html"},{"revision":"7382b4d9683c3ee77e757074a59d4230","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"104829c410b07fef6843571b3c8e708d","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"c898330894ae09190962873936f625b0","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"ec5c2cc6ea64a9ee2c543361557b8ae8","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"9d1e2a0204908809f606b616d05654c6","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"0762ec241fc964f476288e27d34df07f","url":"conteudo/enem/index.html"},{"revision":"2c781a4becd44e90ed1edd65c104eb8b","url":"conteudo/enem/inscricao.html"},{"revision":"0170c78b0ffbcef2896d936df19f3fc1","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"804f231a96c0277fc3cef2e7ae1c6c8f","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"2c2b694783d984ea1c137c8d9687f1f7","url":"conteudo/enem/sobre.html"},{"revision":"52f8cb45b002d17e2b3e9834fe7142ab","url":"conteudo/instituicoes/IFBA.html"},{"revision":"f5cb49f56cdeb397fa3f41bdac2d670b","url":"conteudo/instituicoes/index.html"},{"revision":"b8c2f21fe5d8c629d3f4dd6b03b12759","url":"conteudo/instituicoes/UEFS.html"},{"revision":"dd8abde0b631d33d95f4d245e9855344","url":"conteudo/instituicoes/UESB.html"},{"revision":"6b16ad8bfe738a6e51fd613092ce3cde","url":"conteudo/instituicoes/UESC.html"},{"revision":"84d81f67d1f9fd49563548b39840dce5","url":"conteudo/instituicoes/UFBA.html"},{"revision":"f477a7f6514b11ad08d15054dd9a1954","url":"conteudo/instituicoes/UFOB.html"},{"revision":"62b158a86672818434ebe0f377a31c33","url":"conteudo/instituicoes/UFRB.html"},{"revision":"5466163cb4e84854dc59b0e98e204445","url":"conteudo/instituicoes/UFSB.html"},{"revision":"31e42c7ef72b1ea335026dbfb8edbcf0","url":"conteudo/instituicoes/UNEB.html"},{"revision":"131f26cb05a7835e876650858b5c9941","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"c0977a53eb9a34e1cfdd8980d967b93f","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"19f666eaafb7dc4f7ff232514ad33840","url":"conteudo/sisu/index.html"},{"revision":"dde2970b803199ce04a05c2d32b08de9","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"91393b2af51e33394ee6c885a8d6e5c2","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"74d4d54cab9ea82faaf4c47924a998f5","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"d025ba9f549650db762018c20b415b33","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"5466a7d21e318e9f76f1cb4b9213b375","url":"conteudo/sisu/sobre.html"},{"revision":"7c926b1f9b491e1fb571a73306673a7d","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"a4209909474778e12dd4446796e15bd4","url":"index.html"},{"revision":"89f716662068a49f64d3c709bd0c57d0","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"48924d434aaa4968764edc3197baf1e8","url":"search.json"},{"revision":"9b2844aa64f89b9d54509e86649d0173","url":"site_libs/bootstrap/bootstrap-9b2844aa64f89b9d54509e86649d0173.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"37eea08aefeeee20ff55810ff984fec1","url":"site_libs/quarto-html/quarto-syntax-highlighting-37eea08aefeeee20ff55810ff984fec1.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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