const visit = require('unist-util-visit');

module.exports = function (options) {
  if (!options || !options.domainRegex || !options.replacement) {
    throw Error('Missing required "domainRegex" or "replacement" option');
  }

  function visitor(node) {
    if (options.domainRegex.test(node.url)) {
      node.url = node.url.replace(options.domainRegex, options.replacement);
    }
  }

  function transform(tree) {
    visit(tree, ['link', 'linkReference'], visitor);
  }

  return transform;
};
