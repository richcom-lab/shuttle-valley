# Shuttle Valley — bản thử nghiệm v0.1

## Triển khai thử (chỉ dùng dữ liệu giả)
1. Giải nén ZIP. Mở https://github.com/richcom-lab/shuttle-valley → Add file → Upload files. Kéo toàn bộ nội dung thư mục vào (index.html phải ở gốc repository). Commit changes.
2. Firebase Console → Firestore Database → Rules: sao chép nội dung firestore.rules, Publish. Nếu có lỗi biên dịch, giữ Production mode và báo lỗi; không mở toàn bộ quyền.
3. GitHub → Settings → Pages → Deploy from a branch → main / (root) → Save.
4. Mở https://richcom-lab.github.io/shuttle-valley/ sau khi deployment hoàn thành. Đăng nhập Admin bằng mật khẩu đã tạo. Sổ cư dân → Khởi tạo Admin → tên và avatar → lưu.
5. Thêm bạn đồng hành. Để cấp login: Firebase Authentication → Users → Add user, tạo email kỹ thuật và mật khẩu; sao chép UID. Trong app Admin mở hồ sơ, điền email và UID, bật quyền truy cập, lưu. Thu hồi bằng cách tắt quyền truy cập; cũng nên disable tài khoản trong Firebase Console. Không đưa mật khẩu vào repository.
6. Thử đăng ký, đặt sân, chốt tham gia, nhập chi phí, ghi thanh toán từ một tài khoản và xác nhận từ tài khoản kia, ghi set và xem bảng vàng.

## Giới hạn / kiểm thử còn lại
- Chưa kết nối Firebase thực tế, chưa chạy emulator, chưa xác nhận rules biên dịch hoặc SDK tải thành công. Không sử dụng dữ liệu tài chính thật trước khi kiểm thử bảo mật.
- Rules kiểm tra quyền cơ bản, quyền sở hữu avatar, khóa chi phí theo giờ máy chủ, append log và xác nhận giao dịch. Tuy nhiên chưa kiểm chứng mọi bất biến: giới hạn 4 phụ thuộc và giới hạn thanh toán theo số dư hiện chỉ ở frontend; log dùng giờ thiết bị và nội dung do client cung cấp; trưởng/phó nhóm có quyền ghi rộng trên danh sách chi phí và set. Cần bổ sung kiểm tra server-side trước production. Chưa có cơ chế sửa/hủy giao dịch thanh toán hoặc sửa set trực tiếp (hủy rồi nhập lại). Chỉ trưởng/phó/admin sửa/xóa chi phí và hủy set trong bản này.
- Tài khoản Firebase có chống lạm dụng mặc định; chưa có giới hạn chính xác 5 lần/15 phút. Hồ sơ công khai gồm tên, avatar, vai trò, email kỹ thuật và UID; không chứa mật khẩu. Dữ liệu tài chính đọc được bởi mọi thành viên đã xác thực có quyền. Không nhập email cá nhân nếu không muốn công khai.
- Một document mỗi ngày cho lịch và một cho tài chính; phù hợp nhóm nhỏ, giới hạn 1 MiB/document. Avatar là SVG pixel art đơn giản, không phải hình Stardew Valley. Khi ngưng hoạt động avatar cũ không còn hiển thị trên lịch sử; tên hiện tại vẫn hiển thị. Chưa có snapshot avatar lịch sử.
- Đã kiểm tra cú pháp JS bằng Node và 3 test logic chia tiền/Elo. Chưa kiểm thử giao diện trình duyệt hoặc end-to-end.
