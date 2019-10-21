'use strict';

const maps = ['qCol'];

function index({ types: t }) {
  return {
    visitor: {
      ImportDeclaration: {
        enter(path) {
          const module = path.node.source.value;
          if (module !== 'vueq-mobile-ui') {
            return;
          }
          const chunks = path.node.specifiers;
          if (!chunks.length) {
            return;
          }
          const onlyDefault =
            chunks.length === 1 &&
            chunks.some(v => t.isImportDefaultSpecifier(v));
          const components = [];
          const styles = [];
          chunks.forEach(v => {
            if (t.isImportDefaultSpecifier(v)) {
              return path;
            }
            const importedName = v.imported.name;
            const component = t.importDefaultSpecifier(
              t.identifier(importedName)
            );
            const componentLazy = t.importDeclaration(
              [component],
              t.stringLiteral(`${module}/dist/packages/${importedName}.js`)
            );
            if (!maps.includes(importedName)) {
              const styleLazy = t.importDeclaration(
                [],
                t.stringLiteral(`${module}/dist/css/${importedName}.css`)
              );
              styles.push(styleLazy);
            }
            components.push(componentLazy);
          });
          if (!onlyDefault) {
            styles.length > 0
              ? path.replaceWithMultiple([...components, ...styles])
              : path.replaceWithMultiple([...components]);
          }
        }
      }
    }
  };
}

module.exports = index;
