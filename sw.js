importScripts('files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"6192c59e30bd5cf6718fc28face66746","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"f7050caa0b67ff75c691a8c0eb87695c","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"3291a492978ef239eb2ae5d807dc3aea","url":"conteudo/atividades/index.html"},{"revision":"4aa2bd641975820788b3fd00f4c3c90b","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"bf05f882d28852a0daf1f7c343aa6061","url":"conteudo/atividades/monitoria.html"},{"revision":"056c4129e88cd5ed8d5753f3a5ef8bc4","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"03b3aa22f9d21712d695b16f16198e99","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"f7a5eba5ff1bc723d870950dc973b94a","url":"conteudo/direitos/index.html"},{"revision":"fd81604936c4991ec441178dbc50fa63","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"9d097dd2a4e66984ee2c3a0963c937e2","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"5279d2450c199762c553eb2e04a94661","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"f59dbd7691a6a0e8dd1187b406f689de","url":"conteudo/direitos/quais_sao.html"},{"revision":"864dc00440f265e47f1f398768ab7c92","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"25d06a15bc24b2c490fd516404892de5","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"e297ded7f7ab2f7fd0c53ce9931d1a41","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"7614247b878f8875d24b9d69d1d63de9","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"2e711f878ab9229e92be31bac62ac7cc","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"9bd661fea1ae51f2ec0221f0ff1667ab","url":"conteudo/enem/index.html"},{"revision":"c155e1c0878a3ad3314a40be9020c21c","url":"conteudo/enem/inscricao.html"},{"revision":"27f4fe045e611a3660a49c77ad319919","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"c8ec8f7bef943a95838a165955a3a84e","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"bde163fc6868bee69b962b7d19063756","url":"conteudo/enem/sobre.html"},{"revision":"28e638a66c7115b8de0ee285c1c0dac2","url":"conteudo/home.html"},{"revision":"07f16ef8866bb71a0616f8455eb74d3f","url":"conteudo/sisu/index.html"},{"revision":"3476e9496a428e4a9d1321852a1a5c90","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"1639d47d1637cb8cf94587d81b4b7c1d","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"d66cac6fc78ade41eca71ceb0ee4c96f","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"78d52b1b8ab0dc47d780f90889cb2d92","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"872b22a624216ca964a0f62208e78774","url":"conteudo/sisu/sobre.html"},{"revision":"44d612965b67ccc6d473c7681f478372","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"files/scripts/loadserviceworker.js"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"a31d6281342ba9a858b692395fafb9e7","url":"index.html"},{"revision":"699a4a843ca003b55238cd9b9f291633","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"93c6d1dcc1f0fb99d6c3c18027f87cca","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"},{"revision":"69724c0f1b005b641aa5b664462dc161","url":"styles.css"}];

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