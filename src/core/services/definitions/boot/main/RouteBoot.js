import Path from 'path';
import _ from 'lodash';

const {
  Boot,
} = requireF('core/services/EventsDecorator');

const {
  globSyncMultiple,
} = requireF('core/services/CommonServices');

@Boot('main')
class RouteBoot { // eslint-disable-line no-unused-vars
  boot = () => {
    // retrieve all available routes, pass all models from Sequelize as a single parameter
    const allRoutes = this.resolveRoutes();
    server.route(allRoutes);
  };

  resolveRoutes = () => {
    const routesGlobs = [
      Path.join(rootPath, 'core/components/**/*.routes.js'),
      Path.join(rootPath, 'main/components/**/*.routes.js'),
    ];

    // retrieve all available routes
    const routesComponent = globSyncMultiple(routesGlobs);

    // merge all routes in an array
    const allRoutes = [];
    _.each(routesComponent, (filePath) => {
      const routes = require(filePath);
      allRoutes.push(...routes);
    });

    return allRoutes;
  }
}
