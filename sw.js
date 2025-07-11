importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"602e1083ab66992abf940cd1c67c3eef","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"e4a04c113107237123c53ed2d8582e4e","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"9902b7222360ff587d240005d5700980","url":"conteudo/atividades/index.html"},{"revision":"32c9339bbd60ab7ce12e03a66bed5d22","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"85aae24d80c06c3ec4fc267af5245bdd","url":"conteudo/atividades/monitoria.html"},{"revision":"835bd1f141593f926e7c0d38aa20f759","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"4ec09cb3e0ac987f35b5816acaf2ff81","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"6c27fd32d7bf4ca4b58e80b0a1106460","url":"conteudo/direitos/index.html"},{"revision":"818effd7da4d02bf96597585df514c4e","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"62d03db92dd59c743aff686f26d0f1c9","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"b6ccccf4b037c9c1b15822ece9df0af7","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"f76142b9c990530518e1852d12ee4e72","url":"conteudo/direitos/quais_sao.html"},{"revision":"4da2b66b47f7e2870b258b0f2890b6a0","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"9390eb4feec133bb1fd5a32224224d93","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"7f86b89d225a24f43ab655ad154087ad","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"7c5e3438b58e7269829a2c98a7dcc7d6","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"2b802e3251b827c38aedcdd74aafcf33","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"0187d67c92a26eea6d7dd17f3cc6e721","url":"conteudo/enem/index.html"},{"revision":"e1fb65bdadc8a5b9e319e20c0c20f2c0","url":"conteudo/enem/inscricao.html"},{"revision":"79ba31f8b13c57bbe5ff1f5b8f36fca2","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"7f720df472156ee5e06b424ddb0ce981","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"f637ef731d424ff32f67d7dc8478cfdc","url":"conteudo/enem/sobre.html"},{"revision":"01e7b4182b8e7d6d7b5234f185679770","url":"conteudo/instituicoes/IFBA.html"},{"revision":"0d36c13cba5611842cca2558e5c88616","url":"conteudo/instituicoes/index.html"},{"revision":"a0476f2d73387776db5198d3152aa16e","url":"conteudo/instituicoes/UEFS.html"},{"revision":"86b670221c29f3c23fc9df6fac6f0de8","url":"conteudo/instituicoes/UESB.html"},{"revision":"c53b851b7beb5ffa63ae1ae611087e9b","url":"conteudo/instituicoes/UESC.html"},{"revision":"955acb7a0e120c551f69a949d51597bd","url":"conteudo/instituicoes/UFBA.html"},{"revision":"6fcde5698f40f427eb729b99c75a5ec4","url":"conteudo/instituicoes/UFOB.html"},{"revision":"bf7623036b7307b653c1c816c544881b","url":"conteudo/instituicoes/UFRB.html"},{"revision":"7ee24624d295c0d9e40f3fbd7c609ae0","url":"conteudo/instituicoes/UFSB.html"},{"revision":"d3a1b6f9a8a2ad272253f1a1c06a6318","url":"conteudo/instituicoes/UNEB.html"},{"revision":"f88cf97a85f64a09d142f13155bdca4a","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"d90be3f26aaadfada40061d193858c00","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"f8266611ae0754e76ae705922cb4d7b8","url":"conteudo/sisu/index.html"},{"revision":"fc9ededbc75445cbb8402e2a7419dda3","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"97b8ac42c83ec19f54384735f477e9db","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"0f8f33eed996247dccd4743432aea468","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"261b7674d0d7f393e28203dc96fe5797","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"25fe2f20d7cb633d7bc24761aa4915e2","url":"conteudo/sisu/sobre.html"},{"revision":"9bce2e6b69e49b9ecce8038067a609b1","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"ee3af2dffa5b4a24ba2705b24e2867eb","url":"index.html"},{"revision":"89f716662068a49f64d3c709bd0c57d0","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"5af241cfac0f489653ae92620c9c4421","url":"search.json"},{"revision":"9b2844aa64f89b9d54509e86649d0173","url":"site_libs/bootstrap/bootstrap-9b2844aa64f89b9d54509e86649d0173.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"37eea08aefeeee20ff55810ff984fec1","url":"site_libs/quarto-html/quarto-syntax-highlighting-37eea08aefeeee20ff55810ff984fec1.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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