import { Session } from './datatypes'
import { sessionToJson, loadSessionFromJson } from './session-json-loader'

export interface Storage {
    store(session: Session): void
    load(): Session | null
}

export class PersistentStorage implements Storage {
    store(session: Session) {
        localStorage.setItem('last_session', sessionToJson(session))
    }

    load(): Session | null {
        const jsonString = localStorage.getItem('last_session')
        if (jsonString === null) {
            return null
        }
        const { session, error } = loadSessionFromJson(jsonString)
        if (error) {
            return null
        }
        return session as Session
    }

    static instance(): Storage {
        return new PersistentStorage()
    }
}
