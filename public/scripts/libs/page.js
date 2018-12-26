function Person() {
    this.arr = [];//数据的数组，默认空
    this.count = 4;//每一页显示四条数据
    this.index = 0;//当前显示第几页
    this.sum = 0;//总页数
    this.init();
}
Person.prototype = {
    constructor: Person,
    init: function () {
        var _this=this;
        $.ajax({
            url: '/getData',
            success: function (data) {
                _this.arr = eval("(" + data + ")");
                $('section').empty('');
                _this.xuanran();
                _this.li_btn();
            }
        });
    },
    xuanran: function () {
        var _this=this;
        this.sum = Math.ceil(this.arr.length / this.count);
        var stor = this.count * this.index;
        var end = stor + this.count - 1;
        $("footer").html(`<div class="pageNum">
                        <button class="l">上一页</button>
                            <button class="r">下一页</button>
                        </div>`);
        for (var i = 0; i < this.arr.length; i++) {
            if (i >= stor && i <= end) {
                var html = `<div class="wrap">
                        <img src="${_this.arr[i].book_img}">
                        <div class="text">
                            <p>${_this.arr[i].book_name}</p>
                            <p>${_this.arr[i].book_publish}</p>
                            <p>${_this.arr[i].book_author}</p>
                        </div>
                    </div>`
                $("section").append(html)
            }
        }
        for (var i = 0; i < this.sum; i++) {
            $(`<span>${i + 1}</span>`).appendTo('.pageNum')
        }
    },
    li_btn: function () {
        var _this = this;
        $('.pageNum').on('click', 'span', function () {
            _this.index = Number($(this).text()) - 1;
            _this.init();
        })
        $('.r').click(function () {
            _this.index += 1;
            console.log(_this.index)
            if (_this.index >= _this.sum) {
                _this.index = 0;
            }
            _this.init();
        })
        $('.l').click(function () {
            _this.index -= 1;
            if (_this.index < 0) {
                _this.index = _this.sum - 1;
            }
            _this.init();
        })
    }

}
new Person();