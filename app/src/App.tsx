import { SessionScreen } from './Components/SessionScreen'
import { createSampleSession } from './Util/datatypes'
import { PersistentStorage } from './Util/storage'

export const App = () => {
    const session = PersistentStorage.instance().load() || createSampleSession()
    return <SessionScreen session={session} />
}
