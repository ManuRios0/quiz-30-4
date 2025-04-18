
const questions = [
  {
    question: "Vị tổng thống cuối cùng của chính quyền Mĩ – Ngụy, đã đầu hàng vô điều kiện khi quân ta tiến vào Dinh Độc Lập?",
    options: ["Ngô Đình Diệm", "Nguyễn Văn Thiệu", "Dương Văn Minh", "Trần Văn Hương"],
    answer: "Dương Văn Minh"
  },
  {
    question: "Bạn hãy cho biết tên của người chiến sĩ cắm lá cờ đầu tiên trên nóc Dinh Độc Lập:",
    options: ["Bùi Quang Thận", "Lữ Văn Hoà", "Thái Bá Minh", "Nguyễn Văn Kỷ Nội"],
    answer: "Bùi Quang Thận"
  },
  {
    question: "Ý nghĩa lớn nhất của chiến dịch Tây Nguyên là:",
    options: [
      "Là nguồn cổ vũ mạnh mẽ để quân dân ta tiến lên giải phóng hoàn toàn miền Nam",
      "Làm cho tinh thần địch hốt hoảng, mất khả năng chiến đấu",
      "Chuyến cuộc kháng chiến chống Mĩ cứu nước sang giai đoạn mới: Từ tiến công chiến lược chuyển phát triển thành tổng tiến công chiến lược trên toàn miền Nam",
      "Đó là thắng lợi lớn nhất, oanh liệt nhất trong cuộc kháng chiến chống Mĩ cứu nước của nhân dân ta"
    ],
    answer: "Chuyến cuộc kháng chiến chống Mĩ cứu nước sang giai đoạn mới: Từ tiến công chiến lược chuyển phát triển thành tổng tiến công chiến lược trên toàn miền Nam"
  },
  {
    question: "Chiến dịch mở màn cho cuộc Tổng tiến công và nổi dậy Xuân 1975 là chiến dịch nào?",
    options: ["Chiến dịch Tây Nguyên (4/3 đến 24/3/1975)", "Chiến dịch Hồ Chí Minh ( 26/4 đến 30/4/1975 )", "Chiến dịch Huế - Đà Nẵng ( 3/5 đến 2/3/1975 )", "Chiến dịch Mậu Thân"],
    answer: "Chiến dịch Tây Nguyên (4/3 đến 24/3/1975)"
  },
  {
    question: "Lời kêu gọi cả nước của Bác Hồ: “Dù phải chiến đấu 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa, chúng ta cũng kiên quyết chiến đấu đến thắng lợi hoàn toàn” được ra đời vào thời gian nào",
    options:  ["Ngày 5/6/1965", "Ngày 20/7/1965", "Ngày 25/6/1965", "Ngày 26/5/1965"],
    answer: "Ngày 20/7/1965"
  },
  {
    question: "Bài hát Tiến về Sài Gòn do ai sáng tác",
    options: ["Lưu Hữu Phước", "Lư Nhất Vũ", "Văn Cao", "Trần Tiến"],
    answer: "Lưu Hữu Phước"
  },
  {
    question: "Tinh thần “Đi nhanh đến, đánh nhanh thắng” và khí thế “thần tốc, táo bạo, bất ngờ, chắc thắng”. Đó là tinh thần và khí thế ra quân của dân tộc ta trong?",
    options:  ["Chiến dịch Tây Nguyên", "Chiến dịch Huế - Đà Nẵng", "Chiến dịch Hồ Chí Minh", "Tất cả các chiến dịch trên"],
    answer: "Chiến dịch Hồ Chí Minh"
  },
  {
    question: "Hiệp định Paris được ký vào thời gian nào?",
    options:  ["26/1/1973", "27/1/1973", "28/1/1973", "Cả 3 đáp án trên đều sai"],
    answer: "27/1/1973"
  },
  {
    question: "Chiến thắng nào vào đầu năm 1975 là chiến thắng đầu tiên ở miền Nam được giải phóng hoàn toàn",
    options: ["Phước Long", "Biên Hòa", "Long Khánh"],
    answer: "Phước Long"
  },
  {
    question: ": Bộ chính trị quyết định tên chiến dịch đánh vào Sài Gòn là chiến dịch Hồ Chí Minh vào thời gian nào",
    options: ["Ngày 4/4/1975", "Ngày 14/4/1975", "Ngày 24/4/1975", "Ngày 26/4/1975"],
    answer: "Ngày 14/4/1975"
  },
  {
    question: "Phương châm đánh mà Bộ Chính trị đề ra trong kế hoạch giải phóng miền Nam là gì?",
    options: ["Đánh nhanh, thắng nhanh", "Tích cực, chủ động, cơ động, linh hoạt", "Đánh ăn chắc, đánh chắc thắng", "Thần tốc, táo bạo, bất ngờ, chắc thắng"],
    answer: "Thần tốc, táo bạo, bất ngờ, chắc thắng"
  },
  {
    question: " Nhận định “ Toàn thắng của chiến dịch Hồ Chí Minh năm 1975 đã đưa Việt Nam tới đỉnh cao của giải phóng dân tộc và uy tín của quốc tế. Thắng lợi của Việt Nam trong kháng chiến chống Mỹ không chỉ là một tác nhân đưa đến những thay đổi rất quan trọng trong chiến lược của các nước lớn mà còn làm chuyển đổi cục diện chính trị khu vực Đông Nam Á. đây là nhận định của ai? ",
    options: ["Văn Tiến Dũng", "Võ Nguyên Giáp", "Trần Quang Cơ"],
    answer: "Trần Quang Cơ"
  },
  {
    question: "Chiến dịch Hồ Chí Minh diễn ra ngày nào ?",
    options: ["22/4/1975", "23/4/1975", "25/4/1975", "26/4/1975"],
    answer: "26/4/1975"
  },
  {
    question: "Ôi, biển trời bao la đã sạch bóng thù, \Từ Bắc vô Nam cờ sao tưng bừng,\ Người Việt Nam đón xuân về,\Người Việt Nam đón xuân về”\ Đoạn trích trên trích từ lời bài hát nào?",
    options: ["Bài ca thống nhất", "Đất nước trọn niềm vui", "Giải phóng miền Nam", "Mùa xuân 30 tháng 4"],
    answer: "Bài ca thống nhất"
  },
  {
    question: "Còn cái lai quần cũng đánh” là câu nói nổi tiếng của ai?",
    options: ["Nguyễn Thị Định", "Nguyễn Thị Út", "Nguyễn Thị Bình", "Lê Thị Hồng Gấm"],
    answer: "Nguyễn Thị Út"
  },
];
