import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
})
// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

md.linkify.add('@', {
  validate: (text: string, pos: number, self) => {
    const tail = text.slice(pos)
    if (!self.re.twitter) {
      self.re.twitter = new RegExp(
        '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
      )
    }
    if (self.re.twitter.test(tail)) {
      if (pos >= 2 && tail[pos - 2] === '@') return false
      return tail.match(self.re.twitter)[0].length
    }
    return 0
  },
  normalize: (match) => {
    match.url = 'http://localhost:3000/' + match.url
  },
})
export default md
