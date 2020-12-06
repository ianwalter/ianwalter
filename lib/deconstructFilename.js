module.exports = function deconstructFilename (filename) {
  const file = filename.split('.')[0]
  const slug = file.split('~')[1]
  return { filename, file, slug }
}
