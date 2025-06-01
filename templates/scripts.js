document.addEventListener('DOMContentLoaded', function() {
  // Xử lý toggle submenu
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();

      const parentLi = toggle.parentElement;
      const submenu = parentLi.querySelector('.submenu');

      // Toggle class mở submenu
      if (submenu.classList.contains('show')) {
        submenu.classList.remove('show');
        parentLi.classList.remove('open');
      } else {
        submenu.classList.add('show');
        parentLi.classList.add('open');
      }
    });
  });
});


// Navigation
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.closest('.nav-link').classList.add('active');
            
            // Update page title
            const titles = {
                'household': 'Quản lý hộ khẩu',
                'resident': 'Quản lý nhân khẩu',
                'change-requests': 'Yêu cầu thay đổi thông tin',
                'temporary-absence': 'Yêu cầu tạm vắng',
                'temporary-residence': 'Yêu cầu tạm trú',
                'accounts': 'Quản lý tài khoản'
            };
            document.getElementById('page-title').textContent = titles[sectionId];
        }

        // Modal functions
        function openModal(type) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            
            let title = '';
            let content = '';
            
            switch(type) {
                case 'add-household':
                    title = 'Thêm hộ khẩu mới';
                    content = `
                        <form>
                            <div class="form-group">
                                <label class="form-label">Tên chủ hộ</label>
                                <input type="text" class="form-input" placeholder="Nhập tên chủ hộ">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Số phòng</label>
                                <input type="text" class="form-input" placeholder="Ví dụ: A-101">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Số điện thoại</label>
                                <input type="text" class="form-input" placeholder="Số điện thoại">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" placeholder="Email">
                            </div>
                            <div style="text-align: right; margin-top: 20px;">
                                <button type="button" class="btn btn-primary">Lưu</button>
                                <button type="button" class="btn" onclick="closeModal()" style="margin-left: 10px;">Hủy</button>
                            </div>
                        </form>
                    `;
                    break;
                case 'add-resident':
                    title = 'Thêm nhân khẩu mới';
                    content = `
                        <form>
                            <div class="form-group">
                                <label class="form-label">Họ và tên</label>
                                <input type="text" class="form-input" placeholder="Nhập họ và tên">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Số CCCD</label>
                                <input type="text" class="form-input" placeholder="Số căn cước công dân">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Giới tính</label>
                                <select class="form-input">
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ngày sinh</label>
                                <input type="date" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Số phòng</label>
                                <select class="form-input">
                                    <option>A-101</option>
                                    <option>A-102</option>
                                    <option>A-103</option>
                                </select>
                            </div>
                            <div style="text-align: right; margin-top: 20px;">
                                <button type="button" class="btn btn-primary">Lưu</button>
                                <button type="button" class="btn" onclick="closeModal()" style="margin-left: 10px;">Hủy</button>
                            </div>
                        </form>
                    `;
                    break;
                case 'add-account':
                    title = 'Thêm tài khoản mới';
                    content = `
                        <form>
                            <div class="form-group">
                                <label class="form-label">Tên đăng nhập</label>
                                <input type="text" class="form-input" placeholder="Tên đăng nhập">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mật khẩu</label>
                                <input type="password" class="form-input" placeholder="Mật khẩu">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Họ và tên</label>
                                <input type="text" class="form-input" placeholder="Họ và tên">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vai trò</label>
                                <select class="form-input">
                                    <option>Chủ hộ</option>
                                    <option>Thành viên</option>
                                    <option>Tổ trưởng</option>
                                </select>
                            </div>
                            <div style="text-align: right; margin-top: 20px;">
                                <button type="button" class="btn btn-primary">Lưu</button>
                                <button type="button" class="btn" onclick="closeModal()" style="margin-left: 10px;">Hủy</button>
                            </div>
                        </form>
                    `;
                    break;
            }
            
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // CRUD Functions
        function editHousehold(id) {
            // Tìm dòng <tr> chứa dữ liệu tương ứng
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (!row) return alert('Không tìm thấy hộ khẩu');

            // Lấy dữ liệu từ row
            const chuHo = row.getAttribute('data-chuho');
            const soPhong = row.getAttribute('data-sophong');
            const dienTich = row.getAttribute('data-dientich');
            const trangThai = row.getAttribute('data-trangthai');

            // Tạo form HTML
            const formHTML = `
                <form id="edit-form">
                    <label>Mã hộ khẩu</label>
                    <input type="text" name="maHoKhau" value="${id}" readonly><br>

                    <label>Chủ hộ</label>
                    <input type="text" name="chuHo" value="${chuHo}"><br>

                    <label>Số phòng</label>
                    <input type="text" name="soPhong" value="${soPhong}"><br>

                    <label>Diện tích (m²)</label>
                    <input type="number" name="dienTich" value="${dienTich}"><br>

                    <label>Trạng thái</label>
                    <select name="trangThai">
                        <option ${trangThai === 'Đã đăng ký' ? 'selected' : ''}>Đã đăng ký</option>
                        <option ${trangThai === 'Chưa đăng ký' ? 'selected' : ''}>Chưa đăng ký</option>
                    </select><br>

                    <button type="submit" class="btn btn-success">Lưu</button>
                </form>
            `;

            // Chèn vào modal
            document.getElementById('modal-title').innerText = 'Chỉnh sửa hộ khẩu';
            document.getElementById('modal-body').innerHTML = formHTML;
            document.getElementById('modal').style.display = 'block';

            // Bắt sự kiện submit
            document.getElementById('edit-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Cập nhật thành công (demo)');

                // Bạn có thể thêm logic gọi API PUT/POST để cập nhật dữ liệu thật ở đây

                closeModal();
            });
        }



        function deleteHousehold(id) {
            if(confirm('Bạn có chắc chắn muốn xóa hộ khẩu ' + id + '?')) {
                alert('Đã xóa hộ khẩu: ' + id);
            }
        }

        function editResident(id) {
            alert('Chỉnh sửa nhân khẩu: ' + id);
        }

        function deleteResident(id) {
            if(confirm('Bạn có chắc chắn muốn xóa nhân khẩu ' + id + '?')) {
                alert('Đã xóa nhân khẩu: ' + id);
            }
        }

        function approveChangeRequest(id) {
            if(confirm('Phê duyệt yêu cầu thay đổi ' + id + '?')) {
                alert('Đã phê duyệt yêu cầu thay đổi: ' + id);
            }
        }

        function rejectChangeRequest(id) {
            if(confirm('Từ chối yêu cầu thay đổi ' + id + '?')) {
                alert('Đã từ chối yêu cầu thay đổi: ' + id);
            }
        }

        function viewChangeRequest(id) {
            alert('Xem chi tiết yêu cầu thay đổi: ' + id);
        }

        function approveAbsenceRequest(id) {
            if(confirm('Phê duyệt yêu cầu tạm vắng ' + id + '?')) {
                alert('Đã phê duyệt yêu cầu tạm vắng: ' + id);
            }
        }

        function rejectAbsenceRequest(id) {
            if(confirm('Từ chối yêu cầu tạm vắng ' + id + '?')) {
                alert('Đã từ chối yêu cầu tạm vắng: ' + id);
            }
        }

        function viewAbsenceRequest(id) {
            alert('Xem chi tiết yêu cầu tạm vắng: ' + id);
        }

        function endAbsence(id) {
            if(confirm('Kết thúc tạm vắng cho ' + id + '?')) {
                alert('Đã kết thúc tạm vắng: ' + id);
            }
        }

        function approveResidenceRequest(id) {
            if(confirm('Phê duyệt yêu cầu tạm trú ' + id + '?')) {
                alert('Đã phê duyệt yêu cầu tạm trú: ' + id);
            }
        }

        function rejectResidenceRequest(id) {
            if(confirm('Từ chối yêu cầu tạm trú ' + id + '?')) {
                alert('Đã từ chối yêu cầu tạm trú: ' + id);
            }
        }

        function viewResidenceRequest(id) {
            alert('Xem chi tiết yêu cầu tạm trú: ' + id);
        }

        function endResidence(id) {
            if(confirm('Kết thúc tạm trú cho ' + id + '?')) {
                alert('Đã kết thúc tạm trú: ' + id);
            }
        }

        function editAccount(id) {
            alert('Chỉnh sửa tài khoản: ' + id);
        }

        function lockAccount(id) {
            if(confirm('Khóa tài khoản ' + id + '?')) {
                alert('Đã khóa tài khoản: ' + id);
            }
        }

        function deleteAccount(id) {
            if(confirm('Bạn có chắc chắn muốn xóa tài khoản ' + id + '?')) {
                alert('Đã xóa tài khoản: ' + id);
            }
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Search functionality
        document.addEventListener('DOMContentLoaded', function() {
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                input.addEventListener('keyup', function(e) {
                    if(e.key === 'Enter') {
                        performSearch(this.value);
                    }
                });
            });

            const searchBtns = document.querySelectorAll('.search-btn');
            searchBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const searchInput = this.previousElementSibling;
                    performSearch(searchInput.value);
                });
            });
        });

        function performSearch(query) {
            console.log('Tìm kiếm: ' + query);
            // Implement search logic here
        }