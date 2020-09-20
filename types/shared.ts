// Make all option properties become required while allowing undefined
export type RequireAll<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
        ? T[P]
        : (T[P] | undefined) 
}

// Pick one and only one of a list of properties. XOR for type props
export type OneOf<T, K extends keyof T> = Omit<T, K> & {
    [key in K]: Pick<Required<T>, key> & {
        [key1 in Exclude<K, key>]?: never
    }
}

// Make descriminant unions more strict. Returns member keys in U not present in
// T set to never
export type DisambiguateSet<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never
}
export type ExclusiveUnion<T, U> = T | U extends object
    // If there are any shared keys between T and U
    ? (DisambiguateSet<T, U> & U) | (DisambiguateSet<U, T> & T)
    // Otherwise the union is already unique
    : T | U



