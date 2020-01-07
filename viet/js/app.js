var UI = (function () {
    var DOMString = {
        container: ".container",
        button: ".button",
        helpbox: ".help-box-container",
        moneybox: ".money-box-container",
        questionbox: ".question-box-container",
        question: ".question-box",
        a5050: ".a5050",
        phone: ".phone",
        audience: ".audience",
        utility: ".utility-box-container",
        utility1: ".utility-1",
        utility2: ".utility-2",
        utility3: ".utility-3",
        answers: ".answer-box div",
        answerDOM: ".answer-box"
    }
    var moneyBoxs = [...document.querySelectorAll(".question")].reverse();
    var diamondDots = [...document.querySelectorAll(".question :nth-child(2)")].reverse();

    return {
        introMusic: function () {
            setTimeout(function () {
                playAudio("Audio_C2");
            }, 1000);
            setTimeout(function () {
                playAudio("AudioBG1");
            }, 5000);
            setTimeout(function () {
                playAudio("joker_1");

                document.querySelector(".a5050").classList.add("UIActive");
            }, 12000);
            setTimeout(function () {
                playAudio("joker_2");
                document.querySelector(".phone").classList.add("UIActive");
            }, 14000);
            setTimeout(function () {
                playAudio("joker_3");
                document.querySelector(".audience").classList.add("UIActive");
            }, 16000);
            setTimeout(function () {
                playAudio("Start");
            }, 18000);
        },
        displayUI: function () {
            document.querySelector(DOMString.helpbox).classList.add("UIActive");
            document.querySelector(".a5050").classList.remove("UIActive");
            document.querySelector(".phone").classList.remove("UIActive");
            document.querySelector(DOMString.questionbox).classList.add("UIActive");
            document.querySelector(DOMString.moneybox).classList.add("UIActive");
            document.querySelector(".audience").classList.remove("UIActive");
            document.querySelector(".changequestion").classList.remove("UIActive");
            document.querySelectorAll(DOMString.button)[0].style.display = "none";
            document.querySelectorAll(DOMString.button)[1].style.display = "none";
            document.querySelector(DOMString.utility).style.display = "none";
        },
        getDOMstring: function () {
            return DOMString;
        },
        highLightMoneybox: function (index) {

            for (var i = 0; i < moneyBoxs.length; i++) {
                moneyBoxs[i].classList.remove("questionActive");
            }
            for (var i = 0; i < moneyBoxs.length; i++) {
                moneyBoxs[index].classList.add("questionActive");
                diamondDots[index].classList.add("UIActive");
            }
        },
        reset: function () {
            document.querySelector(DOMString.helpbox).classList.remove("UIActive");
            document.querySelector(DOMString.questionbox).classList.remove("UIActive");
            document.querySelector(DOMString.moneybox).classList.remove("UIActive");
            document.querySelectorAll(DOMString.button)[1].style.display = "block";
            for (var i = 0; i < diamondDots.length; i++) {
                diamondDots[i].classList.remove("UIActive");
            }
        }
    }
    function playAudio(src) {
        var audio = new Audio(`./Audio/${src}.wav`);
        audio.play();
    }
})();
var GAME = (function () {
    var questionSet1 = [
        ['Không có quận nào ở Hà Nội?', ['A: Quận Hoàn Kiếm', 'B: Quận Ba Đình', 'C: Quận Nhất', 'D: Quận Cầu Giấy'], 'C', 200000],
        ["Trong thần thoại La Mã, Cupid là vị thần đại diện cho điều gì?", ['A: Bình minh', 'B: Tình yêu', 'C: Bóng tối', 'D: Nhân nghĩa'], 'B', 400000],
        ['Có câu "Còn nước còn ..." gì?', ['A: Tắm', 'B: Tẩy', 'C: Tát', 'D: Tùy'], 'C', 600000],
        ['Từ nào còn thiếu trong câu sau: "Hỡi cô tát nước bên đàng Sao cô múc ánh ... vàng đổ đi"?', ['A: Mưa', 'B: Gió', 'C: Sao', 'D: Trăng'], 'D', 1000000],
        ['Đâu là tên một bài thơ của nhà thơ Nguyễn Bính?', ['A:Cô lái xuồng', 'B: Cô lái đò', 'C: Cô chèo ghe', 'D: Cô đan nón'], 'B', 2000000],
        ['"Hoàng tử thành Rome" là biệt danh của cầu thủ bóng đá nào?', ['A: Francesco Totti', 'B: Raúl González', 'C: Tony Adam', 'D: Brian Mc Clair'], 'A', 3000000],
        ['Làng cổ Phước Tích ở tỉnh Thừa Thiên - Huế có nghề truyền thống gì?', ['A: Làm gốm', 'B: Làm hương trầm', 'C: Làm tranh thờ cúng', 'D: Làm áo dài'], 'A', 6000000],
        ['Từ nào còn thiếu trong câu hát: "Yêu thương gì đâu chỉ toàn thấy ... nhau" trong bài hát "Ừ thì" của nhạc sĩ Mew Amazing?', ['A: Tay', 'B: Chân', 'C: Lưng', 'D: Vai'], 'C', 10000000],
        ['Bảo tàng mì ăn liền lớn nhất thế giới hiện nay nằm ở đâu?', ['A: Hàn Quốc', 'B: Trung Quốc', 'C: Nga', 'D: Nhật Bản'], 'D', 14000000],
        ['Quốc gia nào được ví như "Xứ sở nghìn hồ"?', ['A: Phần Lan', ' B: Áo', 'C: Ba Lan', 'D: Ấn Độ'], 'A', 22000000],
        ['Trong ẩm thực Bồ Đào Nha, "Bacalhau" là món ăn gì?', ['A: Một loại mì trộn', 'B: Một loại sữa', 'C: Một món cá', 'D: Một món trứng'], 'C', 30000000],
        ["Núi Pinatubo nằm ở nước nào?", ['A: Peru', 'B: Philippines', 'C: Nepal', 'D: Ý'], 'B', 40000000],
        ["Đình Chàng là tên gọi khác của ngôi đình nào ở phía Bắc được xây dựng từ thời Lê trung hưng?", ['A: Đình Chu Quyến', 'B: Đình Tây Đằng', 'C: Đình Bảng', 'D: Đình Thổ Hà'], 'A', 60000000],
        ['Ở Chùa Bộc, ngoài thờ phật, nhân dân còn thờ vị tướng nào?', ['A: Lý Bí', 'B: Trần Hưng Đạo', 'C: Vua Quang Trung', 'D: Võ Nguyên Giáp'], 'C', 85000000],
        ['Lần đầu tiên nước ta dùng bộc phá 1000 kg thuốc nổ đánh giặc là ở đâu?', ['A: Sông Mã', 'B: Sông Bạch Đằng', 'C: Điện Biên Phủ', 'D: Sài Gòn'], 'C', 150000000]
    ];
    var questionSet2 = [
        ['"Gầm" là từ chỉ tiếng kêu của con vật nào?', ['A: Mèo', 'B: Chuột', 'C: Gà', 'D: Voi'], 'D', 200000],
        ["Theo dân gian, người ta thường làm gì để giải cảm?", ['A: Xông lá', 'B: Đi bơi', 'C: Gội đầu', 'D: Thay quần áo'], 'A', 400000],
        ['Có câu "Máu chảy ruột..." làm sao?', ['A: Mềm', 'B: Đau', 'C: Non', 'D: Già'], 'A', 600000],
        ['Loại quả nào sau đây cho nước để uống?', ['A: Quả xà cừ', 'B: Quả thông', 'C: Quả bàng', 'D: Quả dừa'], 'D', 1000000],
        ['Đất nước nào là quê hương của chú mèo máy Đôrêmon?', ['A: Nhật Bản', 'B: Đan Mạch', 'C: Australia', 'D: Thái Lan'], 'A', 2000000],
        ['Bộ phim nào sau đây là tập phim mới nhất trong loạt phim nhà thám hiểm Indiana Jones nổi tiếng?', ['A: Vương quốc sọ người', 'B: Người nhện 3', 'C: Kungfu Panda', 'D: Iron man'], 'A', 3000000],
        ['Trong các bài thơ dưới đây, bài nào không phải của Tú Xương', ['A: Bài ca ngất ngưởng', 'B: Áo bông che bạn', 'C: Sông Lấp', 'D: Vịnh khoa thi Hương'], 'A', 6000000],
        ['Thuật Yoga có nguồn gốc từ quốc gia nào?', ['A: Nhật Bản', 'B: Trung Quốc', 'C: Ấn Độ', 'D: Hàn Quốc'], 'C', 10000000],
        ['Tại World Cup 1994, Oleg Salenko đã đồng đoạt giải Vua phá lưới với cầu thủ nào?', ['A: Romario', 'B: Stoichkov', 'C: Bebeto', 'D: Roberto Bagio'], 'B', 14000000],
        ['Hát Khắp Loong toong (hát trên cánh đồng) là lối hát dân gian của dân tộc nào?', ['A: Tày', ' B: Nùng', 'C: Thái', 'D: D: H\'Mông'], 'C', 22000000],
        ['Phương pháp in bằng chữ rời do người Đức sáng chế năm 1440, gọi là gì?', ['A: In litô kẽm', 'B: In typô', 'C: In ống đồng', 'D: In hòa màu'], 'B', 30000000],
        ['"Chị Hòa", "Một Đảng viên", "Ni cô Đàm Vân" đều là những vở kịch của tác giả nào?', ['A: Học Phi', 'B: Nguyễn Huy Tưởng', 'C: Thế Lữ', 'D: Nguyễn Đình Nghi'], 'A', 40000000],
        ["Trong kho tàng văn học cổ, phần nào không có trong bố cục một bài văn tế?", ['A: Lung khởi', 'B: Thích thực', 'C: Luận', 'D: Kết'], 'C', 60000000],
        ['Số 3 được viết thế nào trong hệ nhị phân?', ['A: 0', 'B: 1', 'C: 11', 'D: 100'], 'C', 85000000],
        ['Tác phẩm "Đời thừa" của Nam Cao lần đầu tiên được đăng trên báo nào?', ['A: Ngày nay', 'B: Tiểu thuyết thứ bảy', 'C: Nông cổ mím đàm', 'D: Phụ nữ tân văn'], 'B', 150000000]
    ];
    var questionSet3 = [
        ['Đâu là loài hoa đặc trưng cho ngày Tết ở miền Nam Việt Nam?', ['A: Bích đào', 'B: Sen trắng', 'C: Mai vàng', 'D: Tulip đỏ'], 'C', 200000],
        ["Câu nào sau đây có nghĩa là nếu làm điều sai trái thì phải gánh chịu hậu quả?", ['A: Ăn không nói có', 'B: Ăn xổi ở thì', 'C: Ăn miếng trả miếng', 'D: Ăn mặn khát nước'], 'D', 400000],
        ['Đâu là câu mở đầu trong bài hát "Giọt nắng bên thềm" của nhạc sĩ Thanh Tùng?', ['A: Em không đến chơi', 'B: Hoa vẫn hồng', 'C: Chim vẫn hót', 'D: Lâu lắm rồi'], 'B', 600000],
        ['Tỉnh nào sau đây của Việt Nam được mệnh danh là "xứ dừa"?', ['A: An Giang', 'B: Long An', 'C: Đồng Tháp', 'D: Bến Tre'], 'D', 1000000],
        ['Đâu là tên gọi một loại vũ khí tự tạo của đồng bào dân tộc vùng cao Việt Nam?', ['A: Thần công', 'B: Súng lục', 'C: Súng kíp', 'D: Súng AK'], 'C', 2000000],
        ['Trong câu nói dân gian "Trạng chết Chúa cũng băng hà" thì "trạng" ở đây là chỉ trạng nào?', ['A: Trạng Lường', 'B: Trạng Me', 'C: Trạng Cờ', 'D: Trạng Quỳnh'], 'D', 3000000],
        ['Thán khí là tên gọi khác của loại chất khí nào sau đây?', ['A: Cacbonic', 'B: Hidro', 'C: Oxi', 'D: Heli'], 'A', 6000000],
        ['Năm 2009, cơ thủ Đặng Đinh Tiến đã đoạt mấy chức vô địch Quốc gia và Châu lục?', ['A: 1', 'B: 4', 'C: 7', 'D: 10'], 'B', 10000000],
        ['"Quả gì vỏ đỏ/ Ruột chấm vừng đen"?', ['A: Vải', 'B: Thanh long', 'C: Hồng xiêm', 'D: Nhãn'], 'B', 14000000],
        ['Quốc gia nào ở châu Mỹ hoàn toàn nằm trong lục địa và không có biển?', ['A: Bolivia', 'B: Peru', 'C: Colombia', 'D: Uruguay'], 'A', 22000000],
        ['Loài hoa nào còn thiếu trong câu hát sau: "Nếu là chim, tôi sẽ là loài bồ câu trắng. Nếu là hoa, tôi sẽ là một đóa ..."?', ['A: Hoa lan', 'B: Phù dung', 'C: Nhài trắng', 'D: Hướng dương'], 'D', 30000000],
        ['Trong thế vận hội Olympic thì môn thể thao nào sau đây chỉ dành riêng cho phái nữ?', ['A: Bơi nghệ thuật', 'B: Nhảy cầu', 'C: Đấu kiếm', 'D: Trượt băng'], 'A', 40000000],
        ["Ai là nữ thủ tướng đầu tiên của nước Anh?", ['A: Kolbai', 'B: Theresa May', 'C: Thatcher', 'D: Gandhi'], 'C', 60000000],
        ['Danh sĩ nào đời Trần đã sáng tác bài phú "Ngọc tỉnh liên" tự ví minh là "bông sen trong giếng ngọc"?', ['A: Trương Hán Siêu', 'B: Phạm Sư Mạnh', 'C: Mạc Đĩnh Chi', 'D: Lê Quát'], 'C', 85000000],
        ['Bản giao hưởng nào sau đây của Beethoven đã được đưa ra ngoài vũ trụ để tìm kiếm nền văn minh ngoài Trái Đất?', ['A: Số 3', 'B: Số 5', 'C: Số 7', 'D: Số 9'], 'D', 150000000]
    ];
    var questionSet4 = [
        ['Đâu là bệnh lây qua đường hô hấp?', ['A: Tiểu đường', 'B: Cúm', 'C: AIDS', 'D: Ung thư'], 'B', 200000],
        ["Người điều khiển xe mô tô, xe gắn máy trên đường phải đội loại mũ nào sau đây?", ['A: Mũ tai bèo', 'B: Mũ cối', 'C: Mũ bảo hiểm', 'D: Mũ nan'], 'C', 400000],
        ['Để giải cảm, người ta thường cho vào cháo loại rau nào sau đây?', ['A: Húng chó', 'B: Mồng tơi', 'C: Tía tô', 'D: Cải thìa'], 'C', 600000],
        ['Từ nào sau đây viết sai chính tả?', ['A: Lấp lửng', 'B: Lung linh', 'C: Lắc lư', 'D: Lo lê'], 'D', 1000000],
        ['Câu "Cơn đằng Đông vừa trông vừa chạy/ Cơn đằng Nam vừa làm vừa chơi" nói về kinh nghiệm làm việc của dân gian mỗi khi có hiện tượng thời tiết nào?', ['A: Nắng to', 'B: Mưa', 'C: Gió xoáy', 'D: Sóng thần'], 'B', 2000000],
        ['Đâu không phải là nhiệm vụ chính của Tổ chức Lương thực và Nông nghiệp của Liên Hợp Quốc (FAO)?', ['A: Nâng cao mức dinh dưỡng', 'B: Nâng cao năng suất nông sản', 'C: Giải phóng con người khỏi nạn đói', 'D: Giải quyết tranh chấp thương mại'], 'D', 3000000],
        ['Môn thể thao nào sau đây ít có tác động lên cột sống nhất?', ['A: Bơi', 'B: Chạy ma-ra-tông', 'C: Vật', 'D: Đẩy tạ'], 'A', 6000000],
        ['"Người ngoài hành tinh" Ronaldo đã mấy lần nhận danh hiệu "Cầu thủ xuất sắc nhất năm của FIFA"?', ['A: Một lần', 'B: Hai lần', 'C: Ba lần', 'D: Bốn lần'], 'C', 10000000],
        ['Ai là vị vua thứ 8 của triều đại nhà Lý?', ['A: Lý Anh Tông', 'B: Lý Cao Tông', 'C: Lý Huệ Tông', 'D: Lý Chiêu Hoàng'], 'C', 14000000],
        ['Trên tờ tiền mệnh giá 200.000 Việt Nam đồng có in hình phong cảnh nào?', ['A: Quê Bác', 'B: Bến Nhà Rồng', 'C: Giàn khoan', 'D: Vịnh Hạ Long'], 'D', 22000000],
        ['Tính đến hết năm 2010, tay đua nào là người giành nhiều ngôi vô địch thế giới Công thức 1 nhất?', ['A: Fernando Alonso', 'B: Michael Schumacher', 'C: Nelson Piquet', 'D: Alberto Ascari'], 'B', 30000000],
        ['Bộ tộc người Viking có nguồn gốc từ nơi nào trên thế giới?', ['A: Alaska', 'B: Bắc Âu', 'C: Nam Thái Bình Dương', 'D: Vùng Caribe'], 'B', 40000000],
        ["Cảng Hải Phòng trước đây có tên cũ là gì?", ['A: Ninh Hải', 'B: Hải Hòa', 'C: Hải Thuận', 'D: Ninh Hòa'], 'A', 60000000],
        ['Ai là tay trống của ban nhạc huyền thoại The Beatles và là người cuối cùng gia nhập ban nhạc này?', ['A: Pete Best', 'B: Paul McCartney', 'C: George Harrison', 'D: Ringo Starr'], 'D', 85000000],
        ['Đơn vị khoa học nào được đặt theo tên của một nhà quý tộc người Italy?', ['A: Pascal', 'B: Ohm', 'C: Volt', 'D: Hertz'], 'B', 150000000]
    ];
    var questionSet5 = [
        ['Xúc phạm tới người bề trên gọi là gì?', ['A: Phạm giới', 'B: Phạm thường', 'C: Phạm luật', 'D: Phạm pháp'], 'B', 200000],
        ["Đứng ra nhận tổ chức sự kiện, lễ hội nào đó gọi là gì?", ['A: Đăng cai', 'B: Đăng đàn', 'C: Đăng khoa', 'D: Đăng kiểm'], 'A', 400000],
        ['Từ láy nào dưới đây có nghĩa là lóe sáng rồi tắt liên tiếp?', ['A: Nhấp nhổm', 'B: Nhấp nhô', 'C: Nhấp nháy', 'D: Nhấp nhứ'], 'C', 600000],
        ['"Đêm tháng năm chưa nằm đã sáng. Ngày tháng mười chưa ..." làm gì "đã tối"?', ['A: Ngủ', 'B: Ăn', 'C: Học', 'D: Cười'], 'D', 1000000],
        ['Phần thịt ở bụng con lợn, có ba lớp thịt xen mỡ khổ mỏng gọi là gì?', ['A: Thịt dọi', 'B: Thịt mông', 'C: Thịt thăn', 'D: Thịt thú'], 'A', 2000000],
        ['Chỉ thề, hứa suông rồi nuốt lời thề, không thực hiện, là nghĩa của thành ngữ nào dưới đây?', ['A: Thề non hẹn biển', 'B: Thề cá trê chui ống', 'C: Thề sống thề chết', 'D: Thề nguyền'], 'B', 3000000],
        ['Loại nhạc cụ nào chiếm số lượng lớn nhất trong dàn nhạc giao hưởng?', ['A: Bộ gỗ', 'B: Bộ dây', 'C: Bộ gõ', 'D: Bộ đồng'], 'B', 6000000],
        ['Tại kì Olympic Toán học quốc tế 2007 tổ chức tại Hà Nội, đoàn Việt Nam đoạt giải gì?', ['A: Nhất', 'B: Nhì', 'C: Ba', 'D: Tư'], 'C', 10000000],
        ['Québec là thành phố ở nước nào?', ['A: Mehico', 'B: Nam Phi', 'C: Cu Ba', 'D: Canada'], 'D', 14000000],
        ['Cầu thủ nào là người ghi bàn nhiều nhất cho đội bóng Juventus?', ['A: David Trezeguet', 'B: Del Piero', 'C: Paven Nedved', 'D: Buffon'], 'B', 22000000],
        ['Phố Paul Bert thời Pháp thuộc là con phố nào hiện nay ở Hà Nội?', ['A: Phố Tràng Tiền', 'B: Phố Đinh Tiên Hoàng', 'C: Phố Lê Thái Tổ', 'D: Phố Tràng Thi'], 'A', 30000000],
        ['Truyện ngắn "Cái tết của những nhà đại văn hào" được Nguyễn Công Hoan viết vào giai đoạn nào?', ['A: Trước Cách mạng Tháng Tám', 'B: Từ năm 1945 đến năm 1954', 'C: Sau năm 1954', 'D: Sau năm 1975'], 'A', 40000000],
        ["Danh hiệu vô địch đơn nam đầu tiên mà tay vợt Roger Federer giành được là ở đâu?", ['A: Paris', 'B: New York', 'C: Munich', 'D: Milan'], 'D', 60000000],
        ['Trong Chiến tranh thế giới thứ hai, lính Mỹ sử dụng những bình aerosol đầu tiên để chứa thứ gì?', ['A: Dung dịch làm sạch', 'B: Thuốc trừ sâu', 'C: Chất khử trùng', 'D: Kem cạo râu'], 'B', 85000000],
        ['Ai được công nhận là người phát minh máy bay trực thăng sản xuất hàng loạt đầu tiên?', ['A: Igor Sikorsky', 'B: Elmer Sperry', 'C: Ferdinand von Zeppelin', 'D: Gottlieb Daimler'], 'A', 150000000]
    ];
    var questions = [questionSet1, questionSet2, questionSet3, questionSet4, questionSet5];
    var DOMString = UI.getDOMstring();
    var correctAnswer;
    var questionBox = document.querySelector(DOMString.question);
    var answers = document.querySelectorAll(DOMString.answers);
    var utilityBox3 = document.querySelector(DOMString.utility3);
    var fiftyFifty = document.querySelector(DOMString.a5050);
    var helpbox = document.querySelector(DOMString.helpbox);
    var questionboxDOM = document.querySelector(DOMString.questionbox);
    Qnum = -1;
    return {
        nextQuestion: function () {
            // lựa chọn ngẫu nhiên 1 set câu hỏi
            var n = Math.floor(Math.random() * questions.length);
            Qnum++;
            // lưu tất cả câu hỏi của set question thứ n
            var total = questions[n].length;
            if (Qnum < total) {
                askQuestion(n, Qnum);
            }
            else {
                UI.reset();
            }
        },
        restartGame: function () {
            Qnum = -1;
            setTimeout(() => {
                this.nextQuestion();
            }, 26000);

        },


    }
    function playAudio(src) {
        var audio = new Audio(`./Audio/${src}.wav`);
        audio.play();
    }
    function askQuestion(set, counter) {


        setTimeout(function () {
            document.querySelector(DOMString.question).textContent = questions[set][counter][0];
        }, 1000);
        setTimeout(function () {
            document.querySelectorAll(DOMString.answers)[0].textContent = questions[set][counter][1][0];
        }, 2000);
        setTimeout(function () {
            document.querySelectorAll(DOMString.answers)[1].innerHTML = `<p>${questions[set][counter][1][1]}</p>`;
        }, 3000);
        setTimeout(function () {
            document.querySelectorAll(DOMString.answers)[2].textContent = questions[set][counter][1][2];
        }, 4000);
        setTimeout(function () {
            document.querySelectorAll(DOMString.answers)[3].innerHTML = `<p>${questions[set][counter][1][3]}</p>`;
        }, 5000);
        UI.highLightMoneybox(counter);
        correctAnswer = questions[set][counter][2];
        $(".answer-box div").on("click", function (e) {
            $(".answer-box div").off();
            playAudio("")
            var userAnswer = e.target.textContent;
            userAnswer = userAnswer.split(":");
            userAnswer = userAnswer[0];


            if (userAnswer === correctAnswer) {
                $(DOMString.utility).show();
                utilityBox3.style.display = "block";
                playAudio("Right");
                if (counter === 4) {
                    playAudio("Right_5");
                    utilityBox3.textContent = "Bạn đã chắc chắn có phần thưởng trị giá 2.000.000 đồng, từ câu 6 bạn sẽ có thêm 1 sự trợ giúp là tổ tư vấn";
                    setTimeout(function () {
                        document.querySelector(".changequestion").classList.add("UIActive");
                        playAudio("joker_1");
                    }, 8000);
                    setTimeout(function () {
                        utilityBox3.textContent = "";
                        $(DOMString.utility).hide();
                        GAME.nextQuestion();
                    }, 8000);
                }
                else if (counter === 9) {
                    playAudio("Right_5");
                    utilityBox3.textContent = "Bạn đã chắc chắn có tấm sec trị giá 22.000.000 đồng của chương trình chúc mừng bạn";
                    setTimeout(function () {
                        utilityBox3.textContent = "";
                        $(DOMString.utility).hide();
                        GAME.nextQuestion();
                    }, 8000);
                }
                else {
                    utilityBox3.textContent = `Đáp án chính xác, tiền thưởng của bạn là ${questions[set][counter][3]} đồng`;
                    setTimeout(function () {
                        utilityBox3.textContent = "";
                        $(DOMString.utility).hide();
                        GAME.nextQuestion();
                    }, 2000);
                }


            }

            else {
                $(DOMString.utility).show();
                utilityBox3.style.display = "block";
                playAudio("Wrong");
                if (counter <= 4) {
                    utilityBox3.textContent = `Bạn đã trả lời sai, đáp án đúng là ${correctAnswer} , rất tiếc , bạn ra về với 0 đồng tiền thưởng`;
                }
                else if (counter > 4 && counter <= 9) {
                    utilityBox3.textContent = `Bạn đã trả lời sai, đáp án đúng là ${correctAnswer} , bạn ra về với phần thưởng trị giá 2.000.000 đồng.`;
                }
                else {
                    utilityBox3.textContent = `Bạn đã trả lời sai, đáp án đúng là ${correctAnswer} , bạn ra về với tấm sec của chương trình trị giá 22.000.000 đồng. Chúc mừng bạn`;
                }
                UI.reset();


            }
            document.querySelector(DOMString.question).textContent = "";
            document.querySelectorAll(DOMString.answers)[0].textContent = "";
            document.querySelectorAll(DOMString.answers)[1].textContent = "";
            document.querySelectorAll(DOMString.answers)[2].textContent = "";
            document.querySelectorAll(DOMString.answers)[3].textContent = "";
        });
    }


})();




var APPCONTROLLER = (function () {
    var DOMString = UI.getDOMstring();
    function setupEvent() {
        document.querySelectorAll(DOMString.button)[0].addEventListener("click", startGame);
        document.querySelectorAll(DOMString.button)[1].addEventListener("click", restartGame);

    }
    function startGame() {
        //display UI
        UI.displayUI();
        UI.introMusic();
        setTimeout(() => {
            GAME.nextQuestion();
        }, 26000);

    }
    function restartGame() {
        UI.displayUI();
        UI.introMusic();
        GAME.restartGame();
    }
    return {
        init: function () {
            setupEvent();
        }
    }

})();
APPCONTROLLER.init();