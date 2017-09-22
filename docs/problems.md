### PROBLEMS FOUND WHILE INTEGRATING CARTODB.JS

1. Need to set a `tpl-loader`.

2. When `npm linked` we need to add its `node_modules` to the webpack config.

3. Dependency `carto` uses `fs`. That's not possible in browser. (`/carto/lib/carto/index.js 2:9-22`).

    It's fixed via `node` property in Webpack config but perhaps it breaks something.

4. `jQuery` is a global dependency for `mousewheel`.

    The console error is fixed by adding the correspondant `providePlugin` to webpack config. Since I haven't installed jQuery as a dependency I don't know it will work.

5. `wax` also throws an error. `leaflet-cartodb-layer-group-view` relies on it being global.

   The fix is to user `shim-loader` in webpack config.

6. Same happens with `htmlCssSanitizer`. The fix is the same as the one used with `wax`.

7. At this point, the map doesn't render properly.

8. `cartodb.css` is a requirement. Without it, the map doesn't work.
    We should find a way to build and inject it automatically when using the library so we skip the step of having to build the CSS and add it in the host HTML.
