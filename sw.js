importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"84fadf91a8cf4d0373af3442d9764046","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"c2b59b14e8f64541080e0a64dc2e95ee","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"e7ca65ac07e32e8df9079cb49dd61973","url":"conteudo/atividades/index.html"},{"revision":"9ff65468656e8f3a5d9e35462d4c087e","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"245cf1425065ad7b362de4a569b248c1","url":"conteudo/atividades/monitoria.html"},{"revision":"3032a52f480a9fef22002a50cd086590","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"ac69187c68845ce47902bea7ce8b8556","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"6f1955cca55b54b7edc808830cbf26eb","url":"conteudo/direitos/index.html"},{"revision":"36749c54c73835f7a044cd0df5f56476","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"f43dbfb3fb4b3513c4de723acda96990","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"d0172765ec02d8c3d1ff06d2dc36028d","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"ff178ebd71d7636367c1ad0fa3de4a2f","url":"conteudo/direitos/quais_sao.html"},{"revision":"10c6324656491147cd00fb8f92e22401","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"a773583b6e9ff12806e071131ac0b41c","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"e1ff18dc5034316e99ab5ecdc11b16c1","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"5d4c5beade1b1ac2728cb8beff630e9c","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"b3a75c4aeac12809ce4eeafe7f2e0e55","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"09f48b8c2ad422f38d85a2b309e3de9d","url":"conteudo/enem/index.html"},{"revision":"04217182db42d38abc5599eafbb7826d","url":"conteudo/enem/inscricao.html"},{"revision":"84b5fe71236705bd39e318dab66d3453","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"ff7a9ccb439d7f34aa9288abba6e339e","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"866b5849be645ee8674ea75f3e15710b","url":"conteudo/enem/sobre.html"},{"revision":"3ee01252e6efdb9fd2fbcbfa090fdf1f","url":"conteudo/instituicoes/IFBA.html"},{"revision":"71685a1eaa5e7a97f1bfd9c5842b0613","url":"conteudo/instituicoes/index.html"},{"revision":"0eb7a8eba3abb3df1ffce5c20b0f60e3","url":"conteudo/instituicoes/UEFS.html"},{"revision":"4c24ae959fd8df6cf767758539144fe8","url":"conteudo/instituicoes/UESB.html"},{"revision":"c4b6be1218d26dd513f3a92aa651fca4","url":"conteudo/instituicoes/UESC.html"},{"revision":"3217b0f09d17f77169ce8e91d7db8492","url":"conteudo/instituicoes/UFBA.html"},{"revision":"cf440df32cb92924896ee3135bce873f","url":"conteudo/instituicoes/UFOB.html"},{"revision":"d81b1f2483aaa307c875706d5e243ed2","url":"conteudo/instituicoes/UFRB.html"},{"revision":"7c8696b6ed37265e712548f7513fa3a9","url":"conteudo/instituicoes/UFSB.html"},{"revision":"46b2c05fef1e6c04521bf5523c779494","url":"conteudo/instituicoes/UNEB.html"},{"revision":"061298ad0cfea546b166d575051b7a74","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"0a7816cc1f2a7c3d718e3648dcb41d43","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"adc5f487aaf63375d4dbd1496907f243","url":"conteudo/sisu/index.html"},{"revision":"385bb2cd3207583b52dcdd7ddcace381","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"c90d00c4a22f18ed9f67f603c2846f79","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"e10909a3b1f19511cb3d2a3632a4cc78","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"5605db0195a70ef840eba6ff0e465cd5","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"3525f75025001f7d75cd08c8b417e835","url":"conteudo/sisu/sobre.html"},{"revision":"53a72d33de9910bdd97d802f6aab803e","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"54c9e64134b3a0037f613e857632225b","url":"index.html"},{"revision":"5e5ab89e128eebf55dc53525efbb31c3","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"1c916171f2d4c8c92344c36f93d32ac5","url":"search.json"},{"revision":"355b724007486f3360d76b6e95d8b02e","url":"site_libs/bootstrap/bootstrap-355b724007486f3360d76b6e95d8b02e.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"e1a5c8363afafaef2c763b6775fbf3ca","url":"site_libs/quarto-html/quarto-syntax-highlighting-e1a5c8363afafaef2c763b6775fbf3ca.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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