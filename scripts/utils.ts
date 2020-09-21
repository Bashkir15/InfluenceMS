export function createMap(object?: Record<string, any>): Map<string, any> {
    if (object == null) {
        return new Map()
    }

    const objectEntries = Object.entries(object)
    if (objectEntries.length === 0) return new Map()
    return new Map(objectEntries)
}  