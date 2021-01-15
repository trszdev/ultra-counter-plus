import { createCheckers } from 'ts-interface-checker'
import generatedTypeInterfaces from './generated-datatypes-interfaces'
import { Session } from './datatypes'

const checkers = createCheckers(generatedTypeInterfaces)

export const loadSessionFromJson = (jsonString: string): { session?: Session, error?: Error } => {
    let json
    try {
        json = JSON.parse(jsonString)
    } catch (error) {
        return { error }
    }
    const error = checkers.Session.validate(json)
    if (error !== null) {
        return { error: new Error(`Not valid session: ${error.path} ${error.message}`) }
    }
    const session = json as Session
    return { session }
}

export const sessionToJson = (session: Session): string =>
    JSON.stringify(session, null, 2)

