class IndexDB{
    private dbName:string

    constructor(dbName: string){
        this.dbName = dbName
    }

    public openDB(version: number, keyPath: string, keyList?: Array<string>){
        const result = window.indexedDB.open(this.dbName, version)
        result.onsuccess = (ev)=>{
            console.log('连接成功')
        }
        result.onerror = (error)=>{
            console.log('连接失败');
        }
        result.onupgradeneeded = (ev) => {
            // 首次会优先于onsuccess触发，当修改version时候触发且version必须大于先前的值否则onerror
            console.log('更新成功')
          const {result}: any = ev.target
          // (表名,{特征值及key})
          const store = result.createObjectStore('demo', {autoIncrement: true, keyPath})
          if(keyList && keyList.length > 0){
            keyList.map((i: string)=>{
                // 当multiEntry为true 的时候遍历循环keyPath，否则以[...]整个最为key
                store.createIndex(i, 'id', {unique: false, multiEntry: true})
            })
            }
            store.transaction.oncomplete = (event:any)=>{
                console.log('创建仓成功');
            }
        }
    }
}

export default IndexDB
