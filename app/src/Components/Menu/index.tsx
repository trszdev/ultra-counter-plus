import { Component } from 'react'
import { ItemGroup, Session } from '../../Util/datatypes'
import AceEditor from 'react-ace'
import { loadSessionFromJson, sessionToJson } from '../../Util/session-json-loader'
import { createSampleSession } from '../../Util/datatypes'
import './index.css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import { saveFileAs, openJsonFile } from '../../Util/downloader'


export interface Props {
    session: Session
    isDecrementing: boolean
    didUpdateSession: (session: Session) => void
    didChangeCountMode: (isDecrementing: boolean) => void
}

export class Menu extends Component<Props> {
    private text: string
    constructor(props: Props) {
        super(props)
        this.text = sessionToJson(props.session)
    }

    updateCurrentSession(text?: string) {
        const { error, session } = loadSessionFromJson(text || this.text)
        if (error) {
            alert(error.message)
            return
        }
        this.props.didUpdateSession(session as Session)
        alert('Session updated')
    }

    componentDidUpdate() {
        this.text = sessionToJson(this.props.session)
    }

    downloadSession() {
        saveFileAs(this.text, this.props.session.name)
    }

    async uploadSession() {
        const jsonString = await openJsonFile()
        this.updateCurrentSession(jsonString)
    }

    toggleCountMode() {
        this.props.didChangeCountMode(!this.props.isDecrementing)
    }

    sortItems() {
        const { session } = this.props
        const { workstate: { itemCounts } } = session
        const groupIdToItemGroups: { [groupId: string]: ItemGroup[] } = {}
        session.itemGroups.forEach(itemGroup => {
            const list = groupIdToItemGroups[itemGroup.groupId] || []
            list.push(itemGroup)
            groupIdToItemGroups[itemGroup.groupId] = list
        })
        session.itemGroups = Object.values(groupIdToItemGroups).flatMap(itemGroups => 
            itemGroups.sort((b, a) => (itemCounts[a.id] || 0) - (itemCounts[b.id] || 0))
        )
        this.props.didUpdateSession(session)
    }

    resetCounts() {
        if (!confirm('Do you really want to reset all progress?')) { //eslint-disable-line no-restricted-globals
            return
        }
        const { session } = this.props
        session.workstate.itemCounts = {}
        session.workstate.groupCounts = {}
        this.props.didUpdateSession(session)
    }

    didChangeText(text: string) {
        this.text = text 
    }

    render() {
        const { isDecrementing } = this.props
        return <div className='menu'>
            <div className='menu-buttons'>
                <button onClick={() => this.updateCurrentSession()}>Update current session</button>
                <button onClick={this.downloadSession.bind(this)}>Download session</button>
                <button onClick={this.uploadSession.bind(this)}>Open session</button>
                <button onClick={this.toggleCountMode.bind(this)}>
                    {isDecrementing ? 'Increment mode' : 'Decrement mode'}
                </button>
                <button onClick={this.sortItems.bind(this)}>Sort items</button>
                <button onClick={this.resetCounts.bind(this)}>Reset progress</button>
            </div>
            <div className='menu-editor'>
                <AceEditor placeholder={placeholder} mode='json' theme='github' name='menu-editor-ace'
                    onChange={this.didChangeText.bind(this)} fontSize={14} showPrintMargin={true} showGutter={true}
                    highlightActiveLine={true} value={sessionToJson(this.props.session)}
                    setOptions={{showLineNumbers: true, tabSize: 2, useWorker: false}} />
            </div>
        </div>
    }
}

const placeholder = sessionToJson(createSampleSession())
