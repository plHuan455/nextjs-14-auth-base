/* eslint-disable */
function generateUnPublishExtensionList(originExt, isUnPublish, unPublishExtList) {
  if (isUnPublish) {
    return unPublishExtList.reduce((acc, curExt) => [...acc, `${curExt}\.${originExt}`], [originExt])
  }
  return `(?<!${unPublishExtList.join("|")}\.)${originExt}`
}

function getPageExtensions() {
  const isUnPublishEnv = ["local", "staging"].includes(process.env.APP_ENV)
  return ["ts", "tsx", "js", "jsx"]
    .map((extension) => {
      const unPublishExtensionList = ["draft"]
      return generateUnPublishExtensionList(extension, isUnPublishEnv, unPublishExtensionList)
    })
    .flat()
}

module.exports = {
  getPageExtensions,
  generateUnPublishExtensionList,
}
