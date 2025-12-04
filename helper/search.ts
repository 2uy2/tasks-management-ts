interface ObjectSearch{
    keyword:string,
    regex?:RegExp
}

const searchHelpers =(query:Record<string,any>):ObjectSearch=>{
    let objectSearch:ObjectSearch= {
        keyword:"",
      

    }
    if (query.keyword){
        objectSearch.keyword=query.keyword;
        const regex = new RegExp(objectSearch.keyword,"i");//chữ i dùng để không phân biệt hoa hay thường
        objectSearch.regex = regex  ;//regex là thư viện hỗ trợ tìm kiếm
    }
    return objectSearch
 }
 export default searchHelpers;