'use strict'

const fs = require('fs')
const path = require('path')
const docsPath = path.resolve(__dirname, 'docs')
const devHelp = path.join(docsPath, 'dev-help.json')

module.exports = (pluginContext) => {
  return (search, env = {}) => {
    let data = fs.readFileSync(devHelp)
    let json = JSON.parse(data)
    var keys = []
    for (var k in json) keys.push(k)

    let searchArray = search.split(' ')

    var hints = []
    if (keys.includes(searchArray[0])) {
      var topic = searchArray[0]
      for (var h in json[topic]) {
        hints.push({
          icon: 'fa-terminal',
          title: h,
          subtitle: json[topic][h],
          value: json[topic][h],
        })
      }
    } else {
      hints.push({
        icon: 'fa-question-circle',
        title: search,
        subtitle: `Nothing found for ${search}.`,
      })
    }
    return new Promise((resolve, reject) => {
      resolve(hints)
    })
  }
}
