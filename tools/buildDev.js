import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import colors from 'colors';

process.env.NODE_ENV = 'development';
console.log('Generating minified bundle for development via Webpack...'.blue);

webpack(webpackConfig).run((err, stats) => {  
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled in development mode and written to /dist.'.green);

  return 0;
});