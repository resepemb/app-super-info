importScripts('files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"0bf3f6bf121c615a3ed577abb9b273e7","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"cb253d626e04ec5a7302204c84b6c379","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"6d0222a43160aa62aae14576378f6ee0","url":"conteudo/atividades/index.html"},{"revision":"7fbfed73f7e93f86b42200b5352df39e","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"12b2eece09ebbdf8c6f5a735ceb08131","url":"conteudo/atividades/monitoria.html"},{"revision":"8e605737447c6d38fd3ab020650a38e5","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"4abe018c61d9813213dc5c1174e4ee9c","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"cf92a8f0557416d03403f74202e22ade","url":"conteudo/direitos/index.html"},{"revision":"a7aa1ebae508db57b677aaf901c1516e","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"267b4a0d5962b7a6a6301aa43c9319eb","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"93f59c4d5fb35ca83be0fa1ba21e01fa","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"f822c40f994b4f6d833c96890104ee78","url":"conteudo/direitos/quais_sao.html"},{"revision":"6b6b6af60106fd94f1726429532215e9","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"a620cc6b83f372ee813f3071c1cbd666","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"debbfd21ff023186c6cc85b580bb925c","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"15aee22ed24a41aa5d97e9e2d0c45a0d","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"5645d58c3058ba82d1f1123c1f97cdd8","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"137d9fcf5b534cc9f7f847e351988657","url":"conteudo/enem/index.html"},{"revision":"3eff2e1ae90687f3ed632d2840dcd164","url":"conteudo/enem/inscricao.html"},{"revision":"e3a91496faf18a641bb2c538ddafe844","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"da1fc288f496c7d961d3db7330934880","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"c31b6698468ce8d9c7e98edbf5e4a0b8","url":"conteudo/enem/sobre.html"},{"revision":"e2e73bd99a5e5ef5149f6eaf9442e9ed","url":"conteudo/home.html"},{"revision":"31482ae781af274bae21a2346dbeb758","url":"conteudo/sisu/index.html"},{"revision":"91bd22971db12dda7e3de231f82ae8ed","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"43e0e788ccee515435ac72e762ef1304","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"6ffcf9281c9d1bb240fd1604bef0b703","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"a95033887f271888b41ae35bd926c16f","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"2d678e079dba0a1f2aaa0a437322a50e","url":"conteudo/sisu/sobre.html"},{"revision":"37728cd3343a7d417ef073cc4864057b","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"files/scripts/loadserviceworker.js"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"a31d6281342ba9a858b692395fafb9e7","url":"index.html"},{"revision":"46526b2cfe37ae4e0833b0553d53aeba","url":"search.json"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"aadaadf86eaf8d9210f92c019d204443","url":"site_libs/bootstrap/bootstrap.min.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"ab2b9e94a89b131e869fd951d6355545","url":"site_libs/quarto-html/quarto-syntax-highlighting.css"},{"revision":"7563d37e31580c9573af5b12aa3779a2","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"},{"revision":"69724c0f1b005b641aa5b664462dc161","url":"styles.css"}];

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