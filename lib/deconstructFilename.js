module.exports = function deconstructFilename (filename) {
  const slug = filename.split('.')[0]
  return { filename, slug }
}
