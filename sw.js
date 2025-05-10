importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"52a8880734b6f83f16326088f401722e","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"d53505158e0f1b1b547c9392a9d532d1","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"7246cd5c716e22a145f5f98593ee5c28","url":"conteudo/atividades/index.html"},{"revision":"ef2136f840c4e6b59713619c978a084a","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"4d9185d5a83cf399c9aa8cc7ee8235ba","url":"conteudo/atividades/monitoria.html"},{"revision":"3fe3f21e25b8720bf5de0c321848d0c9","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"a8e25884804398ae7747ba4c92244639","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"e660a61536e3193f0c8f4c2ed44006b9","url":"conteudo/direitos/index.html"},{"revision":"9fbe110e940877e0806dd5228fd2f1a8","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"bb302069a108293fed1640b2ec268bde","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"77ae1468321086b8054289a1d10ea5d3","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"fd7a3fad67a7b0b4e10095d3fb468ee7","url":"conteudo/direitos/quais_sao.html"},{"revision":"f024dc52866eb7813bc273a6dd90cb36","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"84f96d4c1c419418275ae43bbcc1920e","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"c0c8321311c38ee5bb63d0b96bc5d235","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"532a76431cdc060b2d70cfdf81061dec","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"193ff832a1dce5abab76a9df16b398b5","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"9031cdc69a0e172ef9b29c753ce3b7f7","url":"conteudo/enem/index.html"},{"revision":"c45821e505573b43a39cc1d3dea6891c","url":"conteudo/enem/inscricao.html"},{"revision":"446555d24cdec45e285f27827b5772d8","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"212a528c526fb299f5a899e11e9bfe0e","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"9cb1d93a7bb8e9e826fc65b8cb293e40","url":"conteudo/enem/sobre.html"},{"revision":"7ed92b97e5cdf4b8a00cb4ec76cb8086","url":"conteudo/instituicoes/IFBA.html"},{"revision":"9a0fc68a5f26e72183277923380a1ce6","url":"conteudo/instituicoes/index.html"},{"revision":"e93a541d8a09e074af976a4e77471ef9","url":"conteudo/instituicoes/UEFS.html"},{"revision":"052638e44e2f25e1798be329134c95a2","url":"conteudo/instituicoes/UESB.html"},{"revision":"84fc27a51be30b2a49db4392c802e179","url":"conteudo/instituicoes/UESC.html"},{"revision":"dd711104befc83f4cda9a6c25d057ff6","url":"conteudo/instituicoes/UFBA.html"},{"revision":"5458672981ff8c3c90a280af90b8f24b","url":"conteudo/instituicoes/UFOB.html"},{"revision":"4b21e8a245546b59b8bacf918025206e","url":"conteudo/instituicoes/UFRB.html"},{"revision":"c1793a053c8d555a8a3892197c6c4eae","url":"conteudo/instituicoes/UFSB.html"},{"revision":"00652524b55febda5022c11bcc6071b1","url":"conteudo/instituicoes/UNEB.html"},{"revision":"50c1d303840b9ac323eacc2e10ac6396","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"96d6afe35b07b310382f18cc2f3bd8db","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"b76bb277188d022ac7a7be906b97268c","url":"conteudo/sisu/index.html"},{"revision":"9d10483c8c88b01c80c94879ef57b189","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"b2cdc1ab41f2d40b010c60efc6ebf15e","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"9c78fc0dc68b7ab861e2cf2b88df4aa3","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"feb0f8988eab7a3d4669d969373cd8f4","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"556bc2b6e7e0b4e48576b0c56eff1201","url":"conteudo/sisu/sobre.html"},{"revision":"63bd3e6ffe62cb136201c918313378ba","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"3f5184753674a797f6ec59ae0765d984","url":"index.html"},{"revision":"86413083ef2b968cc2b869c37e2fc68d","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"ff24ad4f8c6858073584d2810593e154","url":"search.json"},{"revision":"b074ab307bb5b3d1a648fa55c9811a43","url":"site_libs/bootstrap/bootstrap-b074ab307bb5b3d1a648fa55c9811a43.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"de070a7b0ab54f8780927367ac907214","url":"site_libs/quarto-html/quarto-syntax-highlighting-de070a7b0ab54f8780927367ac907214.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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