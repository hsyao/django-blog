/**
 * Created by python on 19-2-4.
 */
'use strict';

/**
 * Created by python on 19-1-22.
 */
var vm = new Vue({
    el: '#app',
    // delimiters: ['[[', ']]'], // 修改vue模板符号，防止与django冲突
    data: {
        host: host,

        page: 1, // 当前页数
        page_size: 2, // 每页数量
        // ordering: '-create_time', // 排序
        id: '', //当前标签id
        count: 0, // 文章总数量
        articles: [], // 文章数据
        tags: [] // 文章标签
    },
    computed: {
        total_page: function total_page() {
            // 总页数
            return Math.ceil(this.count / this.page_size);
        },

        next: function next() {
            // 下一页
            if (this.page >= this.total_page) {
                return 0;
            } else {
                return this.page + 1;
            }
        },
        previous: function previous() {
            // 上一页
            if (this.page <= 0) {
                return 0;
            } else {
                return this.page - 1;
            }
        },
        page_nums: function page_nums() {
            // 页码
            // 分页页数显示计算
            // 1.如果总页数<=5
            // 2.如果当前页是前3页
            // 3.如果当前页是后3页,
            // 4.既不是前3页，也不是后3页
            var nums = [];
            if (this.total_page <= 5) {
                for (var i = 1; i <= this.total_page; i++) {
                    nums.push(i);
                }
            } else if (this.page <= 3) {
                nums = [1, 2, 3, 4, 5];
            } else if (this.total_page - this.page <= 2) {
                for (var i = this.total_page; i > this.total_page - 5; i--) {
                    nums.push(i);
                }
            } else {
                for (var i = this.page - 2; i < this.page + 3; i++) {
                    nums.push(i);
                }
            }
            return nums;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.id = this.get_query_string('id'); //初始化获取保存当前标签id
        // 获取文章数据
        axios.get(this.host + '/tag_articles/?id=' + this.id, {
            responseType: 'json'
        }).then(function (response) {
            _this.count = response.data.count;
            _this.articles = response.data.results;
        }).catch(function (error) {
            console.log(error.response.data);
        });

        //获取标签
        axios.get(this.host + '/tags/', {
            responseType: 'json'
        }).then(function (response) {
            _this.tags = response.data;
        }).catch(function (error) {
            console.log(error.response.data);
        });
    },
    methods: {

        // 获取url路径参数
        get_query_string: function get_query_string(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },

        // 点击页数
        on_page: function on_page(num) {
            if (num != this.page) {
                this.page = num;
                this.get_articles();
            }
        },

        //选择标签文章列表数据
        get_tag_articles: function get_tag_articles(id) {
            var _this2 = this;

            axios.get(this.host + '/tag_articles/?id=' + id, {
                responseType: 'json'
            }).then(function (response) {
                _this2.id = id; // 更新当前页面标签id
                _this2.count = response.data.count; // 更新标签文章数据量
                _this2.articles = response.data.results;
            }).catch(function (error) {
                console.log(error.response.data);
            });
        },

        // 请求文章列表数据
        // http://127.0.0.1:8000/tag_articles?id=1&page=1
        get_articles: function get_articles() {
            var _this3 = this;

            var config = {
                params: {
                    id: this.id,
                    page: this.page //当前页面
                    // ordering: this.ordering
                }
            };
            axios.get(this.host + '/tag_articles/', config).then(function (response) {
                _this3.count = response.data.count;
                _this3.articles = response.data.results;
            }).catch(function (error) {
                console.log(error.response.data);
            });
        }

    }
});