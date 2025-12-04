"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelpers = (query) => {
    let objectSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i"); //chữ i dùng để không phân biệt hoa hay thường
        objectSearch.regex = regex; //regex là thư viện hỗ trợ tìm kiếm
    }
    return objectSearch;
};
exports.default = searchHelpers;
