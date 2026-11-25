# Shuttle Valley v0.3 – cập nhật sửa hồ sơ
1. Chụp lại dữ liệu profiles/admin và avatars/0 trong Firebase Console trước khi thay đổi. Không xóa tài khoản Authentication.
2. Upload đè index.html, app.js lên thư mục gốc GitHub. Chờ Pages triển khai.
3. Dán toàn bộ firestore.rules vào Firebase Firestore Rules và Publish. Nếu báo lỗi, dừng lại.
4. Ctrl+F5, đăng xuất nếu đang đăng nhập, đăng nhập Admin bằng mật khẩu gốc.
5. Sổ cư dân > Khôi phục hồ sơ Admin. Chỉ chạy khi chưa có lịch, trận hoặc tài chính. Thao tác transaction chuyển hồ sơ bị ghi đè sang ID mới, giữ avatar cũ và tạo mapping accounts; Admin nhận avatar trống.
6. Kiểm tra profiles có hai document, accounts có UID của Chế Mỹ trỏ tới ID mới. Đăng xuất, đăng nhập từng tài khoản, thử tạo cư dân mới và đăng ký lịch.
Không chạy khôi phục nếu đã có dữ liệu nghiệp vụ. Kiểm tra cú pháp JS bằng Node đã qua; chưa chạy Firebase emulator hoặc kiểm thử trực tiếp. Email trùng được kiểm tra frontend; UID mapping được kiểm tra transaction và rules. Các hạn chế bảo mật v0.2 ngoài phạm vi sửa vẫn tồn tại.
