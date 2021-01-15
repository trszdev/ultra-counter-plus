import { Component, CSSProperties } from 'react'
import { Group, ItemGroup, Session, Workstate } from '../../Util/datatypes'
import './index.css'

export interface Props {
    isDecrementing: boolean,
    group: Group
    session: Session,
    didUpdateWorkstate: (workstate: Workstate) => void
}

export class GroupColumn extends Component<Props> {
    getItemCounts(): { item: ItemGroup, count: number }[] {
        const { group, session: { workstate, itemGroups } } = this.props
        return itemGroups
            .filter(item => item.groupId === group.id)
            .map(item => ({ item, count: workstate.itemCounts[item.id] || 0 }))
    }

    didTapItem(item: ItemGroup) {
        const { isDecrementing, didUpdateWorkstate, session: { workstate } } = this.props
        const value = isDecrementing ? -1 : 1
        workstate.itemCounts[item.id] = (workstate.itemCounts[item.id] || 0) + value
        workstate.groupCounts[item.groupId] = (workstate.groupCounts[item.groupId] || 0) + value
        didUpdateWorkstate(workstate)
    }

    render() {
        const { group, session: { settings, workstate } } = this.props
        const itemStyle: CSSProperties = {
            width: settings.itemWidthPx,
            height: settings.itemHeightPx,
            marginLeft: settings.itemHorizontalSpacingPx,
            marginRight: settings.itemHorizontalSpacingPx,
            marginTop: settings.itemSpacingPx,
            marginBottom: settings.itemSpacingPx,
        }
        return <div className='group-column'>
            <div className='group-column-header' style={itemStyle}>
                <div className='group-column-header-title' style={{fontSize: settings.groupFontSizePx}}>
                    {group.mnemonic}
                </div>
                <div className='group-column-header-count' style={{fontSize: settings.counterFontSizePx}}>
                    {workstate.groupCounts[group.id] || 0}
                </div>
            </div>
            <div className='group-column-items'>
                {this.getItemCounts().map(({ item, count }) => {
                    return <div onClick={() => this.didTapItem(item)} key={item.id}
                        className='group-column-item' style={itemStyle}>
                            <div className='group-column-item-name' style={{fontSize: settings.itemFontSizePx}}>
                                {item?.mnemonic}
                            </div>
                            <div className='group-column-item-count' style={{fontSize: settings.counterFontSizePx}}>
                                {count}
                            </div>
                    </div>
                })}
            </div>
        </div>
    }
}