importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"1c34419a6b8b7005f9bed477ddd6ced3","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"836dd609e2593223bdc87ff6e5de07b2","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"3b515cf0a98ee2f585c5f80a9743278e","url":"conteudo/atividades/index.html"},{"revision":"5e553e581088c101c289c06c9bc1fc17","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"5a0c691a115b81641018ca650936cd80","url":"conteudo/atividades/monitoria.html"},{"revision":"7952d92c85107f65e83f0ac4374c506f","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"edcd235cd2cb474cc36fb495846e2c83","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"fcf4a5a71517d46164afb8697b66a4ce","url":"conteudo/direitos/index.html"},{"revision":"6463c2d761a42564aca48b0e2fa47573","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"9bd3c41791cde07f49ebe0f739059521","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"77f16674139ce78eec1c5c4d711492a3","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"cf09a2f7c6e0ee7259826d03ff31de59","url":"conteudo/direitos/quais_sao.html"},{"revision":"a875ba888af8e40b94cbc0aeeddbe79b","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"13091347843078a285c1c6544168526a","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"f0a3db035fd481e201868f3dbc45c1ac","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"94debfd8bc511f2435ff349317cfd926","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"c9fe2424515de4fec3d7ec17e9b1a0aa","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"837d31e4be3a503f61bebc771186332b","url":"conteudo/enem/index.html"},{"revision":"e33c50b84afc3eb887eab6e8c111161c","url":"conteudo/enem/inscricao.html"},{"revision":"4b2b12c9eb73067ab2669b9108fc5e01","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"4185fb27bd7767b8a34e13c4cc55afd5","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"9f6eddf728f839ba4bbb3d04478daf97","url":"conteudo/enem/sobre.html"},{"revision":"3f9012a1258f68798ed25071f5883552","url":"conteudo/instituicoes/IFBA.html"},{"revision":"4420c6fdb7aec858829e17d570f730a0","url":"conteudo/instituicoes/index.html"},{"revision":"66fd5ac8505c859bf14df4b4a8c5ec93","url":"conteudo/instituicoes/UEFS.html"},{"revision":"b20764099bac9a75f9363a0a9e8bbce5","url":"conteudo/instituicoes/UESB.html"},{"revision":"e98c2e393900e0ec6ea2e1c02123296b","url":"conteudo/instituicoes/UESC.html"},{"revision":"377dbcfee6a693c92541ced65fa8aac7","url":"conteudo/instituicoes/UFBA.html"},{"revision":"c426c9baf62a1a1253e7a4ddcb54c60c","url":"conteudo/instituicoes/UFOB.html"},{"revision":"797930a185f38a60c67a6b1ed44d3b4b","url":"conteudo/instituicoes/UFRB.html"},{"revision":"6fe6be3407bc680a275ca219e6fbaf08","url":"conteudo/instituicoes/UFSB.html"},{"revision":"1f9749f49d461ba955a61904ff872a2d","url":"conteudo/instituicoes/UNEB.html"},{"revision":"5da1699a9e4aa7e1d558d26f5a626516","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"f816b4a9cdddcc6520f5b3e62403bcda","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"8b1bffbf6575ba67b01c6ce753cfc13a","url":"conteudo/sisu/index.html"},{"revision":"8a2447880c2afdf1ff24da7864a20fe1","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"41d317b1bd209fcfd5e9af72f0536338","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"200efa55bb96d47fbb84e30126f39556","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"0dc9cbbae6c7c259ce44d7f31cd5ce7d","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"0879d6d594638a6fbcc11e0056db679d","url":"conteudo/sisu/sobre.html"},{"revision":"b3c5ec5eae336fb231c384552cdcc9cd","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"ecd47d5ea4be73a1c8af315ce3263801","url":"index.html"},{"revision":"325e165a5e5c39dec5b38b49456a228e","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"e22ab913035c7d45a01875da39f50aec","url":"search.json"},{"revision":"b074ab307bb5b3d1a648fa55c9811a43","url":"site_libs/bootstrap/bootstrap-b074ab307bb5b3d1a648fa55c9811a43.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"de070a7b0ab54f8780927367ac907214","url":"site_libs/quarto-html/quarto-syntax-highlighting-de070a7b0ab54f8780927367ac907214.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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