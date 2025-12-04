interface ObjectPagination {
    currentPage:number,
    limitItems:number,
    skip?:number,
    totalPage?:number
}


const paginationHelpers =(objectPagination:ObjectPagination,query :Record<string,any>,countRecord:number) :ObjectPagination=> {
    if (query.page){
        objectPagination.currentPage= parseInt(query.page )//so sánh current page với lại param
                                                    // chuyển qua dạng int cho đúng dữ liệu
    }  
    if (query.limit){
        objectPagination.limitItems=parseInt(query.limit)
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
    // console.log(objectPagination.skip)
    const totalPage = Math.ceil(countRecord/objectPagination.limitItems);// làm tròn số trang 
    objectPagination.totalPage= totalPage;
    return objectPagination;
}
export default paginationHelpers;