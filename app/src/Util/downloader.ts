import * as fileSaver from 'file-saver'

export const saveFileAs = (jsonText: string, fileName: string) => {
    const blob = new Blob([jsonText], {type: 'application/json;charset=utf-8'})
    fileSaver.saveAs(blob, `${fileName}.json`)
}

export const openJsonFile = async () => new Promise<string>((res, rej) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => { 
        if (input.files === null) return
        const file = input.files[0]
        const reader = new FileReader()
        reader.onerror = rej
        reader.onload = readerEvent => {
            const jsonString = readerEvent.target?.result + ''
            res(jsonString)
        }
        reader.readAsText(file, 'UTF-8')
    }
    input.click()
})
