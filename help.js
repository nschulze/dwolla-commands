'use strict'

const fs = require('fs')
const path = require('path')
const docsPath = path.resolve(__dirname, 'docs')
const devHelp = path.join(docsPath, 'dev-help.json')

module.exports = (pluginContext) => {
  return (search, env = {}) => {
    if (search.trim() === '') {
      let data = fs.readFileSync(devHelp)
      let json = JSON.parse(data)
      var topics
      topics = [{
        icon: 'fa-laptop',
        title: 'Looking for something?',
        subtitle: 'Search one of the following topics:'
      }]
      for (var k in json) {
        topics.push(
          {
            icon: 'fa-question-circle',
            title: `${k}`,
            subtitle: `commands ${k} {topic}`,
          })
      }
      return new Promise((resolve, reject) => {
        resolve(topics)
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
}
