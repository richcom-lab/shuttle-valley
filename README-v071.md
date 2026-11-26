# Làng Lông v0.7.1 – bản thử nghiệm tổng hợp
Dựa trên v0.7 Preview. Sao lưu repo và rules trước khi thử. Ghi đè app.js, logic.js, medals.js, style.css, index.html và thêm assets/medals/*.svg; giữ firebase-config.js, shuttle.svg và assets/avatars hiện có. Publish firestore.rules trên project thử nghiệm trước. Index cũ không đổi. Không cần migration dữ liệu.

Chi phí cũ giữ cách tính cũ; chi phí tùy chỉnh lưu số tiền chính xác theo người chịu trách nhiệm. Sinh hoạt tạo trong tab Ngày chơi bởi trưởng/phó; chọn hoạt động trong Sổ quỹ, chọn người chia và nhập số tiền hoặc bấm chia đều người đã chọn. Công nợ tổng hợp theo ngày, không tách thanh toán từng hoạt động. Không làm tròn khoản tùy chỉnh. Quyền sửa khoản chi hiện vẫn dành cho trưởng/phó như bản cũ.

36 SVG pixel dạng biểu tượng, mỗi huy hiệu 3 câu mẫu, xúc xắc, tạo huy hiệu mới với emoji, chọn danh hiệu đại diện trong chi tiết huy hiệu. Danh hiệu hiện trong hồ sơ. Tab đồng đều và nút quay lại hồ sơ.

Kiểm tra cú pháp JS và 6 kiểm thử logic đã chạy. Chưa kiểm thử browser/Firebase emulator. Rules chỉ kiểm tra cấu trúc phân bổ, chưa xác minh tổng và từng giá trị ở server; không triển khai production nếu cần bảo đảm chống client sửa mã. Cần kiểm tra luồng ghi chi phí, thanh toán, phân quyền, tạo sinh hoạt, phong tặng và thu hồi trên project thử nghiệm. Chưa có thông báo sắc phong tự động, hiệu ứng riêng từng nhóm, danh hiệu cạnh avatar ngoài hồ sơ, hoặc chỉnh sửa danh mục huy hiệu tự tạo. Không có kiểm thử trực quan SVG.
