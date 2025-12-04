"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const paganiton_1 = __importDefault(require("../../../helper/paganiton"));
const search_1 = __importDefault(require("../../../helper/search"));
const task_model_1 = __importDefault(require("../model/task_model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    //search
    // lọc tìm kiếm keyword
    const objectSearch = (0, search_1.default)(req.query);
    // console.log(objectSearch);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // pagination
    const countTasks = yield task_model_1.default.countDocuments(find); // đếm số lượng object dữ liệu được gọi đến
    let objectPagination = (0, paganiton_1.default)({
        currentPage: 1, // truyền object
        limitItems: 2,
    }, req.query, countTasks);
    //end pagination
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        const sortValue = req.query.sortValue.toString();
        sort[sortKey] = sortValue;
    }
    const task = yield task_model_1.default.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    console.log(task);
    res.json(task);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    console.log(task);
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            status: status
        });
        res.json({
            id: id,
            code: 200,
            messeage: "cập nhật thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            messeage: "không tồn tại"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        console.log(ids);
        console.log(key);
        console.log(value);
        switch (key) {
            case "status":
                yield task_model_1.default.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    messeage: "cập nhật thành công"
                });
                break;
            case "delete":
                yield task_model_1.default.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });
                res.json({
                    code: 200,
                    messeage: "xoá thành công"
                });
                break;
            default:
                res.json({
                    code: 400,
                    messeage: "không tồn tại"
                });
                break;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            messeage: "không tồn tại"
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new task_model_1.default(req.body);
        const data = yield product.save();
        res.json({
            code: 200,
            message: "tạo thành công",
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "lỗi"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 200,
            message: "cập nhật thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "lỗi"
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date()
        });
        res.json({
            code: 200,
            message: "xoá thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "lỗi"
        });
    }
});
exports.deleteTask = deleteTask;
