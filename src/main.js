const cdb = require('cartodb.js');
const vizjsonUrl = 'http://grossomodo.localhost.lan:3000/u/ivan/api/v3/viz/3fa14720-d5ac-48ff-b343-e4925d54493d/viz.json';

const createVis = () => {
  cdb.createVis('map', vizjsonUrl)
    .done((visModel) => {
      console.log('> callback del createVis');

      visModel.once('reloaded', function (vis) {
        const node = visModel.analysis.findNodeById('a0');

        const categoryDataview = visModel.dataviews.createCategoryModel({
          column: 'neighbourhood',
          source: node
        });

        var neighbourhoodFilter = new cdb.core.filters.CategoryFilter({
          analysis: node,
          column: 'neighbourhood'
        });
        neighbourhoodFilter.accept(['Palacio', 'Vallehermoso']);

        var priceFilter = new cdb.core.filters.RangeFilter({
          analysis: node,
          column: 'price'
        });
        priceFilter.setRange(30, 50);

        window.barrio = neighbourhoodFilter;
        window.precio = priceFilter;
        window.vis = visModel;
      });

    });
};

window.onload = createVis;
