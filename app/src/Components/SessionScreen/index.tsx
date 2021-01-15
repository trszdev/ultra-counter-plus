import { Component } from 'react'
import { GroupColumn } from '../GroupColumn'
import { Menu } from '../Menu'
import { Group, Session, Workstate } from '../../Util/datatypes'
import { PersistentStorage } from '../../Util/storage'
import './index.css'

export interface Props {
    session: Session
}

export interface State extends Props {
    isMenu: boolean
    isDecrementing: boolean
}

export class SessionScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { session: props.session, isMenu: false, isDecrementing: false }
    }

    didUpdateWorkstate(workstate: Workstate, session?: Session) {
        const newSession = session || this.state.session
        const { groups, settings } = newSession
        const alertGroups = Object.entries(settings.alertThresholds)
            .map(([groupId, threshold]) => {
                const groupCount = workstate.groupCounts[groupId] || 0
                return groupCount >= threshold ? groups.find(x => x.id === groupId) : null
            })
            .filter(Boolean) as [Group]
        if (alertGroups.length > 0) {
            alertGroups.forEach(group => delete settings.alertThresholds[group.id])
            alert(`Threshold reached for: ${alertGroups.map(x => x.name).join(', ')}`)
        }
        this.setState({ session: newSession })
        PersistentStorage.instance().store(newSession)
    }

    didUpdateSession(session: Session) {
        this.didUpdateWorkstate(session.workstate, session)
    }

    didChangeCountMode(isDecrementing: boolean) {
        this.setState({ isDecrementing: isDecrementing, isMenu: false })
    }

    render() {
        const { isMenu, isDecrementing, session } = this.state
        return <div className='session-screen'>
            <div className={`session-screen-toolbar ${isDecrementing ? 'decrementing' : 'incrementing'}`}>
                <div className='session-screen-toolbar-name'>Session: {session.name}</div>
                <div onClick={() => this.setState({ isMenu: !isMenu })}
                    className={`session-screen-toolbar-btn ${isMenu ? 'close' : 'menu'}`}/>
            </div>
            {isMenu ? 
                <Menu isDecrementing={isDecrementing} session={session}
                    didChangeCountMode={this.didChangeCountMode.bind(this)}
                    didUpdateSession={this.didUpdateSession.bind(this)} /> :
                <div className='session-screen-board'>
                    {session.groups.map(group =>
                        <GroupColumn key={group.id} isDecrementing={isDecrementing} group={group} session={session}
                            didUpdateWorkstate={this.didUpdateWorkstate.bind(this)} />
                    )}
                </div>
            }
        </div>
    }
}
