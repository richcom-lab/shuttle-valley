# Làng Lông v0.7.3 — bản thử nghiệm
Ghi đè app.js, logic.js, style.css, index.html, medals.js và assets/medals nếu thiếu. Giữ firebase-config.js, shuttle.svg và assets/avatars. Publish firestore.rules mới trước khi dùng phong tặng. Không cần composite index mới.

Lịch: Gọn (avatar) / Chi tiết (tên và avatar), lưu localStorage; sinh nhật hiển thị theo MM-DD, có lời chúc trong ngày và bảng tin. Chi phí sinh hoạt mới chỉ hiện khi đã đăng nhập như v0.7.2. Tên dài có thể bị cắt trong ô lịch; mở ngày để xem.

Tài chính: chỉ khoản chi mới có rounding=daily-v1. Các khoản cũ giữ thuật toán cũ, kể cả khi chỉnh sửa (trừ thay đổi số tiền/danh sách do người dùng thực hiện). Chia đều mới cộng phần nợ gốc theo người chịu trách nhiệm, làm tròn một lần, chia chênh theo tỷ lệ người ứng bằng phần dư lớn nhất. Chia tùy chỉnh và thanh toán không làm tròn. Ngày có cả khoản cũ và mới tính hai nhóm riêng. Chi phí tháng vẫn là phần chi gốc, không gồm chênh làm tròn. Không di trú dữ liệu.

Sắc phong: batch tạo award và awardNews nếu chọn công bố; thu hồi batch xóa cả hai. Tối đa 20 thông báo mới nhất, mặc định 3. Không công bố lại lịch sử tự động. Rules chưa chạy emulator, chưa thử trình duyệt/Firebase thật. Kiểm tra cú pháp JS và sáu assertion logic đã đạt. Tổng phân bổ tùy chỉnh vẫn chưa được kiểm chứng đầy đủ phía server. Mũ sinh nhật CSS chỉ trong thẻ chúc mừng. Ngày nhập làng dùng mốc log đầu nếu có, ghi là Hồ sơ từ.
