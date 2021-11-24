import inflection from 'inflection'

const useBasePathHelper = (path, id) => {
    const camelized = inflection.camelize(path)

    const generatedPaths = {}

    generatedPaths[`index${camelized}Path`] = `/${path}`

    generatedPaths[`new${camelized}Path`] = `/${path}/new`
    generatedPaths[`create${camelized}Path`] = `/${path}`

    if (id) generatedPaths[`show${camelized}Path`] = `/${path}/${id}`

    if (id) generatedPaths[`edit${camelized}Path`] = `/${path}/${id}/edit`
    if (id) generatedPaths[`update${camelized}Path`] = `/${path}/${id}`

    if (id) generatedPaths[`delete${camelized}Path`] = `/${path}/${id}`

    return generatedPaths
}

export default useBasePathHelper
