importScripts('./files/static/workbox-sw.js');

const { PrecacheController } = workbox.precaching;
const { registerRoute, setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;

const scope = self.registration.scope;

const basePath = new URL(scope).pathname;

// PRECACHE INJECT MANIFEST
var manifestList = [{"revision":"a2834fd45179366cb7b029751b39dba6","url":"conteudo/atividades/eventos_academicos.html"},{"revision":"41e1d2cd8617e019747cf457b1e98b21","url":"conteudo/atividades/grupos_de_pesquisa/iniciacao_cientifica.html"},{"revision":"aae33d564cf032cc785452c393c41591","url":"conteudo/atividades/index.html"},{"revision":"9d38af6dcc4e5791e1b563390d680766","url":"conteudo/atividades/intercambio_academico.html"},{"revision":"59a1d61201c1952062fc7b347b522973","url":"conteudo/atividades/monitoria.html"},{"revision":"a5ee4ef887c0fc9a6e4cc28c573b77f5","url":"conteudo/direitos/ambito_academico/garantia_de_educacao_de_qualidade.html"},{"revision":"aee2b667e1792110c988822e25649bb4","url":"conteudo/direitos/ambito_academico/inclusao_de_pessoas_com_deficiencia.html"},{"revision":"cce926a74d1e19fc81d0c2d9a5805fed","url":"conteudo/direitos/index.html"},{"revision":"74ba736a4de73445e08fe4f2e7ed3714","url":"conteudo/direitos/politicas_de_permanencia_estudantil/alimentacao.html"},{"revision":"76758922e3b726d5a3d1a8f50f1b62f1","url":"conteudo/direitos/politicas_de_permanencia_estudantil/bolsas.html"},{"revision":"5b9bfc2aa783a4e0b4be23ec263520d4","url":"conteudo/direitos/politicas_de_permanencia_estudantil/moradia.html"},{"revision":"76323ac0bf339d5c47c8d3d807a34fd7","url":"conteudo/direitos/quais_sao.html"},{"revision":"0ee6dc541b4ddb119bab1b6e5d2762df","url":"conteudo/direitos/situacoes_de_avaliacao/entrada_de_recursos_academicos.html"},{"revision":"df96043f8352dbf327fb7943cd844b7c","url":"conteudo/direitos/situacoes_de_avaliacao/revisao_de_provas.html"},{"revision":"045ee6623e94f73e89a3fdb9505d2bf1","url":"conteudo/enem/como_funciona/estrutura.html"},{"revision":"e5c6b7aae3c8cff93a839680c3eae8ee","url":"conteudo/enem/como_funciona/tipos_de_questoes.html"},{"revision":"1b733725cbe3c2598305e11ead9437f5","url":"conteudo/enem/como_utilizar_a_nota.html"},{"revision":"a7fc5aa0eb46b745f0412f8ad8955d7d","url":"conteudo/enem/index.html"},{"revision":"c79481214085ddfc295b498440296ea0","url":"conteudo/enem/inscricao.html"},{"revision":"1c93aa2ef43a3f822c2adeeee7d9ffcc","url":"conteudo/enem/o_que_estudar/conteudos.html"},{"revision":"41d43fe1a7606f61e36e3096a7a25989","url":"conteudo/enem/o_que_estudar/dicas_de_preparacao.html"},{"revision":"d16f367f412beaef1912334086b1afa6","url":"conteudo/enem/sobre.html"},{"revision":"6203368c396fa22ba9705720697f92b7","url":"conteudo/instituicoes/IFBA.html"},{"revision":"2be05ee5968d7ae7bf76fb9e5a183d5f","url":"conteudo/instituicoes/index.html"},{"revision":"1f6816b5c891c24ed7f85964a903400e","url":"conteudo/instituicoes/UEFS.html"},{"revision":"33733556c932d2c883dd45cb29298604","url":"conteudo/instituicoes/UESB.html"},{"revision":"70da4e719c9914b92cabe1f2672c0511","url":"conteudo/instituicoes/UESC.html"},{"revision":"c67732e56cdb7c82e362ad5643d03d3f","url":"conteudo/instituicoes/UFBA.html"},{"revision":"25cd562d2e14d8c23dcdc708069abefa","url":"conteudo/instituicoes/UFOB.html"},{"revision":"225a3d36e6376a509614366c7f566a94","url":"conteudo/instituicoes/UFRB.html"},{"revision":"709eb0fdc17b8854eca14530f19091c7","url":"conteudo/instituicoes/UFSB.html"},{"revision":"360895afb0adc9dcab5b90a6cebb639e","url":"conteudo/instituicoes/UNEB.html"},{"revision":"087892ea3a13a0053ca22b6a30733ac4","url":"conteudo/instituicoes/UNILAB.html"},{"revision":"0d72b4e605892af3d370c626a8a44b23","url":"conteudo/instituicoes/UNIVASF.html"},{"revision":"1fe3b67b8ce577c91bf50c75db7829c7","url":"conteudo/sisu/index.html"},{"revision":"dd99859a0833b31e08c599e4b96ed9ce","url":"conteudo/sisu/inscricao/como_se_inscrever.html"},{"revision":"1314a1dfa48cfca9040ddccc1dee0513","url":"conteudo/sisu/inscricao/prazos_importantes.html"},{"revision":"0d391fc0862a8c8dcd46578443f2e728","url":"conteudo/sisu/processo_de_selecao.html"},{"revision":"f7af37c882d536bbf497dca860f78053","url":"conteudo/sisu/quem_pode_participar.html"},{"revision":"3a42901198115990aa218272cc73d708","url":"conteudo/sisu/sobre.html"},{"revision":"5491af516b7cb20ca892dee5b723f3b7","url":"conteudo/sobre.html"},{"revision":"8289b7167a95fef67001923110519349","url":"files/images/app_icon/icon-128x128.png"},{"revision":"8cfc4d51f14ac40f3862dec6ad43cbcc","url":"files/images/app_icon/icon-144x144.png"},{"revision":"e73f914218f34d8419e241e3bed2de2f","url":"files/images/app_icon/icon-152x152.png"},{"revision":"4c57b1ef989850ed44de51a75f45ee84","url":"files/images/app_icon/icon-512x512.png"},{"revision":"1f3547ae1f76d2fa5eba0f7935f6c3ff","url":"files/images/app_icon/icon-96x96.png"},{"revision":"5d391e20efd002d5e73bc7820a1f66eb","url":"files/images/app_icon/icon.jpg"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"e53d4100481d50a48454bf0154db6a37","url":"files/images/participants/CNPq_v2017_rgb.png"},{"revision":"33851bedc20d950b2e05c44a1d4a0b2a","url":"files/images/participants/MARCA_IFBA_CAMPUS_HORIZONTAL_completa_CMYK_SANTO_ANTONIO_JESUS.png"},{"revision":"3e16df47cc6685438b196d3d58062a44","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_CMYK_IFBA.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"files/images/participants/UFRB-Vertical_branca.png"},{"revision":"105174425e35c2976ff4378596860ea1","url":"files/images/participants/UFRB-Vertical_preto.png"},{"revision":"91619961a5b2b34a09b7a73040ad8df6","url":"files/manifest.json"},{"revision":"bdf76cf4aa170e8bf8f1432a02861ca2","url":"files/scripts/toggle_sidebar_script.js"},{"revision":"118b846f304ba516683f83a94ed1c2ea","url":"files/static/workbox-core.dev.js"},{"revision":"bd8c5b515850c5e39e3e07979fce1c10","url":"files/static/workbox-core.prod.js"},{"revision":"a6d05390b35767c20646c98dfea25436","url":"files/static/workbox-precaching.dev.js"},{"revision":"70d4d5998468a1fb07c19121866e9363","url":"files/static/workbox-precaching.prod.js"},{"revision":"9469b821186f34d4ccfe1a60fdfe8b37","url":"files/static/workbox-routing.dev.js"},{"revision":"c4a4d3c0c60f701b4dd99caa5d3a3c3e","url":"files/static/workbox-routing.prod.js"},{"revision":"6dff399d1895c0c37bc4560a0bc38ce1","url":"files/static/workbox-strategies.dev.js"},{"revision":"d3617339c9b98ec1ac9fbcca979a490c","url":"files/static/workbox-strategies.prod.js"},{"revision":"e7d496a517445734d1f52c37b0f24569","url":"files/static/workbox-sw.js"},{"revision":"84ce001c42a6345e1a3095ab024ae43c","url":"index.html"},{"revision":"325e165a5e5c39dec5b38b49456a228e","url":"listings.json"},{"revision":"ac31aa45328da2c88eeb6d915dc9b069","url":"pwa/loadserviceworker.js"},{"revision":"79f6f8652ac76b1db6e55b6c26de1a41","url":"search.json"},{"revision":"0521a3bd08ba11595b2234b38ff7fd9c","url":"site_libs/bootstrap/bootstrap-0521a3bd08ba11595b2234b38ff7fd9c.min.css"},{"revision":"2318f137d201fbf51601fa0faba6bef7","url":"site_libs/bootstrap/bootstrap-icons.css"},{"revision":"e2b09c06f0e714b6144a6788a28e3950","url":"site_libs/bootstrap/bootstrap.min.js"},{"revision":"1d721ce832c187f23c7e849103b493ae","url":"site_libs/bootstrap/files/images/participants/CNPq_v2017_rgb_neg.png"},{"revision":"29736228cf60ffc0812507a66a62aa95","url":"site_libs/bootstrap/files/images/participants/MARCA_IFBA_HORIZONTAL_completa_negativaBRANCA_IFBA.png"},{"revision":"028c42aa46c581ae622c932592ad0bad","url":"site_libs/bootstrap/files/images/participants/UFRB-Vertical_branca.png"},{"revision":"15f52a1ee547f2bdd46e56747332ca2d","url":"site_libs/clipboard/clipboard.min.js"},{"revision":"91bcf6cd1fd88fec3f109811e5fc3546","url":"site_libs/quarto-html/anchor.min.js"},{"revision":"3a4a291ccf3f1ea0f82b641542fd3827","url":"site_libs/quarto-html/popper.min.js"},{"revision":"de070a7b0ab54f8780927367ac907214","url":"site_libs/quarto-html/quarto-syntax-highlighting-de070a7b0ab54f8780927367ac907214.css"},{"revision":"6f4245742deb3cc92337dbe2701ccfe1","url":"site_libs/quarto-html/quarto.js"},{"revision":"e8d6a8862b33ccc461f8fd532e05b365","url":"site_libs/quarto-html/tabsets/tabsets.js"},{"revision":"ebd6f8ce46a677e1a4f5f8a8317109a9","url":"site_libs/quarto-html/tippy.css"},{"revision":"d828775275749701b48bd9d958814111","url":"site_libs/quarto-html/tippy.umd.min.js"},{"revision":"717c95813ddfc3d41e98c26642fc1372","url":"site_libs/quarto-html/zenscroll-min.js"},{"revision":"d9fe78988e4cf7a26ac9e06aca9ce679","url":"site_libs/quarto-listing/list.min.js"},{"revision":"919f171782f2658435097266e834d316","url":"site_libs/quarto-listing/quarto-listing.js"},{"revision":"ace0360e576db9b6e7df48ac68ddbbf4","url":"site_libs/quarto-nav/headroom.min.js"},{"revision":"12d334846b27bdb493298c08277bdf7f","url":"site_libs/quarto-nav/quarto-nav.js"},{"revision":"18a7c9f39c1a1b82b4f0b1c72d5f6c0d","url":"site_libs/quarto-ojs/quarto-ojs-runtime.js"},{"revision":"8645f556f692a33c4645eeb25d3d4122","url":"site_libs/quarto-ojs/quarto-ojs.css"},{"revision":"c64544db941e048f2652217cb9a7f29c","url":"site_libs/quarto-search/autocomplete.umd.js"},{"revision":"de7d60e4a6881074275feca14b84a49d","url":"site_libs/quarto-search/fuse.min.js"},{"revision":"bb16b7e73be13eba97c99d25b2a476b3","url":"site_libs/quarto-search/quarto-search.js"}];

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