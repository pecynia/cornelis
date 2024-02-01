export const eventTypes = {
    defaultType: 'selection',
    types: ['selection', 'transformation']
} as const

export type EventType = (typeof eventTypes)['types'][number]