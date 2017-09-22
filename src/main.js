const cdb = require('cartodb.js');
const vizjsonUrl = 'https://busta14.carto-staging.com/api/v3/viz/8e253244-43bd-4830-bb07-680e9dc1f357/viz.json';

const createVis = () => {
  cdb.createVis('map', vizjsonUrl)
    .done((visModel) => {
      const node = visModel.analysis.findNodeById('a0');

      window.vis = visModel;


    });
};

window.onload = createVis;
