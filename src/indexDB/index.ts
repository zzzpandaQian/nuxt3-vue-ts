class IndexDB{
    private dbName:string
    private db:any
    constructor(dbName: string){
        this.dbName = dbName
    }

    public openDB(version: number, keyPath: string, keyList?: Array<string>){
        const result = window.indexedDB.open(this.dbName, version)
        result.onsuccess = (ev: any)=>{
            console.log('连接成功')
            this.db = ev?.target?.result
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

    update(storeName: string, data: any){
      // 默认为‘readonly’
      const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
      // put既可以添加也可以修改，
      const request = store.put({
        // 需解析否则外层有{data: ...}
        ...data,
        updateTime: new Date().getTime() // 非必填
      })
      request.onsuccess = (ev: any)=>{
        console.log(ev.target.result);
        console.log('添加或者修改成功');
      }
      request.onerror = ()=>{
        console.log('添加失败');
      }
    }
    delete(storeName: string, id: string | number){
      const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
      const request = store.delete(id)
      request.onsuccess = (ev: any)=>{
        console.log(ev.target.result);
        console.log('删除成功');
      }
      request.onerror = ()=>{
        console.log('添加失败');
      }
    }
    get(storeName: string){
      const store = this.db.transaction([storeName]).objectStore(storeName)
      const request = store.getAll()
      request.onsuccess = (ev: any)=>{
        console.log(ev.target.result);
        console.log('查询成功');
      }
      request.onerror = ()=>{
        console.log('查询失败');
      }
    }
    getItem(storeName: string, keyPath: string | number){
      const store = this.db.transaction([storeName]).objectStore(storeName)
      const request = store.get(keyPath)
      request.onsuccess = (ev: any)=>{
        console.log(ev.target.result);
        console.log('查询成功');
      }
      request.onerror = ()=>{
        console.log('查询失败');
      }
    }

}

export default IndexDB
