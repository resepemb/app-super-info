import * as workboxBuild  from 'workbox-build';


workboxBuild.injectManifest({
  globDirectory: '_site',
  globPatterns: [
    '**/*.{html,js,json,css,png,jpg,jpeg,gif,svg,eot,ttf}',
    // SINGLE FILES AND FOLDERS EXAMPLE
    // 'index.html',
    // 'search.json',
    // 'styles.css',
    // 'conteudo/**/*.{html,js,css,png,jpg,jpeg,gif,svg,eot,ttf,woff,woff2}',
    // 'files/**/*.{js,json,css,png,jpg,jpeg,gif,svg,eot,ttf,woff,woff2}',
  ],
  //   maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
  swDest: '_site/sw.js',
  swSrc: '_site/sw.js',
}).then(({count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while injecting the manifest:',
      warnings.join('\n')
    );
  }

  console.log(`Injected a manifest which will precache ${count} files with revision, totaling ${(size / 1000/ 1000)} MB.`);
});


