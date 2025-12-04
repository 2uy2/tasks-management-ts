"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String,
    listUser: Array,
    taskParentId: String,
    deleted: {
        type: Boolean,
        default: false // giá trị mặc định nếu người ta k xét thì sẽ là false 
    },
    deletedAt: Date // tự thêm trường dữ liệu
}, {
    timestamps: true // thời gian khởi tạo
});
const Task = mongoose_1.default.model("Task", taskSchema, "tasks");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
exports.default = Task;
