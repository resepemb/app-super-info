importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"1743dc65cf9ef76304aadc39faba640a","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"b3a1c86c6e736bfa2a3406cc4453d562","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"910eb13982864c9a36d9f25b60f001e7","url":"conteudo/atividades/index.html"},{"revision":"2953343f1da085c6ffca51d59d26cf59","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"4eaab256ec4367b6e395503988e2d4c0","url":"conteudo/atividades/monitoria.html"},{"revision":"b4000a9500ba0fe59b9c2f76f498459d","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"0bf7ca085c37ff3b0a3800e711f2a0ce","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"1c74ef0a75dd8a0012eaedf71e4b4d30","url":"conteudo/direitos/index.html"},{"revision":"075220cf5c64cf289f822dedaf903423","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"fee48076e5691380a62507548fcda7e8","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"49a64230af780285dd8bedb472433e38","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"2b3786d420bc3fb7f96c28c187132c66","url":"conteudo/direitos/quais_sao.html"},{"revision":"3f024f6fae0daadb3026417cda746efc","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"3ded43d273b12295b323f3252aa85ed4","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"566dd8b93105c090497486edfedf529a","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"4ba427f2e2d57c1f2a870c4b0eca4513","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"3f34da728a36113672c17529a84f39d4","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"3927ba8ab00ea6c36a7ce4db9391f8ae","url":"conteudo/enem/index.html"},{"revision":"15c8083e806da4a611bbebc2cdd43a76","url":"conteudo/enem/inscricao.html"},{"revision":"baecd77a443771cf25d2288b0e926172","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"a7fafd98b395f8e488e8e8a7ba725a38","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"9533d1bf5201d13b0a747f5a72260422","url":"conteudo/enem/sobre.html"},{"revision":"ee5d12094c10ce4dac3469caa698dd9e","url":"conteudo/instituicoes/IFBA.html"},{"revision":"1bed80f799bf4192eecff12c2a58ab4e","url":"conteudo/instituicoes/index.html"},{"revision":"de062ba0dc930f0a2f3cae4cc2da49f7","url":"conteudo/sisu/index.html"},{"revision":"f66421f177f12b81c65dc043f6222175","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"77561c43ea9fef66c05760dead918173","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"f83aff0f2853263828837f2d2d1cfe43","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"9928b49d2697eb416cb645f74e4f0e4f","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"e28e34e96ddeeb26d7bec16ffef7dfd6","url":"conteudo/sisu/sobre.html"},{"revision":"6ccd8eb9fa9b5c3e7d7321e246c3bd53","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"5118214979cac82700ad8e12199c519f","url":"index.html"},{"revision":"8a5cc2ec170d4e524f4f2b93fb1e87e1","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"1d27cc4e4f900aef7b7760084a728a80","url":"search.json"},{"revision":"4fdd37183d25e77a4a0360c6999c216b","url":"site_libs/bootstrap/bootstrap-4fdd37183d25e77a4a0360c6999c216b.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"2f5df379a58b258e96c21c0638c20c03","url":"site_libs/quarto-html/quarto-syntax-highlighting-2f5df379a58b258e96c21c0638c20c03.css"},{"revision":"b2cce65711e74956eb7b7aa2f4d3943f","url":"site_libs/quarto-html/quarto.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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