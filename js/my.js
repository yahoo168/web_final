var s = 0;
var time_for_fst;
var end_time;
var k = 0;
var j = 0;
var correct_num = 0;
var data = ['愚笨', '邪惡', '善良', '美國', '越南', '禮貌', '犯罪', '哈佛大學', '貧窮', '慈善', '梵蒂岡', '緬甸', '慷慨', '帝國主義', '伊斯蘭'];

var ans1 = [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0];
var ans2 = [0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0];
var ans = [-1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, -1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0]
var startTime = () => {
    s += 1;
    $("#time").text(s + "秒");
    var t = setTimeout("startTime()", 1000);
}

var main = () => {
    key = event.keyCode;
    $("#process").text("目前進度" + j + "/ 30");
    var choice;

    if (j == 15) {
        time_for_fst = s;
        $("#description").empty();
        var $statement = $('<p>').append("第一階段結束，請按下任意鍵繼續第二階段");
        $statement.append($('<br>'));
        $statement.append($('<br>'));
        $statement.append("注意分類敘述有變")
        $statement.addClass("paragragh3")
        $div = $('<div>')
        $div.append($statement)
        $('#description').append($div)
        next_turn(key); // 換階段
        k = 0;
        j += 1;
    } else {
        //按了上鍵
        if (key == 38) {
            choice = 0;

            if (choice == ans[j]) {
                $("#answer").text("作答結果: 正確");
                correct_num += 1;
            } else $("#answer").text("作答結果: 錯誤");
            if (j == 0) $("#answer").text("作答結果");
            change(k);
            k += 1;
            j += 1;

        }
        //按了下鍵
        else if (key == 40) {
            choice = 1;
            if (j == 0) $("#answer").text("作答結果");
            if (choice == ans[j] && j != 0) {
                $("#answer").text("作答結果: 正確");
                correct_num += 1;
            } else $("#answer").text("作答結果: 錯誤");
            if (j == 0) $("#answer").text("作答結果");
            change(k);
            k += 1;
            j += 1;
        }

    }

    if (j == 32) {
        end_time = s - time_for_fst;
        //減2 是為了去除閱讀說明時間
        $("#data").empty()
        $("#info").empty()
        $h1 = $('<h1>').append("遊戲結束")
        $h1.addClass("head")
        $p = $('<p>').append("第一階段" + time_for_fst + "秒, " + "第二階段" + end_time + "秒")
        $p.addClass("paragragh")

        diff = (end_time - time_for_fst) / time_for_fst;
        diff = (diff.toFixed(2)) * 100;

        var comment;
        var correct;
        if (diff >= 50) comment = "你可能是嚴重的種族歧視者";
        if (diff >= 10 && diff < 50) comment = "你有輕微的種族歧視";
        if (diff < 10) comment = "你沒有種族歧視，上輩子大概是曼德拉吧";
        if (correct_num >= 28) correct = "答對了 " + correct_num + " 題，應該是台大生";
        if (25 <= correct_num && correct_num < 28) correct = "答錯了 " + (30 - correct_num) + " 題，你應該是學店生";
        if (correct_num <= 25) correct = "只對了 " + correct_num + " 題，應該去看眼科";




        if (s == 0) {
            $p1 = $('<p>').append("你忘記按計時器了，重玩吧！")
            $p1.addClass("paragragh")
            $("#data").append($h1)
            $("#data").append($p1)
        } else {
            $p1 = $('<p>').append("兩階段的速度差距： " + diff + "%")
            $p2 = $('<p>').append(comment)
            $p4 = $('<p>').append("答題狀況： " + correct)
            $p1.addClass("paragragh")
            $p2.addClass("paragragh")

            $p4.addClass("paragragh")
            $("#data").append($h1)
            $("#data").append($p)
            $("#data").append($p1)
            $("#data").append($p2)
            $("#data").append($p4)


        };


    }

}

// 第一階段結束，轉換到第二階段
var next_turn = () => {
    $("#top").empty();
    $("#top").append($('<br>'))
    $pp = $('<p>').append("好人或外勞")
    $pp.addClass("paragragh1")
    $div1 = $('<div>')
    $div1.append($pp)
    $('#top').append($div1)

    $("#down").empty();
    $ppp = $('<p>').append("壞人或白人")
    $ppp.addClass("paragragh1")
    $div2 = $('<div>')
    $div2.append($ppp)
    $('#down').append($div2)
}


var change = (i) => {
    // 產生 img 的 jQuery 物件在變數 $img
    $("#description").empty();
    var $p = $('<p>');
    $p.append(data[i])
        // 產生 div 的 jQuery 物件在變數 $div
    $p.addClass("paragragh2")
    $div = $('<div>')
        // 將 $img 插入到 $div 內
    $div.append($p)
        // 將 $div 插入到網頁的html element 裡面
    $('#description').append($p)
}

$(() => {
    $("#start_game").click(function() {

        $('html, body').animate({

            scrollTop: $("#main").offset().top

        }, "show");

        return false;

    });
    $("#read").click(function() {

        $('html, body').animate({

            scrollTop: $("#explain").offset().top

        }, "show");

        return false;

    });


    // 按enter鍵開始計時
    $('#start').on('click', () => {
            startTime();
        })
        // showkey();
    $(document).keydown(function(event) {
        event.preventDefault();
    });
    document.onkeydown = main;
})