import { Chance } from 'chance'

export interface Group {
    id: string
    name: string
    mnemonic: string
}

export interface ItemGroup extends Group {
    groupId: string
}

export interface Settings {
    alertThresholds: { [groupId: string]: number }
    itemWidthPx: number
    itemHeightPx: number
    itemSpacingPx: number
    itemHorizontalSpacingPx: number
    counterFontSizePx: number
    itemFontSizePx: number
    groupFontSizePx: number
}

export interface Workstate {
    itemCounts: { [itemId: string]: number }
    groupCounts: { [groupId: string]: number }
}

export interface Session {
    name: string
    groups: Group[]
    itemGroups: ItemGroup[]
    settings: Settings
    workstate: Workstate
}

export const createEmptySession = (): Session => {
    const chance = new Chance()
    const settings: Settings = {
        alertThresholds: {},
        itemFontSizePx: 12,
        itemHeightPx: 50,
        itemHorizontalSpacingPx: 10,
        itemSpacingPx: 20,
        itemWidthPx: 50,
        counterFontSizePx: 12,
        groupFontSizePx: 12,
    }
    return {
        name: chance.word({ length: 6 }),
        groups: [],
        itemGroups: [],
        settings,
        workstate: { itemCounts: {}, groupCounts: {} }
    }
}

export const createSampleSession = (): Session => {
    const session = createEmptySession()
    session.groups.push({ id: 'group_id1', mnemonic: 'group1', name: 'ID 1 - GROUP' })
    session.groups.push({ id: 'group_id2', mnemonic: 'group2', name: 'ID 2 - GROUP' })
    session.itemGroups.push({ id: 'item1', groupId: 'group_id1', mnemonic: 'itm1', name: 'Item 1' })
    session.itemGroups.push({ id: 'item2', groupId: 'group_id1', mnemonic: 'itm2', name: 'Item 2' })
    session.itemGroups.push({ id: 'item3', groupId: 'group_id1', mnemonic: 'itm3', name: 'Item 3' })
    session.itemGroups.push({ id: 'item4', groupId: 'group_id2', mnemonic: 'itm4', name: 'Item 4' })
    session.workstate.itemCounts['item3'] = 1
    session.workstate.groupCounts['group_id1'] = 1
    session.settings.alertThresholds['group_id1'] = 500
    return session
}
