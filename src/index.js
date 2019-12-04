const visit = require('unist-util-visit');

module.exports = function (options) {
  if (!options || !options.regex) {
    throw Error('Missing required "regex"');
  }

  function visitor(node) {
    if (options.regex.test(node.url)) {
      node.url = node.url.replace(options.regex, options.replacement);
    }
  }

  function transform(tree) {
    visit(tree, ['link', 'linkReference'], visitor);
  }

  return transform;
};
